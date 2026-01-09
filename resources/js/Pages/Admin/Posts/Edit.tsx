import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { FormEventHandler } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
    status: string;
    category_id: number;
    image: string | null;
}

interface Category {
    id: number;
    name: string;
}

export default function Edit({ post, categories }: { post: Post, categories: Category[] }) {
    const { data, setData, post: submitForm, processing, errors } = useForm({
        title: post.title,
        content: post.content,
        category_id: post.category_id,
        status: post.status,
        image: null as File | null,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        submitForm(route('posts.update', post.id));
    };

    return (
        <AdminLayout header="Review Post">
            <Head title={`Review Post - ${post.title}`} />

            <Card>
                <CardHeader>
                    <CardTitle>Review & Edit Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Featured Image</Label>
                            {post.image && <img src={post.image} alt={post.title} className="w-full h-auto rounded-lg my-2" />}
                            <Input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            />
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                required
                                className="min-h-[200px]"
                            />
                            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category_id">Category</Label>
                            <Select value={String(data.category_id)} onValueChange={(value) => setData('category_id', Number(value))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={String(category.id)}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>Update Post</Button>
                            <Link href={route('posts.index')}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
