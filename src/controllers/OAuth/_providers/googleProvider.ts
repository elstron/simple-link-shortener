import { getContext } from "hono/context-storage";
import { Env } from "../../../types";
import { OAuthStateService } from "./OAuthStateProvider";
import { InvalidOAuthStateError } from "../_errors/InvalidOAuthStateError";

export class GoogleProvider  {
  private AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
  private TOKEN_URL = "https://oauth2.googleapis.com/token";
  private USER_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

  async redirect(site: string): Promise<string> {
    const { GOOGLE_CLIENT_ID } = getContext<Env>().env;

    const redirect_uri = new URL(
        "/oauth/callback?provider=google",
        site,
      ).toString(),
      response_type = "code",
      state = await OAuthStateService.generateState(),
      escopes = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ];

    return `${this.AUTHORIZE_URL}?${new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      scope: escopes.join(" "),
      redirect_uri,
      state,
      response_type,
      prompt: "consent",
    })}`;
  }

  async getToken(data: any, site: string): Promise<string | null> {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = getContext<Env>().env;

    const validState = await OAuthStateService.consumeState(data.state);
    if (!validState) 
      throw new InvalidOAuthStateError(`${site}/access/login`);

    const redirect_uri = new URL(
      "/oauth/callback?provider=google",
      site,
    ).toString();

    const query = new URLSearchParams({
      code: data.code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri,
    });

    const tokenRes = await fetch(`${this.TOKEN_URL}?${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token } = (await tokenRes.json()) as {
      access_token: string;
    };
    return access_token;
  }

  async getUser(token: string): Promise<any> {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const userRes = await fetch(this.USER_URL, { ...options });
    const user = (await userRes.json()) as any;
    return {
      ...user,
      avatar_url: user?.picture,
      email_verified: user?.verified_email,
      username: user?.email?.split("@")[0] || null,
      fullname: user?.name || null,
    };
  }
}
