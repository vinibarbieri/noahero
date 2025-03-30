import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import type { Company } from '$lib/types';

// Chave do contexto
const COMPANY_CONTEXT_KEY = 'company-context';

// Tipo do contexto
export type CompanyContextType = {
  company: Writable<Company>;
  isOwnProfile: Writable<boolean>;
  products: Writable<Array<{
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    points: number;
    tag?: string;
    tagVariant?: 'primary' | 'success' | 'warning' | 'default' | 'danger';
    isFavorite?: boolean;
  }>>;
  favorites: Writable<string[]>;
};

// Função para criar e definir o contexto
export function setCompanyContext(
  initialCompany: Company,
  initialIsOwnProfile: boolean = false,
  initialProducts: Array<{
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    points: number;
    tag?: string;
    tagVariant?: 'primary' | 'success' | 'warning' | 'default' | 'danger';
    isFavorite?: boolean;
  }> = [],
  initialFavorites: string[] = []
) {
  const company = writable<Company>(initialCompany);
  const isOwnProfile = writable<boolean>(initialIsOwnProfile);
  const products = writable(initialProducts);
  const favorites = writable<string[]>(initialFavorites);

  const context: CompanyContextType = {
    company,
    isOwnProfile,
    products,
    favorites
  };

  return setContext<CompanyContextType>(COMPANY_CONTEXT_KEY, context);
}

// Função para obter o contexto
export function getCompanyContext() {
  return getContext<CompanyContextType>(COMPANY_CONTEXT_KEY);
}
