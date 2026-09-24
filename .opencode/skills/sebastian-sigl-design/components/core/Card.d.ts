import * as React from 'react';
/** Hairline surface: 1px border, 4px radius, 20px padding, no shadow. Link cards darken the border on hover. */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  as?: any;
  /** @deprecated no-op */
  tilt?: boolean;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;
