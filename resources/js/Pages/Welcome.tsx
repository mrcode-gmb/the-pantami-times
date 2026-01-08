import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Header } from '@/Components/Header';
import { Footer } from '@/Components/Footer';
import { HeroSection } from '@/Components/HeroSection';
import { MainContent } from '@/Components/MainContent';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <div className="min-h-screen bg-background">
                <Header />
                <main>
                    <HeroSection />
                    <MainContent />
                </main>
                <Footer />
            </div>
        </>
    );
}
