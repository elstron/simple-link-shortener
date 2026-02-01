import { Context } from "hono";
import { MyLinks } from "../views/ui/dashboard/MyLinks";

export const myLinksController = async (c: Context) => {
  const user = c.get("user");
  const base = new URL("/", c.req.url).origin;
  const view =  await MyLinks({base ,...user, });
  return c.html(`
      ${view}
    `);
}
