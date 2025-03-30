// Este arquivo simula uma camada de acesso a banco de dados
// Quando tivermos um banco de dados real, substituiremos as implementações
// mas manteremos a mesma interface

import { vouchersMock } from './vouchers';
import { transactionsMock } from './transactions';
import { companiesMock } from './companies';
import { productsMock } from './products';
import type { Company } from '$lib/types';

// Simulação de delay para simular chamadas de rede
const SIMULATED_DELAY = 300;

// Função auxiliar para simular delay de rede
async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Interface para o banco de dados
export const db = {
  // Vouchers
  vouchers: {
    // Obter todos os vouchers
    getAll: async () => {
      await delay(SIMULATED_DELAY);
      return vouchersMock;
    },
    
    // Obter vouchers por companyId
    getByCompany: async (companyId: string) => {
      await delay(SIMULATED_DELAY);
      return vouchersMock.filter(voucher => voucher.companyId === companyId);
    },
    
    // Obter um voucher por ID
    getById: async (id: string) => {
      await delay(SIMULATED_DELAY);
      return vouchersMock.find(voucher => voucher.id === id);
    }
  },
  
  // Transações
  transactions: {
    // Obter todas as transações
    getAll: async () => {
      await delay(SIMULATED_DELAY);
      return transactionsMock;
    },
    
    // Obter transações por companyId
    getByCompany: async (companyId: string) => {
      await delay(SIMULATED_DELAY);
      return transactionsMock.filter(transaction => transaction.companyId === companyId);
    },
    
    // Obter transações por userId
    getByUser: async (userId: string) => {
      await delay(SIMULATED_DELAY);
      return transactionsMock.filter(transaction => transaction.userId === userId);
    }
  },
  
  // Empresas
  companies: {
    // Obter todas as empresas
    getAll: async () => {
      await delay(SIMULATED_DELAY);
      return companiesMock;
    },
    
    // Obter uma empresa por ID
    getById: async (id: string) => {
      await delay(SIMULATED_DELAY);
      return companiesMock.find(company => company.id === id);
    },
    
    // Obter uma empresa por slug
    getBySlug: async (slug: string) => {
      await delay(SIMULATED_DELAY);
      return companiesMock.find(company => company.slug === slug);
    }
  },
  
  // Produtos
  products: {
    // Obter todos os produtos
    getAll: async () => {
      await delay(SIMULATED_DELAY);
      return productsMock;
    },
    
    // Obter produtos por companyId
    getByCompany: async (companyId: string) => {
      await delay(SIMULATED_DELAY);
      return productsMock.filter(product => product.companyId === companyId);
    },
    
    // Obter um produto por ID
    getById: async (id: string) => {
      await delay(SIMULATED_DELAY);
      return productsMock.find(product => product.id === id);
    }
  }
};
