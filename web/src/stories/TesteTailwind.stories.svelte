<script module lang="ts">
  import TesteTailwind from '$lib/components/TesteTailwind.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

  // Definindo a configuração do story
  const { Story } = defineMeta({
    title: 'Components/TesteTailwind',
    component: TesteTailwind,
    tags: ['autodocs'],
    argTypes: {
      titulo: {
        control: 'text',
        description: 'Título do componente',
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <TesteTailwind {...args} />
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- Story padrão -->
<Story
  name="Padrão"
  args={{
    titulo: "Teste do Tailwind"
  }}
/>

<!-- Story com título personalizado -->
<Story
  name="Título Personalizado"
  args={{
    titulo: "Meu Título Customizado"
  }}
/>

<!-- Story com título longo -->
<Story
  name="Título Longo"
  args={{
    titulo: "Este é um título muito longo para testar o comportamento do layout"
  }}
/>