import { Context } from "hono";
import { GoogleProvider } from "./_providers/googleProvider";

export const loginController = async (c:Context) => {
  const provider = new GoogleProvider()
  const site = c.req.url;

  return c.redirect(
    await provider.redirect(site)
  )
}
