import type { ITheme } from '@xterm/xterm';

const style = getComputedStyle(document.documentElement);
const cssVar = (token: string) => style.getPropertyValue(token) || undefined;

export function getTerminalTheme(overrides?: ITheme): ITheme {
  return {
    cursor: cssVar('--unq-elements-terminal-cursorColor'),
    cursorAccent: cssVar('--unq-elements-terminal-cursorColorAccent'),
    foreground: cssVar('--unq-elements-terminal-textColor'),
    background: cssVar('--unq-elements-terminal-backgroundColor'),
    selectionBackground: cssVar('--unq-elements-terminal-selection-backgroundColor'),
    selectionForeground: cssVar('--unq-elements-terminal-selection-textColor'),
    selectionInactiveBackground: cssVar('--unq-elements-terminal-selection-backgroundColorInactive'),

    // ansi escape code colors
    black: cssVar('--unq-elements-terminal-color-black'),
    red: cssVar('--unq-elements-terminal-color-red'),
    green: cssVar('--unq-elements-terminal-color-green'),
    yellow: cssVar('--unq-elements-terminal-color-yellow'),
    blue: cssVar('--unq-elements-terminal-color-blue'),
    magenta: cssVar('--unq-elements-terminal-color-magenta'),
    cyan: cssVar('--unq-elements-terminal-color-cyan'),
    white: cssVar('--unq-elements-terminal-color-white'),
    brightBlack: cssVar('--unq-elements-terminal-color-brightBlack'),
    brightRed: cssVar('--unq-elements-terminal-color-brightRed'),
    brightGreen: cssVar('--unq-elements-terminal-color-brightGreen'),
    brightYellow: cssVar('--unq-elements-terminal-color-brightYellow'),
    brightBlue: cssVar('--unq-elements-terminal-color-brightBlue'),
    brightMagenta: cssVar('--unq-elements-terminal-color-brightMagenta'),
    brightCyan: cssVar('--unq-elements-terminal-color-brightCyan'),
    brightWhite: cssVar('--unq-elements-terminal-color-brightWhite'),

    ...overrides,
  };
}
