<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

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
    public function show(Request $request, string $postIdentifier)
    {
        $post = $this->buildPostShowQuery()
            ->where(function (Builder $query) use ($postIdentifier) {
                $query
                    ->where('public_id', $postIdentifier)
                    ->orWhere('slug', $postIdentifier)
                    ->orWhere('uuid', $postIdentifier);
            })
            ->firstOrFail();

        $canonicalIdentifier = $post->public_id ?: $post->slug;
        if ($postIdentifier !== $canonicalIdentifier) {
            return redirect()->to($post->publicUrl(), 301);
        }

        // Increment view count only once per IP address (forever)
        $ipAddress = request()->ip();
        $cacheKey = 'post_view_' . $post->id . '_' . $ipAddress;

        // Check if this IP has already viewed this post
        if (!\Illuminate\Support\Facades\Cache::has($cacheKey)) {
            $post->increment('views');
            // Store in cache forever - this IP will never increment this post again
            \Illuminate\Support\Facades\Cache::forever($cacheKey, true);
        }

        // Get trending posts with full image URLs - optimized
        $trendingPosts = Post::select(['id', 'uuid', 'title', 'slug', 'public_id', 'image', 'credit', 'video_url', 'published_at', 'views', 'category_id'])
            ->published()
            ->where('id', '!=', $post->id)
            ->with('category:id,name,slug')
            ->orderBy('views', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($item) {
                $item->image = $item->image ? asset($item->image) : null;
                return $item;
            });

        // Get related posts with full image URLs - optimized
        $relatedPosts = Post::select(['id', 'uuid', 'title', 'slug', 'public_id', 'image', 'video_url', 'credit', 'excerpt', 'published_at', 'category_id'])
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->published()
            ->with('category:id,name,slug')
            ->latest('published_at')
            ->limit(3)
            ->get()
            ->map(function ($item) {
                $item->image = $item->image ? asset($item->image) : null;
                return $item;
            });

        // Ensure post image has full URL
        $post->image = $post->image ? asset($post->image) : null;

        // If author has a profile photo, ensure it has full URL
        if ($post->author) {
            if ($this->usersHaveProfilePhotos() && $post->author->profile_photo_path) {
                $post->author->avatar = asset('storage/' . $post->author->profile_photo_path);
            }

            $post->author->role_label = $post->author->newsroomRoleLabel();
            $post->author->bio = $post->author->newsroomBio();
            $post->author->articles_count = $post->author->posts_count ?? 0;
            $post->author->contact_email = 'editorial@pantamitimes.com';
        }
        return Inertia::render('Post/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'trendingPosts' => $trendingPosts,
            'categories' => Category::with("subcategories")->orderBy('priority')->get(),
        ])->withViewData([
            'metaTitle' => $post->title . ' - ' . config('app.name'),
            'metaDescription' => $post->excerpt ?: Str::limit(strip_tags($post->content), 160),
            'metaImage' => $post->image ?: asset('images/logo.jpg'),
            'metaType' => 'article',
            'metaUrl' => $post->publicUrl(),
            'metaAuthor' => $post->author?->name ?: config('app.name'),
            'metaPublishedTime' => $post->published_at?->toIso8601String(),
            'metaUpdatedTime' => $post->updated_at?->toIso8601String(),
        ]);
    }

    private function buildPostShowQuery(): Builder
    {
        return Post::query()
            ->select([
                'id',
                'uuid',
                'title',
                'slug',
                'public_id',
                'content',
                'image',
                'video_url',
                'excerpt',
                'category_id',
                'author_id',
                'created_at',
                'credit',
                'updated_at',
                'published_at',
                'views',
                'status',
            ])
            ->published()
            ->with([
                'category:id,name,slug',
                'author' => function ($query) {
                    $query
                        ->select($this->authorSelectColumns())
                        ->withCount('posts');
                },
            ]);
    }

    private function authorSelectColumns(): array
    {
        $columns = ['id', 'name', 'role'];

        if ($this->usersHaveProfilePhotos()) {
            $columns[] = 'profile_photo_path';
        }

        return $columns;
    }

    private function usersHaveProfilePhotos(): bool
    {
        static $hasProfilePhotoColumn;

        if ($hasProfilePhotoColumn === null) {
            $hasProfilePhotoColumn = Schema::hasColumn('users', 'profile_photo_path');
        }

        return $hasProfilePhotoColumn;
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
