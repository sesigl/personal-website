/**
 * Article masthead: mono meta (date · read time · topic), H1, lede, companion-format buttons and share icons on one hairline-bounded bar.
 * @startingPoint section="Content" subtitle="Article masthead" viewport="760x360"
 */
export interface ArticleHeaderProps {
  title: string;
  description?: string;
  date: string;
  readingTime?: number;
  category?: string;
  categoryHref?: string;
  url?: string;
  media?: { spotify?: string; youtube?: string; infographic?: string };
  mediaIcons?: { spotify?: string; youtube?: string; infographic?: string };
}
export declare function ArticleHeader(props: ArticleHeaderProps): JSX.Element;
