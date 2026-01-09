<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\EditorController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\CategoryController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'posts' => Post::with('category')->latest()->take(40)->get(), // Pass the latest 20 posts with categories
    ]);
});

Route::get('/posts/full/{post:slug}', [PostController::class, 'show'])->name('posts.show.full');

Route::get('/dashboard', function () {
    if (auth()->user()->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }

    if (auth()->user()->role === 'editor') {
        return redirect()->route('editor.dashboard');
    }

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', DashboardController::class)->name('admin.dashboard');
    Route::resource('users', UserController::class);
    Route::resource('editors', EditorController::class);
    Route::resource('posts', AdminPostController::class);
    Route::resource('categories', CategoryController::class);
});

Route::middleware(['auth', 'editor'])->group(function () {
    Route::get('/editor', function () {
        return Inertia::render('Editor/Dashboard');
    })->name('editor.dashboard');
});

require __DIR__.'/auth.php';
