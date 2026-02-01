import { Context } from "hono";
import { Privacy } from "../views/Privacy";

export const privacyController = async (c: Context) => {
  return c.html(`
      ${Privacy()}
    `);
}
