// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createHash } from 'crypto';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const password = env.PASSWORD;

  // If no password is set, skip authentication
  if (!password) {
    return await resolve(event);
  }

  const authCookie = event.cookies.get('auth');

  if (!authCookie && event.url.pathname !== '/login') {
    throw redirect(302, '/login');
  }

  if (authCookie) {
    // Hash the password from environment variables
    const hashedPassword = createHash('sha256').update(password).digest('hex');

    // Compare the hash from the cookie with the hashed password
    const isAuthenticated = authCookie === hashedPassword;

    if (!isAuthenticated && event.url.pathname !== '/login') {
      throw redirect(302, '/login');
    }
  }

  return await resolve(event);
};
