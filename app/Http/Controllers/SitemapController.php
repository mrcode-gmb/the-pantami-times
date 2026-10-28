<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $posts = Post::where('status', 'published')
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->get();

        $categories = Category::with('subcategories')->get();

        $baseUrl = rtrim(config('app.url', 'https://pantamitimes.com'), '/');

        $staticPages = [
            ['url' => $baseUrl . '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/e-paper', 'priority' => '0.8', 'changefreq' => 'daily'],
            ['url' => $baseUrl . '/guidelines', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/corrections', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/advertise', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/careers', 'priority' => '0.6', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/writing-tips', 'priority' => '0.6', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/help', 'priority' => '0.6', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/privacy', 'priority' => '0.5', 'changefreq' => 'yearly'],
            ['url' => $baseUrl . '/terms', 'priority' => '0.5', 'changefreq' => 'yearly'],
            ['url' => $baseUrl . '/cookie-policy', 'priority' => '0.5', 'changefreq' => 'yearly'],
        ];

        return response()->view('sitemap.index', [
            'posts' => $posts,
            'categories' => $categories,
            'staticPages' => $staticPages,
        ])->header('Content-Type', 'text/xml');
    }

    public function posts()
    {
        $posts = Post::where('status', 'published')
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->get();

        return response()->view('sitemap.posts', [
            'posts' => $posts,
        ])->header('Content-Type', 'text/xml');
    }
}
