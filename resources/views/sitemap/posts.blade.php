<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    @foreach($posts as $post)
    <url>
        <loc>{{ $post->publicUrl() }}</loc>
        <lastmod>{{ $post->updated_at->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>

        <news:news>
            <news:publication>
                <news:name>{{ config('app.name') }}</news:name>
                <news:language>{{ app()->getLocale() }}</news:language>
            </news:publication>
            <news:publication_date>{{ $post->published_at->toAtomString() }}</news:publication_date>
            <news:title>{{ $post->title }}</news:title>
        </news:news>

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
