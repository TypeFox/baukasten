import {
    Alert,
    Badge,
    Button,
    Checkbox,
    GlobalStyles,
    Heading,
    Icon,
    Input,
    Paragraph,
    Select,
    Text,
    Tooltip,
} from 'baukasten-ui';
import { VSCodeThemeWrapper } from 'baukasten-ui-web-wrapper';
import { useState } from 'preact/hooks';

// PoC: render a spread of Baukasten components under Preact (via preact/compat).
// Select + Tooltip are the real test — they portal through @floating-ui/react.
export function App() {
    const [name, setName] = useState('');
    const [checked, setChecked] = useState(true);
    const [fruit, setFruit] = useState('apple');

    return (
        <>
            <GlobalStyles />
            <VSCodeThemeWrapper>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
                    <Heading level={2}>
                        Baukasten <Icon name="heart" /> Preact <Badge variant="success">PoC</Badge>
                    </Heading>

                    <Paragraph>
                        Every component below is rendered by <Text weight="bold">Preact</Text>, with{' '}
                        <Text weight="bold">react/react-dom</Text> aliased to <Text weight="bold">preact/compat</Text>.
                    </Paragraph>

                    <Alert variant="info" title="State works">
                        Hooks ({name ? `hello, ${name}` : 'type your name'}, checkbox {checked ? 'on' : 'off'}, fruit:{' '}
                        {fruit}) prove Preact's hook dispatcher is driving Baukasten.
                    </Alert>

                    <Input
                        placeholder="Your name…"
                        value={name}
                        onChange={(e) => setName((e.target as HTMLInputElement).value)}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Checkbox checked={checked} onChange={() => setChecked((c) => !c)} />
                        <Text>Enable feature</Text>
                    </div>

                    <Select
                        placeholder="Pick a fruit (portal + floating-ui)"
                        value={fruit}
                        onChange={setFruit}
                        options={[
                            { label: 'Apple', value: 'apple' },
                            { label: 'Banana', value: 'banana' },
                            { label: 'Cherry', value: 'cherry' },
                        ]}
                    />

                    <div style={{ display: 'flex', gap: 8 }}>
                        <Tooltip content="Tooltips portal too">
                            <Button variant="primary">Hover me</Button>
                        </Tooltip>
                        <Button variant="secondary" onClick={() => setName('')}>
                            Reset
                        </Button>
                    </div>
                </div>
            </VSCodeThemeWrapper>
        </>
    );
}
