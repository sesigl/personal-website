import * as React from 'react';
export interface AlertProps {
  /** info = polling, warning = test mode, danger = error, success = sent, neutral = waiting */
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  title?: string;
  /** Replace the icon with a spinner */
  busy?: boolean;
  children?: React.ReactNode;
}
export declare function Alert(props: AlertProps): JSX.Element;
