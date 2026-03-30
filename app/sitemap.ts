import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { productData } from "@/public/data/productData";
import { productDetails } from "@/public/data/productsDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/order`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const orderRoutes: MetadataRoute.Sitemap = [...productDetails, ...productData].map(
    (item) => ({
      url: `${siteUrl}/order/${item.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const caseStudyRoutes: MetadataRoute.Sitemap = productData.map((item) => ({
    url: `${siteUrl}/case_study/${item.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...orderRoutes, ...caseStudyRoutes];
}
