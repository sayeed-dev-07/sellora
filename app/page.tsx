import Feature from "@/components/FeatureSection/Feature";
import Home from "@/components/HomePage/home";
import News from "@/components/newsSection/news";


export default function page() {
  return (
    <div className="overflow-hidden ">
        <Home/>
        <News/>
        <Feature/>
    </div>
  );
}
