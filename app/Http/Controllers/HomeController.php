<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $posts = Post::with('category')->where('status', 'published')->latest()->get();

        $featuredPost = $posts->first();
        $latestPosts = $posts->skip(1);

        $postsByCategory = $posts->groupBy('category.name');

        // Dummy data for trending and most read for now
        $trendingPosts = $posts->sortByDesc('view_count')->take(5); // Assuming a 'view_count' attribute
        $mostReadPosts = $posts->sortByDesc('view_count')->take(5);

        return view('home', compact('featuredPost', 'latestPosts', 'postsByCategory', 'trendingPosts', 'mostReadPosts'));
    }
}
