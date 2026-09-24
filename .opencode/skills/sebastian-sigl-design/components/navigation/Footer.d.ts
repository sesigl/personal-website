/** Full-width footer: mono copyright, social icon links (36px targets), Imprint. */
export interface FooterProps {
  social?: { id: 'x' | 'instagram' | 'facebook' | 'linkedin' | 'github' | 'patreon'; label: string; href: string }[];
  owner?: string;
  imprintHref?: string;
  onImprint?: () => void;
  /** Optional RSS link */
  rssHref?: string;
}
export declare function Footer(props: FooterProps): JSX.Element;
