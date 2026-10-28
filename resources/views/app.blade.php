<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

@php
  $siteName = config('app.name', 'Pantami Times');
  $siteUrl = config('app.url', 'https://pantamitimes.com');
  $defaultTitle = "Pantami Times | Latest Breaking News, Technology & Governance | pantamitimes.com";
  $defaultDescription = "Pantami Times (pantamitimes.com) is Nigeria's authoritative digital newspaper delivering credible reporting, breaking news, digital economy insights, governance analysis, and human-interest stories with truth, humanity, and progress.";
  $defaultKeywords = \App\Services\SeoService::defaultKeywords();

  $resolvedTitle = $metaTitle ?? $defaultTitle;
  $resolvedDescription = $metaDescription ?? $defaultDescription;
  $resolvedKeywords = $metaKeywords ?? $defaultKeywords;
  $resolvedImage = $metaImage ?? asset('images/logo.jpg');
  $resolvedUrl = $metaUrl ?? url()->current();
  $resolvedType = $metaType ?? 'website';
  $resolvedAuthor = $metaAuthor ?? $siteName;

  $organizationSchema = [
      '@context' => 'https://schema.org',
      '@type' => 'NewsMediaOrganization',
      '@id' => $siteUrl . '/#organization',
      'name' => $siteName,
      'alternateName' => [
          'The Pantami Times',
          'pantamitimes.com',
          'PantamiTimes',
          'TPT News',
          'Pantami Times Media',
      ],
      'url' => $siteUrl,
      'logo' => [
          '@type' => 'ImageObject',
          'url' => asset('images/logo.jpg'),
          'width' => 600,
          'height' => 60,
          'caption' => 'Pantami Times Logo',
      ],
      'slogan' => 'Truth, Humanity, & Progress',
      'description' => $defaultDescription,
      'foundingLocation' => [
          '@type' => 'Place',
          'name' => 'Gombe, Nigeria',
      ],
      'sameAs' => [
          'https://web.facebook.com/people/The-Pantami-Times-TPT/61582441495025/',
          'https://twitter.com/PantamiTimes',
          'https://www.instagram.com/PantamiTimes',
          'https://www.linkedin.com/company/PantamiTimes',
          'https://www.youtube.com/@PantamiTimes',
      ],
      'publishingPrinciples' => $siteUrl . '/guidelines',
      'correctionsPolicy' => $siteUrl . '/corrections',
      'contactPoint' => [
          [
              '@type' => 'ContactPoint',
              'contactType' => 'Editorial Desk',
              'email' => 'editorial@pantamitimes.com',
          ],
          [
              '@type' => 'ContactPoint',
              'contactType' => 'General Inquiries',
              'email' => 'support@pantamitimes.com',
          ],
      ],
  ];

  $websiteSchema = [
      '@context' => 'https://schema.org',
      '@type' => 'WebSite',
      '@id' => $siteUrl . '/#website',
      'name' => $siteName,
      'alternateName' => [
          'The Pantami Times',
          'pantamitimes.com',
          'PantamiTimes',
      ],
      'url' => $siteUrl,
      'description' => $defaultDescription,
      'publisher' => [
          '@id' => $siteUrl . '/#organization',
      ],
      'potentialAction' => [
          '@type' => 'SearchAction',
          'target' => [
              '@type' => 'EntryPoint',
              'urlTemplate' => $siteUrl . '/search?q={search_term_string}',
          ],
          'query-input' => 'required name=search_term_string',
      ],
      'inLanguage' => 'en-US',
  ];
@endphp

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  {{-- Primary SEO Meta Tags --}}
  <title inertia>{{ $resolvedTitle }}</title>
  <meta name="title" content="{{ $resolvedTitle }}">
  <meta name="description" content="{{ $resolvedDescription }}">
  <meta name="keywords" content="{{ $resolvedKeywords }}">
  <meta name="author" content="{{ $resolvedAuthor }}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta name="news_keywords" content="Pantami Times, Nigeria news, politics, governance, digital economy, technology, pantamitimes.com">
  <meta name="google-site-verification" content="-D2lYJKGLw4_wJGRP8pwAGLUhU4qM7IivlUKntHPx_Q" />
  <meta name="google-adsense-account" content="ca-pub-3454126744747191">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3454126744747191"
    crossorigin="anonymous"></script>

  {{-- Canonical URL --}}
  <link rel="canonical" href="{{ $resolvedUrl }}">

  {{-- Open Graph / Facebook Meta Tags --}}
  <meta property="og:type" content="{{ $resolvedType }}">
  <meta property="og:site_name" content="Pantami Times (pantamitimes.com)">
  <meta property="og:title" content="{{ $resolvedTitle }}">
  <meta property="og:description" content="{{ $resolvedDescription }}">
  <meta property="og:url" content="{{ $resolvedUrl }}">
  <meta property="og:image" content="{{ $resolvedImage }}">
  <meta property="og:image:alt" content="{{ $resolvedTitle }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">

  {{-- Twitter Card Meta Tags --}}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@PantamiTimes">
  <meta name="twitter:creator" content="@PantamiTimes">
  <meta name="twitter:title" content="{{ $resolvedTitle }}">
  <meta name="twitter:description" content="{{ $resolvedDescription }}">
  <meta name="twitter:image" content="{{ $resolvedImage }}">
  <meta name="twitter:image:alt" content="{{ $resolvedTitle }}">

  {{-- Favicon and App Icons --}}
  <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
  <link rel="icon" type="image/png" sizes="48x48" href="{{ asset('favicon-48x48.png') }}">
  <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('icon-192.png') }}">
  <link rel="icon" type="image/png" sizes="512x512" href="{{ asset('icon-512.png') }}">
  <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
  <link rel="manifest" href="{{ asset('site.webmanifest') }}">

  {{-- Theme Color --}}
  <meta name="theme-color" content="#f0a500">
  <meta name="msapplication-TileColor" content="#f0a500">

  @if(!empty($metaPublishedTime))
    <meta property="article:published_time" content="{{ $metaPublishedTime }}">
  @endif

  @if(!empty($metaUpdatedTime))
    <meta property="article:modified_time" content="{{ $metaUpdatedTime }}">
  @endif

  @if($resolvedType === 'article')
    <meta property="article:author" content="{{ $resolvedAuthor }}">
    @if(!empty($metaSection))
      <meta property="article:section" content="{{ $metaSection }}">
    @endif
  @endif

  {{-- Preconnect for Performance --}}
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link rel="dns-prefetch" href="https://fonts.bunny.net">

  {{-- Structured Data (JSON-LD) for News Organization & Website --}}
  <script type="application/ld+json">{!! json_encode($organizationSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}</script>
  <script type="application/ld+json">{!! json_encode($websiteSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}</script>

  @if(!empty($metaSitelinksSchema))
    {{-- Google Sitelinks & Navigation Structure --}}
    <script type="application/ld+json">{!! json_encode($metaSitelinksSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}</script>
  @endif

  @if(!empty($metaArticleSchema))
    <script type="application/ld+json">{!! json_encode($metaArticleSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}</script>
  @endif

  @if(!empty($metaBreadcrumbSchema))
    <script type="application/ld+json">{!! json_encode($metaBreadcrumbSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}</script>
  @endif

  <!-- Fonts -->
  <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
  <!-- Scripts -->
  @routes
  @viteReactRefresh
  @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
  @inertiaHead
</head>

<body class="font-sans antialiased">

  @inertia

</body>

</html>
