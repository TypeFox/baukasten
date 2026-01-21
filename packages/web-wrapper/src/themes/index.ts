/**
 * VSCode Themes
 *
 * Each theme is defined in its own file for better organization.
 * To add a new theme:
 * 1. Create a new file in this directory (e.g., my-theme.ts)
 * 2. Define the theme using the VSCodeTheme interface
 * 3. Import and add it to the themes array below
 */

export type { VSCodeTheme } from "./types";
export { lightPlus } from "./light-plus";
export { lightQuiet } from "./light-quiet";
export { lightSolarized } from "./light-solarized";
export { lightModern } from "./light-modern";
export { darkPlus } from "./dark-plus";
export { darkModern } from "./dark-modern";
export { darkSolarized } from "./dark-solarized";
export { darkMonokai } from "./dark-monokai";

import { VSCodeTheme } from "./types";

import { lightModern } from "./light-modern";
import { lightPlus } from "./light-plus";
import { lightQuiet } from "./light-quiet";
import { lightSolarized } from "./light-solarized";
import { darkPlus } from "./dark-plus";
import { darkModern } from "./dark-modern";
import { darkSolarized } from "./dark-solarized";
import { darkMonokai } from "./dark-monokai";

/**
 * All available themes
 */
export const themes: VSCodeTheme[] = [
  lightPlus,
  lightQuiet,
  lightSolarized,
  lightModern,
  darkPlus,
  darkModern,
  darkSolarized,
  darkMonokai,
];

/**
 * Get a theme by its ID
 */
export const getThemeById = (id: string): VSCodeTheme | undefined => {
  return themes.find((theme) => theme.id === id);
};

/**
 * Default theme (Dark+)
 */
export const defaultTheme = lightModern;
