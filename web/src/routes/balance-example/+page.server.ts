import { companyService } from '$lib/server/services/company.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Usar Casa Arruda como exemplo
  const companySlug = 'casa-arruda';
  const { company, vouchers, transactions } = await companyService.getCompanyFullData(companySlug);

  return {
    company,
    vouchers,
    transactions
  };
};