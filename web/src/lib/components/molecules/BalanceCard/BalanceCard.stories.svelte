<script context="module" lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import BalanceCard from './BalanceCard.svelte';

  // Dados de exemplo para vouchers
  const exampleVouchers = [
    {
      id: '1',
      name: 'Bitcoin',
      color: '#F7931A',
      percentChange: 145.5,
      value: 45000
    },
    {
      id: '2',
      name: 'Ethereum',
      color: '#627EEA',
      percentChange: 113,
      value: 3200
    },
    {
      id: '3',
      name: 'Solana',
      color: '#00FFA3',
      percentChange: -0.2,
      value: 120
    }
  ];

  // Dados de exemplo para transações
  const exampleTransactions = [
    {
      id: '1',
      name: 'ORGNLS',
      verified: true,
      price: 0.01,
      currency: 'ETH',
      volume: 30,
      date: new Date(2023, 5, 15),
      type: 'buy'
    },
    {
      id: '2',
      name: 'ANOMALLY',
      verified: true,
      price: 0.01,
      currency: 'ETH',
      volume: 30,
      date: new Date(2023, 5, 16),
      type: 'sell'
    },
    {
      id: '3',
      name: 'ORGNLS',
      verified: true,
      price: 0.01,
      currency: 'ETH',
      volume: 30,
      date: new Date(2023, 5, 17),
      type: 'transfer'
    }
  ];

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
      },
      percentChange: {
        control: 'number',
        description: 'Percentual de variação do saldo'
      },
      valueChange: {
        control: 'number',
        description: 'Valor absoluto da variação do saldo'
      },
      isOwner: {
        control: 'boolean',
        description: 'Indica se o usuário é proprietário (mostra todas as transações) ou não (mostra apenas suas transações)'
      },

    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente BalanceCard é usado para exibir o saldo de vouchers disponíveis para o usuário ou empresa.
            Ao clicar no card, um dialog detalhado é aberto mostrando informações adicionais sobre o saldo, vouchers disponíveis e transações.

            ### Características

            - Design compacto e limpo
            - Formatação automática de valores monetários
            - Suporte a diferentes moedas
            - Título personalizável
            - Ícone opcional
            - Adaptável a diferentes tamanhos
            - Interativo com abertura de dialog detalhado ao clicar
            - Visualização diferenciada para usuário comum e proprietário

            ### Uso

            \`\`\`svelte
            <BalanceCard
              balance={4259.32}
              currency="$"
              title="Your Balance"
              showIcon={true}
              percentChange={3.5}
              valueChange={150}
              isOwner={false}

              vouchers={vouchers}
              transactions={transactions}
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

<!-- BalanceCard para usuário comum -->
<Story
  name="Usuário Comum"
  args={{
    balance: 4259.32,
    currency: "$",
    title: "Your Balance",
    showIcon: true,
    percentChange: 3.5,
    valueChange: 150,
    isOwner: false,

    vouchers: exampleVouchers,
    transactions: exampleTransactions
  }}
/>

<!-- BalanceCard para proprietário -->
<Story
  name="Proprietário"
  args={{
    balance: 15750.50,
    currency: "R$",
    title: "Saldo da Conta",
    showIcon: true,
    percentChange: 5.2,
    valueChange: 780,
    isOwner: true,

    vouchers: exampleVouchers,
    transactions: exampleTransactions
  }}
/>

<!-- BalanceCard com variação negativa -->
<Story
  name="Variação Negativa"
  args={{
    balance: 3500.75,
    currency: "€",
    title: "Your Balance",
    showIcon: true,
    percentChange: -2.5,
    valueChange: -90,
    isOwner: false,

    vouchers: exampleVouchers,
    transactions: exampleTransactions
  }}
/>

<!-- BalanceCard sem ícone -->
<Story
  name="Sem Ícone"
  args={{
    balance: 4259.32,
    currency: "$",
    title: "Your Balance",
    showIcon: false,
    percentChange: 3.5,
    valueChange: 150,
    isOwner: false,

    vouchers: exampleVouchers,
    transactions: exampleTransactions
  }}
/>

<!-- BalanceCard com título personalizado -->
<Story
  name="Título Personalizado"
  args={{
    balance: 4259.32,
    currency: "$",
    title: "Available Credit",
    showIcon: true,
    percentChange: 3.5,
    valueChange: 150,
    isOwner: false,

    vouchers: exampleVouchers,
    transactions: exampleTransactions
  }}
/>
