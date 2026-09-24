export interface CharacterCountProps {
  current: number;
  /** Subject: 20 / 60 / 40 · Preview text: 40 / 120 / 80 */
  min: number;
  max: number;
  recommended: number;
}
export declare function CharacterCount(props: CharacterCountProps): JSX.Element;
