export interface ThemeToggleProps {
  theme?: 'light' | 'dark';
  /** Called with the next theme; persist to localStorage "dark-mode" and set data-theme on <html> */
  onChange?: (next: 'light' | 'dark') => void;
}
export declare function ThemeToggle(props: ThemeToggleProps): JSX.Element;
