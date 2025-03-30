<script context="module" lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import BalanceCard from './BalanceCard.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/BalanceCard',
    component: BalanceCard,
    tags: ['autodocs'],
    argTypes: {
      balance: {
        control: 'number',
        description: 'Valor do saldo a ser exibido'
      },
      currency: {
        control: 'text',
        description: 'Símbolo da moeda (ex: $, R$, €)'
      },
      title: {
        control: 'text',
        description: 'Título do card de saldo'
      },
      showIcon: {
        control: 'boolean',
        description: 'Controla se o ícone deve ser exibido'
      }
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente BalanceCard é usado para exibir o saldo de vouchers disponíveis para o usuário ou empresa.
            
            ### Características
            
            - Design compacto e limpo
            - Formatação automática de valores monetários
            - Suporte a diferentes moedas
            - Título personalizável
            - Ícone opcional
            - Adaptável a diferentes tamanhos
            
            ### Uso
            
            \`\`\`svelte
            <BalanceCard
              balance={4259.32}
              currency="$"
              title="Your Balance"
              showIcon={true}
            />
            \`\`\`
          `
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div class="p-4 max-w-xs">
    <BalanceCard {...args} />
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- BalanceCard padrão -->
<Story
  name="Padrão"
  args={{
    balance: 4259.32,
    currency: "$",
    title: "Your Balance",
    showIcon: true
  }}
/>

<!-- BalanceCard com valor grande -->
<Story
  name="Valor Grande"
  args={{
    balance: 1234567.89,
    currency: "$",
    title: "Your Balance",
    showIcon: true
  }}
/>

<!-- BalanceCard com Real brasileiro -->
<Story
  name="Real Brasileiro"
  args={{
    balance: 15750.50,
    currency: "R$",
    title: "Seu Saldo",
    showIcon: true
  }}
/>

<!-- BalanceCard sem ícone -->
<Story
  name="Sem Ícone"
  args={{
    balance: 4259.32,
    currency: "$",
    title: "Your Balance",
    showIcon: false
  }}
/>

<!-- BalanceCard com título personalizado -->
<Story
  name="Título Personalizado"
  args={{
    balance: 4259.32,
    currency: "$",
    title: "Available Credit",
    showIcon: true
  }}
/>

<!-- BalanceCard com Euro -->
<Story
  name="Euro"
  args={{
    balance: 3500.75,
    currency: "€",
    title: "Your Balance",
    showIcon: true
  }}
/>
