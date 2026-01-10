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
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\Editor\DashboardController as EditorDashboardController;
use App\Http\Controllers\Editor\PostController as EditorPostController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'posts' => Post::with('category')->where("status", "published")->latest()->take(30)->get(), // Pass the latest 20 posts with categories
    ]);
});

Route::get('/posts/full/{post:uuid}', [PostController::class, 'show'])->name('posts.show.full');

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
    Route::resource('admin/posts', AdminPostController::class)->names("admin.posts");
    Route::resource('categories', CategoryController::class);
    Route::get('/settings', [SettingController::class, 'index'])->name('admin.settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('admin.settings.update');
    Route::get('/reports', [ReportController::class, 'index'])->name('admin.reports.index');
});

Route::middleware(['auth', 'editor'])->group(function () {
    Route::get('/editor', [EditorDashboardController::class, 'index'])->name('editor.dashboard');
    Route::resource('editor/posts', EditorPostController::class)->names('editor.posts');
});

require __DIR__.'/auth.php';
