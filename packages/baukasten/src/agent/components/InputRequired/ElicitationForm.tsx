import React, { useId, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { FieldLabel } from '../../../components/FieldLabel';
import { FormGroup } from '../../../components/FormGroup';
import type { FormGroupOrientation } from '../../../components/FormGroup';
import { FormHelper } from '../../../components/FormHelper';
import { Icon } from '../../../components/Icon';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import type { FormInputRequest, InputResponse } from '../../types';
import {
    initialValues,
    missingRequired,
    readElicitationSchema,
    type ElicitationField,
} from './schema';
import * as styles from './InputRequired.css';

type Values = Record<string, string | number | boolean | string[]>;

const INPUT_TYPES = {
    email: 'email',
    uri: 'url',
    date: 'date',
    'date-time': 'datetime-local',
} as const;

export interface ElicitationFormProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onSubmit'
> {
    request: FormInputRequest;
    /** Answers with accept, decline or cancel — the three are not interchangeable. */
    onRespond?: (response: InputResponse) => void;
    submitLabel?: string;
    declineLabel?: string;
    /**
     * Field layout.
     *
     * `horizontal` is the library's VSCode-style two-column form — label left,
     * control right — and is right wherever there is room for it.
     *
     * A transcript is frequently *not* somewhere with room: in a 300px docked
     * panel the label column works out around 90px, which truncates almost any
     * real setting name. Pass `vertical` there. That is a judgement about
     * available width rather than about the form, so it belongs to whoever
     * knows where this is being rendered.
     *
     * @default 'horizontal'
     */
    orientation?: FormGroupOrientation;
}

function Field({
    field,
    value,
    onChange,
    orientation,
    idPrefix,
}: {
    field: ElicitationField;
    value: Values[string] | undefined;
    onChange: (next: Values[string]) => void;
    orientation: FormGroupOrientation;
    idPrefix: string;
}) {
    // Associating the label with its control is what makes the label a hit
    // target and what a screen reader announces. Namespaced because several
    // forms can be on screen at once — a blocked call can carry more than one.
    const id = `${idPrefix}-${field.name}`;
    const label = (
        <FieldLabel htmlFor={id} required={field.required}>
            {field.title}
        </FieldLabel>
    );
    const helper = field.description ? <FormHelper>{field.description}</FormHelper> : null;

    // `required` on the label only draws an asterisk. Repeating it on the
    // control is what a screen reader announces and what the browser enforces —
    // without it the requirement is decoration.
    const control = (() => {
        switch (field.kind) {
            case 'boolean':
                return (
                    <Checkbox
                        id={id}
                        required={field.required}
                        checked={value === true}
                        onChange={(event) => onChange(event.target.checked)}
                    />
                );

            case 'number':
                return (
                    <Input
                        id={id}
                        required={field.required}
                        type="number"
                        value={value === undefined ? '' : String(value)}
                        min={field.minimum}
                        max={field.maximum}
                        step={field.integer ? 1 : undefined}
                        onChange={(event) => {
                            const raw = event.target.value;
                            onChange(raw === '' ? '' : Number(raw));
                        }}
                    />
                );

            case 'enum':
                return (
                    <Select
                        id={id}
                        fullWidth
                        options={field.options.map((option) => ({
                            value: option.value,
                            label: option.label,
                        }))}
                        value={typeof value === 'string' ? value : undefined}
                        onChange={(next) => onChange(next)}
                    />
                );

            case 'multi-enum':
                return (
                    <Select
                        id={id}
                        multiple
                        fullWidth
                        options={field.options.map((option) => ({
                            value: option.value,
                            label: option.label,
                        }))}
                        value={Array.isArray(value) ? value : []}
                        onChange={(next) => onChange(next)}
                    />
                );

            default:
                return (
                    <Input
                        id={id}
                        required={field.required}
                        type={field.format ? INPUT_TYPES[field.format] : 'text'}
                        value={typeof value === 'string' ? value : ''}
                        minLength={field.minLength}
                        maxLength={field.maxLength}
                        onChange={(event) => onChange(event.target.value)}
                    />
                );
        }
    })();

    return (
        <FormGroup orientation={orientation} compact>
            {label}
            {/*
             * Control and helper share one wrapper deliberately.
             *
             * Horizontal FormGroup is a two-column grid, and children fill
             * cells in order — so a helper passed as a third child lands in
             * column one of the next row, hard against the left edge under the
             * label instead of under the control it describes. Wrapping them
             * puts both in the second cell, which is the usage FormGroup's own
             * documentation shows.
             */}
            <div className={styles.control}>
                {control}
                {helper}
            </div>
        </FormGroup>
    );
}

/**
 * A form a server asked for, rendered from its own schema.
 *
 * The schema is deliberately restricted — a flat object of primitives — which
 * is what makes this a mapping onto controls that already exist rather than a
 * general form generator.
 *
 * Two rules are structural rather than stylistic. The card **names the server
 * that is asking**, because an unattributed form appearing mid-run is
 * indistinguishable from one the application itself put there. And the user
 * can **review and change every value before sending**, which is why this is a
 * form with a submit rather than something that reports as you type.
 *
 * Nothing here renders a value as a link. Servers are told not to put
 * clickable URLs in form fields, and a component that linkified them anyway
 * would be the gap that makes the rule unenforceable.
 *
 * **Values are read from the schema once, at mount.** That is what lets someone
 * type into the form without each parent render resetting the field they are
 * in. The consequence is that swapping `request` for a different one on a
 * mounted instance keeps the values already entered — so a caller rendering a
 * sequence of requests must key the element by the request, not only by its
 * `key`, which repeats. {@link InputRequired} does this by mixing in the round.
 *
 * @example
 * ```tsx
 * <ElicitationForm request={request} onRespond={(response) => answer(response)} />
 * ```
 */
export const ElicitationForm: React.FC<ElicitationFormProps> = ({
    request,
    onRespond,
    submitLabel = 'Submit',
    declineLabel = 'Decline',
    orientation = 'horizontal',
    className,
    ...props
}) => {
    const fields = useMemo(() => readElicitationSchema(request.schema), [request.schema]);
    const [values, setValues] = useState<Values>(() => initialValues(fields));
    // Unique per mounted form, so two forms answering one blocked call cannot
    // produce colliding label associations.
    const idPrefix = useId();

    const missing = missingRequired(fields, values);
    const canSubmit = missing.length === 0;

    return (
        <div className={clsx(styles.stack, className)} {...props}>
            <div className={styles.message}>{request.message}</div>

            {request.serverId && (
                <div className={styles.origin}>
                    <Icon name="server" size="xs" />
                    {request.serverId}
                </div>
            )}

            <div className={styles.fields}>
                {fields.map((field) => (
                    <Field
                        key={field.name}
                        field={field}
                        value={values[field.name]}
                        onChange={(next) =>
                            setValues((current) => ({ ...current, [field.name]: next }))
                        }
                        orientation={orientation}
                        idPrefix={idPrefix}
                    />
                ))}
            </div>

            <div className={styles.actions}>
                <Button
                    size="sm"
                    variant="primary"
                    disabled={!canSubmit}
                    onClick={() =>
                        onRespond?.({ key: request.key, action: 'accept', content: values })
                    }
                >
                    {submitLabel}
                </Button>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onRespond?.({ key: request.key, action: 'decline' })}
                >
                    {declineLabel}
                </Button>
            </div>
        </div>
    );
};

ElicitationForm.displayName = 'ElicitationForm';
