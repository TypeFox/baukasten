'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase, Variant, VariantGrid, PropDefinition } from '@/components/ComponentShowcase';
import { Icon, Button } from 'baukasten-ui';

const iconProps: PropDefinition[] = [
	{
		name: 'name',
		type: 'CodiconName',
		required: true,
		description: 'The codicon name (without the "codicon-" prefix). See https://microsoft.github.io/vscode-codicons for all available icons.',
	},
	{
		name: 'size',
		type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"',
		description: 'Optional size override. When not provided, icons inherit font-size from their parent component.',
	},
	{
		name: 'color',
		type: 'string',
		description: 'Optional color override (CSS color value). When not provided, icons inherit color from their parent component.',
	},
	{
		name: 'spin',
		type: 'boolean',
		default: 'false',
		description: 'Whether the icon should rotate/spin. Useful for loading indicators.',
	},
	{
		name: 'rotate',
		type: 'number',
		description: 'Rotation angle in degrees.',
	},
];

export default function IconPage() {
	return (
		<PageLayout
			title="Icon"
			description="A flexible icon component that uses VSCode's Codicon font library with 600+ icons. Icons automatically inherit size and color from their parent components."
		>
			<Showcase
				title="Basic Usage"
				description="Icons automatically inherit font-size and color from their parent. No size prop needed!"
				preview={
					<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-gap-lg)' }}>
						<div style={{ fontSize: '16px', color: 'var(--bk-color-primary)' }}>
							<Icon name="check" />
						</div>
						<div style={{ fontSize: '20px', color: 'var(--bk-color-success)' }}>
							<Icon name="check" />
						</div>
						<div style={{ fontSize: '24px', color: 'var(--bk-color-warning)' }}>
							<Icon name="check" />
						</div>
					</div>
				}
				code={`import { Icon } from 'baukasten-ui';

function App() {
  return (
    <div style={{ fontSize: '20px', color: 'var(--bk-color-primary)' }}>
      <Icon name="check" />
    </div>
  );
}`}
			/>

			<Showcase
				title="Explicit Sizes"
				description="Use the size prop for precise control regardless of parent size."
				preview={
					<VariantGrid>
						<Variant label="xs (10px)">
							<Icon name="check" size="xs" />
						</Variant>
						<Variant label="sm (12px)">
							<Icon name="check" size="sm" />
						</Variant>
						<Variant label="md (16px)">
							<Icon name="check" size="md" />
						</Variant>
						<Variant label="lg (20px)">
							<Icon name="check" size="lg" />
						</Variant>
						<Variant label="xl (24px)">
							<Icon name="check" size="xl" />
						</Variant>
						<Variant label="2xl (28px)">
							<Icon name="check" size="2xl" />
						</Variant>
						<Variant label="3xl (32px)">
							<Icon name="check" size="3xl" />
						</Variant>
					</VariantGrid>
				}
				code={`<Icon name="check" size="xs" />
<Icon name="check" size="sm" />
<Icon name="check" size="md" />
<Icon name="check" size="lg" />
<Icon name="check" size="xl" />
<Icon name="check" size="2xl" />
<Icon name="check" size="3xl" />`}
			/>

			<Showcase
				title="Semantic Colors"
				description="Use design system color tokens for consistent theming."
				preview={
					<VariantGrid>
						<Variant label="Info">
							<Icon name="info" color="var(--bk-color-info)" size="lg" />
						</Variant>
						<Variant label="Success">
							<Icon name="check" color="var(--bk-color-success)" size="lg" />
						</Variant>
						<Variant label="Warning">
							<Icon name="warning" color="var(--bk-color-warning)" size="lg" />
						</Variant>
						<Variant label="Danger">
							<Icon name="error" color="var(--bk-color-danger)" size="lg" />
						</Variant>
						<Variant label="Primary">
							<Icon name="star" color="var(--bk-color-primary)" size="lg" />
						</Variant>
					</VariantGrid>
				}
				code={`<Icon name="info" color="var(--bk-color-info)" size="lg" />
<Icon name="check" color="var(--bk-color-success)" size="lg" />
<Icon name="warning" color="var(--bk-color-warning)" size="lg" />
<Icon name="error" color="var(--bk-color-danger)" size="lg" />
<Icon name="star" color="var(--bk-color-primary)" size="lg" />`}
			/>

			<Showcase
				title="Common Icons"
				description="Frequently used icons throughout VSCode interfaces."
				preview={
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 'var(--bk-spacing-3)', width: '100%' }}>
						{[
							'check', 'close', 'search', 'chevron-right', 'chevron-down',
							'add', 'remove', 'edit', 'trash', 'save',
							'file', 'folder', 'settings', 'gear', 'home'
						].map((name) => (
							<div
								key={name}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 'var(--bk-gap-xs)',
									padding: 'var(--bk-spacing-2)',
								}}
							>
								<Icon name={name as any} size="lg" />
								<span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-secondary-foreground)', textAlign: 'center' }}>
									{name}
								</span>
							</div>
						))}
					</div>
				}
				code={`<Icon name="check" />
<Icon name="close" />
<Icon name="search" />
<Icon name="chevron-right" />
<Icon name="add" />
<Icon name="edit" />
<Icon name="trash" />
<Icon name="save" />
// ... and many more!`}
			/>

			<Showcase
				title="Rotation"
				description="Rotate icons to any angle using the rotate prop."
				preview={
					<VariantGrid>
						<Variant label="0°">
							<Icon name="arrow-right" size="lg" rotate={0} />
						</Variant>
						<Variant label="45°">
							<Icon name="arrow-right" size="lg" rotate={45} />
						</Variant>
						<Variant label="90°">
							<Icon name="arrow-right" size="lg" rotate={90} />
						</Variant>
						<Variant label="180°">
							<Icon name="arrow-right" size="lg" rotate={180} />
						</Variant>
					</VariantGrid>
				}
				code={`<Icon name="arrow-right" size="lg" rotate={0} />
<Icon name="arrow-right" size="lg" rotate={45} />
<Icon name="arrow-right" size="lg" rotate={90} />
<Icon name="arrow-right" size="lg" rotate={180} />`}
			/>

			<Showcase
				title="Spin Animation"
				description="Use the spin prop for loading indicators and animated icons."
				preview={
					<VariantGrid>
						<Variant label="loading">
							<Icon name="loading" size="lg" spin />
						</Variant>
						<Variant label="sync">
							<Icon name="sync" size="lg" spin />
						</Variant>
						<Variant label="gear">
							<Icon name="gear" size="lg" spin />
						</Variant>
					</VariantGrid>
				}
				code={`<Icon name="loading" size="lg" spin />
<Icon name="sync" size="lg" spin />
<Icon name="gear" size="lg" spin />`}
			/>

			<Showcase
				title="With Buttons"
				description="Icons automatically scale with button size without any size prop."
				preview={
					<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)', width: '100%' }}>
						<div style={{ display: 'flex', gap: 'var(--bk-gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
							<Button size="xs">
								<Icon name="save" />
								XS Button
							</Button>
							<Button size="sm">
								<Icon name="save" />
								SM Button
							</Button>
							<Button size="md">
								<Icon name="save" />
								MD Button
							</Button>
							<Button size="lg">
								<Icon name="save" />
								LG Button
							</Button>
							<Button size="xl">
								<Icon name="save" />
								XL Button
							</Button>
						</div>
						<div style={{ display: 'flex', gap: 'var(--bk-gap-md)', flexWrap: 'wrap', alignItems: 'center' }}>
							<Button size="sm" circular>
								<Icon name="add" />
							</Button>
							<Button size="md" circular>
								<Icon name="add" />
							</Button>
							<Button size="lg" circular>
								<Icon name="add" />
							</Button>
						</div>
					</div>
				}
				code={`// Icons inherit button size automatically
<Button size="md">
  <Icon name="save" />
  Save
</Button>

// Icon-only circular buttons
<Button size="md" circular>
  <Icon name="add" />
</Button>`}
			/>

			<Showcase
				title="File & Folder Icons"
				description="Commonly used icons for file explorers and document interfaces."
				preview={
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 'var(--bk-spacing-3)', width: '100%' }}>
						{[
							'file', 'file-code', 'file-text', 'folder', 'folder-opened',
							'new-file', 'new-folder', 'root-folder'
						].map((name) => (
							<div
								key={name}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 'var(--bk-gap-xs)',
									padding: 'var(--bk-spacing-2)',
								}}
							>
								<Icon name={name as any} size="lg" />
								<span style={{ fontSize: 'var(--bk-font-size-xs)', color: 'var(--bk-color-secondary-foreground)', textAlign: 'center' }}>
									{name}
								</span>
							</div>
						))}
					</div>
				}
				code={`<Icon name="file" />
<Icon name="file-code" />
<Icon name="folder" />
<Icon name="folder-opened" />
<Icon name="new-file" />
<Icon name="new-folder" />`}
			/>

			<Showcase
				title="Status Icons"
				description="Icons for status indicators, alerts, and notifications."
				preview={
					<VariantGrid>
						<Variant label="check">
							<Icon name="check" color="var(--bk-color-success)" size="lg" />
						</Variant>
						<Variant label="error">
							<Icon name="error" color="var(--bk-color-danger)" size="lg" />
						</Variant>
						<Variant label="warning">
							<Icon name="warning" color="var(--bk-color-warning)" size="lg" />
						</Variant>
						<Variant label="info">
							<Icon name="info" color="var(--bk-color-info)" size="lg" />
						</Variant>
						<Variant label="bell">
							<Icon name="bell" size="lg" />
						</Variant>
						<Variant label="bell-dot">
							<Icon name="bell-dot" size="lg" />
						</Variant>
					</VariantGrid>
				}
				code={`<Icon name="check" color="var(--bk-color-success)" />
<Icon name="error" color="var(--bk-color-danger)" />
<Icon name="warning" color="var(--bk-color-warning)" />
<Icon name="info" color="var(--bk-color-info)" />
<Icon name="bell" />
<Icon name="bell-dot" />`}
				props={iconProps}
			/>
		</PageLayout>
	);
}
