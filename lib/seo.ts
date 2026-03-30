import type { Metadata } from "next";

export const siteConfig = {
  name: "Sellora",
  description:
    "Sellora is a modern apparel and footwear storefront for discovering standout products, exploring real case studies, and requesting custom orders with ease.",
  keywords: [
    "Sellora",
    "fashion store",
    "custom apparel",
    "custom order",
    "shirts",
    "shoes",
    "jackets",
    "case studies",
    "quote request",
  ],
  locale: "en_US",
  defaultImage: "/img/model.png",
} as const;

const FALLBACK_SITE_URL = "http://localhost:3000";

function ensureProtocol(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
}

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    FALLBACK_SITE_URL;

  return ensureProtocol(rawUrl).replace(/\/$/, "");
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}

type CreatePageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.defaultImage,
  keywords = [],
  type = "website",
  noIndex = false,
}: CreatePageMetadataInput): Metadata {
  const fullTitle =
    title === siteConfig.name ? siteConfig.name : `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords: [...new Set([...siteConfig.keywords, ...keywords])],
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
  };
}
