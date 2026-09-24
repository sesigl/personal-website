/**
 * Home intro on a 12-column grid: mono kicker (optional portrait), display headline with one highlighted word, lede, mono stats row.
 * @startingPoint section="Content" subtitle="Home hero with stats" viewport="1100x420"
 */
export interface HeroProps {
  kicker?: string;
  avatarSrc?: string;
  /** Full headline; overrides before/highlight/after */
  title?: string;
  before?: string;
  highlight?: string;
  after?: string;
  lede?: string;
  stats?: { label: string; value: string }[];
  as?: 'h1' | 'h2';
}
export declare function Hero(props: HeroProps): JSX.Element;
