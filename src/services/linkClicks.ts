import { getContext } from "hono/context-storage";
import { Env } from "../types";
export const recordLinkClick = async (short_url: string, ip: string, referer: string) => {
  const { env } = getContext<Env>();

  const clickData = {
    timestamp: Date.now(),
    ip_address: ip,
    referer,
  };

  await env.kv.put(`clicks_${short_url}`, JSON.stringify(clickData));
}
