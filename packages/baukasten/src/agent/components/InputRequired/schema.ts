/**
 * Reads the restricted schema a form-mode elicitation carries.
 *
 * Bounded on purpose and by specification: a flat object of primitives, with
 * enums and multi-selects, and explicitly *not* nested objects, arrays of
 * objects, or the rest of JSON Schema. That restriction is what makes
 * rendering it a mapping rather than a project — unlike a tool's input schema,
 * which is permitted the whole of 2020-12 and cannot be handled this way.
 *
 * Pure, so it is tested against fixtures with no DOM.
 */

export interface EnumOption {
    readonly value: string;
    readonly label: string;
}

interface FieldBase {
    readonly name: string;
    /** `title` when the schema gives one, otherwise the property name. */
    readonly title: string;
    readonly description?: string;
    readonly required: boolean;
}

export interface StringField extends FieldBase {
    readonly kind: 'string';
    readonly format?: 'email' | 'uri' | 'date' | 'date-time';
    readonly minLength?: number;
    readonly maxLength?: number;
    readonly defaultValue?: string;
}

export interface NumberField extends FieldBase {
    readonly kind: 'number';
    readonly integer: boolean;
    readonly minimum?: number;
    readonly maximum?: number;
    readonly defaultValue?: number;
}

export interface BooleanField extends FieldBase {
    readonly kind: 'boolean';
    readonly defaultValue?: boolean;
}

export interface EnumField extends FieldBase {
    readonly kind: 'enum';
    readonly options: readonly EnumOption[];
    readonly defaultValue?: string;
}

export interface MultiEnumField extends FieldBase {
    readonly kind: 'multi-enum';
    readonly options: readonly EnumOption[];
    readonly minItems?: number;
    readonly maxItems?: number;
    readonly defaultValue?: readonly string[];
}

export type ElicitationField =
    | StringField
    | NumberField
    | BooleanField
    | EnumField
    | MultiEnumField;

type Raw = Record<string, unknown>;

function asRecord(value: unknown): Raw | null {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
        ? (value as Raw)
        : null;
}

function asNumber(value: unknown): number | undefined {
    return typeof value === 'number' ? value : undefined;
}

function asString(value: unknown): string | undefined {
    return typeof value === 'string' ? value : undefined;
}

/**
 * Reads labelled choices.
 *
 * Two spellings, both current: a bare `enum` where the value is its own label,
 * and `oneOf`/`anyOf` entries carrying `const` plus a display `title` — which
 * is how a schema gives a choice a human name distinct from the value sent
 * back.
 */
function readOptions(schema: Raw): readonly EnumOption[] | null {
    const branches = schema.oneOf ?? schema.anyOf;
    if (Array.isArray(branches)) {
        const options = branches
            .map(asRecord)
            .filter((branch): branch is Raw => branch !== null)
            .map((branch) => {
                const value = branch.const;
                if (typeof value !== 'string' && typeof value !== 'number') return null;
                return { value: String(value), label: asString(branch.title) ?? String(value) };
            })
            .filter((option): option is EnumOption => option !== null);

        return options.length > 0 ? options : null;
    }

    if (Array.isArray(schema.enum)) {
        const options = schema.enum
            .filter((value): value is string | number =>
                ['string', 'number'].includes(typeof value),
            )
            .map((value) => ({ value: String(value), label: String(value) }));

        return options.length > 0 ? options : null;
    }

    return null;
}

function readField(name: string, raw: unknown, required: boolean): ElicitationField | null {
    const schema = asRecord(raw);
    if (!schema) return null;

    const base = {
        name,
        title: asString(schema.title) ?? name,
        description: asString(schema.description),
        required,
    };

    if (schema.type === 'array') {
        const items = asRecord(schema.items);
        const options = items ? readOptions(items) : null;
        // An array of anything other than a fixed set of choices is outside
        // the restricted subset, so it is not a field we can render.
        if (!options) return null;

        return {
            ...base,
            kind: 'multi-enum',
            options,
            minItems: asNumber(schema.minItems),
            maxItems: asNumber(schema.maxItems),
            defaultValue: Array.isArray(schema.default)
                ? schema.default.filter((value): value is string => typeof value === 'string')
                : undefined,
        };
    }

    const options = readOptions(schema);
    if (options) {
        return {
            ...base,
            kind: 'enum',
            options,
            defaultValue: asString(schema.default),
        };
    }

    if (schema.type === 'boolean') {
        return {
            ...base,
            kind: 'boolean',
            defaultValue: typeof schema.default === 'boolean' ? schema.default : undefined,
        };
    }

    if (schema.type === 'number' || schema.type === 'integer') {
        return {
            ...base,
            kind: 'number',
            integer: schema.type === 'integer',
            minimum: asNumber(schema.minimum),
            maximum: asNumber(schema.maximum),
            defaultValue: asNumber(schema.default),
        };
    }

    if (schema.type === 'string' || schema.type === undefined) {
        const format = asString(schema.format);
        return {
            ...base,
            kind: 'string',
            format:
                format === 'email' ||
                format === 'uri' ||
                format === 'date' ||
                format === 'date-time'
                    ? format
                    : undefined,
            minLength: asNumber(schema.minLength),
            maxLength: asNumber(schema.maxLength),
            defaultValue: asString(schema.default),
        };
    }

    return null;
}

/** Fields in declaration order. Unreadable properties are skipped, not thrown on. */
export function readElicitationSchema(schema: unknown): readonly ElicitationField[] {
    const root = asRecord(schema);
    const properties = root ? asRecord(root.properties) : null;
    if (!properties) return [];

    const required = new Set(
        Array.isArray(root?.required)
            ? root.required.filter((name): name is string => typeof name === 'string')
            : [],
    );

    return Object.entries(properties)
        .map(([name, raw]) => readField(name, raw, required.has(name)))
        .filter((field): field is ElicitationField => field !== null);
}

/** Initial form state, honouring the defaults a schema supplies. */
export function initialValues(
    fields: readonly ElicitationField[],
): Record<string, string | number | boolean | string[]> {
    const values: Record<string, string | number | boolean | string[]> = {};

    for (const field of fields) {
        switch (field.kind) {
            case 'boolean':
                values[field.name] = field.defaultValue ?? false;
                break;
            case 'number':
                if (field.defaultValue !== undefined) values[field.name] = field.defaultValue;
                break;
            case 'multi-enum':
                values[field.name] = [...(field.defaultValue ?? [])];
                break;
            default:
                if (field.defaultValue !== undefined) values[field.name] = field.defaultValue;
        }
    }

    return values;
}

/** Field names that are required but still empty. */
export function missingRequired(
    fields: readonly ElicitationField[],
    values: Record<string, unknown>,
): readonly string[] {
    return fields
        .filter((field) => {
            if (!field.required) return false;
            const value = values[field.name];

            if (field.kind === 'multi-enum') return !Array.isArray(value) || value.length === 0;
            if (field.kind === 'boolean') return typeof value !== 'boolean';
            return value === undefined || value === '';
        })
        .map((field) => field.name);
}
