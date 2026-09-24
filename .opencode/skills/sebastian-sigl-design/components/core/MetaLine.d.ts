import * as React from 'react';
/** Mono uppercase meta row: ■ MAR 20, 2026 · 7 MIN READ. Children append (e.g. a topic Tag). */
export interface MetaLineProps {
  /** ISO string or Date; rendered "MMM d, yyyy" */
  date?: string | Date;
  readingTime?: number;
  /** Leading 8px accent square */
  dash?: boolean;
  children?: React.ReactNode;
  className?: string;
}
export declare function formatDate(d: string | Date): string;
export declare function MetaLine(props: MetaLineProps): JSX.Element;
