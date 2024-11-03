// src/routes/api/ping/+server.ts
import { json } from '@sveltejs/kit';
import ping from 'ping';

export const GET = async ({ url }) => {
  const ip = url.searchParams.get('ip');

  if (!ip) {
    return json({ online: false });
  }

  const res = await ping.promise.probe(ip);
  return json({ online: res.alive });
};
