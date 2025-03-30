// Importar imagens locais para os NFTs
import img1 from '$lib/assets/1.png';
import img2 from '$lib/assets/2.png';
import img3 from '$lib/assets/3.png';
import img4 from '$lib/assets/4.png';
import img5 from '$lib/assets/5.png';
import img6 from '$lib/assets/6.png';

// Tipos
export type Owner = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

export type VoucherMock = {
  id: string;
  companyId: string;
  name: string;
  image: string;
  price?: number;
  timeRemaining?: string;
  notForSale?: boolean;
  owners?: Owner[];
  createdAt: Date;
  updatedAt: Date;
};

// Dados mockados de vouchers
export const vouchersMock: VoucherMock[] = [
  {
    id: '128',
    companyId: '1', // Cantinho Doce
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
    ],
    createdAt: new Date(2023, 1, 15),
    updatedAt: new Date(2023, 1, 15)
  },
  {
    id: '20',
    companyId: '1', // Cantinho Doce
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
    ],
    createdAt: new Date(2023, 2, 10),
    updatedAt: new Date(2023, 2, 10)
  },
  {
    id: '999',
    companyId: '5', // Terra Zoo
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
    ],
    createdAt: new Date(2023, 3, 5),
    updatedAt: new Date(2023, 3, 5)
  },
  {
    id: '42',
    companyId: '5', // Terra Zoo
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
    ],
    createdAt: new Date(2023, 4, 20),
    updatedAt: new Date(2023, 4, 20)
  },
  {
    id: '77',
    companyId: '10', // Casa Arruda
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
    ],
    createdAt: new Date(2023, 5, 10),
    updatedAt: new Date(2023, 5, 10)
  },
  {
    id: '101',
    companyId: '10', // Casa Arruda
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
    ],
    createdAt: new Date(2023, 6, 1),
    updatedAt: new Date(2023, 6, 1)
  }
];
