import { HTTPRedirectError } from "../../../errors/HTTPRedirectError";

export class InvalidOAuthStateError extends HTTPRedirectError {

  constructor(location: string = "") {
    super(location, 302);
    this.name = "InvalidOAuthStateError";
  }
}
