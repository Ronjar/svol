// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const authCookie = cookies.get('auth');
  const isAuthenticated = authCookie !== undefined;

  return {
    user: isAuthenticated
  };
};
