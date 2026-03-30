import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Sellora for product questions, custom order requests, quotes, or any support related to apparel, footwear, and brand collaborations.",
  path: "/contact",
  keywords: [
    "contact Sellora",
    "quote request",
    "custom order inquiry",
    "fashion support",
  ],
});

export default function Page() {
  return <ContactPage />;
}
