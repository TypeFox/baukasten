import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';

const meta = {
    title: 'Components/Slider',
    component: Slider,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A range slider component with customizable appearance and value display. Supports both controlled and uncontrolled modes with performance-optimized drag handling. Features size-responsive spacing that automatically adjusts gaps between labels, tracks, and tick marks based on the slider size.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size of the slider',
            table: {
                defaultValue: { summary: 'md' },
            },
        },
        min: {
            control: 'number',
            description: 'Minimum value',
            table: {
                defaultValue: { summary: '0' },
            },
        },
        max: {
            control: 'number',
            description: 'Maximum value',
            table: {
                defaultValue: { summary: '100' },
            },
        },
        step: {
            control: 'number',
            description: 'Step increment',
            table: {
                defaultValue: { summary: '1' },
            },
        },
        value: {
            control: 'number',
            description: 'Current value (controlled)',
        },
        defaultValue: {
            control: 'number',
            description: 'Default value for uncontrolled mode',
        },
        showMinMax: {
            control: 'boolean',
            description: 'Show min/max labels',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        showValue: {
            control: 'boolean',
            description: 'Show current value label',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        fullWidth: {
            control: 'boolean',
            description: 'Full width of container',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        marks: {
            control: 'object',
            description: 'Display tick marks on the slider',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        onChange: {
            description: 'Callback fired during drag (use for real-time updates)',
            action: 'onChange',
        },
        onChangeCommitted: {
            description: 'Callback fired when drag ends (use for expensive operations)',
            action: 'onChangeCommitted',
        },
        formatValue: {
            description: 'Custom formatter for value display',
        },
    },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground with all controls exposed.
 * Use the controls panel to experiment with different prop combinations.
 */
export const Interactive: Story = {
    args: {
        defaultValue: 50,
        showValue: true,
        showMinMax: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to explore all slider properties. Use the controls to adjust size, range, labels, and state.',
            },
        },
    },
};

/**
 * Slider with value label displayed
 */
export const WithValue: Story = {
    args: {
        showValue: true,
        defaultValue: 50,
    },
};

/**
 * Slider with min/max labels
 */
export const WithMinMax: Story = {
    args: {
        showMinMax: true,
        defaultValue: 50,
    },
};

/**
 * Slider with all labels
 */
export const WithAllLabels: Story = {
    args: {
        showValue: true,
        showMinMax: true,
        defaultValue: 50,
    },
};

/**
 * Slider with custom formatter
 */
export const WithFormatter: Story = {
    args: {
        showValue: true,
        formatValue: (value) => `${value}%`,
        defaultValue: 75,
    },
};

/**
 * Different sizes with responsive spacing
 */
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '400px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Extra Small (xs)
                </h4>
                <Slider size="xs" defaultValue={25} showValue showMinMax marks={25} />
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Small (sm)
                </h4>
                <Slider size="sm" defaultValue={35} showValue showMinMax marks={25} />
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Medium (md) - Default
                </h4>
                <Slider size="md" defaultValue={50} showValue showMinMax marks={25} />
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Large (lg)
                </h4>
                <Slider size="lg" defaultValue={65} showValue showMinMax marks={25} />
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Extra Large (xl)
                </h4>
                <Slider size="xl" defaultValue={85} showValue showMinMax marks={25} />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Five size options from extra small to extra large. Notice how spacing between labels, track, and tick marks automatically scales with the slider size for optimal visual balance.',
            },
        },
    },
};

/**
 * Custom range examples
 */
export const CustomRanges: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '400px' }}>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Volume Control (0-100)
                </h4>
                <Slider
                    min={0}
                    max={100}
                    step={5}
                    defaultValue={75}
                    showValue
                    showMinMax
                    formatValue={(v) => `${v}%`}
                />
            </div>
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Temperature (-10 to 40°C)
                </h4>
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
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Price Range ($0-$1000)
                </h4>
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
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Rating (0-5 stars)
                </h4>
                <Slider
                    min={0}
                    max={5}
                    step={0.5}
                    defaultValue={3.5}
                    showValue
                    showMinMax
                    formatValue={(v) => `${v} ★`}
                />
            </div>
        </div>
    ),
};

