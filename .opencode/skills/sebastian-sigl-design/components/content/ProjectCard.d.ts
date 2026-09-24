export interface ProjectCardProps {
  title: string;
  description?: string;
  logo?: string;
  href: string;
  /** @deprecated no-op */
  tilt?: boolean;
}
export declare function ProjectCard(props: ProjectCardProps): JSX.Element;
