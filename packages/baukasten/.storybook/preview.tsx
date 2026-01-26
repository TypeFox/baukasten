import type { Preview } from '@storybook/react';
import React from 'react';
import { VSCodeThemeWrapper } from 'baukasten-ui-web-wrapper';
import { GlobalStyles } from '../src/styles';

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <GlobalStyles />
        <VSCodeThemeWrapper>
          <Story />
        </VSCodeThemeWrapper>
      </>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