/**
 * Controlled slider example
 */
export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState(50);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '400px' }}>
                <Slider
                    value={value}
                    onChange={setValue}
                    showValue
                    showMinMax
                />
                <div style={{
                    padding: 'var(--spacing-3)',
                    backgroundColor: 'var(--color-secondary)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                }}>
                    Current value: <strong>{value}</strong>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                    <button
                        onClick={() => setValue(0)}
                        style={{
                            padding: 'var(--spacing-2) var(--spacing-3)',
                            backgroundColor: 'var(--color-secondary)',
                            color: 'var(--color-secondary-foreground)',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: 'var(--font-size-sm)',
                        }}
                    >
                        Min
                    </button>
                    <button
                        onClick={() => setValue(50)}
                        style={{
                            padding: 'var(--spacing-2) var(--spacing-3)',
                            backgroundColor: 'var(--color-secondary)',
                            color: 'var(--color-secondary-foreground)',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: 'var(--font-size-sm)',
                        }}
                    >
                        Middle
                    </button>
                    <button
                        onClick={() => setValue(100)}
                        style={{
                            padding: 'var(--spacing-2) var(--spacing-3)',
                            backgroundColor: 'var(--color-secondary)',
                            color: 'var(--color-secondary-foreground)',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: 'var(--font-size-sm)',
                        }}
                    >
                        Max
                    </button>
                </div>
            </div>
        );
    },
};

/**
 * Full width slider
 */
export const FullWidth: Story = {
    render: () => (
        <div style={{ width: '600px', padding: 'var(--spacing-4)' }}>
            <Slider fullWidth showValue showMinMax defaultValue={60} />
        </div>
    ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: 50,
        showValue: true,
        showMinMax: true,
    },
};

/**
 * Slider with tick marks at every step
 */
export const WithMarks: Story = {
    args: {
        defaultValue: 50,
        showValue: true,
        marks: true,
        step: 10,
        min: 0,
        max: 100,
    },
    parameters: {
        docs: {
            description: {
                story: 'Slider with tick marks displayed at every step interval. Set `marks={true}` to show marks at each step value.',
            },
        },
    },
};

/**
 * Slider with tick marks at custom intervals
 */
export const WithCustomIntervalMarks: Story = {
    args: {
        defaultValue: 50,
        showValue: true,
        showMinMax: true,
        marks: 25,
        step: 5,
        min: 0,
        max: 100,
    },
    parameters: {
        docs: {
            description: {
                story: 'Slider with tick marks at custom intervals. Pass a number to `marks` to set the interval (e.g., `marks={25}` shows marks at 0, 25, 50, 75, 100).',
            },
        },
    },
};

/**
 * Slider with labeled tick marks
 */
export const WithLabeledMarks: Story = {
    args: {
        defaultValue: 2,
        showValue: false,
        min: 0,
        max: 4,
        step: 1,
        marks: [
            { value: 0, label: 'Off' },
            { value: 1, label: 'Low' },
            { value: 2, label: 'Medium' },
            { value: 3, label: 'High' },
            { value: 4, label: 'Max' },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: 'Slider with custom labeled tick marks. Pass an array of `{ value, label }` objects to display labels below specific marks.',
            },
        },
    },
};

/**
 * Volume control with marks
 */
export const VolumeWithMarks: Story = {
    render: () => {
        const [volume, setVolume] = useState(75);

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                width: '500px',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--color-secondary)',
                borderRadius: 'var(--radius-lg)',
            }}>
                <h3 style={{
                    margin: 0,
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                }}>
                    Volume Control
                </h3>
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
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Volume control with tick marks every 10 units and snapping every 5 units. Notice how the slider snaps to multiples of 5 (step) while showing marks every 10 units.',
            },
        },
    },
};

/**
 * Temperature control with labeled marks
 */
