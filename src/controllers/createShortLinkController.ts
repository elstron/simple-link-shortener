import { Context } from "hono";
import { createLink } from "../services/links";
import { Result } from "../ui/components/Result";

export const createShortLinkController = async (c: Context) => {
  const host = c.req.url;
  const baseURl = new URL("/", host);
  const url = (await c.req.formData()).get("url") as string;
  
  if (!url) return c.html(`<p>URL is required</p>`);

  try {
    const result = await createLink(url, c);
    
    if(!result) throw new Error("Failed to create Link"); 

    return c.html(`
        ${Result(baseURl + result.short_url)}
    `);

  } catch (e) {
    console.error(e);
    return c.html(`
      <p>Failed to create Link</p>
    `);
  }
}
