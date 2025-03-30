import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

// Importar imagens locais para os NFTs
import img1 from '$lib/assets/1.png';
import img2 from '$lib/assets/2.png';
import img3 from '$lib/assets/3.png';
import img4 from '$lib/assets/4.png';
import img5 from '$lib/assets/5.png';
import img6 from '$lib/assets/6.png';
import img7 from '$lib/assets/7.png';
import img8 from '$lib/assets/8.png';
import img9 from '$lib/assets/9.png';
import img10 from '$lib/assets/10.png';
import img11 from '$lib/assets/11.png';
import img12 from '$lib/assets/12.png';

// Tipos
export type Owner = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

export type Voucher = {
  id: string;
  name: string;
  image: string;
  price?: number;
  timeRemaining?: string;
  notForSale?: boolean;
  owners?: Owner[];
};

export type Transaction = {
  id: string;
  name: string;
  icon: string;
  verified: boolean;
  price: number;
  currency: string;
  volume: number;
  date: Date;
  type: 'buy' | 'sell' | 'transfer';
};

export type VoucherContextType = {
  vouchers: Writable<Voucher[]>;
  transactions: Writable<Transaction[]>;
};

// Chave do contexto
const VOUCHER_CONTEXT_KEY = 'voucher-context';

// Dados de exemplo para vouchers
const defaultVouchers: Voucher[] = [
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
      },
      {
        id: 2,
        name: "Robert Johnson",
        designation: "Co-owner",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
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
        id: 1,
        name: "John Doe",
        designation: "Owner",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
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
        id: 1,
        name: "John Doe",
        designation: "Owner",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
      },
      {
        id: 2,
        name: "Robert Johnson",
        designation: "Co-owner",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
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
      },
      {
        id: 6,
        name: "Dora",
        designation: "Co-owner",
        image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
      }
    ]
  },
  {
    id: '101',
    name: 'Azuki',
    image: img6,
    price: 1.2,
    timeRemaining: '1d 5h',
    owners: [
      {
        id: 7,
        name: "Alex Morgan",
        designation: "Owner",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
      }
    ]
  }
];

// Dados de exemplo para transações
const defaultTransactions: Transaction[] = [
  {
    id: '1',
    name: 'ORGNLS',
    icon: img7,
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
    icon: img8,
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
    icon: img9,
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
    icon: img10,
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
    icon: img11,
    verified: true,
    price: 0.08,
    currency: 'ETH',
    volume: 10,
    date: new Date(2023, 5, 19),
    type: 'sell'
  }
];

// Função para criar e definir o contexto
export function setVoucherContext(initialVouchers?: Voucher[], initialTransactions?: Transaction[]) {
  const vouchers = writable<Voucher[]>(initialVouchers || defaultVouchers);
  const transactions = writable<Transaction[]>(initialTransactions || defaultTransactions);

  const context: VoucherContextType = {
    vouchers,
    transactions
  };

  return setContext<VoucherContextType>(VOUCHER_CONTEXT_KEY, context);
}

// Função para obter o contexto
export function getVoucherContext() {
  return getContext<VoucherContextType>(VOUCHER_CONTEXT_KEY);
}
