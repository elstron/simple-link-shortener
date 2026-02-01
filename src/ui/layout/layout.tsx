import { html } from "hono/html";
interface LayoutProps {
  children: any;
  title?: string;
  description?: string;
  image?: string;
}

export const Layout = (props: LayoutProps) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <script
        defer
        src="https://unpkg.com/htmx.org@2.0.4"
        integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+"
        crossorigin="anonymous"
      ></script>
      <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="/logo.ico" />
      <title>${props.title}</title>
    </head>
    <body>
      ${props.children}
      <style>
        body {
          height: 100dvh;
          background: #0d121b;
          color: #fff;
          --border-radius: 20px;
          position: relative;
          font-family: system-ui;
          font-size: xx-large;
          position: relative;
        }
        body::after {
          content: "";
          position: absolute;
          width: 60%;
          height: 200px;
          top: 0;
          left: 20%;
          background-color: #4000ff;
          filter: blur(190px);
          z-index: -1;
        }
        .htmx-request {
          display: flex !important;
        }
      </style>
    </body>
  </html>
`;
