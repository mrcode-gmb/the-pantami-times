import { NewsCard } from "./NewsCard";
import { NewsSection } from "./NewsSection";

const newsArticles = [
  {
    image: "https://cdn.guardian.ng/wp-content/uploads/2025/05/20250502_155316-300x195.jpg",
    category: "News",
    title: "Lagos Assembly passes ₦4.4 trillion 2026 budget",
    excerpt: "The Lagos State House of Assembly has passed a ₦4.4 trillion budget for the 2026 fiscal year following the adoption of the report.",
    date: "08 January 2026"
  },
  {
    image: "https://cdn.guardian.ng/wp-content/uploads/2017/08/bs-ae-chimamanda-ngozi-adichie-citylit-20170421-e1503308328593-1058x598.jpg",
    category: "News",
    title: "Tinubu comforts Chimamanda Adichie over son's death",
    date: "08 January 2026"
  },
  {
    image: "https://cdn.guardian.ng/wp-content/uploads/2024/09/uganda-airlines-1.jpg",
    category: "News",
    title: "Uganda Airlines abandons hundreds of passengers in Lagos",
    date: "08 January 2026"
  }
];

const metroArticles = [
  {
    image: "https://cdn.guardian.ng/wp-content/uploads/2026/01/Nigerian-Police-Force-NPF-300x169.webp",
    category: "Metro",
    title: "Police confirm death of notorious bandit in Benue",
    excerpt: "The Police Command in Benue has confirmed the death of a notorious bandit, Terkaa Samuel of Jandekyula.",
    date: "08 January 2026"
  },
  {
    image: "https://cdn.guardian.ng/wp-content/uploads/2026/01/Edo-State-Security-Corps-300x169.webp",
    category: "Metro",
    title: "Man arrested in Edo for alleged abduction of four-year-old",
    date: "08 January 2026"
  },
  {
    image: "https://cdn.guardian.ng/wp-content/uploads/2024/12/Fire-outbreak-1280x720-1-1062x598.webp",
    category: "Metro",
    title: "Fire destroys goods worth over N200m in Niger",
    date: "08 January 2026"
  },
  {
    category: "Metro",
    title: "Ebonyi police arrest 1733 suspects, recover 35 local guns",
    date: "08 January 2026"
  },
  {
    category: "Metro",
    title: "Bauchi police arrest man accused of assaulting eight-year-old",
    date: "08 January 2026"
  }
];

const moreNews = [
  {
    category: "News",
    title: "Tinubu's reforms saved Nigeria from economic collapse — Ex-CBN deputy governor",
    date: "08 January 2026"
  },
  {
    category: "News",
    title: "NSCDC decorates 113 senior officers, warns against lobbying for postings",
    date: "08 January 2026"
  },
  {
    category: "News",
    title: "Tinubu hails NGX's N100tr milestone, urges Nigerians to deepen local investments",
    date: "08 January 2026"
  },
  {
    category: "News",
    title: "Wike hails Tinubu as Bodo-Bonny Road ends decades of risky boat travel",
    date: "08 January 2026"
  },
  {
    category: "News",
    title: "APC dismisses claim linking Matawalle to arrest of Zamfara gov's assistant",
    date: "08 January 2026"
  }
];

export const MainContent = () => {
  return (
    <div className="bg-background">
      {/* Advertisement */}
      <div className="container py-6">
        <div className="w-full h-20 bg-muted flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
          advertisement
        </div>
      </div>

      {/* News Section */}
      <NewsSection 
        title="NEWS" 
        articles={newsArticles} 
        layout="featured" 
      />

      {/* More News Grid */}
      <section className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {moreNews.map((article, index) => (
            <NewsCard key={index} {...article} variant="compact" />
          ))}
        </div>
      </section>

      {/* Metro Section */}
      <NewsSection 
        title="METRO" 
        articles={metroArticles} 
        layout="featured" 
      />

      {/* Download App Banner */}
      <section className="container py-8">
        <div className="bg-guardian-light rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">Get The Guardian App</h3>
            <p className="text-muted-foreground">Stay updated with breaking news on the go</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              App Store
            </button>
            <button className="bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Google Play
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
