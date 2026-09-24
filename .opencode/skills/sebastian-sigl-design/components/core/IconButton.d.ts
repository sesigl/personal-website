import * as React from 'react';
export interface IconButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Icon name from the Icon set */
  icon: string;
  /** Accessible name — required, rendered sr-only */
  label: string;
  /** outlined = circle with border (BackButton) */
  variant?: 'plain' | 'outlined';
  size?: 'md' | 'lg';
  href?: string;
  iconSize?: number;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
