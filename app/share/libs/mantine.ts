import { MantineThemeOverride } from '@mantine/core'

const FONT_FAMILY = `'JetBrains Mono', monospace`

export const MantineTheme: MantineThemeOverride = {
  fontFamily: FONT_FAMILY,
  primaryColor: 'violet',
  headings: {
    fontFamily: FONT_FAMILY,
  },
}
