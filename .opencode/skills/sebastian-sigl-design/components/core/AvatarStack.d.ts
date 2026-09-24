export interface AvatarStackProps {
  /** Image URLs, 24px circles overlapped by 12px */
  avatars: string[];
  /** Accessible summary, e.g. "Readers of the newsletter" */
  label?: string;
  className?: string;
}
export declare function AvatarStack(props: AvatarStackProps): JSX.Element;
