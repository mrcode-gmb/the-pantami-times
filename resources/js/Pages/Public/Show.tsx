import { Footer } from '@/Components/Footer';
import { Header } from '@/Components/Headers';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ChevronRight, Mail, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';

interface SubCategory {
    id: number;
    name: string;
    slug: string;
    posts_count?: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    priority?: string;
    posts_count?: number;
    subcategories?: SubCategory[];
}

interface Section {
    title: string;
    paragraphs?: string[];
    list?: string[];
}

interface Card {
    title: string;
    value: string;
    href?: string;
    description?: string;
}

interface Cta {
    label: string;
    href: string;
}

interface PublicPage {
    eyebrow: string;
    title: string;
    description: string;
    sections: Section[];
    cards?: Card[];
    primaryCta?: Cta;
    secondaryCta?: Cta;
}

const isExternalHref = (href: string) => /^(https?:|mailto:)/.test(href);

function ActionLink({
    href,
    children,
    className,
}: {
    href: string;
    children: ReactNode;
    className: string;
}) {
    if (isExternalHref(href)) {
        return (
            <a
                href={href}
                className={className}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}

export default function PublicShow({
    page,
    categories,
}: PageProps<{
    page: PublicPage;
    categories: Category[];
}>) {
    return (
        <>
            <Head title={`${page.title} - Pantami Times`} />

            <div className="min-h-screen bg-background">
                <Header categories={categories} />

                <main className="container py-8">
                    <div className="rounded-3xl bg-[#1a1f2e] px-6 py-8 text-white md:px-10 md:py-12">
                        <div className="mb-5 flex items-center gap-2 text-sm text-white/70">
                            <Link href="/" className="hover:text-[#f0a500] transition-colors">
                                Home
                            </Link>
                            <ChevronRight size={16} />
                            <span>{page.eyebrow}</span>
                        </div>

                        <div className="max-w-4xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#f0a500]">
                                <ShieldCheck size={14} />
                                {page.eyebrow}
                            </div>

                            <h1 className="text-3xl font-bold font-serif leading-tight md:text-5xl">
                                {page.title}
                            </h1>
                            <p className="mt-4 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
                                {page.description}
                            </p>

                            {(page.primaryCta || page.secondaryCta) && (
                                <div className="mt-8 flex flex-wrap gap-3">
                                    {page.primaryCta && (
                                        <ActionLink
                                            href={page.primaryCta.href}
                                            className="inline-flex items-center gap-2 rounded-full bg-[#f0a500] px-5 py-3 text-sm font-semibold text-[#1a1f2e] transition-colors hover:bg-[#ffd166]"
                                        >
                                            {page.primaryCta.label}
                                            <ArrowRight size={16} />
                                        </ActionLink>
                                    )}

                                    {page.secondaryCta && (
                                        <ActionLink
                                            href={page.secondaryCta.href}
                                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#f0a500] hover:text-[#f0a500]"
                                        >
                                            {page.secondaryCta.label}
                                        </ActionLink>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {page.cards && page.cards.length > 0 && (
                        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {page.cards.map((card) => (
                                <div
                                    key={`${card.title}-${card.value}`}
                                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f0a500]">
                                        {card.title}
                                    </p>

                                    <div className="mt-4">
                                        {card.href ? (
                                            <ActionLink
                                                href={card.href}
                                                className="inline-flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-[#f0a500]"
                                            >
                                                {card.href.startsWith('mailto:') && <Mail size={16} />}
                                                {card.value}
                                            </ActionLink>
                                        ) : (
                                            <p className="text-lg font-semibold text-foreground">{card.value}</p>
                                        )}
                                    </div>

                                    {card.description && (
                                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                            {card.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {page.sections.map((section) => (
                            <article
                                key={section.title}
                                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                            >
                                <h2 className="text-2xl font-bold font-serif text-foreground">
                                    {section.title}
                                </h2>

                                {section.paragraphs?.map((paragraph) => (
                                    <p
                                        key={paragraph}
                                        className="mt-4 text-base leading-7 text-muted-foreground"
                                    >
                                        {paragraph}
                                    </p>
                                ))}

                                {section.list && section.list.length > 0 && (
                                    <ul className="mt-4 space-y-3">
                                        {section.list.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3 text-base leading-7 text-muted-foreground"
                                            >
                                                <span className="mt-2 h-2 w-2 rounded-full bg-[#f0a500]" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </article>
                        ))}
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
