/**
 * Article index row: mono number + ISO date, title (whole row clickable), 2-line description, topic + format tags, reading time.
 * Wrap rows in <ol className="ss-post-list"> or any container.
 * @startingPoint section="Content" subtitle="Article index row" viewport="860x420"
 */
export interface PostItemProps {
  title: string;
  description?: string;
  /** ISO date (YYYY-MM-DD) */
  date?: string;
  readingTime?: number;
  href?: string;
  image?: string;
  /** Show the image as a 120×80 thumbnail column */
  thumbnail?: boolean;
  category?: 'tech' | 'leadership' | string;
  /** Companion formats — shown as muted tags */
  media?: { spotify?: string; youtube?: string; infographic?: string };
  /** Running number shown in the first column (e.g. 8 → "008") */
  index?: number;
  /** Show topic + format tags (default true) */
  showTags?: boolean;
  headingLevel?: 2 | 3 | 4;
  onOpen?: () => void;
  onTag?: (category: string) => void;
  /** Topic tag target; default /search?q=<category>&categoryOnly */
  tagHref?: string;
}
export declare function PostItem(props: PostItemProps): JSX.Element;
