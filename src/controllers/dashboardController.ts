import { Context } from "hono";
import { Dashboard } from "../views/Dashboard";

export const dashboardController = (c: Context) => {
  return c.html(`
      ${Dashboard()}
    `);
}
