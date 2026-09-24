import * as React from 'react';
/**
 * Text field: raised surface, hairline border, orange focus ring. Mono uppercase label.
 * @startingPoint section="Core" subtitle="Search, email and labelled text fields" viewport="700x320"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Always provide; use hideLabel for visually hidden labels (search, newsletter) */
  label?: string;
  hideLabel?: boolean;
  /** Leading icon name, e.g. "search" */
  icon?: string;
  /** Trailing adornment, e.g. <kbd>⌘K</kbd> (decorative, aria-hidden) */
  end?: React.ReactNode;
  hint?: string;
  error?: string;
  /** md 36px · lg 44px */
  size?: 'md' | 'lg';
  /** @deprecated all inputs are 4px rectangles now */
  shape?: 'pill' | 'rect';
  /** Node rendered at the right of the label row (e.g. <CharacterCount/>) */
  counter?: React.ReactNode;
  multiline?: boolean;
}
export declare function Input(props: InputProps): JSX.Element;
