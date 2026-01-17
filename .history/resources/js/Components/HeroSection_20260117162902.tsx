import { Link } from '@inertiajs/react';
import { MediaDisplay } from './MediaDisplay';

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
        
        <div className="lg:col-span-3  space-y-6">
          {sidebarPosts.map((post) => (
            <>
            <Link href={route('posts.show.full', post.slug)} key={post.id} className="group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded bg-muted">
                <MediaDisplay
                  image={post.image}
                  videoUrl={post.video_url}
                  title={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  showVideo={false}
                />
              </div>
              <h3 className="news-title-sm mt-3">{post.title}</h3>
            </Link>
            </>
          ))}
        </div>

        {/* Main Featured Story */}
        <div className="lg:col-span-6">
          {featuredPost && (
            <div href={route('posts.show.full', featuredPost.slug)} className="relative h-[400px] lg:h-[500px] rounded overflow-hidden group cursor-pointer bg-muted">
              <MediaDisplay
                image={featuredPost.image}
                videoUrl={featuredPost.video_url}
                title={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
                showVideo={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="top-news-badge">TOP NEWS</span>
              </div>
              <div href={route('posts.show.full', featuredPost.slug)} className="absolute bottom-0 left-0 right-0 p-6">
              <div className="bottom-0 left-0 right-0 p-6">
                <h2 className="news-title-hero mb-4">
                  {featuredPost.title}
                </h2>
              </div>
              <
            </div>
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
