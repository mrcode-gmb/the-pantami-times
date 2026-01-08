import { NewsCard } from "./NewsCard";

interface NewsSectionProps {
  title: string;
  articles: Array<{
    image?: string;
    category: string;
    title: string;
    excerpt?: string;
    date?: string;
  }>;
  layout?: "grid" | "list" | "featured";
}

export const NewsSection = ({ title, articles, layout = "grid" }: NewsSectionProps) => {
  if (layout === "featured" && articles.length > 0) {
    const [featured, ...rest] = articles;
    
    return (
      <section className="container py-6">
        <h2 className="section-heading mb-6">{title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Article */}
          <div className="lg:col-span-7">
            <article className="cursor-pointer group">
              {featured.image && (
                <div className="aspect-video overflow-hidden rounded">
                  <img 
                    src={featured.image} 
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="mt-4">
                <span className="category-tag">{featured.category}</span>
                <h3 className="news-title-lg mt-2">{featured.title}</h3>
                {featured.excerpt && (
                  <p className="text-muted-foreground mt-3 line-clamp-3">{featured.excerpt}</p>
                )}
                <a href="#" className="inline-block mt-3 text-sm font-medium text-primary hover:underline">
                  Read More
                </a>
              </div>
            </article>
          </div>

          {/* Side Articles */}
          <div className="lg:col-span-5 space-y-4">
            {rest.map((article, index) => (
              <NewsCard 
                key={index} 
                {...article} 
                variant="horizontal"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (layout === "list") {
    return (
      <section className="py-6">
        <h2 className="section-heading mb-6">{title}</h2>
        <div className="space-y-4">
          {articles.map((article, index) => (
            <NewsCard key={index} {...article} variant="compact" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container py-6">
      <h2 className="section-heading mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
    </section>
  );
};
