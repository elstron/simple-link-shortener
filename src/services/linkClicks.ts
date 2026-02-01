import { getContext } from "hono/context-storage";
import { Env } from "../types";

export const recordLinkClick = async ( short_url: string, ip: string, referer: string ) => {
  const { env } = getContext<Env>();

  const clickData = {
    timestamp: Date.now(),
    ip_address: ip,
    referer,
  };

  const existingData = await env.kv.get(`link_clicks_${short_url}`, {
    type: "json",
  });

  let clicks = existingData 
    ? (existingData as Array<any>) : [];
  
  clicks.push(clickData);

  await env.kv.put(`link_clicks_${short_url}`, JSON.stringify(clicks));
};
