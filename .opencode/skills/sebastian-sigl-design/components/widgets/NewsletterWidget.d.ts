/**
 * Sidebar newsletter card: mono kicker, headline, stacked subscribe form, reader avatars + proof line.
 * @startingPoint section="Widgets" subtitle="Sidebar newsletter card" viewport="340x360"
 */
export interface NewsletterWidgetProps {
  avatars?: string[];
  kicker?: string;
  title?: string;
  subtitle?: string;
  proof?: string;
  onSubmit?: (email: string) => Promise<unknown> | unknown;
  status?: 'idle' | 'loading' | 'success' | 'error';
}
export declare function NewsletterWidget(props: NewsletterWidgetProps): JSX.Element;
