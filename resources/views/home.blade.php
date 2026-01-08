@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4">
    <!-- Top Advertisement Banner -->
    <div class="my-4 p-4 text-center bg-gray-100 border">
        <p class="text-gray-500">Advertisement</p>
    </div>

    <!-- Lead News Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Featured Story -->
        <div class="md:col-span-2">
            @if($featuredPost)
                <div class="border-b pb-4">
                    <img src="{{ $featuredPost->image ?? 'https://via.placeholder.com/800x400' }}" alt="{{ $featuredPost->title }}" class="w-full h-auto object-cover mb-4">
                    <h1 class="text-4xl font-serif font-bold mb-2">
                        <a href="#" class="hover:text-deep-gold">{{ $featuredPost->title }}</a>
                    </h1>
                    <p class="text-gray-700">{{ Str::limit($featuredPost->content, 150) }}</p>
                </div>
            @endif
        </div>

        <!-- Smaller Stacked Headlines -->
        <div class="space-y-4">
            @foreach($latestPosts->take(4) as $post)
                <div class="flex items-start space-x-4 border-b pb-4">
                    <img src="{{ $post->image ?? 'https://via.placeholder.com/150x100' }}" alt="{{ $post->title }}" class="w-24 h-16 object-cover">
                    <div>
                        <span class="text-sm font-semibold text-deep-gold">{{ $post->category->name }}</span>
                        <h2 class="text-lg font-serif font-semibold">
                            <a href="#" class="hover:text-deep-gold">{{ $post->title }}</a>
                        </h2>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    <!-- Category Sections -->
    @foreach(['Politics', 'Business', 'Sports', 'Technology', 'Features', 'Opinion'] as $categoryName)
        <div class="mb-8">
            <!-- Section Divider -->
            <div class="border-b-2 border-black mb-4">
                <h3 class="text-xl font-serif font-bold border-b-4 border-deep-gold inline-block pb-1">{{ strtoupper($categoryName) }}</h3>
            </div>

            @php
                $categoryPosts = $postsByCategory[$categoryName] ?? collect();
                $mainStory = $categoryPosts->first();
                $secondaryStories = $categoryPosts->skip(1)->take(4);
            @endphp

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Main Story -->
                <div class="md:col-span-2">
                    @if($mainStory)
                        <div>
                            <img src="{{ $mainStory->image ?? 'https://via.placeholder.com/600x350' }}" alt="{{ $mainStory->title }}" class="w-full h-auto object-cover mb-4">
                            <h2 class="text-3xl font-serif font-bold mb-2">
                                <a href="#" class="hover:text-deep-gold">{{ $mainStory->title }}</a>
                            </h2>
                            <p class="text-gray-600">{{ Str::limit($mainStory->content, 120) }}</p>
                        </div>
                    @endif
                </div>

                <!-- Secondary Stories -->
                <div class="space-y-4">
                    @foreach($secondaryStories as $post)
                        <div class="flex items-start space-x-4 border-b pb-4">
                            <img src="{{ $post->image ?? 'https://via.placeholder.com/100x75' }}" alt="{{ $post->title }}" class="w-20 h-14 object-cover">
                            <div>
                                <h3 class="text-md font-serif font-semibold">
                                    <a href="#" class="hover:text-deep-gold">{{ $post->title }}</a>
                                </h3>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    @endforeach

    <!-- Mixed Content Grid & Sidebar -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div class="lg:col-span-3">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @foreach(['Technology', 'Features', 'Opinion'] as $categoryName)
                    <div class="space-y-4">
                        <div class="border-b-2 border-black mb-4">
                            <h3 class="text-lg font-serif font-bold border-b-4 border-deep-gold inline-block pb-1">{{ strtoupper($categoryName) }}</h3>
                        </div>
                        @php
                            $categoryPosts = $postsByCategory[$categoryName] ?? collect();
                        @endphp
                        @foreach($categoryPosts->take(5) as $post)
                            <div class="border-b pb-2">
                                <h4 class="font-serif font-semibold"><a href="#" class="hover:text-deep-gold">{{ $post->title }}</a></h4>
                            </div>
                        @endforeach
                    </div>
                @endforeach
            </div>
        </div>

        <!-- Sidebar -->
        <aside class="hidden lg:block space-y-8">
            <div>
                <h3 class="text-lg font-serif font-bold border-b-4 border-deep-gold inline-block pb-1 mb-4">TRENDING</h3>
                <ul class="space-y-2">
                    @foreach($trendingPosts->take(5) as $post)
                        <li class="border-b pb-2">
                            <a href="#" class="hover:text-deep-gold font-serif">{{ $post->title }}</a>
                        </li>
                    @endforeach
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-serif font-bold border-b-4 border-deep-gold inline-block pb-1 mb-4">MOST READ</h3>
                <ul class="space-y-2">
                    @foreach($mostReadPosts->take(5) as $post)
                        <li class="border-b pb-2">
                            <a href="#" class="hover:text-deep-gold font-serif">{{ $post->title }}</a>
                        </li>
                    @endforeach
                </ul>
            </div>
            <div class="p-4 bg-gray-100 border text-center">
                <p class="text-gray-500">Small Ad Block</p>
            </div>
        </aside>
    </div>

    <!-- Footer Teaser Area -->
    <div class="border-t-2 border-black pt-8 mt-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            @foreach(['Politics', 'Business', 'Sports', 'Technology'] as $categoryName)
                <div class="space-y-3">
                    <h4 class="text-lg font-serif font-bold border-b-2 border-deep-gold inline-block">{{ strtoupper($categoryName) }}</h4>
                    <ul class="space-y-2">
                        @php
                            $categoryPosts = $postsByCategory[$categoryName] ?? collect();
                        @endphp
                        @foreach($categoryPosts->take(4) as $post)
                            <li><a href="#" class="hover:text-deep-gold">{{ $post->title }}</a></li>
                        @endforeach
                    </ul>
                    <a href="#" class="text-deep-gold font-semibold hover:underline">View more &rarr;</a>
                </div>
            @endforeach
        </div>
    </div>
</div>
@endsection
