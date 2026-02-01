import { Context } from "hono";
import { generateCryptoId } from "../utils/randomId";
import { getContext } from "hono/context-storage";
import { Env } from "../types";
export const createLink = async (url: string, c: Context) => {
  const cleanUrl = url.trim();
  const generatedId = generateCryptoId(5, 7);
  const user = c.get("user");
  const res = await c.env.DB.prepare(
      'INSERT INTO links (url, short_url, user_id) VALUES (?, ?, ?) ON CONFLICT(url) DO NOTHING'
  ).bind(cleanUrl, generatedId, user.id).run();

  if (res.meta.changes === 1) return { short_url: generatedId };
  
  const existingLink = await c.env.DB.prepare(
      'SELECT short_url FROM links WHERE url = ?'
  ).bind(cleanUrl).first();

  return { short_url: existingLink.short_url };
};


export const getLinksByUser = async (userId: string) => {

  const { env } = getContext<Env>();

  const links = await env.DB.prepare(
      'SELECT url, short_url, clicks, created_at FROM links WHERE user_id = ? ORDER BY created_at DESC'
  ).bind(userId).all();

  return links.results || [];
}
