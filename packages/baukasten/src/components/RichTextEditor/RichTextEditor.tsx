import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
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
  /** Custom render function for suggestion dropdown items */
  renderSuggestion?: (suggestion: RichTextSuggestion<T>, isHighlighted: boolean) => React.ReactNode;
  /**
   * Custom render function for mention chips in the editor.
   * The returned React element will be rendered inside the mention span.
   * @param suggestion - The selected suggestion
   * @returns React node to render inside the mention chip
   */
  renderMention?: (suggestion: RichTextSuggestion<T>) => React.ReactNode;
  /**
   * Custom serialization function for mention values.
   * When provided, this function determines what text value is used when
   * serializing the content (e.g., for copying or in onChange/onSubmit).
   * By default, the visible textContent is used.
   * @param suggestion - The selected suggestion
   * @returns The text value to use when serializing (e.g., file path instead of filename)
   */
  serializeValue?: (suggestion: RichTextSuggestion<T>) => string;
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
        // Use serializedValue if available, otherwise fall back to textContent
        const value = el.dataset.serializedValue || el.textContent || '';
        segments.push({
          type: 'mention',
          value,
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
// Caret save/restore utilities
// ---------------------------------------------------------------------------

/**
 * Compute a flat character offset for the caret within a container,
 * skipping over mention chips (counted as a single unit with their textContent length).
 * Decorator spans are transparent — we walk into them.
 */
function getCaretOffset(container: HTMLElement): number | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;

  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  const offset = range.startOffset;

  // If the selection is directly on the container element (not a text node),
  // convert the child-index offset to a text offset
  if (node === container) {
    let charOffset = 0;
    for (let i = 0; i < offset && i < container.childNodes.length; i++) {
      charOffset += getNodeTextLength(container.childNodes[i]);
    }
    return charOffset;
  }

  if (!container.contains(node)) return null;

  let charOffset = 0;

  // Walk through container children in order, summing text lengths until
  // we reach the node that contains the caret.
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(n: Node) {
        // Skip into decorator spans, but treat mention chips as leaves
        if (n.nodeType === Node.ELEMENT_NODE) {
          const el = n as HTMLElement;
          if (el.dataset.mention === 'true') {
            return NodeFilter.FILTER_ACCEPT; // count it but don't descend
          }
          if (el.dataset.decorator === 'true' || el.tagName === 'DIV' || el.tagName === 'P' || el.tagName === 'BR' || el.tagName === 'SPAN') {
            return NodeFilter.FILTER_SKIP; // skip element itself, but descend into children
          }
          return NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );

  let current: Node | null;
  while ((current = walker.nextNode())) {
    if (current === node) {
      // This is the text node containing the caret
      charOffset += offset;
      return charOffset;
    }

    if (current.nodeType === Node.ELEMENT_NODE) {
      const el = current as HTMLElement;
      if (el.dataset.mention === 'true') {
        // If the caret is *inside* or *after* a mention chip, and the
        // anchor node is inside this chip, count partial
        if (el.contains(node)) {
          charOffset += (el.textContent || '').length;
          return charOffset;
        }
        charOffset += (el.textContent || '').length;
        // Skip all descendants of the mention in the walker
        // (TreeWalker won't descend because we returned ACCEPT for mentions)
      }
    } else if (current.nodeType === Node.TEXT_NODE) {
      charOffset += (current.textContent || '').length;
    }
  }

  return charOffset + offset;
}

/** Get the total text length of a node (for offset calculation) */
function getNodeTextLength(node: Node): number {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.textContent || '').length;
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;
    if (el.dataset.mention === 'true') {
      return (el.textContent || '').length;
    }
    if (el.tagName === 'BR') {
      return 1;
    }
    let len = 0;
    for (const child of Array.from(el.childNodes)) {
      len += getNodeTextLength(child);
    }
    return len;
  }
  return 0;
}

/**
 * Restore caret to a given flat character offset within the container.
 */
