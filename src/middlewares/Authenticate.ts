import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { Context } from "hono";
import { createMiddleware } from "hono/factory";

export const authenticate = createMiddleware(async (c: Context, next) => {
  const authHeader = c.req.header("Authorization");
  const authCookie = getCookie(c, "access_token");

  const isHeader = authHeader && authHeader.startsWith("Bearer ");
  const isCookie = !!authCookie;

  let token: string | null = null;
  try {
    if (isHeader) {
      token = authHeader.replace("Bearer ", "");
    } else if (isCookie) {
      token = authCookie;
    }

    if (!token) throw new Error("No token provided");

    const payload = await verify(token, c.env.JWT_SECRET, "HS256");

    if (!payload) throw new Error("Invalid token");

    c.set("user", payload);
    await next();
  } catch (e) {
    console.error("Authentication error:", e);
    return c.redirect("/");
  }
});
