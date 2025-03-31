<script module lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { HeroText } from './index';

  // Definição da meta para o componente HeroText
  const { Story } = defineMeta({
    title: 'Molecules/HeroText',
    component: HeroText,
    tags: [],
    argTypes: {
      className: {
        control: 'text',
        description: 'Classes CSS adicionais para o componente',
      },
      delay: {
        control: { type: 'number', min: 0, max: 3000, step: 100 },
        description: 'Atraso em milissegundos antes de iniciar as animações',
        defaultValue: 500
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div style="padding: 2rem; min-height: 300px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <HeroText {...args} />
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- História padrão -->
<Story
  name="Default"
  args={{ delay: 300 }}
/>

<!-- Com classes adicionais -->
<Story
  name="With Custom Classes"
  args={{
    className: 'p-8 border-2 border-primary-200 rounded-xl',
    delay: 300
  }}
/>

<!-- Com atraso maior -->
<Story
  name="With Longer Delay"
  args={{
    delay: 1000
  }}
/>