function restoreCaretOffset(container: HTMLElement, targetOffset: number) {
  const sel = window.getSelection();
  if (!sel) return;

  let remaining = targetOffset;

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(n: Node) {
        if (n.nodeType === Node.ELEMENT_NODE) {
          const el = n as HTMLElement;
          if (el.dataset.mention === 'true') return NodeFilter.FILTER_ACCEPT;
          return NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );

  let current: Node | null;
  while ((current = walker.nextNode())) {
    if (current.nodeType === Node.TEXT_NODE) {
      const len = (current.textContent || '').length;
      if (remaining <= len) {
        const range = document.createRange();
        range.setStart(current, remaining);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }
      remaining -= len;
    } else if (current.nodeType === Node.ELEMENT_NODE) {
      const el = current as HTMLElement;
      if (el.dataset.mention === 'true') {
        const len = (el.textContent || '').length;
        if (remaining <= len) {
          // Place caret right after the mention
          const range = document.createRange();
          range.setStartAfter(el);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          return;
        }
        remaining -= len;
      }
    }
  }

  // If we ran out of content, place caret at the end
  const range = document.createRange();
  range.selectNodeContents(container);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}

// ---------------------------------------------------------------------------
// Decorator logic
// ---------------------------------------------------------------------------

/**
 * Strip all decorator <span data-decorator="true"> wrappers, replacing them
 * with their child nodes (unwrapping). This normalizes the DOM back to plain
 * text + mention chips so that trigger detection and offset math work on
 * a clean tree. Adjacent text nodes are merged via normalize().
 */
function stripDecorators(container: HTMLElement) {
  const decoratorSpans = container.querySelectorAll('[data-decorator="true"]');
  for (const span of Array.from(decoratorSpans)) {
    const parent = span.parentNode;
    if (!parent) continue;
    // Move all children out before the span
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
  }
  // Merge adjacent text nodes
  container.normalize();
}

interface TextRun {
  node: Text;
  /** Offset of this text node's first character within the container's full plain text */
  start: number;
}

/**
 * Collect all text nodes inside the container that are NOT inside mention chips,
 * along with their character offset within the full plain text.
 */
function collectTextRuns(container: HTMLElement): { runs: TextRun[]; fullText: string } {
  const runs: TextRun[] = [];
  let offset = 0;

  function walk(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      if (text.length > 0) {
        runs.push({ node: node as Text, start: offset });
        offset += text.length;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.dataset.mention === 'true') {
        // Mention chip — skip, but count its text for offset tracking
        offset += (el.textContent || '').length;
        return;
      }
      for (const child of Array.from(el.childNodes)) {
        walk(child);
      }
    }
  }

  for (const child of Array.from(container.childNodes)) {
    walk(child);
  }

  const fullText = runs.map((r) => r.node.textContent || '').join('');
  return { runs, fullText };
}

/**
 * Compute match ranges from a single decorator against the full plain text
 * (text excluding mention chip content).
 */
function computeMatchRanges(
  decorator: RichTextDecorator,
  fullText: string,
): { start: number; end: number }[] {
  if (typeof decorator.match === 'function') {
    return decorator.match(fullText);
  }

  // RegExp — ensure global flag
  const regex = decorator.match;
  const flags = regex.flags.includes('g') ? regex.flags : regex.flags + 'g';
  const globalRegex = new RegExp(regex.source, flags);

  const ranges: { start: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = globalRegex.exec(fullText)) !== null) {
    if (m[0].length === 0) {
      globalRegex.lastIndex++;
      continue;
    }
    ranges.push({ start: m.index, end: m.index + m[0].length });
  }
  return ranges;
}

/**
 * Apply all decorators to the container.
 *
 * Strategy:
 * 1. Strip any existing decorator spans (clean slate).
 * 2. Collect plain text runs (text nodes not in mentions).
 * 3. For each decorator, compute matches against the concatenated plain text.
 * 4. Map each match range to the actual text node(s) it spans.
 * 5. Wrap matched text in <span data-decorator="true"> with the decorator's
 *    className and inline style.
 *
 * Matches are applied in document order, non-overlapping. If two decorators
 * match overlapping ranges, the first decorator in the array wins.
 */
function applyDecorators(container: HTMLElement, decorators: RichTextDecorator[]) {
  if (decorators.length === 0) return;

  // 1. Already stripped before calling this function (in the handleInput flow)

  // 2. Collect text runs
  const { runs, fullText } = collectTextRuns(container);
  if (fullText.length === 0 || runs.length === 0) return;

  // 3. Collect all match ranges from all decorators, tagged with their decorator index
  const allMatches: { start: number; end: number; decoratorIdx: number }[] = [];
  for (let i = 0; i < decorators.length; i++) {
    const ranges = computeMatchRanges(decorators[i], fullText);
    for (const r of ranges) {
      allMatches.push({ ...r, decoratorIdx: i });
    }
  }

  if (allMatches.length === 0) return;

  // Sort by start position, then by decorator index (earlier decorator wins)
  allMatches.sort((a, b) => a.start - b.start || a.decoratorIdx - b.decoratorIdx);

  // Remove overlapping matches (first one wins)
  const resolved: typeof allMatches = [];
  let lastEnd = 0;
  for (const match of allMatches) {
    if (match.start >= lastEnd) {
      resolved.push(match);
      lastEnd = match.end;
    }
  }

  // 4 & 5. Wrap matches — process in *reverse* document order so that earlier
  //         offsets remain valid as we mutate later ones.
  for (let i = resolved.length - 1; i >= 0; i--) {
    const match = resolved[i];
    const decorator = decorators[match.decoratorIdx];

    wrapRange(runs, match.start, match.end, decorator);
  }
}

/**
 * Wrap a character range [start, end) across text runs with a decorator span.
 */
