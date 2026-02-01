import { Context } from "hono";
import { GoogleProvider } from "./_providers/googleProvider";
import { securePassword } from "../../utils/securePassword";
import { baseDomain } from "../../utils/baseDomain";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { createUser } from "../../services/users";
import bcrypt from "bcryptjs";

export const callbackController = async (c: Context) => {
  const { code, state = null } = c.req.query();
  const { JWT_SECRET } = c.env;
  const site = c.req.url;

  const provider = new GoogleProvider();
  const providerToken = await provider.getToken(
    {
      code,
      state,
    },
    c.req.url,
  );

  if (!providerToken) throw new Error("Failed to get provider token");

  const { email, email_verified, ...rest } =
    await provider.getUser(providerToken);

  if (!email || !email_verified) throw new Error("Email not verified");

  const hash = await bcrypt.hash(securePassword(16), 10);

  let user = await createUser({
    username: rest.login || rest.username,
    email,
    passwordHash: hash,
  });

  const domain = baseDomain(new URL(site).hostname as string);
  const token = await generateToken({ ...rest, ...user }, JWT_SECRET);
  const isProd = site.startsWith("https://");

  setCookie(c, "access_token", token, {
    path: "/",
    secure: isProd,
    domain: isProd ? `.${domain}` : "localhost",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    sameSite: isProd ? "none" : "lax",
  });

  return c.redirect("/dashboard");
};

async function generateToken(payload: any, secret: string) {
  return await sign(payload, secret);
}
