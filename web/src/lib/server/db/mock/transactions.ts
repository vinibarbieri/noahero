// Importar imagens locais para os ícones
import img7 from '$lib/assets/7.png';
import img8 from '$lib/assets/8.png';
import img9 from '$lib/assets/9.png';
import img10 from '$lib/assets/10.png';
import img11 from '$lib/assets/11.png';

export type TransactionMock = {
  id: string;
  companyId: string;
  userId: string;
  name: string;
  icon: string;
  verified: boolean;
  price: number;
  currency: string;
  volume: number;
  date: Date;
  type: 'buy' | 'sell' | 'transfer';
  createdAt: Date;
  updatedAt: Date;
};

// Dados mockados de transações
export const transactionsMock: TransactionMock[] = [
  {
    id: '1',
    companyId: '1', // Cantinho Doce
    userId: 'user1',
    name: 'ORGNLS',
    icon: img7,
    verified: true,
    price: 0.01,
    currency: 'ETH',
    volume: 30,
    date: new Date(2023, 5, 15),
    type: 'buy',
    createdAt: new Date(2023, 5, 15),
    updatedAt: new Date(2023, 5, 15)
  },
  {
    id: '2',
    companyId: '1', // Cantinho Doce
    userId: 'user1',
    name: 'ANOMALLY',
    icon: img8,
    verified: true,
    price: 0.01,
    currency: 'ETH',
    volume: 30,
    date: new Date(2023, 5, 16),
    type: 'sell',
    createdAt: new Date(2023, 5, 16),
    updatedAt: new Date(2023, 5, 16)
  },
  {
    id: '3',
    companyId: '5', // Terra Zoo
    userId: 'user2',
    name: 'ORGNLS',
    icon: img9,
    verified: true,
    price: 0.01,
    currency: 'ETH',
    volume: 30,
    date: new Date(2023, 5, 17),
    type: 'transfer',
    createdAt: new Date(2023, 5, 17),
    updatedAt: new Date(2023, 5, 17)
  },
  {
    id: '4',
    companyId: '5', // Terra Zoo
    userId: 'user2',
    name: 'CRYPTOPUNKS',
    icon: img10,
    verified: true,
    price: 0.05,
    currency: 'ETH',
    volume: 15,
    date: new Date(2023, 5, 18),
    type: 'buy',
    createdAt: new Date(2023, 5, 18),
    updatedAt: new Date(2023, 5, 18)
  },
  {
    id: '5',
    companyId: '10', // Casa Arruda
    userId: 'user3',
    name: 'BAYC',
    icon: img11,
    verified: true,
    price: 0.08,
    currency: 'ETH',
    volume: 10,
    date: new Date(2023, 5, 19),
    type: 'sell',
    createdAt: new Date(2023, 5, 19),
    updatedAt: new Date(2023, 5, 19)
  }
];
