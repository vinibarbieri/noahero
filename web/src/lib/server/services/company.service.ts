import { db } from '../db/mock';
import type { CompanyMock } from '../db/mock/companies';
import type { ProductMock } from '../db/mock/products';
import type { VoucherMock } from '../db/mock/vouchers';
import type { TransactionMock } from '../db/mock/transactions';

// Serviço para empresas
export const companyService = {
  // Obter todas as empresas
  getAllCompanies: async (): Promise<CompanyMock[]> => {
    return db.companies.getAll();
  },
  
  // Obter uma empresa por ID
  getCompanyById: async (id: string): Promise<CompanyMock | undefined> => {
    return db.companies.getById(id);
  },
  
  // Obter uma empresa por slug
  getCompanyBySlug: async (slug: string): Promise<CompanyMock | undefined> => {
    return db.companies.getBySlug(slug);
  },
  
  // Obter produtos de uma empresa
  getCompanyProducts: async (companyId: string): Promise<ProductMock[]> => {
    return db.products.getByCompany(companyId);
  },
  
  // Obter vouchers de uma empresa
  getCompanyVouchers: async (companyId: string): Promise<VoucherMock[]> => {
    return db.vouchers.getByCompany(companyId);
  },
  
  // Obter transações de uma empresa
  getCompanyTransactions: async (companyId: string): Promise<TransactionMock[]> => {
    return db.transactions.getByCompany(companyId);
  },
  
  // Obter dados completos de uma empresa (incluindo produtos, vouchers e transações)
  getCompanyFullData: async (companyIdOrSlug: string): Promise<{
    company: CompanyMock | undefined;
    products: ProductMock[];
    vouchers: VoucherMock[];
    transactions: TransactionMock[];
  }> => {
    // Verificar se é um ID ou slug
    let company: CompanyMock | undefined;
    
    if (companyIdOrSlug.match(/^[0-9]+$/)) {
      // É um ID
      company = await db.companies.getById(companyIdOrSlug);
    } else {
      // É um slug
      company = await db.companies.getBySlug(companyIdOrSlug);
    }
    
    if (!company) {
      return {
        company: undefined,
        products: [],
        vouchers: [],
        transactions: []
      };
    }
    
    // Obter dados relacionados
    const [products, vouchers, transactions] = await Promise.all([
      db.products.getByCompany(company.id),
      db.vouchers.getByCompany(company.id),
      db.transactions.getByCompany(company.id)
    ]);
    
    return {
      company,
      products,
      vouchers,
      transactions
    };
  }
};
