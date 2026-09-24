/**
 * Sticky, numbered article outline (matches the 01/02 counters on Prose h2s). Tracks the current section on scroll and marks it with aria-current.
 */
export interface TableOfContentsProps {
  /** Heading ids + labels in document order */
  items: { id: string; label: string }[];
  title?: string;
  /** Px from viewport top at which a heading counts as current (default 120) */
  offset?: number;
}
export declare function TableOfContents(props: TableOfContentsProps): JSX.Element;
