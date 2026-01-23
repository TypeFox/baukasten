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
export { lightModern } from "./light-modern";
export { darkModern } from "./dark-modern";

import { VSCodeTheme } from "./types";

import { lightModern } from "./light-modern";
import { darkModern } from "./dark-modern";

/**
 * All available themes
 */
export const themes: VSCodeTheme[] = [
  lightModern,
  darkModern,
];

/**
 * Get a theme by its ID
 */
export const getThemeById = (id: string): VSCodeTheme | undefined => {
  return themes.find((theme) => theme.id === id);
};

/**
 * Default theme (Light Modern)
 */
export const defaultTheme = lightModern;
