import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Immigration Mail — Prepare and send important immigration correspondence" },
      { name: "description", content: "Guided workflows to prepare, review, send, and track important immigration correspondence. Physical mail with proof of delivery. Not a law firm — you control the facts." },
      { name: "robots", content: "index,follow" },
      { name: "theme-color", content: "#1a2b4a" },
      { property: "og:title", content: "Immigration Mail — Send your immigration correspondence with confidence" },
      { property: "og:description", content: "Prepare, review, send, track, and keep a record of important immigration correspondence." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Immigration Mail" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Immigration Mail — Prepare and send immigration correspondence" },
      { name: "twitter:description", content: "Guided workflows, physical mail with tracking, and proof of delivery." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
