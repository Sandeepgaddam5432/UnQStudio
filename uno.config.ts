import { globSync } from 'fast-glob';
import fs from 'node:fs/promises';
import { basename } from 'node:path';
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss';

const iconPaths = globSync('./icons/*.svg');

const collectionName = 'unq';

const customIconCollection = iconPaths.reduce(
  (acc, iconPath) => {
    const [iconName] = basename(iconPath).split('.');

    acc[collectionName] ??= {};
    acc[collectionName][iconName] = async () => fs.readFile(iconPath, 'utf8');

    return acc;
  },
  {} as Record<string, Record<string, () => Promise<string>>>,
);

const BASE_COLORS = {
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  accent: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
    800: '#115E59',
    900: '#134E4A',
    950: '#042F2E',
  },
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },
  orange: {
    50: '#FFFAEB',
    100: '#FEEFC7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#792E0D',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
};

const COLOR_PRIMITIVES = {
  ...BASE_COLORS,
  alpha: {
    white: generateAlphaPalette(BASE_COLORS.white),
    gray: generateAlphaPalette(BASE_COLORS.gray[900]),
    red: generateAlphaPalette(BASE_COLORS.red[500]),
    accent: generateAlphaPalette(BASE_COLORS.accent[500]),
  },
};

export default defineConfig({
  safelist: [...Object.keys(customIconCollection[collectionName] || {}).map((x) => `i-unq:${x}`)],
  shortcuts: {
    'unq-ease-cubic-bezier': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'transition-theme': 'transition-[background-color,border-color,color] duration-150 unq-ease-cubic-bezier',
    kdb: 'bg-unq-elements-code-background text-unq-elements-code-text py-1 px-1.5 rounded-md',
    'max-w-chat': 'max-w-[var(--chat-max-width)]',
  },
  rules: [
    /**
     * This shorthand doesn't exist in Tailwind and we overwrite it to avoid
     * any conflicts with minified CSS classes.
     */
    ['b', {}],
  ],
  theme: {
    colors: {
      ...COLOR_PRIMITIVES,
      unq: {
        elements: {
          borderColor: 'var(--unq-elements-borderColor)',
          borderColorActive: 'var(--unq-elements-borderColorActive)',
          background: {
            depth: {
              1: 'var(--unq-elements-bg-depth-1)',
              2: 'var(--unq-elements-bg-depth-2)',
              3: 'var(--unq-elements-bg-depth-3)',
              4: 'var(--unq-elements-bg-depth-4)',
            },
          },
          textPrimary: 'var(--unq-elements-textPrimary)',
          textSecondary: 'var(--unq-elements-textSecondary)',
          textTertiary: 'var(--unq-elements-textTertiary)',
          code: {
            background: 'var(--unq-elements-code-background)',
            text: 'var(--unq-elements-code-text)',
          },
          button: {
            primary: {
              background: 'var(--unq-elements-button-primary-background)',
              backgroundHover: 'var(--unq-elements-button-primary-backgroundHover)',
              text: 'var(--unq-elements-button-primary-text)',
            },
            secondary: {
              background: 'var(--unq-elements-button-secondary-background)',
              backgroundHover: 'var(--unq-elements-button-secondary-backgroundHover)',
              text: 'var(--unq-elements-button-secondary-text)',
            },
            danger: {
              background: 'var(--unq-elements-button-danger-background)',
              backgroundHover: 'var(--unq-elements-button-danger-backgroundHover)',
              text: 'var(--unq-elements-button-danger-text)',
            },
          },
          item: {
            contentDefault: 'var(--unq-elements-item-contentDefault)',
            contentActive: 'var(--unq-elements-item-contentActive)',
            contentAccent: 'var(--unq-elements-item-contentAccent)',
            contentDanger: 'var(--unq-elements-item-contentDanger)',
            backgroundDefault: 'var(--unq-elements-item-backgroundDefault)',
            backgroundActive: 'var(--unq-elements-item-backgroundActive)',
            backgroundAccent: 'var(--unq-elements-item-backgroundAccent)',
            backgroundDanger: 'var(--unq-elements-item-backgroundDanger)',
          },
          actions: {
            background: 'var(--unq-elements-actions-background)',
            code: {
              background: 'var(--unq-elements-actions-code-background)',
            },
          },
          artifacts: {
            background: 'var(--unq-elements-artifacts-background)',
            backgroundHover: 'var(--unq-elements-artifacts-backgroundHover)',
            borderColor: 'var(--unq-elements-artifacts-borderColor)',
            inlineCode: {
              background: 'var(--unq-elements-artifacts-inlineCode-background)',
              text: 'var(--unq-elements-artifacts-inlineCode-text)',
            },
          },
          messages: {
            background: 'var(--unq-elements-messages-background)',
            linkColor: 'var(--unq-elements-messages-linkColor)',
            code: {
              background: 'var(--unq-elements-messages-code-background)',
            },
            inlineCode: {
              background: 'var(--unq-elements-messages-inlineCode-background)',
              text: 'var(--unq-elements-messages-inlineCode-text)',
            },
          },
          icon: {
            success: 'var(--unq-elements-icon-success)',
            error: 'var(--unq-elements-icon-error)',
            primary: 'var(--unq-elements-icon-primary)',
            secondary: 'var(--unq-elements-icon-secondary)',
            tertiary: 'var(--unq-elements-icon-tertiary)',
          },
          preview: {
            addressBar: {
              background: 'var(--unq-elements-preview-addressBar-background)',
              backgroundHover: 'var(--unq-elements-preview-addressBar-backgroundHover)',
              backgroundActive: 'var(--unq-elements-preview-addressBar-backgroundActive)',
              text: 'var(--unq-elements-preview-addressBar-text)',
              textActive: 'var(--unq-elements-preview-addressBar-textActive)',
            },
          },
          terminals: {
            background: 'var(--unq-elements-terminals-background)',
            buttonBackground: 'var(--unq-elements-terminals-buttonBackground)',
          },
          dividerColor: 'var(--unq-elements-dividerColor)',
          loader: {
            background: 'var(--unq-elements-loader-background)',
            progress: 'var(--unq-elements-loader-progress)',
          },
          prompt: {
            background: 'var(--unq-elements-prompt-background)',
          },
          sidebar: {
            dropdownShadow: 'var(--unq-elements-sidebar-dropdownShadow)',
            buttonBackgroundDefault: 'var(--unq-elements-sidebar-buttonBackgroundDefault)',
            buttonBackgroundHover: 'var(--unq-elements-sidebar-buttonBackgroundHover)',
            buttonText: 'var(--unq-elements-sidebar-buttonText)',
          },
          cta: {
            background: 'var(--unq-elements-cta-background)',
            text: 'var(--unq-elements-cta-text)',
          },
        },
      },
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetIcons({
      warn: true,
      collections: {
        ...customIconCollection,
      },
      unit: 'em',
    }),
  ],
});

/**
 * Generates an alpha palette for a given hex color.
 *
 * @param hex - The hex color code (without alpha) to generate the palette from.
 * @returns An object where keys are opacity percentages and values are hex colors with alpha.
 *
 * Example:
 *
 * ```
 * {
 *   '1': '#FFFFFF03',
 *   '2': '#FFFFFF05',
 *   '3': '#FFFFFF08',
 * }
 * ```
 */
function generateAlphaPalette(hex: string) {
  return [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reduce(
    (acc, opacity) => {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0');

      acc[opacity] = `${hex}${alpha}`;

      return acc;
    },
    {} as Record<number, string>,
  );
}
