<script context="module" lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import TransactionList from './TransactionList.svelte';

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
    },
    {
      id: '4',
      name: 'CRYPTOPUNKS',
      verified: true,
      price: 0.05,
      currency: 'ETH',
      volume: 15,
      date: new Date(2023, 5, 18),
      type: 'buy'
    },
    {
      id: '5',
      name: 'BAYC',
      verified: true,
      price: 0.08,
      currency: 'ETH',
      volume: 10,
      date: new Date(2023, 5, 19),
      type: 'sell'
    },
    {
      id: '6',
      name: 'DOODLES',
      verified: false,
      price: 0.03,
      currency: 'ETH',
      volume: 5,
      date: new Date(2023, 5, 20),
      type: 'transfer'
    },
    {
      id: '7',
      name: 'AZUKI',
      verified: true,
      price: 0.12,
      currency: 'ETH',
      volume: 8,
      date: new Date(2023, 5, 21),
      type: 'buy'
    }
  ];

  const { Story } = defineMeta({
    title: 'Molecules/TransactionList',
    component: TransactionList,
    tags: ['autodocs'],
    argTypes: {
      transactions: {
        control: 'object',
        description: 'Array de transações a serem exibidas na lista'
      },
      title: {
        control: 'text',
        description: 'Título da lista de transações'
      },
      isOwner: {
        control: 'boolean',
        description: 'Indica se o usuário é proprietário (mostra todas as transações) ou não (mostra apenas suas transações)'
      },
      onSeeMore: {
        action: 'seeMore',
        description: 'Função chamada quando o botão "Ver mais" é clicado'
      },
      onTransactionClick: {
        action: 'transactionClicked',
        description: 'Função chamada quando uma transação é clicada'
      }
    },
    args: {
      onSeeMore: fn(),
      onTransactionClick: fn()
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente TransactionList é usado para exibir uma lista de transações com NFTs e tokens nativos.
            
            ### Características
            
            - Exibe lista de transações com informações detalhadas
            - Mostra ícones para indicar o tipo de transação (compra, venda, transferência)
            - Filtragem baseada no tipo de usuário (proprietário vê todas, usuário comum vê apenas as suas)
            - Suporte a eventos de clique em transações individuais
            - Botão "Ver mais" para acessar todas as transações
            - Layout responsivo
            
            ### Uso
            
            \`\`\`svelte
            <TransactionList
              transactions={transactions}
              title="Extrato de Transações"
              isOwner={false}
              onTransactionClick={(id) => console.log('Transação clicada:', id)}
              onSeeMore={() => console.log('Ver mais transações')}
            />
            \`\`\`
          `
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div class="p-4 max-w-2xl">
    <TransactionList {...args} />
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- TransactionList para usuário comum -->
<Story
  name="Usuário Comum"
  args={{
    transactions: exampleTransactions,
    title: "Extrato de Transações",
    isOwner: false
  }}
/>

<!-- TransactionList para proprietário -->
<Story
  name="Proprietário"
  args={{
    transactions: exampleTransactions,
    title: "Extrato de Transações",
    isOwner: true
  }}
/>

<!-- TransactionList sem transações -->
<Story
  name="Sem Transações"
  args={{
    transactions: [],
    title: "Extrato de Transações",
    isOwner: false
  }}
/>

<!-- TransactionList com título personalizado -->
<Story
  name="Título Personalizado"
  args={{
    transactions: exampleTransactions,
    title: "Histórico de NFTs",
    isOwner: false
  }}
/>
