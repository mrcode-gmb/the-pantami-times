import { Link } from "@inertiajs/react";
import { NewsCard } from "./NewsCard";
import { NewsSection } from "./NewsSection";

export const MainContent = ({ posts }: { posts: any[] }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  const newsArticles = posts.filter(p => p.category?.name === 'News').slice(0, 5);
  const metroArticles = posts.filter(p => p.category?.name === 'Metro').slice(0, 5);
  const moreNews = posts.slice(7, 12);
  return (
    <div className="bg-background">
      <div className="container py-6">
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f0a500]">
              Reader Services
            </p>
            <h3 className="mt-2 text-2xl font-serif font-bold">
              More than headlines: know the newsroom, the policies, and how to reach us.
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Pantami Times now includes clear public pages for corrections, privacy, guidelines, and newsroom contact.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-[#1a1f2e] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a3247]"
            >
              Contact the Newsroom
            </Link>
            <Link
              href="/privacy"
              className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[#f0a500] hover:text-[#f0a500]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[#f0a500] hover:text-[#f0a500]"
            >
              Terms of Service
            </Link>
          </div>
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
              publicId={article.public_id}
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
            <h3 className="text-2xl font-serif font-bold mb-2">Keep Reading With Pantami Times</h3>
            <p className="text-muted-foreground">Browse the digital edition, review our standards, or contact the newsroom directly.</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/e-paper"
              className="bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Read e-Paper
            </Link>
            <Link
              href="/guidelines"
              className="bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View Guidelines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