function wrapRange(
  runs: TextRun[],
  start: number,
  end: number,
  decorator: RichTextDecorator,
) {
  // Find which text runs are affected
  for (const run of runs) {
    const runEnd = run.start + (run.node.textContent || '').length;

    // Skip runs that are entirely before or after the match
    if (runEnd <= start) continue;
    if (run.start >= end) break;

    // Compute the slice of this text node that falls within [start, end)
    const sliceStart = Math.max(0, start - run.start);
    const sliceEnd = Math.min((run.node.textContent || '').length, end - run.start);

    if (sliceStart >= sliceEnd) continue;

    const textNode = run.node;
    const parent = textNode.parentNode;
    if (!parent) continue;

    // If only a middle portion needs wrapping, we need to split the text node
    // Split: [before][wrapped][after]

    // Split off "after" first (so offsets for "before" remain valid)
    let wrappedNode: Text = textNode;
    if (sliceEnd < (textNode.textContent || '').length) {
      textNode.splitText(sliceEnd);
      // textNode is now just [0..sliceEnd), the rest is a new sibling
    }
    if (sliceStart > 0) {
      wrappedNode = textNode.splitText(sliceStart);
      // textNode is now [0..sliceStart), wrappedNode is [sliceStart..sliceEnd)
    }

    // Create the decorator span
    const span = document.createElement('span');
    span.dataset.decorator = 'true';
    if (decorator.className) {
      span.className = decorator.className;
    }
    if (decorator.style) {
      Object.assign(span.style, decorator.style);
    }

    // Replace the wrappedNode with the span containing it
    parent.replaceChild(span, wrappedNode);
    span.appendChild(wrappedNode);
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  triggers = [],
  decorators = [],
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
  // Decorator application
  // -----------------------------------------------------------------------
  const runDecorators = useCallback(() => {
    const el = editorRef.current;
    if (!el || decorators.length === 0) return;

    // Save caret position as a flat character offset
    const caretOff = getCaretOffset(el);

    // Strip existing decorator spans so we start from a clean DOM
    stripDecorators(el);

    // Apply decorators (wraps matched text in <span data-decorator>)
    applyDecorators(el, decorators);

    // Restore caret
    if (caretOff !== null) {
      restoreCaretOffset(el, caretOff);
    }
  }, [decorators]);

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

      // Create the mention chip container
      const chip = document.createElement('span');
      chip.contentEditable = 'false';
      chip.dataset.mention = 'true';
      chip.dataset.trigger = activeTrigger.trigger;
      chip.dataset.value = suggestion.label;
      if (suggestion.data !== undefined) {
        chip.dataset.payload = JSON.stringify(suggestion.data);
      }
      // Store the serialized value if provided (used when extracting plain text)
      if (activeTrigger.serializeValue) {
        chip.dataset.serializedValue = activeTrigger.serializeValue(suggestion);
      }
      chip.className = styles.mentionChip;

      // Render custom content or default text
      if (activeTrigger.renderMention) {
        // Render the React node synchronously into the chip
        const reactNode = activeTrigger.renderMention(suggestion);
        const root = createRoot(chip);
        flushSync(() => {
          root.render(reactNode as React.ReactElement);
        });
      } else {
        // Default: just show trigger + label
        chip.textContent = `${activeTrigger.trigger}${suggestion.label}`;
      }

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

      // Emit change for this mutation
      // Note: We don't suppress input here because DOM mutations from insertNode/deleteContents
      // don't reliably trigger input events, and suppressing can cause subsequent keystrokes
      // to be missed if they happen to fire an input event immediately after.
      emitChange();

      // Re-apply decorators on the updated content
      if (decorators.length > 0) {
        runDecorators();
      }
    },
    [activeTrigger, triggerRangeRef, emitChange, decorators, runDecorators],
  );

  // -----------------------------------------------------------------------
  // Event handlers
  // -----------------------------------------------------------------------
  const handleInput = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;

    // 1. Strip decorators so emitChange + detectTrigger see clean text nodes
    if (decorators.length > 0) {
      stripDecorators(el);
    }

    // 2. Serialize and emit onChange (on clean DOM)
    emitChange();

    // 3. Detect triggers (on clean DOM — text nodes are intact)
    detectTrigger();

    // 4. Re-apply decorators (wraps text in spans, restoring caret)
    if (decorators.length > 0) {
      runDecorators();
    }
  }, [emitChange, detectTrigger, decorators, runDecorators]);

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
          // Strip decorators so serialization sees clean text nodes
          if (decorators.length > 0) {
            stripDecorators(el);
          }
          const segments = serializeContent(el);
          const text = segmentsToText(segments);
          onSubmit(text, segments);
          // Re-apply decorators if the editor content wasn't cleared
          if (decorators.length > 0) {
            runDecorators();
          }
        }
        return;
      }
    },
    [onKeyDown, dropdownOpen, filteredSuggestions, highlightedIndex, insertMention, onSubmit, decorators, runDecorators],
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

    // Apply decorators to new content
    if (decorators.length > 0) {
      applyDecorators(el, decorators);
    }
  }, [controlledValue, isControlled, decorators]);

  // Set defaultValue on mount and apply initial decorators
  useEffect(() => {
    if (isControlled) return;
    const el = editorRef.current;
    if (!el) return;
    if (defaultValue) {
      el.textContent = defaultValue;
      lastTextRef.current = defaultValue;
      setIsEmpty(defaultValue.trim().length === 0);
    }
    // Apply decorators to initial content
    if (decorators.length > 0 && el.textContent) {
      applyDecorators(el, decorators);
    }
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
