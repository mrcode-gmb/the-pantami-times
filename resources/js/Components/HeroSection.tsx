import { NewsCard } from "./NewsCard";

const sidebarNews = [
  {
    image: "https://cdn.guardian.ng/wp-content/uploads/2026/01/Anthony-Joshua-1-300x169.webp",
    title: "Sagamu crash: Anthony Joshua lauds family, friends for support",
    category: "Sport"
  },
  {
    image: "https://cdn.guardian.ng/wp-content/uploads/2024/01/Rivers-Assembly-891x598.webp",
    title: "Rivers residents appeal to political leaders to rethink impeachment move",
    category: "Politics"
  }
];

const latestNews = [
  {
    category: "Love and Relationships",
    time: "just now",
    title: "Ned Nwoko responds to Regina Daniels' denial of drug use, stresses court-backed assessments"
  },
  {
    category: "Education",
    time: "just now",
    title: "Zulum commissions remodelled school for vulnerable girls"
  },
  {
    category: "World",
    time: "6 minutes ago",
    title: "Three ships head to US with Venezuela oil"
  },
  {
    category: "World",
    time: "18 minutes ago",
    title: "US Senate rebukes Trump on Venezuela in war powers vote"
  }
];

export const HeroSection = () => {
  return (
    <section className="container py-6">
      {/* Advertisement placeholder */}
      <div className="w-full h-20 bg-muted flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest mb-6">
        advertisement
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          {sidebarNews.map((news, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="news-title-sm mt-3">{news.title}</h3>
            </div>
          ))}
        </div>

        {/* Main Featured Story */}
        <div className="lg:col-span-6">
          <div className="relative h-[400px] lg:h-[500px] rounded overflow-hidden group cursor-pointer">
            <img 
              src="https://cdn.guardian.ng/wp-content/uploads/2026/01/RIVERS-ASSEMBLY-666x400.webp"
              alt="Rivers Assembly"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="top-news-badge">TOP NEWS</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="news-title-hero mb-4">
                Mixed reactions trail Rivers Assembly impeachment move as groups push back
              </h2>
              <a href="#" className="text-white text-sm font-medium underline underline-offset-4 hover:text-primary transition-colors">
                READ MORE
              </a>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Latest News */}
        <div className="lg:col-span-3">
          <h2 className="section-heading mb-4">LATEST NEWS</h2>
          <div className="space-y-4">
            {latestNews.map((news, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0 cursor-pointer group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="category-tag">{news.category}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="timestamp">{news.time}</span>
                </div>
                <h3 className="news-title-sm group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
