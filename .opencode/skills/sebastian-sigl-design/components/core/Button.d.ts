import * as React from 'react';
/**
 * 4px-radius button in Geist 500. Primary = ink fill that turns signal-orange on hover.
 * @startingPoint section="Core" subtitle="Buttons — primary, secondary, ghost" viewport="700x260"
 */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** primary = ink fill (hover accent); secondary = hairline outline; ghost = text only */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** sm 32px · md 36px · lg 44px */
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  loading?: boolean;
  /** Renders an <a> when set */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
