import cantinhodoce from '$lib/assets/cantinhodoce_logo.png';
import casaarruda from '$lib/assets/casaarruda_logo.jpeg';
import casasfreitas from '$lib/assets/casasfreitas_logo.png';
import casasvidal from '$lib/assets/casasvidal_logo.png';
import potiguar from '$lib/assets/potiguar_logo.webp';
import terrazoo from '$lib/assets/terrazoo_logo.png';
import type { Company, MiniApp } from '$lib/types';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Cantinho Doce',
    icon: cantinhodoce,
    href: '#',
    status: 'story'
  },
  {
    id: '2',
    name: 'Potiguar',
    icon: potiguar,
    href: '#',
    status: 'live'
  },
  {
    id: '3',
    name: 'Terra Zoo',
    icon: terrazoo,
    href: '#',
    status: 'story'
  },
  {
    id: '4',
    name: 'Casa Arruda',
    icon: casaarruda,
    href: '#'
  },
  {
    id: '5',
    name: 'Casas Freitas',
    icon: casasfreitas,
    href: '#',
    status: 'story'
  },
  {
    id: '6',
    name: 'Casas Vidal',
    icon: casasvidal,
    href: '#'
  }
];

export const mockMiniApps: MiniApp[] = [
  {
    id: 'cantinhodoce-main',
    companyId: '1',
    title: 'Cantinho Doce',
    path: '/cantinhodoce'
  },
  {
    id: 'potiguar-main',
    companyId: '2',
    title: 'Potiguar',
    path: '/potiguar'
  },
  {
    id: 'terrazoo-main',
    companyId: '3',
    title: 'Terra Zoo',
    path: '/terrazoo'
  },
  {
    id: 'casaarruda-main',
    companyId: '4',
    title: 'Casa Arruda',
    path: '/casaarruda'
  },
  {
    id: 'casasfreitas-main',
    companyId: '5',
    title: 'Casas Freitas',
    path: '/casasfreitas'
  },
  {
    id: 'casasvidal-main',
    companyId: '6',
    title: 'Casas Vidal',
    path: '/casasvidal'
  }
];