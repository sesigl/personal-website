/** Numbered (01, 02…) list of article links with hairline separators — sidebar on article pages. */
export interface PopularPostsWidgetProps {
  title?: string;
  posts: { title: string; href?: string }[];
  onOpen?: (post: { title: string; href?: string }, index: number) => void;
}
export declare function PopularPostsWidget(props: PopularPostsWidgetProps): JSX.Element;
