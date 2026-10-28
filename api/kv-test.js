import { kv } from '@vercel/kv';
export default async function handler(req, res) {
  try {
    const count = (await kv.get('test:live') || 0) + 1;
    await kv.set('test:live', count);
    await kv.sadd('test:bad', 'xxx', 'porn', 'sex');
    const bad = await kv.smembers('test:bad');
    return res.json({
      success: true,
      message: 'KV WORKING BOSS!',
      live_users: count,
      bad_words: bad,
      main_uptown_safe: 'YES - kampala-business untouched!'
    });
  } catch(e) {
    return res.status(500).json({error: e.message});
  }
}