export const TemperatureWithMarks: Story = {
    render: () => {
        const [temp, setTemp] = useState(20);

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                width: '500px',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--color-secondary)',
                borderRadius: 'var(--radius-lg)',
            }}>
                <h3 style={{
                    margin: 0,
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                }}>
                    Thermostat
                </h3>
                <Slider
                    value={temp}
                    onChange={setTemp}
                    min={10}
                    max={30}
                    step={0.5}
                    marks={[
                        { value: 10, label: '10°C' },
                        { value: 15, label: '15°C' },
                        { value: 20, label: '20°C' },
                        { value: 25, label: '25°C' },
                        { value: 30, label: '30°C' },
                    ]}
                    showValue
                    formatValue={(v) => `${v}°C`}
                    fullWidth
                    size="lg"
                />
                <div style={{
                    padding: 'var(--spacing-3)',
                    backgroundColor: 'var(--color-info)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                    textAlign: 'center',
                }}>
                    Current Temperature: <strong>{temp}°C</strong>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Temperature control with labeled marks at key values. The slider snaps to 0.5° increments while showing major marks at 5° intervals.',
            },
        },
    },
};

/**
 * Multiple sliders example (audio mixer)
 */
export const AudioMixer: Story = {
    render: () => {
        const [master, setMaster] = useState(80);
        const [music, setMusic] = useState(70);
        const [sfx, setSfx] = useState(60);
        const [voice, setVoice] = useState(90);

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                width: '500px',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--color-secondary)',
                borderRadius: 'var(--radius-lg)',
            }}>
                <h3 style={{
                    margin: 0,
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                }}>
                    Audio Mixer
                </h3>

                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: 'var(--spacing-2)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                    }}>
                        Master Volume
                    </label>
                    <Slider
                        value={master}
                        onChange={setMaster}
                        showValue
                        formatValue={(v) => `${v}%`}
                        fullWidth
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: 'var(--spacing-2)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                    }}>
                        Music
                    </label>
                    <Slider
                        value={music}
                        onChange={setMusic}
                        showValue
                        formatValue={(v) => `${v}%`}
                        fullWidth
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: 'var(--spacing-2)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                    }}>
                        Sound Effects
                    </label>
                    <Slider
                        value={sfx}
                        onChange={setSfx}
                        showValue
                        formatValue={(v) => `${v}%`}
                        fullWidth
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: 'var(--spacing-2)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                    }}>
                        Voice
                    </label>
                    <Slider
                        value={voice}
                        onChange={setVoice}
                        showValue
                        formatValue={(v) => `${v}%`}
                        fullWidth
                    />
                </div>
            </div>
        );
    },
};

/**
 * Settings panel example
 */
export const SettingsPanel: Story = {
    render: () => {
        const [brightness, setBrightness] = useState(70);
        const [contrast, setContrast] = useState(50);
        const [saturation, setSaturation] = useState(100);

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-5)',
                width: '450px',
                padding: 'var(--spacing-6)',
                backgroundColor: 'var(--color-secondary)',
                borderRadius: 'var(--radius-lg)',
            }}>
                <h3 style={{
                    margin: 0,
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                }}>
                    Display Settings
                </h3>

                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spacing-2)',
                    }}>
                        <label style={{
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                        }}>
                            Brightness
                        </label>
                        <span style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-descriptionForeground)',
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

                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spacing-2)',
                    }}>
                        <label style={{
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                        }}>
                            Contrast
                        </label>
                        <span style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-descriptionForeground)',
                        }}>
                            {contrast}%
                        </span>
                    </div>
                    <Slider
                        value={contrast}
                        onChange={setContrast}
                        min={0}
                        max={100}
                        fullWidth
                        size="sm"
                    />
                </div>

                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spacing-2)',
                    }}>
                        <label style={{
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                        }}>
                            Saturation
                        </label>
                        <span style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-descriptionForeground)',
                        }}>
                            {saturation}%
                        </span>
                    </div>
                    <Slider
                        value={saturation}
                        onChange={setSaturation}
                        min={0}
                        max={200}
                        fullWidth
                        size="sm"
                    />
                </div>

                <button
                    onClick={() => {
                        setBrightness(70);
                        setContrast(50);
                        setSaturation(100);
                    }}
                    style={{
                        padding: 'var(--spacing-2-5) var(--spacing-4)',
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-primary-foreground)',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        marginTop: 'var(--spacing-2)',
                    }}
                >
                    Reset to Defaults
                </button>
            </div>
        );
    },
};

