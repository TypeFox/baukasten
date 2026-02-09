'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, Icon, Text } from 'baukasten-ui';

interface SearchDocument {
    id: string;
    title: string;
    description: string;
    content: string;
    path: string;
    category: string;
    keywords: string[];
}

interface SearchResult extends SearchDocument {
    score?: number;
}

interface SearchModalProps {
    open: boolean;
    onClose: () => void;
}

// Simple search function using native string matching
function searchDocuments(documents: SearchDocument[], query: string): SearchDocument[] {
    if (!query.trim()) return documents;

    const lowerQuery = query.toLowerCase();
    const terms = lowerQuery.split(/\s+/).filter(t => t.length > 0);

    // Score each document
    const scored = documents.map(doc => {
        let score = 0;
        const titleLower = doc.title.toLowerCase();
        const descLower = (doc.description || '').toLowerCase();
        const contentLower = (doc.content || '').toLowerCase();
        const keywordsLower = doc.keywords.join(' ').toLowerCase();
        const categoryLower = doc.category.toLowerCase();

        for (const term of terms) {
            // Title matches (highest weight)
            if (titleLower.includes(term)) score += 100;
            if (titleLower.startsWith(term)) score += 50;
            if (titleLower === term) score += 200;

            // Category matches
            if (categoryLower.includes(term)) score += 30;

            // Description matches
            if (descLower.includes(term)) score += 20;

            // Keywords matches
            if (keywordsLower.includes(term)) score += 15;

            // Content matches (lowest weight but still relevant)
            if (contentLower.includes(term)) score += 5;
        }

        return { doc, score };
    });

    // Filter and sort by score
    return scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.doc);
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [allDocuments, setAllDocuments] = useState<SearchDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Load search index on mount
    useEffect(() => {
        async function loadIndex() {
            try {
                // Try multiple paths to find the search index
                const paths = [
                    '/search-index.json',
                    '/baukasten/search-index.json',
                    `${window.location.pathname.replace(/\/[^/]*$/, '')}/search-index.json`,
                ];

                let documents: SearchDocument[] | null = null;

                for (const path of paths) {
                    try {
                        const response = await fetch(path);
                        if (response.ok) {
                            documents = await response.json();
                            break;
                        }
                    } catch {
                        // Try next path
                    }
                }

                if (!documents) {
                    throw new Error('Could not load search index from any path');
                }

                setAllDocuments(documents);
                setResults(documents); // Show all documents initially
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load search index:', error);
                setIsLoading(false);
            }
        }

        loadIndex();
    }, []);

    // Search when query changes
    useEffect(() => {
        const searchResults = searchDocuments(allDocuments, query);
        setResults(searchResults);
    }, [query, allDocuments]);

    // Group results by category
    const groupedResults = useMemo(() => {
        const groups: Record<string, SearchResult[]> = {};
        results.forEach(item => {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push(item);
        });
        return groups;
    }, [results]);

    // Reset selection when results change
    useEffect(() => {
        setSelectedIndex(0);
    }, [results]);

    // Focus input when modal opens
    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        if (!open) {
            setQuery('');
            setSelectedIndex(0);
        }
    }, [open]);

    // Scroll selected item into view
    useEffect(() => {
        if (resultsContainerRef.current) {
            const selectedElement = resultsContainerRef.current.querySelector(
                `[data-result-index="${selectedIndex}"]`
            ) as HTMLElement;
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth',
                });
            }
        }
    }, [selectedIndex]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (results[selectedIndex]) {
                    navigateTo(results[selectedIndex].path);
                }
                break;
            case 'Escape':
                onClose();
                break;
        }
    }, [results, selectedIndex, onClose]);

    const navigateTo = (path: string) => {
        router.push(path);
        onClose();
    };

    // Get flat index for an item
    const getFlatIndex = useCallback((item: SearchResult) => {
        return results.indexOf(item);
    }, [results]);

    // Highlight matching text
    const highlightMatch = useCallback((text: string, searchQuery: string) => {
        if (!searchQuery.trim() || !text) return text;

        const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === searchQuery.toLowerCase()
                ? <mark key={i} style={{
                    backgroundColor: 'var(--vscode-editor-findMatchHighlightBackground)',
                    color: 'inherit',
                    borderRadius: '2px',
                    padding: '0 2px',
                }}>{part}</mark>
                : part
        );
    }, []);

    return (
        <Modal open={open} onClose={onClose} size="md">
            <div style={{ padding: 0 }}>
                {/* Search Header */}
                <div style={{
                    padding: 'var(--bk-spacing-4)',
                    borderBottom: '1px solid var(--vscode-panel-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--bk-spacing-3)',
                }}>
                    <Icon name="search" style={{
                        color: 'var(--vscode-descriptionForeground)',
                        fontSize: '18px',
                        flexShrink: 0,
                    }} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search documentation..."
                        style={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            color: 'var(--vscode-input-foreground)',
                            fontSize: 'var(--vscode-font-size)',
                            fontFamily: 'var(--vscode-font-family)',
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        gap: 'var(--bk-spacing-1)',
                        flexShrink: 0,
                    }}>
                        <kbd style={{
                            padding: '2px 6px',
                            borderRadius: 'var(--bk-radius-sm)',
                            backgroundColor: 'var(--vscode-badge-background)',
                            color: 'var(--vscode-badge-foreground)',
                            fontSize: 'calc(var(--vscode-font-size) * 0.85)',
                            fontFamily: 'var(--vscode-font-family)',
                        }}>ESC</kbd>
                    </div>
                </div>

                {/* Search Results */}
                <div
                    ref={resultsContainerRef}
                    style={{
                        maxHeight: '400px',
                        overflowY: 'auto',
                    }}
                >
                    {isLoading ? (
                        <div style={{
                            padding: 'var(--bk-spacing-8)',
                            textAlign: 'center',
                            color: 'var(--vscode-descriptionForeground)',
                        }}>
                            <Icon name="loading" style={{ fontSize: '24px', marginBottom: 'var(--bk-spacing-3)' }} />
                            <Text style={{ display: 'block' }}>Loading search index...</Text>
                        </div>
                    ) : results.length === 0 ? (
                        <div style={{
                            padding: 'var(--bk-spacing-8)',
                            textAlign: 'center',
                            color: 'var(--vscode-descriptionForeground)',
                        }}>
                            <Icon name="search" style={{ fontSize: '32px', marginBottom: 'var(--bk-spacing-3)', opacity: 0.5 }} />
                            <Text style={{ display: 'block' }}>No results found for "{query}"</Text>
                            <Text style={{ display: 'block', fontSize: 'calc(var(--vscode-font-size) * 0.9)', marginTop: 'var(--bk-spacing-2)' }}>
                                Try different keywords or browse the navigation
                            </Text>
                        </div>
                    ) : (
                        Object.entries(groupedResults).map(([category, items]) => (
                            <div key={category}>
                                <Text style={{
                                    display: 'block',
                                    padding: 'var(--bk-spacing-3) var(--bk-spacing-4)',
                                    fontSize: 'calc(var(--vscode-font-size) * 0.85)',
                                    fontWeight: 600,
                                    color: 'var(--vscode-descriptionForeground)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    backgroundColor: 'var(--vscode-sideBar-background)',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}>
                                    {category}
                                </Text>
                                {items.map((item) => {
                                    const index = getFlatIndex(item);
                                    const isSelected = index === selectedIndex;
                                    return (
                                        <div
                                            key={item.path}
                                            data-result-index={index}
                                            onClick={() => navigateTo(item.path)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            style={{
                                                padding: 'var(--bk-spacing-3) var(--bk-spacing-4)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 'var(--bk-spacing-1)',
                                                backgroundColor: isSelected ? 'var(--vscode-list-activeSelectionBackground)' : 'transparent',
                                                color: isSelected ? 'var(--vscode-list-activeSelectionForeground)' : 'var(--vscode-foreground)',
                                                transition: 'background-color 0.1s ease',
                                            }}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--bk-spacing-3)',
                                            }}>
                                                <Icon name="symbol-class" style={{
                                                    color: isSelected ? 'var(--vscode-list-activeSelectionForeground)' : 'var(--vscode-descriptionForeground)',
                                                    fontSize: '16px',
                                                    flexShrink: 0,
                                                }} />
                                                <span style={{ flex: 1, fontWeight: 500 }}>
                                                    {highlightMatch(item.title, query)}
                                                </span>
                                                {isSelected && (
                                                    <Icon name="arrow-right" style={{ fontSize: '14px', opacity: 0.7, flexShrink: 0 }} />
                                                )}
                                            </div>
                                            {item.description && (
                                                <Text style={{
                                                    fontSize: 'calc(var(--vscode-font-size) * 0.9)',
                                                    color: isSelected ? 'var(--vscode-list-activeSelectionForeground)' : 'var(--vscode-descriptionForeground)',
                                                    opacity: isSelected ? 0.9 : 1,
                                                    marginLeft: 'calc(16px + var(--bk-spacing-3))',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {highlightMatch(item.description, query)}
                                                </Text>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>

                {/* Footer with keyboard hints */}
                <div style={{
                    padding: 'var(--bk-spacing-3) var(--bk-spacing-4)',
                    borderTop: '1px solid var(--vscode-panel-border)',
                    backgroundColor: 'var(--vscode-sideBar-background)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 'calc(var(--vscode-font-size) * 0.85)',
                    color: 'var(--vscode-descriptionForeground)',
                }}>
                    <div style={{ display: 'flex', gap: 'var(--bk-spacing-4)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                            <kbd style={{
                                padding: '2px 6px',
                                borderRadius: 'var(--bk-radius-sm)',
                                backgroundColor: 'var(--vscode-badge-background)',
                                color: 'var(--vscode-badge-foreground)',
                            }}>↑</kbd>
                            <kbd style={{
                                padding: '2px 6px',
                                borderRadius: 'var(--bk-radius-sm)',
                                backgroundColor: 'var(--vscode-badge-background)',
                                color: 'var(--vscode-badge-foreground)',
                            }}>↓</kbd>
                            navigate
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--bk-spacing-2)' }}>
                            <kbd style={{
                                padding: '2px 6px',
                                borderRadius: 'var(--bk-radius-sm)',
                                backgroundColor: 'var(--vscode-badge-background)',
                                color: 'var(--vscode-badge-foreground)',
                            }}>↵</kbd>
                            select
                        </span>
                    </div>
                    {!isLoading && (
                        <Text style={{ opacity: 0.7 }}>
                            {results.length} result{results.length !== 1 ? 's' : ''}
                        </Text>
                    )}
                </div>
            </div>
        </Modal>
    );
}
