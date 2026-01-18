<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  {{-- SEO Meta Tags --}}
  <meta name="description"
    content="Pantami Times - Your trusted source for breaking news, analysis, and in-depth reporting. Stay informed with the latest news from around the world.">
  <meta name="keywords"
    content="news, breaking news, world news, politics, business, technology, sports, entertainment, Pantami Times, https://pantamitimes.com.ng, gombe, gombe news, pantami gombe, gombe state news, pantamitimes.com.ng">
  <meta name="author" content="Pantami Times">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow">
  <meta name="bingbot" content="index, follow">
  <meta name="google-site-verification" content="-D2lYJKGLw4_wJGRP8pwAGLUhU4qM7IivlUKntHPx_Q" />

  {{-- Canonical URL --}}
  <link rel="canonical" href="{{ url()->current() }}">

  {{-- Open Graph / Facebook Meta Tags --}}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="{{ config('app.name') }}">
  <meta property="og:title" content="{{ config('app.name') }} - Breaking News & Latest Updates">
  <meta property="og:description"
    content="Your trusted source for breaking news, analysis, and in-depth reporting. Stay informed with the latest news from around the world.">
  <meta property="og:url" content="{{ url()->current() }}">
  <meta property="og:image" content="{{ asset('images/logo.jpg') }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">

  {{-- Twitter Card Meta Tags --}}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@PantamiTimes">
  <meta name="twitter:creator" content="@PantamiTimes">
  <meta name="twitter:title" content="{{ config('app.name') }} - Breaking News & Latest Updates">
  <meta name="twitter:description" content="Your trusted source for breaking news, analysis, and in-depth reporting.">
  <meta name="twitter:image" content="{{ asset('images/logo.jpg') }}">

  {{-- Favicon and App Icons --}}
  <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
  <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/logo.jpg') }}">
  <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/logo.jpg') }}">
  <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/logo.jpg') }}">

  {{-- Theme Color --}}
  <meta name="theme-color" content="#f0a500">
  <title>{{ $metaTitle ?? config('app.name') }}</title>

<meta name="description" content="{{ $metaDescription ?? '' }}">

<meta property="og:title" content="{{ $metaTitle ?? '' }}">
<meta property="og:description" content="{{ $metaDescription ?? '' }}">
<meta property="og:image" content="{{ $metaImage ?? '' }}">
<meta property="og:type" content="article">
<meta property="og:url" content="{{ url()->current() }}">

  <meta name="msapplication-TileColor" content="#f0a500">

  {{-- RSS Feed --}}
  <link rel="alternate" type="application/rss+xml" title="{{ config('app.name') }} RSS Feed" href="{{ url('/feed') }}">

  {{-- Preconnect for Performance --}}
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link rel="dns-prefetch" href="https://fonts.bunny.net">

  {{-- Structured Data (JSON-LD) for News Organization --}}
  @verbatim
      <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      "name": "{{ config('app.name') }}",
      "url": "{{ config('app.url') }}",
      "logo": {
        "@type": "ImageObject",
        "url": "{{ asset('images/logo.jpg') }}",
        "width": 600,
        "height": 60
      },
      "sameAs": [
        "https://web.facebook.com/people/The-Pantami-Times-TPT/61582441495025/",
        "https://twitter.com/PantamiTimes",
        "https://www.instagram.com/PantamiTimes",
        "https://www.linkedin.com/company/PantamiTimes"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Editorial",
        "email": "editorial@pantamitimes.com"
      }
    }
    </script>
  @endverbatim


  @verbatim
      <script type="application/ld+json">
    {

      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "{{ config('app.name') }}",
      "url": "{{ config('app.url') }}",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "{{ config('app.url') }}/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
    </script>
  @endverbatim


  <title inertia>{{ config('app.name', 'Pantami Times') }}</title>

  <!-- Fonts -->
  <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

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