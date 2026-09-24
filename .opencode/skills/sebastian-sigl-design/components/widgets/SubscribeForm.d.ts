/**
 * Email capture with validation, loading, success and error states.
 * @startingPoint section="Widgets" subtitle="Newsletter signup form" viewport="700x300"
 */
export interface SubscribeFormProps {
  /** stacked = sidebar widget (full-width button); inline = Subscribe page (field + button on one row, wraps on mobile) */
  layout?: 'stacked' | 'inline';
  /** Resolve → success, reject → error. Omit for a simulated 900ms success. */
  onSubmit?: (email: string) => Promise<unknown> | unknown;
  /** Force a state (for specimens) */
  status?: 'idle' | 'loading' | 'success' | 'error';
  placeholder?: string;
  buttonLabel?: string;
}
export declare function SubscribeForm(props: SubscribeFormProps): JSX.Element;
