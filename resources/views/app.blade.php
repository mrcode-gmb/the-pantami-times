<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

@php
  $siteName = config('app.name', 'Pantami Times');
  $defaultDescription = 'Pantami Times is a digital newsroom for credible reporting, useful context, and stories that matter to everyday readers.';
  $resolvedTitle = $metaTitle ?? $siteName;
  $resolvedDescription = $metaDescription ?? $defaultDescription;
  $resolvedImage = $metaImage ?? asset('images/logo.jpg');
  $resolvedUrl = $metaUrl ?? url()->current();
  $resolvedType = $metaType ?? 'website';
  $resolvedAuthor = $metaAuthor ?? $siteName;

  $organizationSchema = [
      '@context' => 'https://schema.org',
      '@type' => 'NewsMediaOrganization',
      'name' => $siteName,
      'url' => config('app.url'),
      'logo' => [
          '@type' => 'ImageObject',
          'url' => asset('images/logo.jpg'),
          'width' => 600,
          'height' => 60,
      ],
      'sameAs' => [
          'https://web.facebook.com/people/The-Pantami-Times-TPT/61582441495025/',
          'https://twitter.com/PantamiTimes',
          'https://www.instagram.com/PantamiTimes',
          'https://www.linkedin.com/company/PantamiTimes',
          'https://www.youtube.com/@PantamiTimes',
      ],
      'contactPoint' => [
          '@type' => 'ContactPoint',
          'contactType' => 'Editorial',
          'email' => 'editorial@pantamitimes.com',
      ],
  ];

  $websiteSchema = [
      '@context' => 'https://schema.org',
      '@type' => 'WebSite',
      'name' => $siteName,
      'url' => config('app.url'),
      'potentialAction' => [
          '@type' => 'SearchAction',
          'target' => [
              '@type' => 'EntryPoint',
              'urlTemplate' => config('app.url') . '/search?q={search_term_string}',
          ],
          'query-input' => 'required name=search_term_string',
      ],
  ];
@endphp

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  {{-- SEO Meta Tags --}}
  <meta name="description" content="{{ $resolvedDescription }}">
  <meta name="keywords"
    content="news, breaking news, world news, politics, business, technology, sports, entertainment, Pantami Times, https://pantamitimes.com, gombe, gombe news, pantami gombe, gombe state news, pantamitimes.com">
  <meta name="author" content="{{ $resolvedAuthor }}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow">
  <meta name="bingbot" content="index, follow">
  <meta name="google-site-verification" content="-D2lYJKGLw4_wJGRP8pwAGLUhU4qM7IivlUKntHPx_Q" />
  <meta name="google-adsense-account" content="ca-pub-3454126744747191">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3454126744747191"
    crossorigin="anonymous"></script>

  {{-- Canonical URL --}}
  <link rel="canonical" href="{{ $resolvedUrl }}">

  {{-- Open Graph / Facebook Meta Tags --}}
  <meta property="og:type" content="{{ $resolvedType }}">
  <meta property="og:site_name" content="{{ $siteName }}">
  <meta property="og:title" content="{{ $resolvedTitle }}">
  <meta property="og:description" content="{{ $resolvedDescription }}">
  <meta property="og:url" content="{{ $resolvedUrl }}">
  <meta property="og:image" content="{{ $resolvedImage }}">
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

  {{-- Favicon and App Icons --}}
  <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
  <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/logo.jpg') }}">
  <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/logo.jpg') }}">
  <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/logo.jpg') }}">

  {{-- Theme Color --}}
  <meta name="theme-color" content="#f0a500">
  <meta name="twitter:image:src" content="{{ $resolvedImage }}" />

  <meta name="msapplication-TileColor" content="#f0a500">

  @if(!empty($metaPublishedTime))
    <meta property="article:published_time" content="{{ $metaPublishedTime }}">
  @endif

  @if(!empty($metaUpdatedTime))
    <meta property="article:modified_time" content="{{ $metaUpdatedTime }}">
  @endif

  @if($resolvedType === 'article')
    <meta property="article:author" content="{{ $resolvedAuthor }}">
  @endif

  {{-- Preconnect for Performance --}}
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link rel="dns-prefetch" href="https://fonts.bunny.net">

  {{-- Structured Data (JSON-LD) for News Organization --}}
  <script type="application/ld+json">{!! json_encode($organizationSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}</script>
  <script type="application/ld+json">{!! json_encode($websiteSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}</script>

  <title inertia>{{ $resolvedTitle }}</title>

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
