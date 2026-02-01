import { getContext } from "hono/context-storage";
import { Env } from "../../../types";

/**
 * Service to manage OAuth state tokens using Durable Objects.
 * Provides state creation, validation, and consumption for OAuth flows.
 */
export class OAuthStateService {
  /**
   * Generates and saves a new OAuth state token.
   * @returns The generated state token (UUID)
   */
  static async generateState(): Promise<string> {
    const state = crypto.randomUUID();
    await this.saveState(state);
    return state;
  }

  /**
   * Saves an OAuth state token to Durable Object storage.
   * @param state - The state token to save
   */
  static async saveState(state: string): Promise<void> {
    const { OAUTH_STATE } = getContext<Env>().env;
    const id = OAUTH_STATE.idFromName(state);
    const stub = OAUTH_STATE.get(id);

    await stub.fetch("https://state/init", {
      method: "POST",
      body: JSON.stringify({
        createdAt: Date.now(),
      }),
    });
  }

  /**
   * Validates and consumes an OAuth state token.
   * The state can only be consumed once for security.
   * @param state - The state token to validate and consume
   * @returns true if the state is valid and consumed successfully, false otherwise
   */
  static async consumeState(state: string): Promise<boolean> {
    if (!state) return false;

    const { OAUTH_STATE } = getContext<Env>().env;
    const id = OAUTH_STATE.idFromName(state);
    const stub = OAUTH_STATE.get(id);

    const resp = await stub.fetch("https://state/consume", {
      method: "POST",
    });

    return resp.ok;
  }

  /**
   * Validates a state token without consuming it.
   * Useful for checking if a state exists before consuming it.
   * @param state - The state token to validate
   * @returns true if the state exists and is valid, false otherwise
   */
  static async validateState(state: string): Promise<boolean> {
    if (!state) return false;

    const { OAUTH_STATE } = getContext<Env>().env;
    const id = OAUTH_STATE.idFromName(state);
    const stub = OAUTH_STATE.get(id);

    const resp = await stub.fetch("https://state/check", {
      method: "GET",
    });

    return resp.ok;
  }
}
