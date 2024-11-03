// src/routes/+page.server.ts
import { env } from '$env/dynamic/private';

export const load = async () => {
  const devices = [];

  for (const key in env) {
    if (key.startsWith('DEVICE_')) {
      const [name, ip, mac] = env[key].split(';');
      devices.push({ name, ip, mac, status: 'unknown' });
    }
  }

  return { devices };
};
