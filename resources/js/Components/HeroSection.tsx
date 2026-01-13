import { Link } from '@inertiajs/react';

export const HeroSection = ({ posts }: { posts: any[] }) => {
  if (!posts || posts.length === 0) {
    return null; // Or a loading/empty state
  }

  const featuredPost = posts[0];
  const sidebarPosts = posts.slice(1, 3);
  const latestPosts = posts.slice(3, 7);

  return (
    <section className="container py-6">
      {/* Advertisement placeholder */}
      <div className="w-full h-20 bg-muted flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest mb-6">
        advertisement
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          {sidebarPosts.map((post) => (
            <Link href={route('posts.show.full', post.slug)} key={post.id} className="group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded bg-muted">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#f0a500]/20 to-[#d99200]/20 flex items-center justify-center">
                    <svg 
                      className="w-12 h-12 text-[#f0a500] opacity-40" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="news-title-sm mt-3">{post.title}</h3>
            </Link>
          ))}
        </div>

        {/* Main Featured Story */}
        <div className="lg:col-span-6">
          {featuredPost && (
            <Link href={route('posts.show.full', featuredPost.slug)} className="relative h-[400px] lg:h-[500px] rounded overflow-hidden group cursor-pointer bg-muted">
              {featuredPost.image ? (
                <img 
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fetchpriority="high"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#f0a500] to-[#d99200] flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <svg 
                      className="w-24 h-24 mx-auto mb-4 opacity-50" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                      />
                    </svg>
                    <p className="text-lg font-semibold">The Pantami Times</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="top-news-badge">TOP NEWS</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="news-title-hero mb-4">
                  {featuredPost.title}
                </h2>
              </div>
            </Link>
          )}
        </div>

        {/* Right Sidebar - Latest News */}
        <div className="lg:col-span-3">
          <h2 className="section-heading mb-4">LATEST NEWS</h2>
          <div className="space-y-4">
            {latestPosts.map((post) => (
              <Link href={route('posts.show.full', post.slug)} key={post.id} className="border-b border-border pb-4 last:border-b-0 cursor-pointer group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="category-tag">{post.category?.name || 'News'}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="timestamp">{new Date(post.created_at).toLocaleTimeString()}</span>
                </div>
                <h3 className="news-title-sm group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
