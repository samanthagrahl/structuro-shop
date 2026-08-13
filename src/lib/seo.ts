export const SITE_ORIGIN = "https://cs-business-consulting.com";
export const SITE_NAME = "C&S Consulting";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute or site-relative image URL for Open Graph */
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function ensureMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    for (const [key, value] of Object.entries(attrs)) {
      if (key === "content") continue;
      el.setAttribute(key, value);
    }
    document.head.appendChild(el);
  }
  if (attrs.content != null) el.setAttribute("content", attrs.content);
}

function ensureLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_ORIGIN}${path}`;
}

export function setPageSeo({
  title,
  description,
  path,
  image = "/og-image.jpg",
  type = "website",
  noindex = false,
  jsonLd,
}: SeoInput) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  document.title = title;

  ensureMeta('meta[name="description"]', { name: "description", content: description });
  ensureMeta('meta[name="robots"]', {
    name: "robots",
    content: noindex ? "noindex, nofollow" : "index, follow",
  });

  ensureLink("canonical", url);

  ensureMeta('meta[property="og:title"]', { property: "og:title", content: title });
  ensureMeta('meta[property="og:description"]', {
    property: "og:description",
    content: description,
  });
  ensureMeta('meta[property="og:type"]', { property: "og:type", content: type });
  ensureMeta('meta[property="og:url"]', { property: "og:url", content: url });
  ensureMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
  ensureMeta('meta[property="og:locale"]', { property: "og:locale", content: "de_DE" });
  ensureMeta('meta[property="og:site_name"]', {
    property: "og:site_name",
    content: SITE_NAME,
  });

  ensureMeta('meta[name="twitter:card"]', {
    name: "twitter:card",
    content: "summary_large_image",
  });
  ensureMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
  ensureMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: description,
  });
  ensureMeta('meta[name="twitter:image"]', {
    name: "twitter:image",
    content: imageUrl,
  });

  const existing = document.getElementById("page-jsonld");
  if (existing) existing.remove();

  if (jsonLd) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "page-jsonld";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: "C&S Business Consulting",
    alternateName: "C&S Consulting",
    url: SITE_ORIGIN,
    email: "contact@cs-business-consulting.com",
    telephone: "+34623721459",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer de Medellin 4, Esc. 17, Bajo A",
      postalCode: "07006",
      addressLocality: "Palma de Mallorca",
      addressCountry: "ES",
    },
    areaServed: {
      "@type": "Place",
      name: "Europa",
    },
    founder: [
      { "@type": "Person", name: "Christian Hofstetter" },
      { "@type": "Person", name: "Samantha Grahl" },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    inLanguage: "de",
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
  };
}
