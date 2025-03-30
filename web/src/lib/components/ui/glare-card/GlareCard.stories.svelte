<script context="module" lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import GlareCard from './GlareCard.svelte';

  const { Story } = defineMeta({
    title: 'UI/GlareCard',
    component: GlareCard,
    tags: ['autodocs'],
    argTypes: {
      className: {
        control: 'text',
        description: 'Additional CSS classes to apply to the card content'
      }
    },
    args: {
      className: "flex items-center justify-center"
    },
    parameters: {
      docs: {
        description: {
          component: "O componente GlareCard é um card interativo com efeito de brilho que reage ao movimento do mouse."
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div class="p-4">
    <GlareCard {...args}>
      <div class="flex flex-col items-center justify-center h-full">
        <svg
          width="66"
          height="65"
          viewBox="0 0 66 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="h-14 w-14 text-white"
        >
          <path
            d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
            stroke="currentColor"
            stroke-width="15"
            stroke-miterlimit="3.86874"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </GlareCard>
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- GlareCard com ícone -->
<Story
  name="WithIcon"
/>

<!-- GlareCard com imagem -->
<Story
  name="WithImage"
>
  {#snippet template(args: Args<typeof Story>)}
    <div class="p-4">
      <GlareCard className="flex items-center justify-center">
        <img
          class="h-full w-full absolute inset-0 object-cover"
          src="https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Abstract art"
        />
      </GlareCard>
    </div>
  {/snippet}
</Story>

<!-- GlareCard com texto -->
<Story
  name="WithText"
>
  {#snippet template(args: Args<typeof Story>)}
    <div class="p-4">
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p class="font-bold text-white text-lg">The greatest trick</p>
        <p class="font-normal text-base text-neutral-200 mt-4">
          The greatest trick the devil ever pulled was to convince the world
          that he didn't exist.
        </p>
      </GlareCard>
    </div>
  {/snippet}
</Story>

<!-- GlareCard com conteúdo personalizado -->
<Story
  name="CustomContent"
>
  {#snippet template(args: Args<typeof Story>)}
    <div class="p-4">
      <GlareCard className="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center gap-4">
          <div class="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
              <path d="M12 8v8"></path>
              <path d="M8 12h8"></path>
            </svg>
          </div>
          <h3 class="text-white text-xl font-bold">Adicionar Novo</h3>
          <p class="text-gray-300 text-center">Clique para adicionar um novo item à sua coleção</p>
        </div>
      </GlareCard>
    </div>
  {/snippet}
</Story>
