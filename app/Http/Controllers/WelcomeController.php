<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Services\SeoService;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        // Cache categories with subcategories
        $categories = Category::with(['subcategories'])
            ->withCount('posts')
            ->orderBy('priority', 'asc')
            ->get();

        // Optimize post query - only select needed fields
        $posts = Post::select([
            'id',
            'uuid',
            'title',
            'slug',
            'image',
            'video_url',
            'public_id',
            'excerpt',
            'category_id',
            'author_id',
            'created_at',
            'published_at',
            'views'
        ])
            ->with([
                'category:id,name,slug',
                'author:id,name'
            ])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->limit(20)
            ->get()
            ->map(function ($post) {
                if ($post->image) {
                    $post->image = asset($post->image);
                }
                return $post;
            });

        return Inertia::render('Welcome', [
            'posts' => $posts,
            'categories' => $categories,
        ])->withViewData(SeoService::homeViewData());
    }
}
