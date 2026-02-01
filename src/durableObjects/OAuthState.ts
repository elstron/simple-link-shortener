import { Env } from "../types";
import { DurableObject } from "cloudflare:workers";

export class OAuthState extends DurableObject {

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  async fetch(req: Request) {
    const { pathname } = new URL(req.url);

    if (pathname === "/init") return await this.save(req);
    if (pathname === "/consume") return await this.consume(); 
    if (pathname === "/check") return await this.check(); 
    
    return new Response("not found", { status: 404 });
  }

  private async save(req: Request) {
    const data = await req.json();
    
    const existing = await this.ctx.storage.get("oauth_data");
    if (existing) {
      return new Response("state already initialized", { status: 409 });
    }
    
    await this.ctx.storage.put("oauth_data", data);
    return new Response("ok");
  }

  private async consume() {
    try {
      const data = await this.ctx.storage.transaction(async (txn) => {
        const storedData = await txn.get<{ createdAt: number }>("oauth_data");
        
        if (!storedData) {
          throw new Error("invalid state");
        }

        const age = Date.now() - storedData.createdAt;
        
        if (age > 10 * 60 * 1000) {
          await txn.delete("oauth_data");
          throw new Error("state expired");
        }

        await txn.delete("oauth_data");
        return storedData;
      });

      return Response.json(data);
    } catch (error) {
      return new Response((error as Error).message, { status: 400 });
    }
  }

  private async check() {
    const data = await this.ctx.storage.get<{ createdAt: number }>("oauth_data");
    
    if (!data) {
      return new Response("invalid state", { status: 400 });
    }

    const age = Date.now() - data.createdAt;
    
    if (age > 10 * 60 * 1000) {
      await this.ctx.storage.delete("oauth_data");
      return new Response("state expired", { status: 400 });
    }

    return new Response("ok");
  }
}
