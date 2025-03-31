<script context="module" lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import BalanceDialog from './BalanceDialog.svelte';

  // Importar imagens locais
  import img1 from '$lib/assets/1.png';
  import img2 from '$lib/assets/2.png';
  import img3 from '$lib/assets/3.png';
  import img4 from '$lib/assets/4.png';
  import img5 from '$lib/assets/5.png';

  // Dados de exemplo para NFTs
  const exampleVouchers = [
    {
      id: '128',
      name: 'Monk Punk',
      image: img1,
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m',
      owners: [
        {
          id: 1,
          name: "John Doe",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        }
      ]
    },
    {
      id: '20',
      name: 'Monk Punk',
      image: img2,
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m',
      owners: [
        {
          id: 2,
          name: "Robert Johnson",
          designation: "Co-owner",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        }
      ]
    },
    {
      id: '999',
      name: 'Cool Cat',
      image: img3,
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m',
      owners: [
        {
          id: 3,
          name: "Jane Smith",
          designation: "Contributor",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        }
      ]
    },
    {
      id: '42',
      name: 'Bored Ape',
      image: img4,
      price: 0.5,
      timeRemaining: '5h 30m',
      owners: [
        {
          id: 4,
          name: "Emily Davis",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        }
      ]
    },
    {
      id: '77',
      name: 'Crypto Punk',
      image: img5,
      price: 0.75,
      notForSale: true,
      owners: [
        {
          id: 5,
          name: "Tyler Durden",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        }
      ]
    }
  ];

  // Dados de exemplo para transações
  const exampleTransactions = [
    {
      id: '1',
      name: 'ORGNLS',
      icon: 'https://i.imgur.com/1Yk5Yrn.png',
      verified: true,
      price: 0.01,
      currency: 'ETH',
      volume: 30,
      date: new Date(2023, 5, 15),
      type: 'buy' as const
    },
    {
      id: '2',
      name: 'ANOMALLY',
      icon: 'https://i.imgur.com/Yd7MWXZ.png',
      verified: true,
      price: 0.01,
      currency: 'ETH',
      volume: 30,
      date: new Date(2023, 5, 16),
      type: 'sell' as const
    },
    {
      id: '3',
      name: 'ORGNLS',
      icon: 'https://i.imgur.com/1Yk5Yrn.png',
      verified: true,
      price: 0.01,
      currency: 'ETH',
      volume: 30,
      date: new Date(2023, 5, 17),
      type: 'transfer' as const
    },
    {
      id: '4',
      name: 'CRYPTOPUNKS',
      icon: 'https://i.imgur.com/Yd7MWXZ.png',
      verified: true,
      price: 0.05,
      currency: 'ETH',
      volume: 15,
      date: new Date(2023, 5, 18),
      type: 'buy' as const
    },
    {
      id: '5',
      name: 'BAYC',
      icon: 'https://i.imgur.com/1Yk5Yrn.png',
      verified: true,
      price: 0.08,
      currency: 'ETH',
      volume: 10,
      date: new Date(2023, 5, 19),
      type: 'sell' as const
    }
  ];

  const { Story } = defineMeta({
    title: 'Organisms/BalanceDialog',
    component: BalanceDialog,
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
      balance: {
        control: 'number',
        description: 'Valor do saldo a ser exibido'
      },
      currency: {
        control: 'text',
        description: 'Símbolo da moeda (ex: $, R$, €)'
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
    args: {
      onClose: fn()
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente BalanceDialog é usado para exibir informações detalhadas sobre o saldo, vouchers disponíveis e transações.

            ### Características

            - Exibe saldo total com variação percentual e absoluta
            - Mostra "Saldo disponível para cashback" para proprietários e "Coins Disponíveis" para usuários
            - Botão de "Recarregar" para proprietários e "Comprar" para usuários
            - Dialog de checkout para adicionar fundos

            - Abas para alternar entre vouchers e transações
            - Visualização diferenciada para usuário comum e proprietário
            - Carrossel de vouchers disponíveis
            - Lista de transações com NFTs e tokens nativos
            - Suporte a diferentes moedas
            - Layout responsivo

            ### Uso

            \`\`\`svelte
            <BalanceDialog
              isOpen={showDialog}
              onClose={() => showDialog = false}
              balance={150032}
              currency="R$"
              percentChange={3.5}
              valueChange={12456}
              isOwner={true}

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
  <div class="p-4">
    <BalanceDialog {...args} />

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

<!-- BalanceDialog para usuário comum -->
<Story
  name="Usuário Comum"
  args={{
    isOpen: true,
    balance: 75000,
    currency: "R$",
    percentChange: 3.5,
    valueChange: 12456,
    isOwner: false,

    vouchers: exampleVouchers,
    transactions: exampleTransactions
  }}
/>

<!-- BalanceDialog para proprietário -->
<Story
  name="Proprietário"
  args={{
    isOpen: true,
    balance: 150032,
    currency: "R$",
    percentChange: 3.5,
    valueChange: 12456,
    isOwner: true,

    vouchers: exampleVouchers,
    transactions: exampleTransactions
  }}
/>

<!-- BalanceDialog com variação negativa -->
<Story
  name="Variação Negativa"
  args={{
    isOpen: true,
    balance: 75000,
    currency: "R$",
    percentChange: -2.5,
    valueChange: -1890,
    isOwner: false,

    vouchers: exampleVouchers,
    transactions: exampleTransactions
  }}
/>

<!-- BalanceDialog sem vouchers -->
<Story
  name="Sem Vouchers"
  args={{
    isOpen: true,
    balance: 75000,
    currency: "R$",
    percentChange: 3.5,
    valueChange: 12456,
    isOwner: false,

    vouchers: [],
    transactions: exampleTransactions
  }}
/>

<!-- BalanceDialog sem transações -->
<Story
  name="Sem Transações"
  args={{
    isOpen: true,
    balance: 75000,
    currency: "R$",
    percentChange: 3.5,
    valueChange: 12456,
    isOwner: false,

    vouchers: exampleVouchers,
    transactions: []
  }}
/>

<!-- BalanceDialog fechado -->
<Story
  name="Fechado"
  args={{
    isOpen: false,
    balance: 75000,
    currency: "R$",
    percentChange: 3.5,
    valueChange: 12456,
    isOwner: false,

    vouchers: exampleVouchers,
    transactions: exampleTransactions
  }}
/>
