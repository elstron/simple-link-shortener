import { Context } from "hono";
import { recordLinkClick } from "../services/linkClicks";

export const redirectController = async (c: Context) => {
  const short_url = (c.req.param("short_url") as string) || undefined;
  const referer = c.req.header("referer") || "unknown";
 
  const ip = c.req.header("x-forwarded-for") 
    ?? c.req.header("cf-connecting-ip") 
    ?? c.req.raw?.headers.get('x-real-ip')
    ?? "unknown";

  if (!short_url) return c.redirect("/");

  const res = await c.env.DB.prepare(
      "UPDATE links SET clicks = clicks + 1 WHERE short_url = ? RETURNING url"
    )
      .bind(short_url)
      .run();
 
  const url = res.results[0]?.url as string | undefined;
  const hasChanges = res.meta.changes > 0 || res.results.length === 1;

  if (!hasChanges || !url) return c.redirect("/");
 
  await recordLinkClick(short_url, ip, referer);  

  return c.redirect(url);

}
