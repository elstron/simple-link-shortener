export const DashboardHeader = () => {
  return (
    <header class="w-full p-2 shadow-md relative z-10 bg-[#fff5f50f] border border-[#ffffff0a] backdrop-blur-md rounded-full mx-auto mt-2 max-w-screen-lg">
      <nav class="w-full sm:px-6 lg:px-8" aria-label="Top">
        <ul class="flex flex-wrap items-center justify-between">
          <li>
            <a
              href="/dashboard"
              class="text-base font-bold text-white hover:text-cyan-400"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/dashboard/my_links"
              class="text-base font-medium text-white hover:text-cyan-400"
            >
              My Links
            </a>
          </li>
          <li>
            <a
              href="/logout"
              class="text-base font-medium text-white hover:text-cyan-400"
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
