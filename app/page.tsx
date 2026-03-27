import Feature from "@/components/FeatureSection/Feature";
import CaseStudy from "@/components/Gallery/CaseStudy";
import Home from "@/components/HomePage/home";
import Marquee from "@/components/MarqueeLine";
import News from "@/components/newsSection/news";
import OrderFlow from "@/components/OrderFlow/OrderFlow";
import Products from "@/components/Products/Products";
import Slogan from "@/components/SloganSection/Slogan";


export default function page() {
  return (
    <div className="overflow-hidden ">
        <Home/>
        <News/>
        <Feature/>
        <Marquee/>
        <Products/>
        <Marquee/>
        <OrderFlow/>
        <CaseStudy/>
        <Slogan/>
    </div>
  );
}
