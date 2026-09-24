import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-vscode.css';
import './monaco-theme-bridge.css';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Missing #root container');
}

createRoot(container).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
