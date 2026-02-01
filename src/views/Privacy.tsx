import { Layout } from "../ui/layout/layout";
import { Header } from "./ui/components/Header";

export const Privacy = () => {
  return (
    <Layout title="URL Shortener">
      <Header />
      <main class="flex  justify-center items-center flex-col min-h-screen gap-5">
        <section class="max-w-2xl mx-auto p-4 rounded shadow text-base">
          <h2 class="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p class="mb-2">
            This website allows users to shorten URLs and requires login via
            Google OAuth for enhanced security and personalized features.
          </p>
          <h3 class="text-xl font-semibold mt-4 mb-2">
            Information We Collect
          </h3>
          <ul class="list-disc ml-6 mb-2">
            <li>
              Google account information (name, email, profile picture) for
              authentication purposes.
            </li>
            <li>Links you shorten and related usage data.</li>
          </ul>
          <h3 class="text-xl font-semibold mt-4 mb-2">
            How We Use Your Information
          </h3>
          <ul class="list-disc ml-6 mb-2">
            <li>To provide and improve our URL shortening service.</li>
            <li>To authenticate users and secure your account.</li>
            <li>To analyze usage and improve user experience.</li>
          </ul>
          <h3 class="text-xl font-semibold mt-4 mb-2">Data Sharing</h3>
          <p class="mb-2">
            We do not sell or share your personal information with third parties
            except as required by law or to provide our service (e.g., Google
            for authentication).
          </p>
          <h3 class="text-xl font-semibold mt-4 mb-2">Security</h3>
          <p class="mb-2">
            We take reasonable measures to protect your data. However, no method
            of transmission over the Internet is 100% secure.
          </p>
          <h3 class="text-xl font-semibold mt-4 mb-2">Your Rights</h3>
          <p class="mb-2">
            You may request deletion of your account and associated data at any
            time by contacting us.
          </p>
          <h3 class="text-xl font-semibold mt-4 mb-2">Contact</h3>
          <p>
            For questions about this privacy policy, please contact us at:
            contatc@stron.me
          </p>
        </section>
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
