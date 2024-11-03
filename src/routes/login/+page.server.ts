// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { createHash } from 'crypto';

export const actions: Actions = {: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get('password') as string;

    if (!password) {
      return fail(400, { error: 'Password is required' });
    }

    // Get the password from environment variables
    const plainPassword = env.PASSWORD;

    // Compare the entered password with the one in the environment variables
    if (password === plainPassword) {
      // Hash the password and store it in a cookie
      const hashedPassword = createHash('sha256').update(plainPassword).digest('hex');
      cookies.set('auth', hashedPassword, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: false, // Set to true if using HTTPS
        maxAge: 60 * 60 * 1, // 1 hour
      });
      throw redirect(303, '/');
    } else {
      return fail(401, { error: 'Incorrect password' });
    }
  }
};
