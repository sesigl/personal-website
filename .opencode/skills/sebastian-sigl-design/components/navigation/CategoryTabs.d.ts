/** Mono filter chips for article topics; the active chip is filled ink. Links by default (real URLs), intercept with onChange. */
export interface CategoryTabsProps {
  categories?: (string | { id: string; label: string; count?: number })[];
  active?: string;
  onChange?: (id: string) => void;
  /** Article count per id, shown as a superscript */
  counts?: Record<string, number>;
  /** Link target per category; default "/" and "/<id>" */
  hrefFor?: (id: string) => string;
  label?: string;
}
export declare function CategoryTabs(props: CategoryTabsProps): JSX.Element;
