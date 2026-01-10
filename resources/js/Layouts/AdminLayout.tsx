import { ReactNode } from 'react';
import { ThemeProvider } from '@/Components/ThemeProvider';
import { Link, usePage } from '@inertiajs/react';
import { Bell, BookOpen, Folder, Home, LineChart, Moon, Package2, Settings, Sun, Users } from 'lucide-react';

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';
import { CircleUser } from 'lucide-react';
import { useTheme } from '@/Components/ThemeProvider';

interface AdminLayoutProps {
    children: ReactNode;
    header: string;
}

export default function AdminLayout({ children, header }: AdminLayoutProps) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="admin-ui-theme">
            <LayoutContent header={header}>{children}</LayoutContent>
        </ThemeProvider>
    );
}

function LayoutContent({ children, header }: AdminLayoutProps) {
    const { setTheme } = useTheme();
    const { auth } = usePage().props as any;

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="">Pantami Times</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href={route('admin.dashboard')}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                    route().current('admin.dashboard') ? 'bg-muted text-primary' : ''
                                }`}
                            >
                                <Home className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href={route('users.index')}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                    route().current('users.*') ? 'bg-muted text-primary' : ''
                                }`}
                            >
                                <Users className="h-4 w-4" />
                                Users
                            </Link>
                            <Link
                                href={route('editors.index')}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                    route().current('editors.*') ? 'bg-muted text-primary' : ''
                                }`}
                            >
                                <Users className="h-4 w-4" />
                                Editors
                            </Link>
                            <Link
                                href={route('admin.posts.index')}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                    route().current('admin.posts.*') ? 'bg-muted text-primary' : ''
                                }`}
                            >
                                <BookOpen className="h-4 w-4" />
                                Posts
                            </Link>
                            <Link
                                href={route('categories.index')}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                    route().current('categories.*') ? 'bg-muted text-primary' : ''
                                }`}
                            >
                                <Folder className="h-4 w-4" />
                                Categories
                            </Link>
                            <Link
                                href={route('admin.settings.index')}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                    route().current('admin.settings.index') ? 'bg-muted text-primary' : ''
                                }`}
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                            <Link
                                href={route('admin.reports.index')}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                    route().current('admin.reports.index') ? 'bg-muted text-primary' : ''
                                }`}
                            >
                                <LineChart className="h-4 w-4" />
                                Reports
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    {/* Mobile Navigation can be added here using Sheet component */}
                    <div className="w-full flex-1">
                        <h1 className="text-lg font-semibold">{header}</h1>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('system')}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={route('logout')} method="post" as="button">
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
