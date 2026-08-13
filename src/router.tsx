import { QueryClient } from "@tanstack/react-query";
import {
  createBrowserHistory,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const OWN_HOSTS = new Set([
  "cs-business-consulting.com",
  "www.cs-business-consulting.com",
  "localhost",
  "127.0.0.1",
]);

/**
 * WAVE (and similar tools) load the site via a same-origin proxy iframe
 * (e.g. wave.webaim.org/data/getpage.php). Browser history then sees their
 * path instead of ours, so the SPA would render our NotFound page.
 * Read the intended URL from the parent hash (#/https://example.com/path)
 * and use memory history under that path.
 */
function createAppHistory() {
  if (typeof window === "undefined") {
    return createMemoryHistory({ initialEntries: ["/"] });
  }

  const host = window.location.hostname;
  const isOwnSite =
    OWN_HOSTS.has(host) ||
    host.endsWith(".github.io") ||
    host.endsWith(".pages.dev");

  if (isOwnSite) {
    return createBrowserHistory();
  }

  let initialPath = "/";
  try {
    const hash = window.parent?.location?.hash ?? "";
    const match = hash.match(/^#\/https?:\/\/[^/?#]+(\/[^?#]*)?/i);
    if (match) {
      const path = match[1] && match[1].length > 0 ? match[1] : "/";
      initialPath = path.replace(/\/+$/, "") || "/";
    }
  } catch {
    // Cross-origin parent – fall back to homepage.
  }

  return createMemoryHistory({ initialEntries: [initialPath] });
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    history: createAppHistory(),
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
