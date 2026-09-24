import * as React from 'react';
/** Mono uppercase label, 3px corners. solid = topic (accent outline), outline = neutral, muted = format chips (Podcast/Video). */
export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  variant?: 'solid' | 'outline' | 'muted';
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): JSX.Element;
