'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, Variant, VariantGrid, PropDefinition } from '@/components/ComponentShowcase';
import { Slider } from 'baukasten-ui';
import { useState } from 'react';

const sliderProps: PropDefinition[] = [
    {
        name: 'size',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: 'Size of the slider',
    },
    {
        name: 'min',
        type: 'number',
        default: '0',
        description: 'Minimum value',
    },
    {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'Maximum value',
    },
    {
        name: 'step',
        type: 'number',
        default: '1',
        description: 'Step increment',
    },
    {
        name: 'value',
        type: 'number',
        description: 'Current value (for controlled component)',
    },
    {
        name: 'defaultValue',
        type: 'number',
        description: 'Default value (for uncontrolled component)',
    },
    {
        name: 'onChange',
        type: '(value: number) => void',
        description: 'Callback fired during drag (use for real-time updates)',
    },
    {
        name: 'onChangeCommitted',
        type: '(value: number) => void',
        description: 'Callback fired when drag ends (use for expensive operations)',
    },
    {
        name: 'showMinMax',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show min/max labels',
    },
    {
        name: 'showValue',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show current value label',
    },
    {
        name: 'formatValue',
        type: '(value: number) => string',
        description: 'Custom formatter for value label',
    },
    {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        description: 'Whether the slider should take full width of its container',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the slider is disabled',
    },
    {
        name: 'marks',
        type: 'boolean | number | SliderMark[]',
        default: 'false',
        description: 'Display tick marks on the slider. Pass true for marks at every step, a number for custom interval, or an array of marks with optional labels',
    },
];