/**
 * Performance optimization example using onChangeCommitted
 */
export const PerformanceOptimized: Story = {
    render: () => {
        const [value, setValue] = useState(50);
        const [committedValue, setCommittedValue] = useState(50);
        const [updateCount, setUpdateCount] = useState(0);
        const [commitCount, setCommitCount] = useState(0);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '500px' }}>
                <div style={{
                    padding: 'var(--spacing-4)',
                    backgroundColor: 'var(--color-secondary)',
                    borderRadius: 'var(--radius-lg)',
                }}>
                    <h3 style={{
                        margin: '0 0 var(--spacing-3) 0',
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                    }}>
                        Performance Demo
                    </h3>
                    <p style={{
                        margin: '0 0 var(--spacing-4) 0',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-descriptionForeground)',
                    }}>
                        Use <code>onChange</code> for real-time UI updates and <code>onChangeCommitted</code> for expensive operations (API calls, heavy computations, etc.)
                    </p>

                    <Slider
                        value={value}
                        onChange={(v) => {
                            setValue(v);
                            setUpdateCount((c) => c + 1);
                        }}
                        onChangeCommitted={(v) => {
                            setCommittedValue(v);
                            setCommitCount((c) => c + 1);
                        }}
                        showValue
                        showMinMax
                        fullWidth
                    />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--spacing-3)',
                }}>
                    <div style={{
                        padding: 'var(--spacing-3)',
                        backgroundColor: 'var(--color-info)',
                        borderRadius: 'var(--radius-md)',
                    }}>
                        <div style={{
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            marginBottom: 'var(--spacing-1)',
                        }}>
                            onChange (Real-time)
                        </div>
                        <div style={{
                            fontSize: 'var(--font-size-2xl)',
                            fontWeight: 'var(--font-weight-bold)',
                        }}>
                            {value}
                        </div>
                        <div style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-descriptionForeground)',
                            marginTop: 'var(--spacing-1)',
                        }}>
                            Updates: {updateCount}
                        </div>
                    </div>

                    <div style={{
                        padding: 'var(--spacing-3)',
                        backgroundColor: 'var(--color-success)',
                        borderRadius: 'var(--radius-md)',
                    }}>
                        <div style={{
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            marginBottom: 'var(--spacing-1)',
                        }}>
                            onChangeCommitted (On release)
                        </div>
                        <div style={{
                            fontSize: 'var(--font-size-2xl)',
                            fontWeight: 'var(--font-weight-bold)',
                        }}>
                            {committedValue}
                        </div>
                        <div style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-descriptionForeground)',
                            marginTop: 'var(--spacing-1)',
                        }}>
                            Commits: {commitCount}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the difference between `onChange` (fires continuously during drag) and `onChangeCommitted` (fires once when drag ends). Use `onChangeCommitted` for expensive operations like API calls to avoid performance issues.',
            },
        },
    },
};

/**
 * Comprehensive showcase of all slider features and variants
 */
