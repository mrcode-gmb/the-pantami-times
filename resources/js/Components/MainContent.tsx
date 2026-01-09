import { NewsCard } from "./NewsCard";
import { NewsSection } from "./NewsSection";

export const MainContent = ({ posts }: { posts: any[] }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  const newsArticles = posts.filter(p => p.category?.name === 'News').slice(0, 5);
  const metroArticles = posts.filter(p => p.category?.name === 'Metro').slice(0, 5);
  const moreNews = posts.slice(7, 12);
  console.log(metroArticles);
  return (
    <div className="bg-background">
      <div className="container py-6">
        <div className="w-full h-20 bg-muted flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
          advertisement
        </div>
      </div>

      <NewsSection 
        title="NEWS" 
        articles={newsArticles} 
        layout="featured" 
      />
      {/* @MainContent.tsx#L1-66 check this component why real post not fetch from db please */}
      <section className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {moreNews.map((article) => (
            <NewsCard 
              key={article.id} 
              slug={article.slug}
              category={article.category?.name || 'News'}
              title={article.title}
              date={new Date(article.created_at).toLocaleDateString()}
              variant="compact" 
            />
          ))}
        </div>
      </section>

      <NewsSection 
        title="METRO" 
        articles={metroArticles} 
        layout="featured" 
      />

      <section className="container py-8">
        <div className="bg-PantamiTimes-light rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">Get The PantamiTimes App</h3>
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