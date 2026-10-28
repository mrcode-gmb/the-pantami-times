import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Header } from '@/Components/Headers';
import { Footer } from '@/Components/Footer';
import { HeroSection } from '@/Components/HeroSection';
import { MainContent } from '@/Components/MainContent';
import { VtuBannerSlider, AqtrisVtuPromoSection } from '@/Components/AqtrisVtuPromo';

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
    categories: Array<{ id: number; name: string; priority: string; slug: string; posts_count?: number }>;
}>) {
    const vtuSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Turnkey VTU & Fintech Software Platforms by Aqtris",
        "description": "Ready-to-launch VTU web portals and mobile apps engineered by Aqtris Technologies.",
        "url": "https://pantamitimes.com/#own-vtu-platform",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "item": {
                    "@type": "Product",
                    "name": "VTU Basic Web & Mobile Platform",
                    "description": "Everything you need to launch your own automated VTU business with a high-performance web portal, Android app, and 2 data API providers.",
                    "url": "https://aqtris.com/pricing/vtu-basic-web-mobile-platform",
                    "image": "https://pantamitimes.com/images/ads/banner_second.png",
                    "brand": {
                        "@type": "Brand",
                        "name": "Aqtris Technologies"
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": "330000",
                        "priceCurrency": "NGN",
                        "priceValidUntil": "2027-12-31",
                        "availability": "https://schema.org/InStock",
                        "url": "https://aqtris.com/pricing/vtu-basic-web-mobile-platform",
                        "seller": {
                            "@type": "Organization",
                            "name": "AQTRIS TECH"
                        }
                    }
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                    "@type": "Product",
                    "name": "VTU Premium All-In-One Platform",
                    "description": "A complete enterprise VTU ecosystem with 4 API providers, 2 to 3 payment gateways, electricity bills, cable TV, cashbacks, and airtime to cash.",
                    "url": "https://aqtris.com/pricing/vtu-premium-all-in-one-platform",
                    "image": "https://pantamitimes.com/images/ads/banner_first.png",
                    "brand": {
                        "@type": "Brand",
                        "name": "Aqtris Technologies"
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": "500000",
                        "priceCurrency": "NGN",
                        "priceValidUntil": "2027-12-31",
                        "availability": "https://schema.org/InStock",
                        "url": "https://aqtris.com/pricing/vtu-premium-all-in-one-platform",
                        "seller": {
                            "@type": "Organization",
                            "name": "AQTRIS TECH"
                        }
                    }
                }
            }
        ]
    };

    return (
        <>
            <Head>
                <title>Pantami Times | Latest Breaking News, Technology &amp; Governance | pantamitimes.com</title>
                <meta name="description" content="Pantami Times (pantamitimes.com) is Nigeria's authoritative digital newspaper delivering credible reporting, breaking news, digital economy insights, governance analysis, and human-interest stories." />
                <meta name="keywords" content="Pantami Times, The Pantami Times, pantamitimes, pantamitimes.com, Pantami News, Prof Isa Ali Pantami, Gombe News, Pantami Gombe, Nigerian News Today, Breaking News Nigeria, Digital Economy Nigeria, NITDA News, TPT News" />
                <script type="application/ld+json">
                    {JSON.stringify(vtuSchema)}
                </script>
            </Head>
            <div className="min-h-screen bg-background">
                <Header categories={categories} activeNews="GOVERNANCE"/>
                <main>
                    {/* Primary Semantic H1 for Search Engine Discovery */}
                    <h1 className="sr-only">Pantami Times (pantamitimes.com) — Nigeria&apos;s Authoritative Digital Newspaper &amp; Media Newsroom</h1>

                    {/* Top Hero & Breaking Stories */}
                    <HeroSection posts={posts} />

                    {/* Sponsored Interactive Banner Ad Slider */}
                    <div className="container py-3">
                        <VtuBannerSlider />
                    </div>

                    {/* Main News & Category Sections */}
                    <MainContent posts={posts} />

                    {/* Turnkey VTU Platform Pricing & Comparison Cards */}
                    <AqtrisVtuPromoSection showSlider={false} />
                </main>
                <Footer />
            </div>
        </>
    );
}
