import * as React from 'react';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Maps to campaign status: pending→neutral, in_progress→info, completed→success, failed→danger */
  tone?: 'neutral' | 'info' | 'success' | 'danger' | 'warning';
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
