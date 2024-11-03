// src/routes/logout/+server.ts
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ cookies }) => {
  cookies.delete('auth', { path: '/' });
  throw redirect(302, '/login');
};
