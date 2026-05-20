# Settings Panel

A configuration form organized into collapsible sections, mirroring VSCode's native Settings UI. Uses horizontal `FormGroup` rows (the "label on the left, control on the right" VSCode layout), `Accordion` for sectioning, and Save / Reset controls in a sticky footer.

Cross-references:

- [FormGroup](../references/core-components.md#formgroup), [FieldLabel](../references/core-components.md#fieldlabel), [FormHelper](../references/core-components.md#formhelper)
- [Accordion](../references/extra-components.md#accordion)
- [Input](../references/core-components.md#input), [Select](../references/core-components.md#select), [Checkbox](../references/core-components.md#checkbox), [Slider](../references/core-components.md#slider)

## Pattern

Each setting is one `FormGroup` row. Settings are grouped under `AccordionItem`s, with only one section open at a time (`exclusive`). A sticky footer holds Save and Reset.

```tsx
import { useState } from 'react';
import {
    Button,
    Checkbox,
    FieldLabel,
    FormGroup,
    FormHelper,
    Icon,
    Input,
    Select,
    Slider,
} from 'baukasten-ui/core';
import { Accordion, AccordionItem } from 'baukasten-ui/extra';

interface Settings {
    fontSize: number;
    fontFamily: string;
    tabSize: number;
    wordWrap: boolean;
    autoSave: 'off' | 'afterDelay' | 'onFocusChange';
    autoSaveDelay: number;
}

const DEFAULTS: Settings = {
    fontSize: 14,
    fontFamily: 'Menlo, Monaco, monospace',
    tabSize: 4,
    wordWrap: false,
    autoSave: 'afterDelay',
    autoSaveDelay: 1000,
};

export function SettingsPanel() {
    const [draft, setDraft] = useState<Settings>(DEFAULTS);
    const update = <K extends keyof Settings>(key: K, value: Settings[K]) =>
        setDraft((s) => ({ ...s, [key]: value }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--bk-spacing-4)' }}>
                <Accordion exclusive defaultOpen="editor">
                    <AccordionItem id="editor" title="Editor" icon={<Icon name="edit" />}>
                        <FormGroup>
                            <FieldLabel htmlFor="fontSize">Font Size</FieldLabel>
                            <Input
                                id="fontSize"
                                type="number"
                                value={draft.fontSize}
                                onChange={(e) => update('fontSize', Number(e.target.value))}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FieldLabel htmlFor="fontFamily">Font Family</FieldLabel>
                            <Input
                                id="fontFamily"
                                value={draft.fontFamily}
                                onChange={(e) => update('fontFamily', e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FieldLabel htmlFor="tabSize">Tab Size</FieldLabel>
                            <Slider
                                id="tabSize"
                                min={1}
                                max={8}
                                step={1}
                                marks
                                value={draft.tabSize}
                                onChange={(v) => update('tabSize', v)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FieldLabel>Word Wrap</FieldLabel>
                            <Checkbox
                                variant="switch"
                                checked={draft.wordWrap}
                                onChange={(e) => update('wordWrap', e.target.checked)}
                                label="Wrap long lines"
                            />
                        </FormGroup>
                    </AccordionItem>

                    <AccordionItem id="files" title="Files" icon={<Icon name="file" />}>
                        <FormGroup>
                            <FieldLabel htmlFor="autoSave">Auto Save</FieldLabel>
                            <Select
                                id="autoSave"
                                value={draft.autoSave}
                                onChange={(v) => update('autoSave', v as Settings['autoSave'])}
                                options={[
                                    { value: 'off', label: 'Off' },
                                    { value: 'afterDelay', label: 'After Delay' },
                                    { value: 'onFocusChange', label: 'On Focus Change' },
                                ]}
                            />
                            <FormHelper>Choose when changes are persisted.</FormHelper>
                        </FormGroup>

                        {draft.autoSave === 'afterDelay' && (
                            <FormGroup>
                                <FieldLabel htmlFor="autoSaveDelay">Delay (ms)</FieldLabel>
                                <Input
                                    id="autoSaveDelay"
                                    type="number"
                                    value={draft.autoSaveDelay}
                                    onChange={(e) =>
                                        update('autoSaveDelay', Number(e.target.value))
                                    }
                                />
                            </FormGroup>
                        )}
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Sticky footer */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 'var(--bk-gap-md)',
                    padding: 'var(--bk-padding-md)',
                    borderTop: '1px solid var(--bk-color-border)',
                    background: 'var(--bk-color-background)',
                }}
            >
                <Button variant="ghost" onClick={() => setDraft(DEFAULTS)}>
                    Reset
                </Button>
                <Button variant="primary" onClick={() => saveSettings(draft)}>
                    Save
                </Button>
            </div>
        </div>
    );
}
```

## Notes

- **Horizontal `FormGroup` rows** are the default — that's the layout VSCode users expect for settings panels. Use `<FormGroup orientation="vertical">` only when controls are wide (file pickers, long descriptions).
- **`Checkbox variant="switch"`** reads more naturally for boolean toggles than a checkbox; use a plain `Checkbox` when the setting is a list of independently selectable options.
- **Conditional rows**: rendering `FormGroup` inside `{condition && ...}` works fine — only `Accordion` requires stable child identity (give each `AccordionItem` an `id`).
- **Validation**: pair an invalid `Input` with `error="message"` and use `FormHelper variant="warning"` for soft hints. Both are documented in the core reference.
- **Draft / commit pattern**: keep edits in local state (`draft`), and only call your `saveSettings` IO on the Save button. Reset re-applies defaults without round-tripping.
