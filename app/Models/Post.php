<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Post extends Model
{
    use HasFactory, HasUuids;

    public function uniqueIds()
    {
        return ['uuid'];
    }

    protected $fillable = [
        'uuid',
        'title',
        'slug',
        'content',
        'meta_title',
        'meta_description',
        'image',
        'video_url',
        'status',
        'category_id',
        'credit',
        'subcategory_id',
        'author_id',
        'published_at',
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    protected static function booted()
    {
        static::creating(function ($post) {
            if (! $post->public_id) {
                $post->public_id = self::generatePublicId();
            }
        });
    }

    public static function generatePublicId(int $length = 12): string
    {
        $alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $max = strlen($alphabet) - 1;

        do {
            $id = '';
            for ($i = 0; $i < $length; $i++) {
                $id .= $alphabet[random_int(0, $max)];
            }
        } while (Post::where('slug', $id)->exists()); // ultra-rare loop

        return $id;
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', 'published')
            ->whereNotNull('published_at');
    }

    public function publicRouteParameters(): array
    {
        return [
            'post' => $this->public_id ?: $this->slug,
        ];
    }

    public function publicUrl(): string
    {
        return route('posts.show.full', $this->publicRouteParameters());
    }

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }
}
