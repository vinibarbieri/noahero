// Importar imagens locais para os logos
import cantinhodoce from '$lib/assets/cantinhodoce_logo.png';
import casaarruda from '$lib/assets/casaarruda_logo.jpeg';
import casasfreitas from '$lib/assets/casasfreitas_logo.png';
import casasvidal from '$lib/assets/casasvidal_logo.png';
import potiguar from '$lib/assets/potiguar_logo.webp';
import terrazoo from '$lib/assets/terrazoo_logo.png';

export type CompanyMock = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  status: 'active' | 'inactive' | 'pending' | 'story' | 'live' | 'none';
  isVerified: boolean;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  voucherBalance: number;
  voucherCurrency: string;
  category?: string;
  bio: string;
  links: Array<{ url: string; text: string }>;
  products?: Array<{ title: string; description: string; imageUrl?: string }>;
  address?: string;
  phone?: string;
  workingHours?: string;
  history?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  createdAt: Date;
  updatedAt: Date;
};

// Dados mockados de empresas
export const companiesMock: CompanyMock[] = [
  {
    id: '1',
    name: 'Cantinho Doce',
    slug: 'cantinhodoce',
    icon: cantinhodoce,
    status: 'story',
    category: 'Decoração',
    isVerified: true,
    postsCount: 358,
    followersCount: 12500,
    followingCount: 1250,
    voucherBalance: 2851.75,
    voucherCurrency: 'R$',
    bio: "Encante-se com a nossa coleção de artigos para festas e decoração! Criando momentos inesquecíveis desde sempre.",
    links: [
      { url: '#', text: 'Cantinho Doce no Facebook' }
    ],
    products: [
      { title: 'Decoração para festas', description: 'Balões, painéis decorativos, toalhas temáticas' },
      { title: 'Artigos para confeitaria', description: 'Forminhas, corantes e embalagens para doces' },
      { title: 'Presentes e lembrancinhas', description: 'Caixinhas personalizadas, laços e adesivos' }
    ],
    address: 'Loja no Centro de São Luís – MA',
    workingHours: 'Segunda a sábado, horário comercial',
    createdAt: new Date(2020, 1, 15),
    updatedAt: new Date(2023, 6, 10)
  },
  {
    id: '2',
    name: 'Potiguar',
    slug: 'potiguar',
    icon: potiguar,
    status: 'live',
    category: 'Home Center',
    isVerified: true,
    postsCount: 641,
    followersCount: 23400,
    followingCount: 3861,
    voucherBalance: 4259.32,
    voucherCurrency: 'R$',
    bio: "Desde 1981, líder no Maranhão em materiais para construção, reforma e decoração. Transformando sonhos em realidade.",
    links: [
      { url: 'https://www.apotiguar.com.br', text: 'www.apotiguar.com.br' },
      { url: '#', text: '@apotiguar' },
      { url: '#', text: 'Potiguar no Facebook' }
    ],
    products: [
      { title: 'Materiais de Construção', description: 'Cimentos, tijolos e tintas' },
      { title: 'Decoração', description: 'Lustres, cortinas e papéis de parede' },
      { title: 'Utilidades para o Lar', description: 'Ferramentas, jardinagem e eletrodomésticos' }
    ],
    address: 'Rua Caminho da Boiada, 354, São Luís – MA',
    phone: '(98) 2108-9999',
    history: 'Fundada em 1981 por Vieira Brasil, possui atualmente dez lojas no Maranhão, incluindo São Luís, Imperatriz, Bacabal e Santa Inês.',
    website: 'www.apotiguar.com.br',
    instagram: '@apotiguar',
    facebook: 'Potiguar no Facebook',
    createdAt: new Date(2021, 1, 15),
    updatedAt: new Date(2023, 6, 10)
  },
  {
    id: '3',
    name: 'Terra Zoo',
    slug: 'terrazoo',
    icon: terrazoo,
    status: 'story',
    category: 'Pet',
    isVerified: true,
    postsCount: 328,
    followersCount: 12500,
    followingCount: 1250,
    voucherBalance: 2850.75,
    voucherCurrency: 'R$',
    bio: "Tudo para o seu pet! Produtos e serviços de qualidade que fazem parte da sua família.",
    links: [
      { url: 'https://www.terrazoo.com.br', text: 'www.terrazoo.com.br' },
      { url: '#', text: '@terrazoo' },
      { url: '#', text: 'TerraZoo no Facebook' }
    ],
    products: [
      { title: 'Alimentos', description: 'Rações para cães, gatos e outros pets' },
      { title: 'Acessórios', description: 'Coleiras, brinquedos e camas' },
      { title: 'Serviços', description: 'Banho, tosa e atendimento veterinário' }
    ],
    website: 'www.terrazoo.com.br',
    instagram: '@terrazoo',
    facebook: 'TerraZoo no Facebook',
    createdAt: new Date(2021, 3, 20),
    updatedAt: new Date(2023, 5, 15)
  },
  {
    id: '4',
    name: 'Casa Arruda',
    slug: 'casa-arruda',
    icon: casaarruda,
    status: 'active',
    category: 'Eletrônicos',
    isVerified: true,
    postsCount: 641,
    followersCount: 23400,
    followingCount: 3861,
    voucherBalance: 4259.32,
    voucherCurrency: 'R$',
    bio: "Desde 1962, oferecendo uma ampla variedade de componentes e equipamentos eletroeletrônicos em São Luís. Qualidade e tradição que você confia.",
    links: [
      { url: 'https://www.casaarruda.com.br', text: 'www.casaarruda.com.br' },
      { url: '#', text: 'Casa Arruda no Facebook' },
      { url: '#', text: 'São Luís, Brazil' }
    ],
    products: [
      { title: 'Componentes Eletrônicos', description: 'Resistores, capacitores e transistores' },
      { title: 'Equipamentos de Som', description: 'Aparelhos de som e auto-falantes' },
      { title: 'Informática', description: 'Teclados, mouses e placas-mãe' }
    ],
    address: 'Rua da Cruz, 522 – Centro, São Luís – MA',
    phone: '(98) 3312-3472',
    workingHours: 'Segunda a Sexta das 08h às 18h; Sábado das 08h às 13h',
    history: 'Fundada em abril de 1962, iniciou como uma oficina de manutenção de rádios e televisores, evoluindo para a venda de componentes e equipamentos eletroeletrônicos.',
    website: 'www.casaarruda.com.br',
    facebook: 'Casa Arruda no Facebook',
    createdAt: new Date(2019, 8, 5),
    updatedAt: new Date(2023, 7, 1)
  },
  {
    id: '5',
    name: 'Casas Freitas',
    slug: 'casas-freitas',
    icon: casasfreitas,
    status: 'story',
    category: 'Variedades',
    isVerified: true,
    postsCount: 328,
    followersCount: 12500,
    followingCount: 1250,
    voucherBalance: 2850.75,
    voucherCurrency: 'R$',
    bio: "Um mundo de utilidades para o seu lar! Variedade, qualidade e preços incríveis esperam por você.",
    links: [
      { url: 'https://www.casafreitas.com', text: 'www.casafreitas.com' },
      { url: '#', text: '@casafreitas' },
      { url: '#', text: 'Casa Freitas no Facebook' }
    ],
    products: [
      { title: 'Decoração', description: 'Quadros, cortinas e tapetes' },
      { title: 'Utensílios Domésticos', description: 'Panelas, talheres e eletroportáteis' },
      { title: 'Brinquedos', description: 'Jogos educativos, bonecas e bicicletas' }
    ],
    website: 'www.casafreitas.com',
    instagram: '@casafreitas',
    facebook: 'Casa Freitas no Facebook',
    createdAt: new Date(2020, 5, 10),
    updatedAt: new Date(2023, 4, 15)
  },
  {
    id: '6',
    name: 'Casas Vidal',
    slug: 'casas-vidal',
    icon: casasvidal,
    status: 'active',
    category: 'Variedades',
    isVerified: true,
    postsCount: 328,
    followersCount: 12500,
    followingCount: 1250,
    voucherBalance: 2850.75,
    voucherCurrency: 'R$',
    bio: "Tradição e qualidade em variedades para o seu lar. Tudo o que você precisa em um só lugar!",
    links: [
      { url: '#', text: 'Casas Vidal no Facebook' }
    ],
    products: [
      { title: 'Utilidades domésticas', description: 'Panelas, potes plásticos e utensílios de cozinha' },
      { title: 'Presentes e decoração', description: 'Quadros, porta-retratos e enfeites' },
      { title: 'Material Escolar', description: 'Cadernos, lápis e mochilas' }
    ],
    address: 'Diversas unidades em São Luís – MA',
    workingHours: 'Segunda a sábado, horário comercial',
    facebook: 'Casas Vidal no Facebook',
    createdAt: new Date(2019, 3, 15),
    updatedAt: new Date(2023, 2, 10)
  }
];
