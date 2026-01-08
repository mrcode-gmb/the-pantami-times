<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        if ($users->isEmpty()) {
            $users = User::factory()->count(3)->create();
        }

        $categories = Category::all();
        foreach ($categories as $category) {
            Post::factory()->count(12)->published()->state(function () use ($category, $users) {
                return [
                    'category_id' => $category->id,
                    'author_id' => $users->random()->id,
                ];
            })->create();
        }
    }
}
