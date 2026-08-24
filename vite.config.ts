import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isGitHubPages = process.env["GITHUB_PAGES"] === "true";
const base = isGitHubPages ? "/barbeariaprime/" : "/";

export default defineConfig({
  vite: {
    base,
    preview: { host: "127.0.0.1" },
  },
  tanstackStart: {
    server: { entry: "server" },
    spa: isGitHubPages
      ? {
          enabled: true,
          maskPath: "/barbeariaprime/",
          prerender: { outputPath: "/index.html" },
        }
      : undefined,
  },
  nitro: isGitHubPages ? false : undefined,
});
