<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($post)
    {
        // Find post by slug or ID, only if published
        $post = Post::where('slug', $post)
            ->orWhere('id', $post)
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->with(['category', 'author'])
            ->firstOrFail();

        // Increment view count
        $post->increment('views');

        // Get trending posts with full image URLs
        $trendingPosts = Post::where('status', 'published')
            ->whereNotNull('published_at')
            ->where('id', '!=', $post->id)
            ->orderBy('views', 'desc')
            ->take(3)
            ->get(['id', 'title', 'slug', 'image', 'published_at', 'views'])
            ->map(function ($item) {
                $item->image = $item->image ? asset($item->image) : null;
                return $item;
            });

        // Get related posts with full image URLs
        $relatedPosts = Post::where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($item) {
                $item->image = $item->image ? asset($item->image) : null;
                return $item;
            });

        // Ensure post image has full URL
        $post->image = $post->image ? asset($post->image) : null;

        // If author has a profile photo, ensure it has full URL
        if ($post->author && $post->author->profile_photo_path) {
            $post->author->profile_photo_url = asset('storage/' . $post->author->profile_photo_path);
        }

        return Inertia::render('Post/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'trendingPosts' => $trendingPosts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
