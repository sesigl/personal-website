export interface TestimonialCardProps {
  title?: string;
  quote: string;
  author: string;
  avatar?: string;
  /** @deprecated no-op */
  tilt?: boolean;
}
export declare function TestimonialCard(props: TestimonialCardProps): JSX.Element;
