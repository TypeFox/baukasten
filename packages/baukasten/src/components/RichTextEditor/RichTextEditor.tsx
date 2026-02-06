import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as floatingSize,
  FloatingPortal,
} from '@floating-ui/react';
import clsx from 'clsx';
import { type Size } from '../../styles';
import { usePortalRoot } from '../../context';
import * as styles from './RichTextEditor.css';

// Floating UI numeric values (required by Floating UI API)
const OFFSET_SPACING = 4; // var(--bk-spacing-1)
const PADDING_SPACING = 8; // var(--bk-spacing-2)

/**
 * A suggestion item for a trigger
 */
export interface RichTextSuggestion<T = unknown> {
  /** Display text — also inserted into the editor as the mention label */
  label: string;
  /** Arbitrary payload attached to this suggestion */
  data?: T;
  /** Whether this suggestion is disabled */
  disabled?: boolean;
}

/**
 * A trigger definition — a character that opens a suggestion dropdown
 */
export interface RichTextTrigger<T = unknown> {
  /** Trigger character (e.g. "@", "#", "/") */
  trigger: string;
  /** Available suggestions for this trigger */
  suggestions: RichTextSuggestion<T>[];
  /** Custom render function for suggestions */
  renderSuggestion?: (suggestion: RichTextSuggestion<T>, isHighlighted: boolean) => React.ReactNode;
}

/**
 * A decorator definition — applies visual styling to matched text ranges
 */
export interface RichTextDecorator {
  /** Match pattern: a RegExp (must have global flag) or a function returning ranges */
  match: RegExp | ((text: string) => { start: number; end: number }[]);
  /** CSS class to apply to matched ranges */
  className?: string;
  /** Inline styles to apply to matched ranges */
  style?: React.CSSProperties;
}

/**
 * A segment of the editor content — emitted via onChange
 */
export interface RichTextSegment<T = unknown> {
  /** Segment type */
  type: 'text' | 'mention';
  /** The visible text value */
  value: string;
  /** Which trigger character produced this mention */
  trigger?: string;
  /** Payload from the selected suggestion */
  data?: T;
}

export interface RichTextEditorProps {
  /** Controlled text value */
  value?: string;
  /** Default text value (uncontrolled) */
  defaultValue?: string;
  /** Called on every content change with plain text and structured segments */
  onChange?: (text: string, segments: RichTextSegment[]) => void;

  /** Trigger definitions for autocomplete suggestions */
  triggers?: RichTextTrigger[];
  /** Decorator definitions for visual text highlighting */
  decorators?: RichTextDecorator[];

  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Minimum visible rows (maps to min-height) */
  rows?: number;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Whether the editor is read-only */
  readOnly?: boolean;

  /** Size variant */
  size?: Size;
  /** Whether the editor should take full width */
  fullWidth?: boolean;
  /** Error state or message */
  error?: string | boolean;
  /** Additional CSS class */
  className?: string;

  /** Focus event handler */
  onFocus?: (e: React.FocusEvent) => void;
  /** Blur event handler */
  onBlur?: (e: React.FocusEvent) => void;
  /** KeyDown event handler */
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /** Called on Enter (without Shift) when provided — enables chat-input mode */
  onSubmit?: (text: string, segments: RichTextSegment[]) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Serialize contenteditable DOM into segments */
function serializeContent(container: HTMLElement): RichTextSegment[] {
  const segments: RichTextSegment[] = [];

  function walk(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      if (text) {
        segments.push({ type: 'text', value: text });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;

      // Mention chip
      if (el.dataset.mention === 'true') {
        let data: unknown;
        try {
          data = el.dataset.payload ? JSON.parse(el.dataset.payload) : undefined;
        } catch {
          data = undefined;
        }
        segments.push({
          type: 'mention',
          value: el.textContent || '',
          trigger: el.dataset.trigger,
          data,
        });
        return; // don't recurse into mention chips
      }

      // Line break elements -> newline
      if (el.tagName === 'BR') {
        segments.push({ type: 'text', value: '\n' });
        return;
      }

      // Block-level elements (div, p) start a new line unless it's the first child
      if ((el.tagName === 'DIV' || el.tagName === 'P') && el.previousSibling) {
        segments.push({ type: 'text', value: '\n' });
      }

      // Recurse into children (decorator spans, inline elements, etc.)
      for (const child of Array.from(el.childNodes)) {
        walk(child);
      }
    }
  }

  for (const child of Array.from(container.childNodes)) {
    walk(child);
  }

  return segments;
}

/** Get the plain text from segments */
function segmentsToText(segments: RichTextSegment[]): string {
  return segments.map((s) => s.value).join('');
}

/** Get caret pixel position relative to the viewport */
function getCaretRect(): DOMRect | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0).cloneRange();
  range.collapse(true);

  // If the range is collapsed inside a text node, use getClientRects
  const rects = range.getClientRects();
  if (rects.length > 0) {
    return rects[0];
  }

  // Fallback: insert a temporary span to measure position
  const span = document.createElement('span');
  span.textContent = '\u200b'; // zero-width space
  range.insertNode(span);
  const rect = span.getBoundingClientRect();
  span.parentNode?.removeChild(span);
  // Restore selection
  sel.removeAllRanges();
  sel.addRange(range);
  return rect;
}

