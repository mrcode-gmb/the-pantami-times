<?php

namespace App\Services;

use App\Models\Post;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Support\Str;

class SeoService
{
    /**
     * Default high-ranking search keywords for Pantami Times
     */
    public static function defaultKeywords(): string
    {
        return implode(', ', [
            'Pantami Times',
            'The Pantami Times',
            'pantamitimes',
            'pantamitimes.com',
            'Pantami Times News',
            'Pantami Times Newspaper',
            'Pantami News',
            'Prof Isa Ali Pantami',
            'Isa Ali Ibrahim Pantami',
            'Gombe News',
            'Pantami Gombe',
            'Gombe State News',
            'Nigerian News Today',
            'Breaking News Nigeria',
            'Digital Economy Nigeria',
            'NITDA News',
            'Nigerian Technology News',
            'TPT News',
            'Nigerian Online Newspaper',
            'Truth Humanity and Progress',
            'Governance News Nigeria',
            'African Digital Economy',
        ]);
    }

    /**
     * View data for Homepage
     */
    public static function homeViewData(): array
    {
        $siteName = config('app.name', 'Pantami Times');
        $siteUrl = config('app.url', 'https://pantamitimes.com');

        return [
            'metaTitle' => "Pantami Times | Latest Breaking News, Technology & Governance | pantamitimes.com",
            'metaDescription' => "Pantami Times (pantamitimes.com) is Nigeria's authoritative digital newspaper delivering credible reporting, breaking news, digital economy insights, governance analysis, and human-interest stories with truth, humanity, and progress.",
            'metaKeywords' => self::defaultKeywords(),
            'metaImage' => asset('images/logo.jpg'),
            'metaType' => 'website',
            'metaUrl' => $siteUrl,
            'metaAuthor' => $siteName,
            'metaSitelinksSchema' => self::siteNavigationSchema(),
        ];
    }

