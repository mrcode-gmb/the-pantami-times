<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    
    {{-- Homepage --}}
    <url>
        <loc>{{ config('app.url') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>hourly</changefreq>
        <priority>1.0</priority>
    </url>

    {{-- Static Trust Pages --}}
    @if(!empty($staticPages))
        @foreach($staticPages as $page)
        <url>
            <loc>{{ $page['url'] }}</loc>
            <lastmod>{{ now()->startOfMonth()->toAtomString() }}</lastmod>
            <changefreq>{{ $page['changefreq'] }}</changefreq>
            <priority>{{ $page['priority'] }}</priority>
        </url>
        @endforeach
    @endif

    {{-- Categories & Subcategories --}}
    @foreach($categories as $category)
    <url>
        <loc>{{ config('app.url') }}/category/{{ $category->slug }}</loc>
        <lastmod>{{ ($category->updated_at ?? now())->toAtomString() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
        @if(!empty($category->subcategories))
            @foreach($category->subcategories as $sub)
            <url>
                <loc>{{ config('app.url') }}/category/{{ $category->slug }}/{{ $sub->slug }}</loc>
                <lastmod>{{ ($sub->updated_at ?? now())->toAtomString() }}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
            @endforeach
        @endif
    @endforeach

    {{-- Posts --}}
    @foreach($posts as $post)
    <url>
        <loc>{{ $post->publicUrl() }}</loc>
        <lastmod>{{ ($post->updated_at ?? $post->created_at)->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
        
        {{-- News Sitemap Extension --}}
        @if($post->published_at)
        <news:news>
            <news:publication>
                <news:name>{{ config('app.name') }}</news:name>
                <news:language>{{ app()->getLocale() }}</news:language>
            </news:publication>
            <news:publication_date>{{ $post->published_at->toAtomString() }}</news:publication_date>
            <news:title>{{ $post->title }}</news:title>
        </news:news>
        @endif

        {{-- Image Extension --}}
        @if($post->image)
        <image:image>
            <image:loc>{{ asset($post->image) }}</image:loc>
            <image:title>{{ $post->title }}</image:title>
            <image:caption>{{ Str::limit(strip_tags($post->content), 100) }}</image:caption>
        </image:image>
        @endif
    </url>
    @endforeach

</urlset>
