import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ElicitationForm } from './ElicitationForm';
import { initialValues, missingRequired, readElicitationSchema } from './schema';
import { inspectUrl } from './UrlElicitation';

describe('readElicitationSchema', () => {
    it('reads a string with its constraints and format', () => {
        const [field] = readElicitationSchema({
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    title: 'Your email',
                    format: 'email',
                    minLength: 3,
                },
            },
            required: ['email'],
        });

        expect(field).toMatchObject({
            name: 'email',
            kind: 'string',
            title: 'Your email',
            format: 'email',
            minLength: 3,
            required: true,
        });
    });

    it('falls back to the property name when no title is given', () => {
        const [field] = readElicitationSchema({
            type: 'object',
            properties: { name: { type: 'string' } },
        });

        expect(field.title).toBe('name');
    });

    it('distinguishes integer from number', () => {
        const fields = readElicitationSchema({
            type: 'object',
            properties: {
                count: { type: 'integer', minimum: 1, maximum: 10 },
                ratio: { type: 'number' },
            },
        });

        expect(fields[0]).toMatchObject({ kind: 'number', integer: true, minimum: 1, maximum: 10 });
        expect(fields[1]).toMatchObject({ kind: 'number', integer: false });
    });

    it('reads a bare enum, where each value is its own label', () => {
        const [field] = readElicitationSchema({
            type: 'object',
            properties: { colour: { type: 'string', enum: ['Red', 'Green'] } },
        });

        expect(field).toMatchObject({
            kind: 'enum',
            options: [
                { value: 'Red', label: 'Red' },
                { value: 'Green', label: 'Green' },
            ],
        });
    });

    it('reads a labelled enum, where the display name differs from the value', () => {
        const [field] = readElicitationSchema({
            type: 'object',
            properties: {
                colour: {
                    type: 'string',
                    oneOf: [
                        { const: '#FF0000', title: 'Red' },
                        { const: '#00FF00', title: 'Green' },
                    ],
                },
            },
        });

        expect(field).toMatchObject({
            kind: 'enum',
            options: [
                { value: '#FF0000', label: 'Red' },
                { value: '#00FF00', label: 'Green' },
            ],
        });
    });

    it('reads a multi-select with its bounds', () => {
        const [field] = readElicitationSchema({
            type: 'object',
            properties: {
                colours: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 2,
                    items: { type: 'string', enum: ['Red', 'Green', 'Blue'] },
                },
            },
        });

        expect(field).toMatchObject({ kind: 'multi-enum', minItems: 1, maxItems: 2 });
        expect(field.kind === 'multi-enum' && field.options).toHaveLength(3);
    });

    it('reads a labelled multi-select', () => {
        const [field] = readElicitationSchema({
            type: 'object',
            properties: {
                colours: {
                    type: 'array',
                    items: { anyOf: [{ const: '#FF0000', title: 'Red' }] },
                },
            },
        });

        expect(field.kind === 'multi-enum' && field.options[0]).toEqual({
            value: '#FF0000',
            label: 'Red',
        });
    });

    it('skips a property it cannot render instead of failing the whole form', () => {
        const fields = readElicitationSchema({
            type: 'object',
            properties: {
                nested: { type: 'object', properties: { a: { type: 'string' } } },
                fine: { type: 'string' },
            },
        });

        // One unrenderable property must not cost the user the rest of the form.
        expect(fields.map((field) => field.name)).toEqual(['fine']);
    });

    it('returns nothing for a schema with no properties', () => {
        expect(readElicitationSchema({ type: 'object' })).toEqual([]);
        expect(readElicitationSchema(undefined)).toEqual([]);
        expect(readElicitationSchema('nonsense')).toEqual([]);
    });
});

describe('initialValues', () => {
    it('pre-populates the defaults a schema supplies', () => {
        const fields = readElicitationSchema({
            type: 'object',
            properties: {
                name: { type: 'string', default: 'octocat' },
                notify: { type: 'boolean', default: true },
                count: { type: 'number', default: 5 },
            },
        });

        expect(initialValues(fields)).toEqual({ name: 'octocat', notify: true, count: 5 });
    });

    it('starts a boolean false rather than undefined, so the control is controlled', () => {
        const fields = readElicitationSchema({
            type: 'object',
            properties: { notify: { type: 'boolean' } },
        });

        expect(initialValues(fields)).toEqual({ notify: false });
    });
});

