import { Link } from '@inertiajs/react';
import { NewsCard } from "./NewsCard";
import MDEditor from '@uiw/react-md-editor';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Article {
  id: number;
  slug: string;
  image: string;
  category: Category;
  title: string;
  content: string;
  excerpt?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  status?: string;
  author_id?: number;
}

interface NewsSectionProps {
  title: string;
  articles: Article[];
  layout?: "grid" | "list" | "featured";
}

export const NewsSection = ({ title, articles, layout = "grid" }: NewsSectionProps) => {
  if (!articles || articles.length === 0) {
    return (
      <section className="container py-6">
        <h2 className="section-heading mb-6">{title}</h2>
        <p className="text-muted-foreground">No articles found in this section.</p>
      </section>
    );
  }

  if (layout === "featured") {
    const [featured, ...rest] = articles;
    
    return (
      <section className="container py-6">
        <h2 className="section-heading mb-6">{title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            {featured && featured.slug && (
              <Link href={route('posts.show', featured.slug)} className="cursor-pointer group">
                <article>
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
                    <span className="category-tag">{featured.category?.name || 'News'}</span>
                    <h3 className="news-title-lg mt-2">{featured.title}</h3>
                    {featured.content && (
                      <div className="text-muted-foreground mt-3 line-clamp-3">
                        <MDEditor.Markdown source={featured.excerpt || featured.content.substring(0, 150) + '...'} />
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            )}
          </div>
          <div className="lg:col-span-5 space-y-4">
            {rest.map((article) => (
              <NewsCard 
                key={article.id} 
                slug={article.slug}
                category={article.category?.name || 'News'}
                title={article.title}
                image={article.image}
                date={new Date(article.created_at!).toLocaleDateString()}
                variant="horizontal"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-6">
      <h2 className="section-heading mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <NewsCard 
            key={article.id} 
            slug={article.slug}
            category={article.category?.name || 'News'}
            title={article.title}
            image={article.image}
            excerpt={article.excerpt}
            date={article.published_at ? new Date(article.published_at).toLocaleDateString() : ''}
          />
        ))}
      </div>
    </section>
  );
};