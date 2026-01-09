import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Header } from '@/Components/Header';
import { Footer } from '@/Components/Footer';
import { format } from 'date-fns';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  created_at: string;
  updated_at: string;
}

export default function Show({ post: postData }: PageProps<{ post: Post }>) {
  const [post, setPost] = React.useState<Post | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (postData) {
      setPost(postData);
      setIsLoading(false);
    } else {
      // If post is not passed as prop, try to fetch it
      const fetchPost = async () => {
        try {
          const url = new URL(window.location.href);
          const slug = url.pathname.split('/').pop();
          const response = await fetch(`/api/posts/${slug}`);
          if (!response.ok) throw new Error('Post not found');
          const data = await response.json();
          setPost(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load post');
          console.error('Error fetching post:', err);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchPost();
    }
  }, [postData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded w-full"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12 text-center">
          <div className="bg-destructive/10 text-destructive p-6 rounded-lg inline-block">
            <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
            <p className="text-muted-foreground">
              {error || 'The requested post could not be found.'}
            </p>
            <Link 
              href="/" 
              className="mt-4 inline-flex items-center text-primary hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Process content to fix image paths
  const processContent = (html: string) => {
    if (!html) return '';
    
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Update image sources
    const images = tempDiv.getElementsByTagName('img');
    for (let img of Array.from(images)) {
      const src = img.getAttribute('src') || '';
      
      // Only modify relative paths (not external URLs)
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        // Remove any leading slashes to prevent double slashes
        const cleanPath = src.replace(/^\/+/, '');
        img.src = `/storage/${cleanPath}`;
      }
      
      // Add error handling
      img.onerror = function() {
        this.src = 'https://placehold.co/800x400?text=Image+Not+Found';
        this.onerror = null; // Prevent infinite loop
      };
      
      // Add responsive classes
      img.classList.add('max-w-full', 'h-auto', 'rounded-lg', 'my-4');
    }
    
    return tempDiv.innerHTML;
  };

  const parsedContent = { __html: processContent(post.content) };
  
  return (
    <>
      <Head title={post.title}>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
      </Head>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container py-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              {/* <li>/</li> */}
              {post.category?.name && (
                <>
                  <li>/</li>
                  <li>
                    <Link 
                      href={`/category/${post.category.slug || 'uncategorized'}`} 
                      className="hover:underline"
                    >
                      {post.category.name}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-foreground">{post.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
                  {post.title}
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-3">
                    {post.author?.avatar ? (
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {post.author?.name?.charAt(0) || 'A'}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{post.author?.name || 'Admin'}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(post.created_at), 'MMMM d, yyyy')} • {Math.ceil(post.content.split(' ').length / 200)} min read
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1"></div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="p-2 rounded-full hover:bg-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {post?.image && (
                  <div className="w-full h-[500px] rounded-lg overflow-hidden mb-6">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder image if the image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/800x500?text=Image+Not+Found';
                        target.onerror = null; // Prevent infinite loop if placeholder also fails
                      }}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      {post.image_caption || 'Image caption goes here'}
                    </p>
                  </div>
                )}
              </header>
              
              <div 
                className="prose dark:prose-invert max-w-none text-foreground"
                dangerouslySetInnerHTML={parsedContent}
              />
              
              <footer className="mt-12 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.category && post.category.name && (
                    <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                      {post.category.name}
                    </span>
                  )}
                  {/* Add more tags if needed */}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Comment</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      Updated {format(new Date(post.updated_at), 'MMMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </footer>
            </article>
            
            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* About Author */}
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">About the Author</h3>
                <div className="flex items-start space-x-4">
                  {post.author?.avatar ? (
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl text-primary font-medium">
                      {post.author?.name?.charAt(0) || 'A'}
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{post.author?.name || 'Admin'}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {post.author?.bio || 'Contributing writer at Pantami Times'}
                    </p>
                    <div className="flex items-center space-x-3 mt-2">
                      <a href="#" className="text-muted-foreground hover:text-primary">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-primary/5 border border-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Stay updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest news and articles in your inbox weekly.
                </p>
                <form className="space-y-3">
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Enter your email"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              
              {/* Trending Now */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Trending Now</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start space-x-3 group">
                      <div className="flex-shrink-0 w-16 h-16 bg-muted rounded overflow-hidden">
                        <div className="w-full h-full bg-muted-foreground/20 animate-pulse"></div>
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                          <Link href="#" className="hover:underline">
                            Trending article title goes here and can span multiple lines
                          </Link>
                        </h4>
                        <span className="text-xs text-muted-foreground">2h ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
          
          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              {post.category ? `More from ${post.category.name}` : 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3">
                    <div className="w-full h-full bg-muted-foreground/20 animate-pulse"></div>
                  </div>
                  {post.category && (
                    <div className="text-sm text-primary font-medium mb-1">
                      {post.category.name}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href="#" className="hover:underline">
                      Related article title goes here and can span multiple lines if needed
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Article excerpt goes here and can span multiple lines if needed to fill the space properly.
                  </p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Comments Section */}
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Comments</h2>
              <button className="text-sm text-primary hover:underline">
                Sign in to comment
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Comment form placeholder */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-muted-foreground text-sm">
                  <Link href="/login" className="text-primary hover:underline">Sign in</Link> to leave a comment
                </p>
              </div>
              
              {/* Comments list placeholder */}
              <div className="text-center py-8">
                <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
