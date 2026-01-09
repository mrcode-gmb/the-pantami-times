<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::where('author_id', auth()->id())
            ->with(['category'])
            ->when($request->input('status'), function ($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Editor/Posts/Index', [
            'posts' => $posts,
            'filters' => $request->only(['status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Editor/Posts/Create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->except('image');
        $data['author_id'] = auth()->id();
        $data['status'] = 'draft';
        $data['slug'] = Str::slug($request->title);
        $data['uuid'] = Str::uuid();

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $data['image'] = '/images/'.$imageName;
        }

        Post::create($data);

        return redirect()->route('editor.dashboard')->with('success', 'Post created successfully.');
    }
}
