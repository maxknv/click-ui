import lightTheme from './tokens/variables.light';

// TODO: This is not a type, should be moved to theme.core.ts
export const THEMES = {
  Dark: 'dark',
  Light: 'light',
} as const;

export type ThemeName = (typeof THEMES)[keyof typeof THEMES];

export type Theme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