describe('missingRequired', () => {
    const fields = readElicitationSchema({
        type: 'object',
        properties: {
            name: { type: 'string' },
            colours: { type: 'array', items: { enum: ['Red'] } },
        },
        required: ['name', 'colours'],
    });

    it('lists what is still blank', () => {
        expect(missingRequired(fields, {})).toEqual(['name', 'colours']);
    });

    it('treats an empty string and an empty selection as missing', () => {
        expect(missingRequired(fields, { name: '', colours: [] })).toEqual(['name', 'colours']);
    });

    it('is satisfied once every required field has something', () => {
        expect(missingRequired(fields, { name: 'a', colours: ['Red'] })).toEqual([]);
    });
});

describe('the rendered form', () => {
    const request = {
        key: 'contact',
        kind: 'form' as const,
        message: 'Tell me about yourself',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', title: 'Full name' },
                notify: { type: 'boolean', title: 'Email me' },
                plan: { type: 'string', title: 'Plan', enum: ['free', 'pro'] },
            },
            required: ['name'],
        },
    };

    it('associates every label with its control', () => {
        render(<ElicitationForm request={request} />);

        // Without this a label is not a hit target and a screen reader
        // announces the control as unlabelled. It was missing entirely.
        expect(screen.getByLabelText(/Full name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email me/)).toBeInTheDocument();
    });

    it('gives two forms on screen at once distinct label associations', () => {
        render(
            <>
                <ElicitationForm request={request} />
                <ElicitationForm request={{ ...request, key: 'second' }} />
            </>,
        );

        // A blocked call can carry more than one form. Ids derived from field
        // names alone would collide and point both labels at one control.
        const labelled = screen.getAllByLabelText(/Full name/);
        expect(labelled).toHaveLength(2);
        expect(labelled[0].id).not.toBe(labelled[1].id);
    });

    it('marks a required field as required', () => {
        render(<ElicitationForm request={request} />);
        expect(screen.getByLabelText(/Full name/)).toBeRequired();
    });

    it('keeps the helper text in the same cell as its control', () => {
        render(
            <ElicitationForm
                request={{
                    ...request,
                    schema: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                                title: 'Full name',
                                description: 'As it should appear',
                            },
                        },
                    },
                }}
            />,
        );

        const control = screen.getByLabelText(/Full name/);
        const helper = screen.getByText('As it should appear');

        // A horizontal FormGroup is a two-column grid filled in child order, so
        // a helper passed as a sibling of the control lands in column one of
        // the next row — under the label instead of under the control. Sharing
        // a wrapper is what keeps both in the second cell.
        expect(helper.parentElement?.contains(control)).toBe(true);

        // And that wrapper is the grid cell, not the whole group: the label
        // must not be inside it.
        const label = screen.getByText(/Full name/);
        expect(helper.parentElement?.contains(label)).toBe(false);
    });
});

describe('inspectUrl', () => {
    it('pulls out the host so a lookalike subdomain is visible', () => {
        expect(inspectUrl('https://mcp.example.com/connect').host).toBe('mcp.example.com');
    });

    it('flags a punycode host, which can imitate a trusted name', () => {
        const { hazards } = inspectUrl('https://xn--pypal-4ve.com/login');

        // Showing the address is no protection when the address is the lie.
        expect(hazards.map((hazard) => hazard.kind)).toContain('punycode');
    });

    it('flags a non-https address', () => {
        expect(inspectUrl('http://example.com').hazards.map((h) => h.kind)).toContain('insecure');
    });

    it('refuses to vouch for something that is not a URL', () => {
        const { host, hazards } = inspectUrl('not a url');

        expect(host).toBeNull();
        expect(hazards.map((hazard) => hazard.kind)).toContain('unparseable');
    });

    it('raises nothing for an ordinary https address', () => {
        expect(inspectUrl('https://example.com/a').hazards).toEqual([]);
    });
});
