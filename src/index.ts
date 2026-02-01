import { Hono } from "hono";
import type { Bindings } from "./types";
import { redirectController } from "./controllers/redirectController";
import { homeController } from "./controllers/homeController";
import { createShortLinkController } from "./controllers/createShortLinkController";
import { contextStorage } from "hono/context-storage";
import { dashboardController } from "./controllers/dashboardController";
import { loginController } from "./controllers/OAuth/loginController";
import { callbackController } from "./controllers/OAuth/callbackController";
import { OAuthState } from "./durableObjects/OAuthState";
import { myLinksController } from "./controllers/myLinksController";
import { authenticate } from "./middlewares/Authenticate";
import { logoutController } from "./controllers/OAuth/logoutController";
import { privacyController } from "./controllers/privacyController";
export { OAuthState };

const app = new Hono<{ Bindings: Bindings }>();
app.use(contextStorage())
app.get("/", homeController);
app.get("/privacy", privacyController);

app.get("/oauth/login", loginController);
app.get("/oauth/callback", callbackController);
app.get("/logout", logoutController)
app.get("/dashboard",authenticate,dashboardController);
app.get("/dashboard/my_links",authenticate,myLinksController);

app.post("/shorten", authenticate,createShortLinkController);
app.get("/:short_url", redirectController);

export default app;
