/** Mono "← All articles" link that sits above page titles. */
export interface BackButtonProps {
  href?: string;
  label?: string;
  onClick?: () => void;
}
export declare function BackButton(props: BackButtonProps): JSX.Element;
