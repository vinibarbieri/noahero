export type ProductMock = {
  id: string;
  companyId: string;
  title: string;
  imageUrl: string;
  price: number;
  points: number;
  tag?: string;
  tagVariant?: 'primary' | 'success' | 'warning' | 'default' | 'danger';
  isFavorite?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Dados mockados de produtos
export const productsMock: ProductMock[] = [
  {
    id: '1',
    companyId: '1', // Cantinho Doce
    title: 'Café Especial',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    price: 25.9,
    points: 259,
    isFavorite: false,
    createdAt: new Date(2023, 1, 15),
    updatedAt: new Date(2023, 1, 15)
  },
  {
    id: '2',
    companyId: '1', // Cantinho Doce
    title: 'Bolo de Chocolate',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    price: 45.0,
    points: 450,
    tag: 'Novo',
    tagVariant: 'primary',
    isFavorite: true,
    createdAt: new Date(2023, 2, 10),
    updatedAt: new Date(2023, 2, 10)
  },
  {
    id: '3',
    companyId: '1', // Cantinho Doce
    title: 'Croissant',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JvaXNzYW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=1026&q=80',
    price: 12.5,
    points: 125,
    isFavorite: false,
    createdAt: new Date(2023, 3, 5),
    updatedAt: new Date(2023, 3, 5)
  },
  {
    id: '4',
    companyId: '5', // Terra Zoo
    title: 'Ração Premium',
    imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    price: 89.9,
    points: 899,
    isFavorite: false,
    createdAt: new Date(2023, 4, 20),
    updatedAt: new Date(2023, 4, 20)
  },
  {
    id: '5',
    companyId: '5', // Terra Zoo
    title: 'Brinquedo para Cães',
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    price: 35.0,
    points: 350,
    tag: 'Promoção',
    tagVariant: 'success',
    isFavorite: true,
    createdAt: new Date(2023, 5, 10),
    updatedAt: new Date(2023, 5, 10)
  },
  {
    id: '6',
    companyId: '10', // Casa Arruda
    title: 'Carregador iPhone',
    imageUrl: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    price: 129.9,
    points: 1299,
    isFavorite: false,
    createdAt: new Date(2023, 6, 1),
    updatedAt: new Date(2023, 6, 1)
  },
  {
    id: '7',
    companyId: '10', // Casa Arruda
    title: 'Capa iPhone 14',
    imageUrl: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    price: 89.9,
    points: 899,
    tag: 'Último',
    tagVariant: 'warning',
    isFavorite: true,
    createdAt: new Date(2023, 7, 15),
    updatedAt: new Date(2023, 7, 15)
  }
];
