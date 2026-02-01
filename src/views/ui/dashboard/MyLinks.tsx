import { html } from "hono/html";
import { getLinksByUser } from "../../../services/links";
import { Layout } from "../../../ui/layout/layout";
import { DashboardHeader } from "../components/DashboardHeader";

export const MyLinks = async (data: any) => {
  const links = await getLinksByUser(data.id);
  const baseURL = data.base;
  return (
    <Layout title="My Links">
      <DashboardHeader />
      <main class="flex items-center flex-col min-h-screen gap-5 my-auto mt-10">
        <h1 class="text-3xl font-bold text-white">My Links</h1>

        <div class="w-full max-w-4xl px-4 bg-[#ffffff1a] border border-[#ffffff0a] backdrop-blur-md rounded-lg p-6">
          {links.length === 0 ? (
            <p class="text-white text-center">You have no links yet.</p>
          ) : (
            <table class="w-full text-left border-collapse font-normal text-sm">
              <thead>
                <tr>
                  <th class="border-b border-gray-300 p-2 text-white">
                    Original URL
                  </th>
                  <th class="border-b border-gray-300 p-2 text-white">
                    Short URL
                  </th>
                  <th class="border-b border-gray-300 p-2 text-white">
                    Clicks
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.map((link: any) => (
                  <tr>
                    <td class="border-b border-gray-300 p-2 text-white break-all">
                      {link.url}
                    </td>
                    <td class="border-b border-gray-300 p-2 text-white">
                      {`${baseURL}/${link.short_url}`}
                    </td>
                    <td class="border-b border-gray-300 p-2 text-white">
                      {link.clicks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </Layout>
  );
};
