/**
 * Mobile bottom tab bar (fixed, labelled, 60px). Renders nothing visible at ≥768px, where TopBar carries the links.
 * Include it once per page alongside TopBar.
 */
export interface SideNavProps {
  active?: string;
  items?: { id: string; label: string; icon: 'home' | 'about' | 'subscribe' | 'search' | string; href: string }[];
  onNavigate?: (id: string) => void;
  label?: string;
}
export declare function SideNav(props: SideNavProps): JSX.Element;
