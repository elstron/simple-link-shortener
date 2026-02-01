import { Context } from "hono";
import { deleteCookie } from "hono/cookie";

export const logoutController = async (c:Context) => {
  deleteCookie(c, "access_token") 
  return c.redirect("/")
}
