<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\EditorController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\SubCategoryController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\Editor\DashboardController as EditorDashboardController;
use App\Http\Controllers\Editor\PostController as EditorPostController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\CategoryController as OutCategoryController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\SearchController;

// SEO Routes
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap.index');
Route::get('/sitemap-posts.xml', [SitemapController::class, 'posts'])->name('sitemap.posts');

// Public Trust Pages
Route::get('/about', [PublicPageController::class, 'show'])->defaults('page', 'about')->name('pages.about');
Route::get('/contact', [PublicPageController::class, 'show'])->defaults('page', 'contact')->name('pages.contact');
Route::get('/advertise', [PublicPageController::class, 'show'])->defaults('page', 'advertise')->name('pages.advertise');
Route::get('/careers', [PublicPageController::class, 'show'])->defaults('page', 'careers')->name('pages.careers');
Route::get('/corrections', [PublicPageController::class, 'show'])->defaults('page', 'corrections')->name('pages.corrections');
Route::get('/privacy', [PublicPageController::class, 'show'])->defaults('page', 'privacy')->name('pages.privacy');
Route::get('/terms', [PublicPageController::class, 'show'])->defaults('page', 'terms')->name('pages.terms');
Route::get('/cookie-policy', [PublicPageController::class, 'show'])->defaults('page', 'cookie-policy')->name('pages.cookie');
Route::get('/help', [PublicPageController::class, 'show'])->defaults('page', 'help')->name('pages.help');
Route::get('/guidelines', [PublicPageController::class, 'show'])->defaults('page', 'guidelines')->name('pages.guidelines');
Route::get('/writing-tips', [PublicPageController::class, 'show'])->defaults('page', 'writing-tips')->name('pages.writing-tips');
Route::get('/e-paper', [PublicPageController::class, 'show'])->defaults('page', 'e-paper')->name('pages.e-paper');

// Category Routes
Route::get('/category/{categorySlug}/{subcategorySlug}', [OutCategoryController::class, 'showSubcategory'])->name('subcategory.show');
Route::get('/category/{slug}', [OutCategoryController::class, 'show'])->name('category.show');
Route::get('/categories', [OutCategoryController::class, 'index'])->name('categories.index');

// Search Route
Route::get('/search', [SearchController::class, 'index'])->name('search.index');

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::get('/posts/full/{post}', [PostController::class, 'legacyShow'])->name('posts.show.fulls');
Route::get('/posts/{post}/{slug?}', [PostController::class, 'show'])->name('posts.show.full');
Route::get('/{post}/pt/', [PostController::class, 'legacyShow'])->name('posts.show.post'posts.show.full');

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
    Route::resource('admin/categories', CategoryController::class)->names('admin.categories');
    Route::resource('admin/subcategories', SubCategoryController::class)->names('admin.subcategories');
    Route::get('/settings', [SettingController::class, 'index'])->name('admin.settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('admin.settings.update');
    Route::get('/reports', [ReportController::class, 'index'])->name('admin.reports.index');
});

Route::middleware(['auth', 'editor'])->group(function () {
    Route::get('/editor', [EditorDashboardController::class, 'index'])->name('editor.dashboard');
    Route::resource('editor/posts', EditorPostController::class)->names('editor.posts');
});

require __DIR__.'/auth.php';
