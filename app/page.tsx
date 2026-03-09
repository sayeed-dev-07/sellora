import Home from "@/components/HomePage/home";
import News from "@/components/newsSection/news";


export default function page() {
  return (
    <div className="overflow-hidden sm:px-4 px-2">
        <Home/>
        <News/>
    </div>
  );
}
