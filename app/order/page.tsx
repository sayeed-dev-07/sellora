import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Order & Quote Request",
  description:
    "Start your Sellora order request, review product options, and contact the team for custom quotes on apparel, footwear, and branded pieces.",
  path: "/order",
  keywords: [
    "order form",
    "request a quote",
    "custom apparel order",
    "product inquiry",
  ],
});

export default function Page() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/50">
        Sellora Orders
      </p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
        Start your order request
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-black/70">
        Choose a product from the catalog to request a quote, or contact us
        directly if you need help with custom specifications, colors, or bulk
        orders.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/#products"
          className="rounded-sm bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
        >
          Browse Products
        </Link>
        <Link
          href="/contact"
          className="rounded-sm border border-black px-6 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
        >
          Contact Sellora
        </Link>
      </div>
    </section>
  );
}
