export interface ExperienceEntry { start: string; end: string; role: string; org: string; description?: string; logo?: string }
/**
 * Vertical career timeline with 56px logo discs joined by a 1px rule.
 * @startingPoint section="Content" subtitle="Career / experience timeline" viewport="700x420"
 */
export interface ExperienceTimelineProps { items: ExperienceEntry[] }
export declare function ExperienceTimeline(props: ExperienceTimelineProps): JSX.Element;
