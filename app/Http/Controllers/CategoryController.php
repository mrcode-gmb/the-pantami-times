<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of all categories.
     */
    public function index()
    {
        $categories = Category::withCount('posts')->get();
        
        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show posts for a specific category.
     */
    public function show($slug)
    {
        $category = Category::select('id', 'name', 'slug')
            ->where('slug', $slug)
            ->firstOrFail();
        
        $posts = Post::select([
                'id',
                'uuid',
                'title',
                'slug',
                'image',
                'excerpt',
                'category_id',
                'author_id',
                'created_at',
                'published_at',
                'views'
            ])
            ->where('category_id', $category->id)
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->with([
                'author:id,name',
                'category:id,name,slug'
            ])
            ->latest('published_at')
            ->paginate(20);
        
        // Transform image URLs for paginated results
        $posts->getCollection()->transform(function($post) {
            $post->image = $post->image ? asset($post->image) : null;
            return $post;
        });
        
        // Get all categories for navigation
        $categories = \Illuminate\Support\Facades\Cache::remember('nav_categories', 3600, function () {
            return Category::select('id', 'name', 'slug')
                ->withCount('posts')
                ->orderBy('name')
                ->get();
        });
        
        return Inertia::render('Categories/Show', [
            'category' => $category,
            'posts' => $posts,
            'categories' => $categories,
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
