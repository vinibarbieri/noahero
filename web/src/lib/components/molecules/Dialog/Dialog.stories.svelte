<script context="module" lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import Dialog from './Dialog.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    argTypes: {
      isOpen: {
        control: 'boolean',
        description: 'Controla se o dialog está aberto ou fechado'
      },
      title: {
        control: 'text',
        description: 'Título exibido no cabeçalho do dialog'
      },
      onClose: {
        action: 'closed',
        description: 'Função chamada quando o dialog é fechado'
      }
    },
    args: {
      onClose: fn()
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente Dialog é usado para exibir conteúdo em uma janela modal sobreposta à interface principal.
            
            ### Características
            
            - Acessível com suporte a ARIA
            - Fecha ao clicar fora, pressionar ESC ou clicar no botão X (desktop)
            - Em dispositivos móveis, suporta gesto de arrastar para baixo para fechar
            - Suporta título personalizado
            - Conteúdo flexível via slots
            - Suporte a slot de rodapé opcional
            
            ### Uso
            
            \`\`\`svelte
            <Dialog isOpen={showDialog} title="Título do Dialog" onClose={() => showDialog = false}>
              <p>Conteúdo do dialog aqui.</p>
              
              <svelte:fragment slot="footer">
                <button>Cancelar</button>
                <button>Confirmar</button>
              </svelte:fragment>
            </Dialog>
            \`\`\`
          `
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div class="p-4">
    <Dialog {...args}>
      <div class="space-y-4">
        <p>Este é um exemplo de conteúdo dentro do dialog.</p>
        <p>O dialog é um componente modal que sobrepõe a interface principal para exibir informações importantes ou solicitar ações do usuário.</p>
        <p>Em dispositivos móveis, você pode arrastar para baixo para fechar o dialog.</p>
      </div>
    </Dialog>
    
    <!-- Botão para mostrar que o dialog está em uma camada superior -->
    <button class="px-4 py-2 bg-blue-500 text-white rounded-md">
      Botão de fundo (não clicável quando o dialog está aberto)
    </button>
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- Dialog básico -->
<Story
  name="Básico"
  args={{
    isOpen: true,
    title: "Dialog Básico"
  }}
/>

<!-- Dialog com título longo -->
<Story
  name="Título Longo"
  args={{
    isOpen: true,
    title: "Este é um exemplo de dialog com um título muito longo que pode quebrar em múltiplas linhas"
  }}
/>

<!-- Dialog com rodapé -->
<Story
  name="Com Rodapé"
  args={{
    isOpen: true,
    title: "Dialog com Rodapé"
  }}
>
  {#snippet template(args: Args<typeof Story>)}
    <div class="p-4">
      <Dialog {...args}>
        <p>Este dialog inclui botões de ação no rodapé.</p>
        
        <svelte:fragment slot="footer">
          <div class="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
            <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Cancelar
            </button>
            <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
              Confirmar
            </button>
          </div>
        </svelte:fragment>
      </Dialog>
      
      <button class="px-4 py-2 bg-blue-500 text-white rounded-md">
        Botão de fundo
      </button>
    </div>
  {/snippet}
</Story>

<!-- Dialog fechado -->
<Story
  name="Fechado"
  args={{
    isOpen: false,
    title: "Dialog Fechado"
  }}
/>
