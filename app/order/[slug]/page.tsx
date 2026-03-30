import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderPage from "@/components/OrderSection/OrderPage";
import { productData } from "@/public/data/productData";
import { productDetails } from "@/public/data/productsDetails";
import { createPageMetadata, siteConfig } from "@/lib/seo";

type CatalogProduct = (typeof productDetails)[number];
type CaseStudyProduct = (typeof productData)[number];

export type dataType = CatalogProduct | CaseStudyProduct;

function getOrderProduct(slug: string) {
  return [...productDetails, ...productData].find((item) => item.slug === slug);
}

function formatList(items: string[], limit = 3) {
  const uniqueItems = [...new Set(items.filter(Boolean))];

  if (uniqueItems.length <= limit) {
    return uniqueItems.join(", ");
  }

  return `${uniqueItems.slice(0, limit).join(", ")}, and more`;
}

function getOrderDescription(data: dataType) {
  if ("des" in data) {
    return `Request a quote for ${data.name}, a ${data.category} style available in ${formatList(data.size)} with ${data.types.length} product variations.`;
  }

  return `Request a quote for ${data.name} with ${formatList(data.type).toLowerCase()} customization, ${data.print.toLowerCase()}, sizes ${formatList(data.size)}, and colors ${formatList(data.color)}.`;
}

function getOrderKeywords(data: dataType) {
  if ("des" in data) {
    return [data.name, data.category, ...data.size, ...data.types.map((item) => item.name)];
  }

  return [data.name, ...data.tag, ...data.type, ...data.color, ...data.size];
}

function getOrderImage(data: dataType) {
  if ("des" in data) {
    return data.types[0]?.imgLink ?? siteConfig.defaultImage;
  }

  return data.productImg[0] ?? data.bgUrl ?? siteConfig.defaultImage;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getOrderProduct(slug);

  if (!data) {
    return createPageMetadata({
      title: "Product Not Found",
      description: "The product you requested could not be found on Sellora.",
      path: `/order/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `Order ${data.name}`,
    description: getOrderDescription(data),
    path: `/order/${data.slug}`,
    image: getOrderImage(data),
    keywords: getOrderKeywords(data),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getOrderProduct(slug);

  if (!data) {
    notFound();
  }

  return <OrderPage data={data} />;
}
