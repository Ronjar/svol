// src/routes/api/wake/+server.ts
import { json } from '@sveltejs/kit';
import wol from 'wol';

export const POST = async ({ request }) => {
  const { mac } = await request.json();

  if (!mac) {
    return json({ success: false, error: 'MAC address is missing' });
  }

  try {
    await wol.wake(mac);
    return json({ success: true });
  } catch (error) {
    return json({ success: false, error: error.message });
  }
};