export const Showcase: Story = {
    render: () => {
        const [volume, setVolume] = useState(75);
        const [brightness, setBrightness] = useState(60);

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-8)',
                padding: 'var(--spacing-8)',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <div>
                    <h2 style={{
                        margin: '0 0 var(--spacing-2) 0',
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                    }}>
                        Slider Component Showcase
                    </h2>
                    <p style={{
                        margin: 0,
                        color: 'var(--color-descriptionForeground)',
                        fontSize: 'var(--font-size-md)',
                    }}>
                        A comprehensive overview of the Slider component with all its features and variants
                    </p>
                </div>

                <section>
                    <h3 style={{
                        margin: '0 0 var(--spacing-4) 0',
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: 'var(--font-weight-semibold)',
                    }}>
                        Sizes
                    </h3>
                    <p style={{
                        margin: '0 0 var(--spacing-4) 0',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-descriptionForeground)',
                    }}>
                        Notice how spacing between labels, track, and tick marks scales automatically
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', maxWidth: '500px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>Extra Small</div>
                            <Slider size="xs" defaultValue={20} showValue showMinMax marks={25} fullWidth />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>Small</div>
                            <Slider size="sm" defaultValue={35} showValue showMinMax marks={25} fullWidth />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>Medium (Default)</div>
                            <Slider size="md" defaultValue={50} showValue showMinMax marks={25} fullWidth />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>Large</div>
                            <Slider size="lg" defaultValue={65} showValue showMinMax marks={25} fullWidth />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>Extra Large</div>
                            <Slider size="xl" defaultValue={80} showValue showMinMax marks={25} fullWidth />
                        </div>
                    </div>
                </section>

                <section>
                    <h3 style={{
                        margin: '0 0 var(--spacing-4) 0',
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: 'var(--font-weight-semibold)',
                    }}>
                        Label Options
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', maxWidth: '500px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>No Labels</div>
                            <Slider defaultValue={40} fullWidth />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>With Value</div>
                            <Slider defaultValue={50} showValue fullWidth />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>With Min/Max</div>
                            <Slider defaultValue={60} showMinMax fullWidth />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>All Labels</div>
                            <Slider defaultValue={70} showValue showMinMax fullWidth />
                        </div>
                    </div>
                </section>

                <section>
                    <h3 style={{
                        margin: '0 0 var(--spacing-4) 0',
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: 'var(--font-weight-semibold)',
                    }}>
                        States
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', maxWidth: '500px' }}>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>Default</div>
                            <Slider defaultValue={50} showValue fullWidth />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>With Marks</div>
                            <Slider defaultValue={50} showValue marks={10} step={5} fullWidth />
                        </div>
                        <div>
                            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>Disabled</div>
                            <Slider defaultValue={50} showValue disabled fullWidth />
                        </div>
                    </div>
                </section>

                <section>
                    <h3 style={{
                        margin: '0 0 var(--spacing-4) 0',
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: 'var(--font-weight-semibold)',
                    }}>
                        Real-world Examples
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-6)' }}>
                        <div style={{
                            padding: 'var(--spacing-4)',
                            backgroundColor: 'var(--color-secondary)',
                            borderRadius: 'var(--radius-lg)',
                        }}>
                            <h4 style={{
                                margin: '0 0 var(--spacing-3) 0',
                                fontSize: 'var(--font-size-md)',
                                fontWeight: 'var(--font-weight-semibold)',
                            }}>
                                Volume Control
                            </h4>
                            <Slider
                                value={volume}
                                onChange={setVolume}
                                showValue
                                formatValue={(v) => `${v}%`}
                                fullWidth
                            />
                        </div>

                        <div style={{
                            padding: 'var(--spacing-4)',
                            backgroundColor: 'var(--color-secondary)',
                            borderRadius: 'var(--radius-lg)',
                        }}>
                            <h4 style={{
                                margin: '0 0 var(--spacing-3) 0',
                                fontSize: 'var(--font-size-md)',
                                fontWeight: 'var(--font-weight-semibold)',
                            }}>
                                Brightness
                            </h4>
                            <Slider
                                value={brightness}
                                onChange={setBrightness}
                                showValue
                                formatValue={(v) => `${v}%`}
                                fullWidth
                            />
                        </div>

                        <div style={{
                            padding: 'var(--spacing-4)',
                            backgroundColor: 'var(--color-secondary)',
                            borderRadius: 'var(--radius-lg)',
                        }}>
                            <h4 style={{
                                margin: '0 0 var(--spacing-3) 0',
                                fontSize: 'var(--font-size-md)',
                                fontWeight: 'var(--font-weight-semibold)',
                            }}>
                                Temperature
                            </h4>
                            <Slider
                                min={-10}
                                max={40}
                                defaultValue={22}
                                showValue
                                showMinMax
                                formatValue={(v) => `${v}°C`}
                                fullWidth
                            />
                        </div>
                    </div>
                </section>
            </div>
        );
    },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'A comprehensive showcase displaying all slider sizes, label options, states, and real-world usage examples in one view.',
            },
        },
    },
};
