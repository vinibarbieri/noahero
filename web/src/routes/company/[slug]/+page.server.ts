import { companyService } from '$lib/server/services/company.service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  
  // Obter dados completos da empresa
  const { company, products, vouchers, transactions } = await companyService.getCompanyFullData(slug);
  
  // Se a empresa não for encontrada, retornar erro 404
  if (!company) {
    throw error(404, 'Empresa não encontrada');
  }
  
  // Retornar os dados para a página
  return {
    company,
    products,
    vouchers,
    transactions,
    // Dados adicionais para o mini-app
    miniApp: {
      id: company.id,
      companyId: company.id,
      title: 'Dashboard',
      path: `/company/${slug}`
    }
  };
};
