/** 2px accent bar fixed to the top of the viewport that fills as the reader scrolls through the article. */
export interface ReadingProgressProps {
  /** Element whose scroll extent is measured (default: whole document) */
  targetId?: string;
  label?: string;
}
export declare function ReadingProgress(props: ReadingProgressProps): JSX.Element;
