import { html } from "hono/html";
import { Title } from "../ui/components/Title";
import { ShortIcon } from "../ui/icons/ShortIcon";
import { Layout } from "../ui/layout/layout";
import { DashboardHeader } from "./ui/components/DashboardHeader";

export const Dashboard = () => {
  return (
    <Layout title="URL Shortener">
      <DashboardHeader />
      <main class="flex  justify-center items-center flex-col min-h-screen gap-5">
        <Title />
        <form
          hx-post="/shorten"
          hx-target="#resultado"
          hx-indicator="#loading"
          hx-swap="innerHTML"
          id="form_url"
          class="flex flex-col gap-5 md:flex-row md:gap-2 relative pb-[50px] text-base"
        >
          <input
            id="url_input"
            name="url"
            type="url"
            class="flex items-center min-w-[300px] w-full h-[50px] px-3 py-2 10px rounded-[var(--border-radius)] shadow-[3px_3px_10px_rgba(0,0,0,0.726),_-1px_-1px_6px_rgba(255,255,255,0.4)] bg-transparent
                    hover:border-2 hover:border-cyan-400 hover:shadow-[0px_0px_100px_rgb(1,235,252),inset_0px_0px_10px_rgb(1,235,252),0px_0px_5px_rgb(255,255,255)]
                        focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-transparent
                        "
            placeholder="https://example.com"
            autocomplete="off"
          />

          <button
            type="submit"
            id="shorten"
            class="flex justify-center items-center bg-cyan-400 min-w-fit  md:max-w-[200px] md:w-[100px] h-[50px] rounded-[var(--border-radius)] bg-transparent shadow-[3px_3px_10px_rgba(9,11,34,0.418),_-1px_-1px_6px_rgba(255,255,255,0.4)] cursor-pointer hover:border-2 hover:border-cyan-400 hover:shadow-[0px_0px_100px_rgb(1,235,252),inset_0px_0px_10px_rgb(1,235,252),0px_0px_5px_rgb(255,255,255)]"
          >
            <ShortIcon />
            <svg
              id="loading"
              style="display:none"
              class="animate-spin h-10
                    w-10 text-cyan-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        </form>
        <div
          id="resultado"
          class="flex justify-center items-center gap-5"
        ></div>
        <Script />
      </main>
    </Layout>
  );
};

export const Script = () => html`
  <script>
    document.addEventListener("htmx:afterSwap", (event) => {
      document.getElementById("form_url").reset();
      const copyButton = document.getElementById("copy");
      const resultUrl = document.getElementById("result_url");
      const backupUrl = resultUrl.innerText || resultUrl.textContent;
      copyFunction();
      copyButton.removeEventListener("click", copyFunction);

      copyButton.addEventListener("click", copyFunction);

      const loading = document.getElementById("loading");
      loading.style.display = "none";

      const shortIcon = document.getElementById("short_icon");
      shortIcon.style.display = "block";

      function copyFunction() {
        navigator.clipboard.writeText(
          resultUrl.innerText || resultUrl.textContent,
        );
        resultUrl.innerText = "Copied!";
        setTimeout(() => {
          resultUrl.innerText = backupUrl;
        }, 1000);
      }
    });

    document.addEventListener("htmx:beforeRequest", (event) => {
      const loading = document.getElementById("loading");
      loading.style.display = "block";

      const shortIcon = document.getElementById("short_icon");
      shortIcon.style.display = "none";
    });
  </script>
`;
