/** Video talk card: 16:9 still with a mono "Watch" chip, title + source row below. Opens in a new tab. */
export interface TalkCardProps {
  /** Always provide — it is the link's accessible name */
  title: string;
  image?: string;
  href: string;
  /** Source label, default "YouTube" */
  meta?: string;
  /** @deprecated no-op */
  tilt?: boolean;
}
export declare function TalkCard(props: TalkCardProps): JSX.Element;
