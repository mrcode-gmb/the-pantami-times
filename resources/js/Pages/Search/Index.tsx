import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Header } from '@/Components/Headers';
import { Footer } from '@/Components/Footer';
import { MediaDisplay } from '@/Components/MediaDisplay';
import { Calendar, Eye, User, Search as SearchIcon } from 'lucide-react';

interface SubCategory {
    id: number;
    name: string;
    slug: string;
    posts_count?: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    posts_count?: number;
    subcategories?: SubCategory[];
}

interface Post {
    id: number;
    uuid: string;
    title: string;
    slug: string;
    image: string;
    video_url?: string;
    excerpt: string;
    category: Category;
    author: { id: number; name: string };
    published_at: string;
    views: number;
}

interface PaginatedPosts {
    data: Post[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

export default function SearchIndex({
    query,
    posts,
    categories,
}: PageProps<{ 
    query: string;
    posts: PaginatedPosts;
    categories: Category[];
}>) {
    return (
        <>
            <Head title={`Search: ${query} - Pantami Times`} />
            <div className="min-h-screen bg-background">
                <Header categories={categories} />
                
                <main className="container py-8">
                    {/* Search Header */}
                    <div className="mb-8 pb-6 border-b-4 border-[#f0a500]">
                        <div className="flex items-center gap-3 mb-3">
                            <SearchIcon className="text-[#f0a500]" size={32} />
                            <h1 className="text-3xl md:text-4xl font-bold font-serif">
                                Search Results
                            </h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Showing results for: <span className="font-semibold text-foreground">"{query}"</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {posts.total} {posts.total === 1 ? 'result' : 'results'} found
                        </p>
                    </div>

                    {/* Search Results */}
                    {posts.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {posts.data.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={route('posts.show.full', post.slug)}
                                        className="group"
                                    >
                                        <article className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all">
                                            {/* Post Image/Video */}
                                            <div className="aspect-video overflow-hidden bg-muted">
                                                <MediaDisplay
                                                    image={post.image}
                                                    videoUrl={post.video_url}
                                                    title={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                    showVideo={false}
                                                />
                                            </div>

                                            {/* Post Content */}
                                            <div className="p-4">
                                                {/* Category Badge */}
                                                {post.category && (
                                                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-[#f0a500]/10 text-[#f0a500] rounded mb-2">
                                                        {post.category.name}
                                                    </span>
                                                )}

                                                <h2 className="text-xl font-bold font-serif mb-2 line-clamp-2 group-hover:text-[#f0a500] transition-colors">
                                                    {post.title}
                                                </h2>

                                                {post.excerpt && (
                                                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                )}

                                                {/* Post Meta */}
                                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <User size={14} />
                                                        <span>{post.author.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        <span>
                                                            {new Date(post.published_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Eye size={14} />
                                                        <span>{post.views}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {posts.last_page > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8">
                                    {posts.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveScroll
                                            className={`px-4 py-2 rounded border transition-colors ${
                                                link.active
                                                    ? 'bg-[#f0a500] text-white border-[#f0a500]'
                                                    : link.url
                                                    ? 'border-border hover:border-[#f0a500] hover:text-[#f0a500]'
                                                    : 'border-border text-muted-foreground cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="mb-6">
                                <SearchIcon className="mx-auto text-muted-foreground" size={64} strokeWidth={1} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                We couldn't find any articles matching "{query}". Try different keywords or browse our categories.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <Link
                                    href="/"
                                    className="px-6 py-2 bg-[#f0a500] text-white rounded-lg hover:bg-[#d99200] transition-colors font-medium"
                                >
                                    Back to Home
                                </Link>
                                <Link
                                    href="/categories"
                                    className="px-6 py-2 bg-muted hover:bg-[#f0a500] hover:text-white rounded-lg transition-colors font-medium"
                                >
                                    Browse Categories
                                </Link>
                            </div>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
}
