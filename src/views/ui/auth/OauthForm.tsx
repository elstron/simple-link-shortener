import { GoogleOAuthButton } from "./GoogleOAuthButton";

export const OAuthForm = () => {
  return (
    <form action="/oauth/login">
      <GoogleOAuthButton />
    </form>
  );
};
