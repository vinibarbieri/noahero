import type { Preview } from '@storybook/svelte';
import '../src/app.css';
import ThemeWrapper from './ThemeWrapper.svelte';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#09090b' }
      ]
    },
    docs: {
      canvas: {
        layout: 'padded',
      },
      story: {
        inline: true,
      },
    }
  },
  decorators: [(Story, context) => {
    const isDark = context.globals.backgrounds?.value === '#09090b';
    return {
      Component: ThemeWrapper,
      props: {
        isDark,
        children: () => ({
          Component: Story,
          props: context.args
        })
      }
    };
  }]
};

export default preview;