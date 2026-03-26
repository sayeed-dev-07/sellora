import Feature from "@/components/FeatureSection/Feature";
import Home from "@/components/HomePage/home";
import Marquee from "@/components/MarqueeLine";
import News from "@/components/newsSection/news";
import OrderFlow from "@/components/OrderFlow/OrderFlow";
import Products from "@/components/Products/Products";


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
    </div>
  );
}