export default function SliderPage() {
    const [volume, setVolume] = useState(75);
    const [brightness, setBrightness] = useState(60);

    return (
        <PageLayout
            title="Slider"
            description="A range slider component for selecting numeric values with customizable appearance and value display. Features size-responsive spacing, tick marks, and performance-optimized callbacks."
        >
            <Showcase
                title="Basic Usage"
                description="The default slider with standard configuration."
                preview={<Slider />}
                code={`import { Slider } from 'baukasten-ui';

function App() {
  return <Slider />;
}`}
            />

            <Showcase
                title="With Value Label"
                description="Display the current value above the slider."
                preview={<Slider showValue defaultValue={50} />}
                code={`<Slider showValue defaultValue={50} />`}
            />

            <Showcase
                title="With Min/Max Labels"
                description="Show minimum and maximum values on either side of the slider."
                preview={<Slider showMinMax defaultValue={50} />}
                code={`<Slider showMinMax defaultValue={50} />`}
            />

            <Showcase
                title="With All Labels"
                description="Combine value and min/max labels for complete information."
                preview={<Slider showValue showMinMax defaultValue={50} />}
                code={`<Slider showValue showMinMax defaultValue={50} />`}
            />

            <Showcase
                title="Sizes"
                description="Five size options from extra small to extra large. Spacing between labels, track, and tick marks automatically scales with the slider size for optimal visual balance."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', width: '400px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-descriptionForeground)' }}>
                                Extra Small (xs)
                            </div>
                            <Slider size="xs" defaultValue={25} showValue showMinMax marks={25} />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-descriptionForeground)' }}>
                                Small (sm)
                            </div>
                            <Slider size="sm" defaultValue={35} showValue showMinMax marks={25} />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-descriptionForeground)' }}>
                                Medium (md) - Default
                            </div>
                            <Slider size="md" defaultValue={50} showValue showMinMax marks={25} />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-descriptionForeground)' }}>
                                Large (lg)
                            </div>
                            <Slider size="lg" defaultValue={65} showValue showMinMax marks={25} />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-descriptionForeground)' }}>
                                Extra Large (xl)
                            </div>
                            <Slider size="xl" defaultValue={85} showValue showMinMax marks={25} />
                        </div>
                    </div>
                }
                code={`<Slider size="xs" defaultValue={25} showValue showMinMax marks={25} />
<Slider size="sm" defaultValue={35} showValue showMinMax marks={25} />
<Slider size="md" defaultValue={50} showValue showMinMax marks={25} />
<Slider size="lg" defaultValue={65} showValue showMinMax marks={25} />
<Slider size="xl" defaultValue={85} showValue showMinMax marks={25} />`}
            />

            <Showcase
                title="Custom Range"
                description="Configure custom minimum, maximum, and step values."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', width: '400px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-descriptionForeground)' }}>
                                Temperature (-10 to 40°C)
                            </div>
                            <Slider
                                min={-10}
                                max={40}
                                step={1}
                                defaultValue={22}
                                showValue
                                showMinMax
                                formatValue={(v) => `${v}°C`}
                            />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-descriptionForeground)' }}>
                                Price ($0-$1000)
                            </div>
                            <Slider
                                min={0}
                                max={1000}
                                step={50}
                                defaultValue={500}
                                showValue
                                showMinMax
                                formatValue={(v) => `$${v}`}
                            />
                        </div>
                    </div>
                }
                code={`<Slider 
  min={-10} 
  max={40} 
  step={1} 
  defaultValue={22} 
  showValue 
  showMinMax 
  formatValue={(v) => \`\${v}°C\`}
/>

<Slider 
  min={0} 
  max={1000} 
  step={50} 
  defaultValue={500} 
  showValue 
  showMinMax 
  formatValue={(v) => \`$\${v}\`}
/>`}
            />

            <Showcase
                title="Custom Formatter"
                description="Use a custom formatter to display values with units or custom formatting."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', width: '400px' }}>
                        <Slider
                            showValue
                            formatValue={(v) => `${v}%`}
                            defaultValue={75}
                        />
                        <Slider
                            min={0}
                            max={5}
                            step={0.5}
                            showValue
                            formatValue={(v) => `${v} ★`}
                            defaultValue={3.5}
                        />
                    </div>
                }
                code={`<Slider 
  showValue 
  formatValue={(v) => \`\${v}%\`}
  defaultValue={75}
/>

<Slider 
  min={0}
  max={5}
  step={0.5}
  showValue 
  formatValue={(v) => \`\${v} ★\`}
  defaultValue={3.5}
/>`}
            />

            <Showcase
                title="Controlled Component"
                description="Use the slider as a controlled component with state management."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', width: '400px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-descriptionForeground)' }}>
                                Volume
                            </div>
                            <Slider
                                value={volume}
                                onChange={setVolume}
                                showValue
                                showMinMax
                                formatValue={(v) => `${v}%`}
                            />
                        </div>
                        <div style={{
                            padding: 'var(--bk-spacing-3)',
                            backgroundColor: 'var(--bk-color-secondary)',
                            borderRadius: 'var(--bk-radius-md)',
                            fontSize: 'var(--bk-font-size-sm)',
                        }}>
                            Current volume: <strong>{volume}%</strong>
                        </div>
                    </div>
                }
                code={`const [volume, setVolume] = useState(75);

<Slider 
  value={volume} 
  onChange={setVolume} 
  showValue 
  showMinMax 
  formatValue={(v) => \`\${v}%\`}
/>

<div>Current volume: <strong>{volume}%</strong></div>`}
            />

            <Showcase
                title="Full Width"
                description="Make the slider take the full width of its container."
                preview={
                    <div style={{ width: '100%' }}>
                        <Slider fullWidth showValue showMinMax defaultValue={60} />
                    </div>
                }
                code={`<Slider fullWidth showValue showMinMax defaultValue={60} />`}
            />

            <Showcase
                title="Disabled State"
                description="Sliders can be disabled to prevent interaction."
                preview={
                    <Slider disabled defaultValue={50} showValue showMinMax />
                }
                code={`<Slider disabled defaultValue={50} showValue showMinMax />`}
            />

            <Showcase
                title="With Tick Marks"
                description="Display visual tick marks to help users see increments. The slider automatically highlights marks before the current value."
                preview={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-6)', width: '400px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-descriptionForeground)' }}>
                                Marks at every step (step=10)
                            </div>
                            <Slider defaultValue={50} showValue marks={true} step={10} />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--bk-spacing-2)', fontSize: 'var(--bk-font-size-sm)', color: 'var(--bk-color-descriptionForeground)' }}>
                                Marks every 25 units
                            </div>
                            <Slider defaultValue={50} showValue showMinMax marks={25} step={5} />
                        </div>
                    </div>
                }
                code={`// Marks at every step
<Slider defaultValue={50} showValue marks={true} step={10} />

// Marks every 25 units, but snaps every 5
<Slider defaultValue={50} showValue showMinMax marks={25} step={5} />`}
            />

            <Showcase
                title="Labeled Tick Marks"
                description="Add custom labels to specific tick marks for better context."
                preview={
                    <div style={{ width: '400px' }}>
                        <Slider
                            defaultValue={2}
                            showValue={false}
                            min={0}
                            max={4}
                            step={1}
                            marks={[
                                { value: 0, label: 'Off' },
                                { value: 1, label: 'Low' },
                                { value: 2, label: 'Medium' },
                                { value: 3, label: 'High' },
                                { value: 4, label: 'Max' },
                            ]}
                        />
                    </div>
                }
                code={`<Slider
  defaultValue={2}
  min={0}
  max={4}
  step={1}
  marks={[
    { value: 0, label: 'Off' },
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' },
    { value: 4, label: 'Max' },
  ]}
/>`}
            />

            <Showcase
                title="Volume Control with Marks"
                description="A practical example showing a volume slider with tick marks every 10 units."
                preview={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--bk-spacing-4)',
                        width: '450px',
                        padding: 'var(--bk-spacing-4)',
                        backgroundColor: 'var(--bk-color-secondary)',
                        borderRadius: 'var(--bk-radius-lg)',
                    }}>
                        <h4 style={{
                            margin: 0,
                            fontSize: 'var(--bk-font-size-base)',
                            fontWeight: 'var(--bk-font-weight-semibold)',
                        }}>
                            Volume Control
                        </h4>
                        <Slider
                            value={volume}
                            onChange={setVolume}
                            min={0}
                            max={100}
                            step={5}
                            marks={10}
                            showValue
                            formatValue={(v) => `${v}%`}
                            fullWidth
                            size="lg"
                        />
                        <div style={{
                            padding: 'var(--bk-spacing-3)',
                            backgroundColor: 'var(--bk-color-info)',
                            borderRadius: 'var(--bk-radius-md)',
                            fontSize: 'var(--bk-font-size-sm)',
                            textAlign: 'center',
                        }}>
                            Current Volume: <strong>{volume}%</strong>
                        </div>
                    </div>
                }
                code={`const [volume, setVolume] = useState(75);

<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  step={5}        // Snaps every 5 units
  marks={10}      // Shows marks every 10 units
  showValue
  formatValue={(v) => \`\${v}%\`}
  fullWidth
  size="lg"
/>`}
            />

            <Showcase
                title="Performance Optimization"
                description="Use onChangeCommitted for expensive operations like API calls. It only fires when dragging ends, while onChange fires continuously during drag."
                preview={
                    (() => {
                        const [value, setValue] = useState(50);
                        const [updateCount, setUpdateCount] = useState(0);
                        const [commitCount, setCommitCount] = useState(0);

                        return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', width: '450px' }}>
                                <div style={{
                                    padding: 'var(--bk-spacing-4)',
                                    backgroundColor: 'var(--bk-color-secondary)',
                                    borderRadius: 'var(--bk-radius-lg)',
                                }}>
                                    <h4 style={{
                                        margin: '0 0 var(--bk-spacing-3) 0',
                                        fontSize: 'var(--bk-font-size-base)',
                                        fontWeight: 'var(--bk-font-weight-semibold)',
                                    }}>
                                        Performance Demo
                                    </h4>
                                    <p style={{
                                        margin: '0 0 var(--bk-spacing-4) 0',
                                        fontSize: 'var(--bk-font-size-sm)',
                                        color: 'var(--bk-color-descriptionForeground)',
                                    }}>
                                        Drag the slider and watch the counters
                                    </p>

                                    <Slider
                                        value={value}
                                        onChange={(v) => {
                                            setValue(v);
                                            setUpdateCount((c) => c + 1);
                                        }}
                                        onChangeCommitted={() => {
                                            setCommitCount((c) => c + 1);
                                        }}
                                        showValue
                                        showMinMax
                                        marks={10}
                                        step={5}
                                        fullWidth
                                    />
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 'var(--bk-spacing-3)',
                                }}>
                                    <div style={{
                                        padding: 'var(--bk-spacing-3)',
                                        backgroundColor: 'var(--bk-color-info)',
                                        borderRadius: 'var(--bk-radius-md)',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            fontSize: 'var(--bk-font-size-xs)',
                                            fontWeight: 'var(--bk-font-weight-medium)',
                                            marginBottom: 'var(--bk-spacing-1)',
                                        }}>
                                            onChange
                                        </div>
                                        <div style={{
                                            fontSize: 'var(--bk-font-size-xl)',
                                            fontWeight: 'var(--bk-font-weight-bold)',
                                        }}>
                                            {updateCount}
                                        </div>
                                        <div style={{
                                            fontSize: 'var(--bk-font-size-xs)',
                                            color: 'var(--bk-color-descriptionForeground)',
                                            marginTop: 'var(--bk-spacing-1)',
                                        }}>
                                            updates
                                        </div>
                                    </div>

                                    <div style={{
                                        padding: 'var(--bk-spacing-3)',
                                        backgroundColor: 'var(--bk-color-success)',
                                        borderRadius: 'var(--bk-radius-md)',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            fontSize: 'var(--bk-font-size-xs)',
                                            fontWeight: 'var(--bk-font-weight-medium)',
                                            marginBottom: 'var(--bk-spacing-1)',
                                        }}>
                                            onChangeCommitted
                                        </div>
                                        <div style={{
                                            fontSize: 'var(--bk-font-size-xl)',
                                            fontWeight: 'var(--bk-font-weight-bold)',
                                        }}>
                                            {commitCount}
                                        </div>
                                        <div style={{
                                            fontSize: 'var(--bk-font-size-xs)',
                                            color: 'var(--bk-color-descriptionForeground)',
                                            marginTop: 'var(--bk-spacing-1)',
                                        }}>
                                            commits
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()
                }
                code={`const [value, setValue] = useState(50);
const [updateCount, setUpdateCount] = useState(0);
const [commitCount, setCommitCount] = useState(0);

<Slider
  value={value}
  // Fires continuously during drag
  onChange={(v) => {
    setValue(v);
    setUpdateCount((c) => c + 1);
  }}
  // Fires only when drag ends
  onChangeCommitted={() => {
    setCommitCount((c) => c + 1);
    // Use this for expensive operations like:
    // - API calls
    // - Database updates
    // - Heavy computations
  }}
  showValue
  showMinMax
  marks={10}
  fullWidth
/>`}
            />

            <Showcase
                title="Settings Panel Example"
                description="A practical example showing multiple sliders in a settings panel."
                preview={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--bk-spacing-4)',
                        width: '450px',
                        padding: 'var(--bk-spacing-4)',
                        backgroundColor: 'var(--bk-color-secondary)',
                        borderRadius: 'var(--bk-radius-lg)',
                    }}>
                        <h4 style={{
                            margin: 0,
                            fontSize: 'var(--bk-font-size-base)',
                            fontWeight: 'var(--bk-font-weight-semibold)',
                        }}>
                            Display Settings
                        </h4>

                        <div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 'var(--bk-spacing-2)',
                            }}>
                                <label style={{
                                    fontSize: 'var(--bk-font-size-sm)',
                                    fontWeight: 'var(--bk-font-weight-medium)',
                                }}>
                                    Brightness
                                </label>
                                <span style={{
                                    fontSize: 'var(--bk-font-size-sm)',
                                    color: 'var(--bk-color-descriptionForeground)',
                                }}>
                                    {brightness}%
                                </span>
                            </div>
                            <Slider
                                value={brightness}
                                onChange={setBrightness}
                                min={0}
                                max={100}
                                fullWidth
                                size="sm"
                            />
                        </div>
                    </div>
                }
                code={`const [brightness, setBrightness] = useState(60);

<div style={{ 
  display: 'flex', 
  flexDirection: 'column', 
  gap: 'var(--bk-spacing-4)', 
  padding: 'var(--bk-spacing-4)',
  backgroundColor: 'var(--bk-color-secondary)',
  borderRadius: 'var(--bk-radius-lg)',
}}>
  <h4>Display Settings</h4>
  
  <div>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      marginBottom: 'var(--bk-spacing-2)',
    }}>
      <label>Brightness</label>
      <span>{brightness}%</span>
    </div>
    <Slider 
      value={brightness} 
      onChange={setBrightness} 
      min={0}
      max={100}
      fullWidth
      size="sm"
    />
  </div>
</div>`}
                props={sliderProps}
            />
        </PageLayout>
    );
}
