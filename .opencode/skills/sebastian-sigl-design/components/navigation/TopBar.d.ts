/**
 * Sticky site header: square-mark wordmark, primary links, search with ⌘K shortcut, theme toggle, Subscribe.
 * Under 768px the links move to the SideNav tab bar and Subscribe hides.
 * @startingPoint section="Navigation" subtitle="Sticky header with search + theme" viewport="1200x60"
 */
export interface TopBarProps {
  /** Mono wordmark; default "sebastian.sigl" */
  brand?: string;
  homeHref?: string;
  onHome?: () => void;
  nav?: { id: string; label: string; href: string }[];
  /** id of the current nav item (aria-current) */
  active?: string;
  onNavigate?: (id: string) => void;
  query?: string;
  /** Called with trimmed query; omit to submit to searchAction */
  onSearch?: (q: string) => void;
  searchAction?: string;
  theme?: 'light' | 'dark';
  onThemeChange?: (t: 'light' | 'dark') => void;
  subscribeHref?: string;
  onSubscribe?: () => void;
  /** Bind ⌘K / Ctrl+K to focus search (default true) */
  shortcut?: boolean;
}
export declare function TopBar(props: TopBarProps): JSX.Element;
