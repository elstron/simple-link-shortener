import { GoogleOAuthButton } from "../auth/GoogleOAuthButton";
import { OAuthForm } from "../auth/OauthForm";

export const Header = () => {
  return (
    <header class="w-full flex items-center justify-between p-2 shadow-md relative z-10 bg-[#fff5f50f] border border-[#ffffff0a] backdrop-blur-md rounded-md mx-auto mt-2 max-w-screen-lg">
      <div id="logo">
        <a href="/" class="text-xl font-bold text-white hover:text-cyan-400">
          URL Shortener
        </a>
      </div>
      <OAuthForm />
    </header>
  );
};
