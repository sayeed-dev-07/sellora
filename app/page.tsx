import type { Metadata } from "next";
import Feature from "@/components/FeatureSection/Feature";
import CaseStudy from "@/components/Gallery/CaseStudy";
import Home from "@/components/HomePage/home";
import Marquee from "@/components/MarqueeLine";
import News from "@/components/newsSection/news";
import OrderFlow from "@/components/OrderFlow/OrderFlow";
import Products from "@/components/Products/Products";
import Slogan from "@/components/SloganSection/Slogan";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Modern Apparel & Custom Orders",
  description:
    "Discover Sellora's curated shirts, shoes, and jackets, browse real case studies, and request custom product quotes from one modern storefront.",
  path: "/",
  keywords: [
    "online fashion store",
    "product catalog",
    "custom quote",
    "apparel showcase",
  ],
});

export default function page() {
  return (
    <div className="overflow-hidden ">
        <section id="home">
          <Home/>
        </section>
        <News/>
        <section id="features" className="scroll-mt-28">
          <Feature/>
        </section>
        <Marquee/>
        <section id="products" className="scroll-mt-28">
          <Products/>
        </section>
        <Marquee/>
        <section id="order-flow" className="scroll-mt-28">
          <OrderFlow/>
        </section>
        <section id="use-cases" className="scroll-mt-28">
          <CaseStudy/>
        </section>
        <Slogan/>
    </div>
  );
}
