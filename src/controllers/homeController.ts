import { Context } from "hono";
import { Home } from "../views/Home";

export const homeController = (c: Context) => {
  return c.html(`
      ${Home()}
    `);
}
