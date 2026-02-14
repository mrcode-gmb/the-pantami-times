import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { Header } from '@/Components/Headers';
import { Footer } from '@/Components/Footer';
import { MediaDisplay } from '@/Components/MediaDisplay';
import { Clock, Eye, User, ArrowRight } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    posts_count?: number;
    subcategories?: SubCategory[];
}

interface SubCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

interface Post {
    id: number;
    uuid: string;
    title: string;
    slug: string;
    public_id: string;
    excerpt: string;
    image: string | null;
    video_url?: string;
    published_at: string;
    views: number;

    author: {
        id: number;
        name: string;
    };
    category: {
        id: number;
        name: string;
        slug: string;
    };
    subcategory?: {
        id: number;
        name: string;
        slug: string;
    };
}

interface PaginatedPosts {
    data: Post[];
    current_page: number;
    last_page: number;
    path: string;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface Props {
    category: Category;
    subcategory: SubCategory;
    posts: PaginatedPosts;
    categories: Category[];
}

export default function Show({ category, subcategory, posts, categories }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title={`${subcategory.name} - ${category.name}`} />
            <div className="min-h-screen bg-background">
                <Header categories={categories} activeCategory={category.slug} />
                <main className="min-h-screen bg-background">
                    <div className="container py-8">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                            <Link href="/" className="hover:text-[#f0a500] transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/categories" className="hover:text-[#f0a500] transition-colors">
                                Categories
                            </Link>
                            <span>/</span>
                            <Link 
                                href={`/category/${category.slug}`} 
                                className="hover:text-[#f0a500] transition-colors"
                            >
                                {category.name}
                            </Link>
                            <span>/</span>
                            <span className="text-foreground font-semibold">{subcategory.name}</span>
                        </nav>

                        {/* Header */}
                        <div className="mb-8 pb-6 border-b-2 border-[#f0a500]">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                                {subcategory.name}
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                in {category.name}
                            </p>
                            {subcategory.description && (
                                <p className="mt-4 text-muted-foreground">
                                    {subcategory.description}
                                </p>
                            )}
                        </div>

                        {/* Posts Grid */}
                        {posts.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {posts.data.map((post) => (
                                        <article 
                                            key={post.id}
                                            className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border"
                                        >
                                            {(post.image || post.video_url) && (
                                                <Link href={route("posts.show.full")`/posts/full/${post.public_id}`} className="block">
                                                    <div className="w-full h-48 overflow-hidden">
                                                        <MediaDisplay
                                                            image={post.image}
                                                            videoUrl={post.video_url}
                                                            title={post.title}
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                            loading="lazy"
                                                            showVideo={true}
                                                        />
                                                    </div>
                                                </Link>
                                            )}
                                            <div className="p-4">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                                    <span className="px-2 py-1 bg-[#f0a500]/10 text-[#f0a500] rounded">
                                                        {category.name}
                                                    </span>
                                                    <span>•</span>
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        <span>{formatDate(post.published_at)}</span>
                                                    </div>
                                                </div>

                                                <Link href={`/posts/full/${post.slug}`}>
                                                    <h2 className="text-xl font-bold text-foreground hover:text-[#f0a500] transition-colors mb-2 line-clamp-2">
                                                        {post.title}
                                                    </h2>
                                                </Link>

                                                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <User size={12} />
                                                        <span>{post.author.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Eye size={12} />
                                                        <span>{post.views}</span>
                                                    </div>
                                                </div>

                                                <Link 
                                                    href={`/posts/full/${post.slug}`}
                                                    className="mt-4 inline-flex items-center gap-2 text-[#f0a500] hover:text-[#d99200] transition-colors text-sm font-semibold"
                                                >
                                                    Read More
                                                    <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {posts.last_page > 1 && (
                                    <div className="flex justify-center gap-2 mt-8">
                                        {posts.prev_page_url && (
                                            <Link
                                                href={posts.prev_page_url}
                                                className="px-4 py-2 bg-card border border-border rounded hover:bg-[#f0a500] hover:text-white transition-colors"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        
                                        <div className="flex items-center gap-2">
                                            {[...Array(posts.last_page)].map((_, i) => (
                                                <Link
                                                    key={i}
                                                    href={`${posts.path}?page=${i + 1}`}
                                                    className={`px-4 py-2 rounded transition-colors ${
                                                        posts.current_page === i + 1
                                                            ? 'bg-[#f0a500] text-white'
                                                            : 'bg-card border border-border hover:bg-[#f0a500]/10'
                                                    }`}
                                                >
                                                    {i + 1}
                                                </Link>
                                            ))}
                                        </div>

                                        {posts.next_page_url && (
                                            <Link
                                                href={posts.next_page_url}
                                                className="px-4 py-2 bg-card border border-border rounded hover:bg-[#f0a500] hover:text-white transition-colors"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📰</div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">
                                    No Posts Yet
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    There are no posts in this subcategory at the moment.
                                </p>
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0a500] text-white rounded-lg hover:bg-[#d99200] transition-colors font-semibold"
                                >
                                    Browse {category.name}
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