    /**
     * Google Sitelinks & Navigation Structure Schema
     */
    public static function siteNavigationSchema(): array
    {
        $siteUrl = rtrim(config('app.url', 'https://pantamitimes.com'), '/');

        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'SiteNavigationElement',
                    '@id' => $siteUrl . '/#nav-about',
                    'name' => 'About Pantami Times',
                    'description' => 'Learn about Pantami Times digital newsroom, editorial standards, and credible reporting mission.',
                    'url' => $siteUrl . '/about',
                ],
                [
                    '@type' => 'SiteNavigationElement',
                    '@id' => $siteUrl . '/#nav-news',
                    'name' => 'News & Politics',
                    'description' => 'Latest breaking news, politics, policy analysis, and national affairs across Nigeria.',
                    'url' => $siteUrl . '/category/news',
                ],
                [
                    '@type' => 'SiteNavigationElement',
                    '@id' => $siteUrl . '/#nav-technology',
                    'name' => 'Technology & Innovation',
                    'description' => 'Digital economy, ICT policy, startups, cybersecurity, and technological development in Nigeria.',
                    'url' => $siteUrl . '/category/technology',
                ],
                [
                    '@type' => 'SiteNavigationElement',
                    '@id' => $siteUrl . '/#nav-guidelines',
                    'name' => 'Editorial Guidelines',
                    'description' => 'Pantami Times newsroom ethics, verification standards, and fact-checking policy.',
                    'url' => $siteUrl . '/guidelines',
                ],
                [
                    '@type' => 'SiteNavigationElement',
                    '@id' => $siteUrl . '/#nav-epaper',
                    'name' => 'E-Paper Edition',
                    'description' => 'Browse Pantami Times digital newspaper editions and multimedia publications.',
                    'url' => $siteUrl . '/e-paper',
                ],
                [
                    '@type' => 'SiteNavigationElement',
                    '@id' => $siteUrl . '/#nav-contact',
                    'name' => 'Contact the Newsroom',
                    'description' => 'Connect with the editorial desk, submit investigative tips, or contact journalists.',
                    'url' => $siteUrl . '/contact',
                ],
            ],
        ];
    }

    /**
     * View data for a Single Post / Article
     */
    public static function postViewData(Post $post): array
    {
        $siteName = config('app.name', 'Pantami Times');
        $categoryName = $post->category->name ?? 'News';
        $excerpt = $post->excerpt ?: Str::limit(strip_tags($post->content), 160);

        $keywords = [
            $post->title,
            $categoryName,
            'Pantami Times',
            'The Pantami Times',
            'pantamitimes.com',
            'pantamitimes',
            'Nigeria news',
            'breaking news',
            $post->author?->name ?: 'Pantami Times Newsroom',
        ];

        if ($post->subcategory?->name) {
            $keywords[] = $post->subcategory->name;
        }

        return [
            'metaTitle' => $post->meta_title ?: "{$post->title} - Pantami Times | pantamitimes.com",
            'metaDescription' => $post->meta_description ?: $excerpt,
            'metaKeywords' => implode(', ', array_unique($keywords)),
            'metaImage' => $post->image ? (Str::startsWith($post->image, 'http') ? $post->image : asset($post->image)) : asset('images/logo.jpg'),
            'metaType' => 'article',
            'metaUrl' => $post->publicUrl(),
            'metaAuthor' => $post->author?->name ?: $siteName,
            'metaPublishedTime' => $post->published_at?->toIso8601String(),
            'metaUpdatedTime' => $post->updated_at->toIso8601String(),
            'metaSection' => $categoryName,
        ];
    }

    /**
     * View data for Category page
     */
    public static function categoryViewData(Category $category): array
    {
        $categoryName = $category->name;
        $url = url("/category/{$category->slug}");

        $keywords = [
            "{$categoryName} News",
            "{$categoryName} Nigeria",
            $categoryName,
            'Pantami Times',
            'The Pantami Times',
            'pantamitimes.com',
            'pantamitimes',
            'Nigerian News Today',
        ];

        return [
            'metaTitle' => "{$categoryName} News & Reports - Pantami Times | pantamitimes.com",
            'metaDescription' => "Read the latest {$categoryName} news, verified updates, investigations, and expert commentary on Pantami Times (pantamitimes.com).",
            'metaKeywords' => implode(', ', $keywords),
            'metaImage' => asset('images/logo.jpg'),
            'metaType' => 'website',
            'metaUrl' => $url,
            'metaAuthor' => config('app.name', 'Pantami Times'),
        ];
    }

    /**
     * View data for Subcategory page
     */
    public static function subcategoryViewData(Category $category, SubCategory $subcategory): array
    {
        $url = url("/category/{$category->slug}/{$subcategory->slug}");

        $keywords = [
            $subcategory->name,
            $category->name,
            "{$subcategory->name} News",
            'Pantami Times',
            'pantamitimes.com',
            'The Pantami Times',
        ];

        return [
            'metaTitle' => "{$subcategory->name} - {$category->name} | Pantami Times (pantamitimes.com)",
            'metaDescription' => "Explore {$subcategory->name} under {$category->name} on Pantami Times (pantamitimes.com). In-depth coverage and verified reporting.",
            'metaKeywords' => implode(', ', $keywords),
            'metaImage' => asset('images/logo.jpg'),
            'metaType' => 'website',
            'metaUrl' => $url,
            'metaAuthor' => config('app.name', 'Pantami Times'),
        ];
    }

    /**
     * View data for Public Trust pages (About, Contact, Guidelines, etc.)
     */
    public static function publicPageViewData(array $pageData): array
    {
        $siteName = config('app.name', 'Pantami Times');
        $title = $pageData['title'] ?? 'Information';
        $description = $pageData['description'] ?? 'Official public standards and newsroom pages for Pantami Times.';

        $keywords = [
            $title,
            'About Pantami Times',
            'Pantami Times Newsroom',
            'Pantami Times Editorial',
            'pantamitimes.com',
            'The Pantami Times',
            'Nigerian Journalism Standards',
        ];

        return [
            'metaTitle' => "{$title} - Pantami Times | pantamitimes.com",
            'metaDescription' => $description,
            'metaKeywords' => implode(', ', $keywords),
            'metaImage' => asset('images/logo.jpg'),
            'metaType' => 'website',
            'metaUrl' => request()->url(),
            'metaAuthor' => $siteName,
        ];
    }

    /**
     * View data for Search Results page
     */
    public static function searchViewData(string $query): array
    {
        $cleanQuery = htmlspecialchars($query, ENT_QUOTES, 'UTF-8');

        return [
            'metaTitle' => "Search Results for '{$cleanQuery}' - Pantami Times | pantamitimes.com",
            'metaDescription' => "Search results for '{$cleanQuery}' on Pantami Times (pantamitimes.com). Find stories, analysis, and breaking updates.",
            'metaKeywords' => "{$cleanQuery}, search Pantami Times, pantamitimes.com news, Pantami Times",
            'metaImage' => asset('images/logo.jpg'),
            'metaType' => 'website',
            'metaUrl' => request()->fullUrl(),
            'metaAuthor' => config('app.name', 'Pantami Times'),
        ];
    }

    /**
     * Generate Schema.org structured data for Article
     */
    public static function generateArticleSchema(Post $post): array
    {
        $image = $post->image ? (Str::startsWith($post->image, 'http') ? $post->image : asset($post->image)) : asset('images/logo.jpg');
        $siteName = config('app.name', 'Pantami Times');
        $siteUrl = config('app.url', 'https://pantamitimes.com');

        return [
            '@context' => 'https://schema.org',
            '@type' => 'NewsArticle',
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => $post->publicUrl(),
            ],
            'headline' => $post->title,
            'description' => strip_tags($post->excerpt ?: Str::limit($post->content, 200)),
            'image' => [
                '@type' => 'ImageObject',
                'url' => $image,
            ],
            'datePublished' => $post->published_at?->toIso8601String(),
            'dateModified' => $post->updated_at->toIso8601String(),
            'author' => [
                '@type' => 'Person',
                'name' => $post->author->name ?? $siteName,
                'url' => $siteUrl,
            ],
            'publisher' => [
                '@type' => 'NewsMediaOrganization',
                'name' => $siteName,
                'url' => $siteUrl,
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => asset('images/logo.jpg'),
                ],
            ],
            'articleSection' => $post->category->name ?? 'News',
            'inLanguage' => 'en-US',
        ];
    }

    /**
     * Generate Breadcrumbs Schema
     */
    public static function generateBreadcrumbSchema(Post $post): array
    {
        $items = [
            [
                '@type' => 'ListItem',
                'position' => 1,
                'name' => 'Home',
                'item' => config('app.url', 'https://pantamitimes.com'),
            ],
        ];

        $pos = 2;
        if ($post->category) {
            $items[] = [
                '@type' => 'ListItem',
                'position' => $pos++,
                'name' => $post->category->name,
                'item' => url("/category/{$post->category->slug}"),
            ];
        }

        if ($post->subcategory) {
            $items[] = [
                '@type' => 'ListItem',
                'position' => $pos++,
                'name' => $post->subcategory->name,
                'item' => url("/category/{$post->category->slug}/{$post->subcategory->slug}"),
            ];
        }

        $items[] = [
            '@type' => 'ListItem',
            'position' => $pos,
            'name' => $post->title,
            'item' => $post->publicUrl(),
        ];

        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => $items,
        ];
    }
}
