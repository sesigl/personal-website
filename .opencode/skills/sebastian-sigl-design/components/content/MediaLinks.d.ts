export interface MediaLinksProps {
  spotify?: string;
  youtube?: string;
  infographic?: string;
  /** Icon URLs: assets/icons/spotify.svg, youtube.svg, infographic.svg */
  icons?: { spotify?: string; youtube?: string; infographic?: string };
}
export declare function MediaLinks(props: MediaLinksProps): JSX.Element | null;
