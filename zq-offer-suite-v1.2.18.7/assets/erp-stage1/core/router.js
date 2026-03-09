function normalizePath(path) {
  const raw = String(path || "").trim();
  if (!raw) return "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const normalized = withSlash.replace(/\/+$/, "");
  return normalized === "" ? "/" : normalized;
}

function compilePattern(pattern) {
  const normalized = normalizePath(pattern);
  const keys = [];
  const regexSource = normalized
    .split("/")
    .map((part) => {
      if (!part) return "";
      if (part.startsWith(":")) {
        keys.push(part.slice(1));
        return "([^/]+)";
      }
      return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");

  return {
    pattern: normalized,
    keys,
    regex: new RegExp(`^${regexSource || "/"}$`),
  };
}

function parseHash() {
  const hash = window.location.hash || "";
  const cleaned = hash.replace(/^#/, "");
  if (!cleaned) {
    return { path: "/", query: {} };
  }

  const [rawPath, rawQuery] = cleaned.split("?");
  const path = normalizePath(rawPath);
  const query = {};

  if (rawQuery) {
    const params = new URLSearchParams(rawQuery);
    params.forEach((value, key) => {
      query[key] = value;
    });
  }

  return { path, query };
}

function matchRoute(path, routes) {
  for (const route of routes) {
    const match = route._compiled.regex.exec(path);
    if (!match) continue;

    const params = {};
    route._compiled.keys.forEach((key, idx) => {
      params[key] = decodeURIComponent(match[idx + 1] || "");
    });

    return {
      ...route,
      params,
    };
  }
  return null;
}

export function createRouter(routeDefinitions, onChange) {
  const routes = routeDefinitions.map((route) => ({
    ...route,
    _compiled: compilePattern(route.path),
  }));

  let current = null;

  function resolve() {
    const { path, query } = parseHash();
    const matched = matchRoute(path, routes);

    if (!matched) {
      const fallback = routes.find((route) => route.path === "/not-found") || routes[0];
      current = {
        ...fallback,
        params: {},
        query,
        path,
      };
      onChange(current);
      return;
    }

    current = {
      ...matched,
      query,
      path,
    };
    onChange(current);
  }

  function navigate(path, query = null) {
    const normalized = normalizePath(path);
    const search = query && typeof query === "object"
      ? `?${new URLSearchParams(query).toString()}`
      : "";
    const target = `#${normalized}${search}`;

    if (window.location.hash === target) {
      resolve();
      return;
    }

    window.location.hash = target;
  }

  function start(defaultPath = "/") {
    if (!window.location.hash) {
      navigate(defaultPath);
      return;
    }
    resolve();
  }

  window.addEventListener("hashchange", resolve);

  return {
    start,
    navigate,
    current: () => current,
    destroy: () => {
      window.removeEventListener("hashchange", resolve);
    },
  };
}
