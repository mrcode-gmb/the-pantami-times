import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Header } from '@/Components/Headers';
import { Footer } from '@/Components/Footer';
import { HeroSection } from '@/Components/HeroSection';
import { MainContent } from '@/Components/MainContent';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    posts,
    categories,
}: PageProps<{ 
    laravelVersion: string; 
    phpVersion: string; 
    posts: any[]; 
    categories: Array<{ id: number; name: string; slug: string; posts_count?: number }>;
}>) {
    return (
        <>
            <Head title='Pantami Times - Truth, Humanity, & Progress'/>
            <div className="min-h-screen bg-background">
                {/* <Header categories={categories} /> */}
                <main className='mt-16'>
                    <HeroSection posts={posts} />
                    <MainContent posts={posts} />
                </main>
                <Footer />
            </div>
        </>
    );
}
