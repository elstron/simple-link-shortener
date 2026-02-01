import { Layout } from "../ui/layout/layout";
import { Title } from "../ui/components/Title";
import { Header } from "./ui/components/Header";

export const Home = () => {
  return (
    <Layout title="Stron URL Shortener">
      <Header />
      <main class="flex  justify-center items-center flex-col min-h-screen gap-5">
        <Title />
        <p class="max-w-xl text-center text-lg text-gray-700">
          Welcome to our URL Shortener service! Simplify your links and share
          them with ease.
        </p>
        <a
          href="/dashboard"
          class="mt-4 px-6 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
        >
          Get Started
        </a>
      </main>
      <footer class="text-center p-4 text-gray-500 text-base">
        &copy; {new Date().getFullYear()} URL Shortener. All rights reserved.
        <a href="/privacy" class="underline hover:text-gray-700">
          Privacy Policy
        </a>
      </footer>
    </Layout>
  );
};
