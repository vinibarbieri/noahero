import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Redirecionar para a rota principal da aplicação
  throw redirect(302, '/company/casa-arruda');
};
