<script context="module" lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import CheckoutDialog from './CheckoutDialog.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/CheckoutDialog',
    component: CheckoutDialog,
    tags: ['autodocs'],
    argTypes: {
      isOpen: {
        control: 'boolean',
        description: 'Controla se o dialog está aberto ou fechado'
      },
      onClose: {
        action: 'closed',
        description: 'Função chamada quando o dialog é fechado'
      },
      isOwner: {
        control: 'boolean',
        description: 'Indica se o usuário é proprietário ou não'
      },
      currency: {
        control: 'text',
        description: 'Símbolo da moeda (ex: $, R$, €)'
      },
      onConfirm: {
        action: 'confirmed',
        description: 'Função chamada quando o pagamento é confirmado'
      }
    },
    args: {
      onClose: fn(),
      onConfirm: fn()
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente CheckoutDialog é usado para permitir que usuários recarreguem seu saldo ou comprem coins.
            
            ### Características
            
            - Título diferente para proprietários ("Recarregar Saldo") e usuários ("Comprar Coins")
            - Opções de valor pré-definidas
            - Input para valor personalizado
            - Seleção de método de pagamento
            - Exibição do valor total
            - Estado de processamento
            - Botão de confirmação adaptado ao contexto
            
            ### Uso
            
            \`\`\`svelte
            <CheckoutDialog
              isOpen={isCheckoutDialogOpen}
              onClose={() => isCheckoutDialogOpen = false}
              isOwner={true}
              currency="R$"
              onConfirm={(amount) => {
                console.log(\`Adicionando \${amount} R$ ao saldo\`);
              }}
            />
            \`\`\`
          `
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div class="p-4">
    <CheckoutDialog {...args} />
    
    <!-- Botão para abrir o dialog (apenas para demonstração) -->
    <button 
      class="px-4 py-2 bg-blue-500 text-white rounded-md"
      onclick={() => args.isOpen = true}
    >
      Abrir Dialog de Checkout
    </button>
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- CheckoutDialog para proprietário -->
<Story
  name="Proprietário"
  args={{
    isOpen: true,
    isOwner: true,
    currency: "R$"
  }}
/>

<!-- CheckoutDialog para usuário -->
<Story
  name="Usuário"
  args={{
    isOpen: true,
    isOwner: false,
    currency: "R$"
  }}
/>

<!-- CheckoutDialog fechado -->
<Story
  name="Fechado"
  args={{
    isOpen: false,
    isOwner: true,
    currency: "R$"
  }}
/>

<!-- CheckoutDialog com moeda diferente -->
<Story
  name="Moeda Diferente"
  args={{
    isOpen: true,
    isOwner: true,
    currency: "$"
  }}
/>
