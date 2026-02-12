import * as fs from 'fs';
import * as path from 'path';

interface SearchDocument {
    id: string;
    title: string;
    description: string;
    content: string;
    path: string;
    category: string;
    keywords: string[];
}

// Helper to extract text content from JSX strings (simplified parsing)
function extractTextFromJSX(content: string): string {
    // Remove imports and type definitions
    content = content.replace(/^import\s+.*$/gm, '');
    content = content.replace(/^export\s+.*$/gm, '');

    // Extract string literals from JSX
    const strings: string[] = [];

    // Match string content in JSX attributes and text nodes
    const patterns = [
        // JSX text content like <Heading>Text Here</Heading>
        />([^<>]+)</g,
        // String literals like "text" or 'text'
        /"([^"\\]*)"/g,
        /'([^'\\]*)'/g,
        // Template literals content
        /`([^`\\]*)`/g,
    ];

    patterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const text = match[1]?.trim();
            if (text && text.length > 2 && !text.includes('{') && !text.includes('=>')) {
                strings.push(text);
            }
        }
    });

    // Also look for title and description props
    const titleMatch = content.match(/title[=:]\s*["'`]([^"'`]+)["'`]/);
    const descMatch = content.match(/description[=:]\s*["'`]([^"'`]+)["'`]/);

    if (titleMatch) strings.push(titleMatch[1]);
    if (descMatch) strings.push(descMatch[1]);

    // Extract prop descriptions
    const propDescMatches = content.matchAll(/description:\s*['"`]([^'"`]+)['"`]/g);
    for (const match of propDescMatches) {
        strings.push(match[1]);
    }

    return [...new Set(strings)].join(' ');
}

// Get category from path
function getCategoryFromPath(filePath: string): string {
    if (filePath.includes('/components/')) return 'Components';
    if (filePath.includes('/foundations/')) return 'Foundations';
    if (filePath.includes('/guides/')) return 'Guides';
    if (filePath.includes('/recipes/')) return 'Recipes';
    if (filePath.includes('/installation')) return 'Getting Started';
    if (filePath.includes('/quickstart')) return 'Getting Started';
    return 'Getting Started';
}

// Get title from path
function getTitleFromPath(filePath: string): string {
    const lastSegment = path.basename(path.dirname(filePath)); // page.tsx's parent folder

    if (lastSegment === 'app') return 'Introduction';

    // Capitalize and handle special cases
    const titleMap: Record<string, string> = {
        'accordion': 'Accordion',
        'alert': 'Alert',
        'avatar': 'Avatar',
        'badge': 'Badge',
        'breadcrumbs': 'Breadcrumbs',
        'button': 'Button',
        'buttongroup': 'ButtonGroup',
        'checkbox': 'Checkbox',
        'contextmenu': 'ContextMenu',
        'datatable': 'DataTable',
        'divider': 'Divider',
        'drawer': 'Drawer',
        'dropdown': 'Dropdown',
        'fileupload': 'FileUpload',
        'forms': 'Forms',
        'hero': 'Hero',
        'icon': 'Icon',
        'input': 'Input',
        'label': 'Label',
        'menu': 'Menu',
        'modal': 'Modal',
        'pagination': 'Pagination',
        'progressbar': 'ProgressBar',
        'radio': 'Radio',
        'select': 'Select',
        'slider': 'Slider',
        'spinner': 'Spinner',
        'splitpane': 'SplitPane',
        'statusbar': 'StatusBar',
        'table': 'Table',
        'tabs': 'Tabs',
        'textarea': 'TextArea',
        'tooltip': 'Tooltip',
        'typography': 'Typography',
        'colors': 'Colors',
        'spacing': 'Spacing',
        'effects': 'Effects',
        'theming': 'Theming',
        'vscode': 'Usage in VS Code',
        'theia': 'Usage in Eclipse Theia',
        'login': 'Login Pages',
        'dashboard': 'Dashboard Layouts',
        'installation': 'Installation',
        'quickstart': 'Quick Start',
    };

    return titleMap[lastSegment] || lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
}

// Get URL path from file path
function getUrlPath(filePath: string): string {
    // Remove 'src/app' prefix and 'page.tsx' suffix
    let urlPath = filePath
        .replace(/^.*src\/app/, '')
        .replace(/\/page\.tsx$/, '');

    if (!urlPath || urlPath === '') return '/';
    return urlPath;
}

// Extract keywords from content
function extractKeywords(content: string, category: string): string[] {
    const keywords: string[] = [];

    // Common keywords by category
    const categoryKeywords: Record<string, string[]> = {
        'Components': ['react', 'component', 'ui', 'widget'],
        'Foundations': ['design', 'tokens', 'system'],
        'Guides': ['guide', 'tutorial', 'howto'],
        'Recipes': ['example', 'template', 'pattern'],
        'Getting Started': ['install', 'setup', 'start', 'begin'],
    };

    keywords.push(...(categoryKeywords[category] || []));

    // Extract prop names as keywords
    const propMatches = content.matchAll(/name:\s*['"`](\w+)['"`]/g);
    for (const match of propMatches) {
        keywords.push(match[1].toLowerCase());
    }

    // Extract common terms
    const commonTerms = ['button', 'input', 'modal', 'form', 'table', 'list', 'menu', 'dialog', 'alert', 'notification', 'badge', 'icon', 'text', 'heading', 'paragraph'];
    for (const term of commonTerms) {
        if (content.toLowerCase().includes(term)) {
            keywords.push(term);
        }
    }

    return [...new Set(keywords)];
}

// Main function to build the search index
async function buildSearchIndex() {
    const appDir = path.join(__dirname, '../src/app');
    const documents: SearchDocument[] = [];

    // Recursively find all page.tsx files
    function findPages(dir: string): string[] {
        const files: string[] = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                files.push(...findPages(fullPath));
            } else if (entry.name === 'page.tsx') {
                files.push(fullPath);
            }
        }

        return files;
    }

    const pageFiles = findPages(appDir);

    for (const filePath of pageFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const urlPath = getUrlPath(filePath);
        const category = getCategoryFromPath(filePath);
        const title = getTitleFromPath(filePath);

        // Try to extract description from PageLayout component specifically
        // Look for <PageLayout ... description="..." pattern to avoid matching prop descriptions
        const pageLayoutDescMatch = content.match(/<PageLayout[^>]*\s+description\s*=\s*["'`]([^"'`]+)["'`]/);
        const description = pageLayoutDescMatch ? pageLayoutDescMatch[1] : '';

        // Extract text content
        const textContent = extractTextFromJSX(content);

        // Extract keywords
        const keywords = extractKeywords(content, category);

        const doc: SearchDocument = {
            id: urlPath || 'home',
            title,
            description,
            content: textContent,
            path: urlPath || '/',
            category,
            keywords,
        };

        documents.push(doc);
    }

    // Write the index to a JSON file
    const outputPath = path.join(__dirname, '../public/search-index.json');

    // Ensure public directory exists
    const publicDir = path.dirname(outputPath);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(documents, null, 2));

    console.log(`Search index built with ${documents.length} documents`);
    console.log(`Output: ${outputPath}`);
}

buildSearchIndex().catch(console.error);
