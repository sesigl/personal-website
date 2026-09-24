/** Names available: search, sun, moon, home, about, subscribe, arrowRight, chevronLeft, play, check, x, instagram, linkedin, github, patreon, facebook, twitter */
export interface IconProps {
  name: 'search' | 'sun' | 'moon' | 'home' | 'about' | 'subscribe' | 'arrowRight' | 'chevronLeft' | 'play' | 'check' | 'x' | 'instagram' | 'linkedin' | 'github' | 'patreon' | 'facebook' | 'twitter';
  /** Width in px; height keeps the source aspect ratio */
  size?: number;
  /** When set the icon is announced (role=img); otherwise aria-hidden */
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare const ICON_NAMES: string[];
export declare function Icon(props: IconProps): JSX.Element | null;
