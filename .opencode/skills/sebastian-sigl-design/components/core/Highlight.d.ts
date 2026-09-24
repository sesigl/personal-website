import * as React from 'react';
/** Accent-coloured phrase with a low signal-50 marker band (one per headline). hover = underline-on-hover link text. */
export interface HighlightProps extends React.HTMLAttributes<HTMLElement> {
  as?: any;
  /** false = marker band without accent colour */
  accent?: boolean;
  hover?: boolean;
  href?: string;
  children?: React.ReactNode;
}
export declare function Highlight(props: HighlightProps): JSX.Element;
