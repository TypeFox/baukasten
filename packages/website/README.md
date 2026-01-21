# @baukasten/website

Documentation website for the Baukasten UI component library.

## Features

- Built with Next.js 15 and React 19
- Server-side rendering with styled-components
- Component showcase with live previews
- Interactive props documentation
- Variant and size demonstrations
- VSCode theme integration

## Development

Start the development server:

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

## Building

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme setup
│   ├── page.tsx           # Home page
│   ├── installation/      # Installation guide
│   ├── components/        # Component documentation pages
│   └── foundations/       # Design system documentation
├── components/            # Shared components
│   ├── Navigation.tsx     # Sidebar navigation
│   ├── PageLayout.tsx     # Page wrapper with header
│   ├── ComponentShowcase.tsx  # Component demo utilities
│   └── StyledComponentsRegistry.tsx  # SSR setup
└── public/               # Static assets
```

## Adding New Component Pages

To document a new component:

1. Create a new directory under `src/app/components/[component-name]/`
2. Add a `page.tsx` file using the `Showcase` component
3. Define the component's props using `PropDefinition[]`
4. Create multiple showcases for variants, sizes, and usage examples
5. Update the navigation in `src/components/Navigation.tsx`

Example structure:

```tsx
import PageLayout from '@/components/PageLayout';
import { Showcase, Variant, VariantGrid } from '@/components/ComponentShowcase';
import { YourComponent } from '@baukasten/ui';

const props = [
  {
    name: 'variant',
    type: 'string',
    default: 'primary',
    description: 'The visual style variant',
  },
  // ... more props
];

export default function YourComponentPage() {
  return (
    <PageLayout title="Your Component" description="Component description">
      <Showcase
        title="Basic Usage"
        preview={<YourComponent />}
        code="<YourComponent />"
        props={props}
      />
    </PageLayout>
  );
}
```

## Showcase Components

The website provides reusable components for documenting UI components:

- `Showcase` - Main container with preview/code tabs and props table
- `VariantGrid` - Grid layout for displaying component variants
- `Variant` - Individual variant card with label

## Running from Root

From the monorepo root:

```bash
# Development
npm run website

# Build
npm run website:build

# Production
npm run website:start
```