/**
 * Find the active trigger context given the current caret position.
 * Returns the trigger config and the query string after the trigger character,
 * or null if no trigger is active.
 */
function findActiveTrigger(
  container: HTMLElement,
  triggers: RichTextTrigger[],
): { trigger: RichTextTrigger; query: string; triggerRange: Range } | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || !sel.isCollapsed) return null;

  const anchorNode = sel.anchorNode;
  const anchorOffset = sel.anchorOffset;

  if (!anchorNode || !container.contains(anchorNode)) return null;

  // We only look for triggers in text nodes
  if (anchorNode.nodeType !== Node.TEXT_NODE) return null;

  const text = anchorNode.textContent || '';
  const textBeforeCaret = text.slice(0, anchorOffset);

  // Look for the last trigger character in the text before caret
  for (const triggerConfig of triggers) {
    const triggerChar = triggerConfig.trigger;
    const lastTriggerIdx = textBeforeCaret.lastIndexOf(triggerChar);

    if (lastTriggerIdx === -1) continue;

    // The trigger must be at the start of the text or preceded by a space/newline
    if (lastTriggerIdx > 0) {
      const charBefore = textBeforeCaret[lastTriggerIdx - 1];
      if (charBefore !== ' ' && charBefore !== '\n' && charBefore !== '\u00a0') continue;
    }

    const query = textBeforeCaret.slice(lastTriggerIdx + triggerChar.length);

    // Don't match if query contains spaces (the mention context is broken)
    if (query.includes(' ')) continue;

    // Create range covering the trigger + query
    const range = document.createRange();
    range.setStart(anchorNode, lastTriggerIdx);
    range.setEnd(anchorNode, anchorOffset);

    return { trigger: triggerConfig, query, triggerRange: range };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  triggers = [],
  placeholder: placeholderText,
  rows = 4,
  disabled = false,
  readOnly = false,
  size = 'md',
  fullWidth = false,
  error,
  className,
  onFocus,
  onBlur,
  onKeyDown,
  onSubmit,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledValue !== undefined;
  const [isEmpty, setIsEmpty] = useState(true);

  // Suggestion dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTrigger, setActiveTrigger] = useState<RichTextTrigger | null>(null);
  const [triggerQuery, setTriggerQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [triggerRangeRef, setTriggerRangeRef] = useState<Range | null>(null);
  const suggestionRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  // Suppress the next input handler (used after inserting a mention)
  const suppressInputRef = useRef(false);

  // Track last known text to avoid unnecessary controlled updates
  const lastTextRef = useRef('');

  const portalRoot = usePortalRoot();

  // Floating UI for suggestions dropdown
  const { refs, floatingStyles, isPositioned } = useFloating({
    open: dropdownOpen,
    onOpenChange: setDropdownOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(OFFSET_SPACING),
      flip({ padding: PADDING_SPACING }),
      shift({ padding: PADDING_SPACING }),
      floatingSize({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: PADDING_SPACING,
      }),
    ],
  });

  // Filter suggestions based on query
  const filteredSuggestions = useMemo(() => {
    if (!activeTrigger) return [];
    const q = triggerQuery.toLowerCase();
    if (!q) return activeTrigger.suggestions;
    return activeTrigger.suggestions.filter((s) =>
      s.label.toLowerCase().includes(q),
    );
  }, [activeTrigger, triggerQuery]);

  // -----------------------------------------------------------------------
  // Serialization & onChange
  // -----------------------------------------------------------------------
  const emitChange = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;

    const segments = serializeContent(el);
    const text = segmentsToText(segments);
    lastTextRef.current = text;

    // Update isEmpty for placeholder
    const textTrimmed = text.replace(/\n/g, '').trim();
    setIsEmpty(textTrimmed.length === 0);

    onChange?.(text, segments);
  }, [onChange]);

  // -----------------------------------------------------------------------
  // Trigger detection
  // -----------------------------------------------------------------------
  const detectTrigger = useCallback(() => {
    if (triggers.length === 0) {
      if (dropdownOpen) setDropdownOpen(false);
      return;
    }

    const el = editorRef.current;
    if (!el) return;

    const result = findActiveTrigger(el, triggers);

    if (result) {
      setActiveTrigger(result.trigger);
      setTriggerQuery(result.query);
      setTriggerRangeRef(result.triggerRange);
      setHighlightedIndex(0);

      // Position floating element at caret
      const caretRect = getCaretRect();
      if (caretRect) {
        refs.setPositionReference({
          getBoundingClientRect() {
            return caretRect;
          },
        });
      }

      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
      setActiveTrigger(null);
      setTriggerQuery('');
      setTriggerRangeRef(null);
    }
  }, [triggers, dropdownOpen, refs]);

  // -----------------------------------------------------------------------
  // Insert mention
  // -----------------------------------------------------------------------
  const insertMention = useCallback(
    (suggestion: RichTextSuggestion) => {
      if (!activeTrigger || !triggerRangeRef || !editorRef.current) return;
      if (suggestion.disabled) return;

      const sel = window.getSelection();
      if (!sel) return;

      // Delete the trigger character + query text
      triggerRangeRef.deleteContents();

      // Create the mention chip
      const chip = document.createElement('span');
      chip.contentEditable = 'false';
      chip.dataset.mention = 'true';
      chip.dataset.trigger = activeTrigger.trigger;
      chip.dataset.value = suggestion.label;
      if (suggestion.data !== undefined) {
        chip.dataset.payload = JSON.stringify(suggestion.data);
      }
      chip.className = styles.mentionChip;
      chip.textContent = `${activeTrigger.trigger}${suggestion.label}`;

      // Insert the chip
      triggerRangeRef.insertNode(chip);

      // Insert a space after the chip so the cursor has somewhere to go
      const space = document.createTextNode('\u00a0');
      chip.after(space);

      // Move cursor after the space
      const newRange = document.createRange();
      newRange.setStartAfter(space);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);

      // Close dropdown
      setDropdownOpen(false);
      setActiveTrigger(null);
      setTriggerQuery('');
      setTriggerRangeRef(null);

      // Suppress input handler for this mutation, then emit change manually
      suppressInputRef.current = true;
      emitChange();
    },
    [activeTrigger, triggerRangeRef, emitChange],
  );

  // -----------------------------------------------------------------------
  // Event handlers
  // -----------------------------------------------------------------------
  const handleInput = useCallback(() => {
    if (suppressInputRef.current) {
      suppressInputRef.current = false;
      return;
    }
    emitChange();
    detectTrigger();
  }, [emitChange, detectTrigger]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Let the consumer handle key events first
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      // Suggestion dropdown navigation
      if (dropdownOpen && filteredSuggestions.length > 0) {
        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault();
            const next = Math.min(highlightedIndex + 1, filteredSuggestions.length - 1);
            setHighlightedIndex(next);
            suggestionRefs.current.get(next)?.scrollIntoView({ block: 'nearest' });
            return;
          }
          case 'ArrowUp': {
            e.preventDefault();
            const prev = Math.max(highlightedIndex - 1, 0);
            setHighlightedIndex(prev);
            suggestionRefs.current.get(prev)?.scrollIntoView({ block: 'nearest' });
            return;
          }
          case 'Enter':
          case 'Tab': {
            e.preventDefault();
            const suggestion = filteredSuggestions[highlightedIndex];
            if (suggestion) {
              insertMention(suggestion);
            }
            return;
          }
          case 'Escape': {
            e.preventDefault();
            setDropdownOpen(false);
            return;
          }
        }
      }

      // onSubmit: Enter without Shift submits (when no dropdown is open)
      if (onSubmit && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const el = editorRef.current;
        if (el) {
          const segments = serializeContent(el);
          const text = segmentsToText(segments);
          onSubmit(text, segments);
        }
        return;
      }
    },
    [onKeyDown, dropdownOpen, filteredSuggestions, highlightedIndex, insertMention, onSubmit],
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    if (text) {
      document.execCommand('insertText', false, text);
    }
  }, []);

  const handleFocus = useCallback(
    (e: React.FocusEvent) => {
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      // Don't close dropdown if focus moved to suggestion list
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      if (relatedTarget && refs.floating.current?.contains(relatedTarget)) {
        return;
      }
      onBlur?.(e);
      // Close dropdown on blur
      setDropdownOpen(false);
    },
    [onBlur, refs],
  );

  // -----------------------------------------------------------------------
  // Controlled value sync
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (!isControlled) return;
    const el = editorRef.current;
    if (!el) return;

    // Only update DOM if value actually changed
    if (controlledValue === lastTextRef.current) return;

    // Simple controlled mode: set text content
    // This loses mention chips — controlled mode with mentions requires
    // the consumer to manage via onChange/onSubmit and reconstruct.
    el.textContent = controlledValue ?? '';
    lastTextRef.current = controlledValue ?? '';
    const textTrimmed = (controlledValue ?? '').trim();
    setIsEmpty(textTrimmed.length === 0);
  }, [controlledValue, isControlled]);

  // Set defaultValue on mount
  useEffect(() => {
    if (isControlled) return;
    const el = editorRef.current;
    if (!el || !defaultValue) return;
    el.textContent = defaultValue;
    lastTextRef.current = defaultValue;
    setIsEmpty(defaultValue.trim().length === 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Error message
  const errorMessage = typeof error === 'string' ? error : undefined;

  // Min-height from rows
  const minHeightStyle: React.CSSProperties | undefined = rows
    ? { minHeight: `${rows * 1.5}em` }
    : undefined;

  return (
    <div className={styles.editorWrapper({ fullWidth })}>
      <div style={{ position: 'relative' }}>
        <div
          ref={editorRef}
          contentEditable={!disabled && !readOnly}
          suppressContentEditableWarning
          className={clsx(styles.editor({ size, hasError: !!error }), className)}
          style={minHeightStyle}
          role="textbox"
          aria-multiline="true"
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          aria-invalid={!!error || undefined}
          data-disabled={disabled || undefined}
          data-readonly={readOnly || undefined}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isEmpty && placeholderText && (
          <div
            className={clsx(
              styles.placeholder,
              styles.editor({ size, hasError: false }),
            )}
            style={minHeightStyle}
            aria-hidden="true"
          >
            {placeholderText}
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      {dropdownOpen && filteredSuggestions.length > 0 && (
        <FloatingPortal root={portalRoot}>
          <div
            ref={refs.setFloating}
            className={styles.floatingWrapper}
            style={{
              ...floatingStyles,
              visibility: isPositioned ? 'visible' : 'hidden',
            }}
          >
            <div className={styles.suggestionsDropdown}>
              <div className={styles.suggestionsContainer}>
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.label}
                    ref={(el) => {
                      if (el) {
                        suggestionRefs.current.set(index, el);
                      } else {
                        suggestionRefs.current.delete(index);
                      }
                    }}
                    className={styles.suggestionItem({
                      size,
                      isHighlighted: index === highlightedIndex,
                      isDisabled: suggestion.disabled || false,
                    })}
                    onMouseDown={(e) => {
                      // Prevent editor blur
                      e.preventDefault();
                      insertMention(suggestion);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    role="option"
                    aria-selected={index === highlightedIndex}
                    aria-disabled={suggestion.disabled}
                  >
                    {activeTrigger?.renderSuggestion ? (
                      activeTrigger.renderSuggestion(suggestion, index === highlightedIndex)
                    ) : (
                      <span className={styles.suggestionLabel}>
                        {suggestion.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FloatingPortal>
      )}

      {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
    </div>
  );
};
