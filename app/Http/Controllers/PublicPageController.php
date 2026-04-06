<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    public function show(string $page): Response
    {
        $pages = $this->pages();

        abort_unless(array_key_exists($page, $pages), 404);

        $pageData = $pages[$page];

        return Inertia::render('Public/Show', [
            'page' => $pageData,
            'categories' => $this->navigationCategories(),
        ])->withViewData([
            'metaTitle' => $pageData['title'] . ' - ' . config('app.name'),
            'metaDescription' => $pageData['description'],
            'metaType' => 'website',
            'metaUrl' => request()->url(),
        ]);
    }

    private function navigationCategories()
    {
        return Category::select('id', 'name', 'slug', 'priority')
            ->with([
                'subcategories' => function ($query) {
                    $query->select('id', 'category_id', 'name', 'slug')
                        ->withCount('posts')
                        ->orderBy('name');
                },
            ])
            ->withCount('posts')
            ->orderBy('priority', 'asc')
            ->get();
    }

    private function pages(): array
    {
        return [
            'about' => [
                'eyebrow' => 'About',
                'title' => 'About Pantami Times',
                'description' => 'Pantami Times is a digital newspaper built for readers who want credible reporting, clear writing, and useful context.',
                'sections' => [
                    [
                        'title' => 'What we publish',
                        'paragraphs' => [
                            'Pantami Times covers the stories that shape public conversation, daily life, and civic understanding. Our newsroom focuses on news, governance, metro reporting, business, technology, sport, culture, and wider human-interest stories.',
                            'We aim to make the site useful for readers who want both the headline and the context behind it.',
                        ],
                    ],
                    [
                        'title' => 'How we work',
                        'list' => [
                            'We value verified facts over noise and speed for its own sake',
                            'We separate reporting from opinion and label our work clearly',
                            'We correct material errors as quickly and transparently as possible',
                            'We try to write in a way that is accurate, readable, and fair to the people involved',
                        ],
                    ],
                    [
                        'title' => 'Why readers come back',
                        'paragraphs' => [
                            'Readers return to Pantami Times for straight reporting, stronger newsroom standards, and stories that respect their time. We want every page to feel informative, trustworthy, and easy to navigate.',
                        ],
                    ],
                ],
                'cards' => [
                    [
                        'title' => 'Editorial Desk',
                        'value' => 'editorial@pantamitimes.com',
                        'href' => 'mailto:editorial@pantamitimes.com',
                        'description' => 'Story tips, corrections, interviews, and editorial enquiries.',
                    ],
                    [
                        'title' => 'Reader Support',
                        'value' => 'support@pantamitimes.com',
                        'href' => 'mailto:support@pantamitimes.com',
                        'description' => 'Questions about the website, page issues, and general reader assistance.',
                    ],
                ],
                'primaryCta' => [
                    'label' => 'Contact Us',
                    'href' => '/contact',
                ],
                'secondaryCta' => [
                    'label' => 'Browse the Newsroom',
                    'href' => '/',
                ],
            ],
            'contact' => [
                'eyebrow' => 'Contact',
                'title' => 'Contact Pantami Times',
                'description' => 'Reach the Pantami Times team for editorial questions, corrections, support, and business enquiries.',
                'sections' => [
                    [
                        'title' => 'The fastest way to reach us',
                        'paragraphs' => [
                            'Email is the quickest and most reliable way to contact the newsroom. A clear subject line helps us route your message to the right person faster.',
                        ],
                    ],
                    [
                        'title' => 'Helpful details to include',
                        'list' => [
                            'Your name and the best address for us to reply to',
                            'A short summary of your request, tip, or correction',
                            'Relevant links, screenshots, or reference material when you are reporting a problem',
                        ],
                    ],
                ],
                'cards' => [
                    [
                        'title' => 'Editorial',
                        'value' => 'editorial@pantamitimes.com',
                        'href' => 'mailto:editorial@pantamitimes.com',
                        'description' => 'Corrections, story ideas, interviews, and newsroom questions.',
                    ],
                    [
                        'title' => 'Support',
                        'value' => 'support@pantamitimes.com',
                        'href' => 'mailto:support@pantamitimes.com',
                        'description' => 'Reader help, technical issues, and general site support.',
                    ],
                    [
                        'title' => 'Facebook',
                        'value' => 'The Pantami Times',
                        'href' => 'https://web.facebook.com/people/The-Pantami-Times-TPT/61582441495025/',
                        'description' => 'Follow the newsroom for updates and announcements.',
                    ],
                    [
                        'title' => 'X / Twitter',
                        'value' => '@PantamiTimes',
                        'href' => 'https://twitter.com/PantamiTimes',
                        'description' => 'Quick updates, links to stories, and newsroom notices.',
                    ],
                ],
                'primaryCta' => [
                    'label' => 'Email Editorial',
                    'href' => 'mailto:editorial@pantamitimes.com',
                ],
                'secondaryCta' => [
                    'label' => 'Reader Support',
                    'href' => 'mailto:support@pantamitimes.com',
                ],
            ],
            'advertise' => [
                'eyebrow' => 'Advertise',
                'title' => 'Advertise With Pantami Times',
                'description' => 'Speak with us about campaign ideas, sponsorships, and audience-fit placements.',
                'sections' => [
                    [
                        'title' => 'Our approach to advertising',
                        'paragraphs' => [
                            'We welcome serious advertising and partnership enquiries that fit the tone of the publication and are clearly separated from editorial reporting. Reader trust matters to us, so transparency matters too.',
                        ],
                    ],
                    [
                        'title' => 'What to send in your enquiry',
                        'list' => [
                            'Your brand or organization name',
                            'Campaign goal, preferred timeline, and audience fit',
                            'Any budget range, placement ideas, and contact information',
                        ],
                    ],
                ],
                'cards' => [
                    [
                        'title' => 'Advertising Contact',
                        'value' => 'support@pantamitimes.com',
                        'href' => 'mailto:support@pantamitimes.com',
                        'description' => 'Use this address for advertising, sponsorship, and partnership requests.',
                    ],
                ],
                'primaryCta' => [
                    'label' => 'Start an Enquiry',
                    'href' => 'mailto:support@pantamitimes.com',
                ],
            ],
            'careers' => [
                'eyebrow' => 'Careers',
                'title' => 'Careers at Pantami Times',
                'description' => 'We are interested in people who care about thoughtful journalism, strong newsroom habits, and public service.',
                'sections' => [
                    [
                        'title' => 'Who we are interested in',
                        'paragraphs' => [
                            'Pantami Times values reporters, editors, producers, designers, and media builders who care about accuracy, clarity, and responsible publishing.',
                        ],
                    ],
                    [
                        'title' => 'Current openings',
                        'paragraphs' => [
                            'We do not have a public vacancy list at the moment. If that changes, we will update this page.',
                            'If you would like to share interest for future opportunities, you can still send a short introduction and relevant work samples.',
                        ],
                    ],
                    [
                        'title' => 'What helps us review interest',
                        'list' => [
                            'The role or area you are interested in',
                            'A concise CV, profile, or portfolio',
                            'Links to previous reporting, editing, design, or product work',
                        ],
                    ],
                ],
                'cards' => [
                    [
                        'title' => 'Careers Contact',
                        'value' => 'support@pantamitimes.com',
                        'href' => 'mailto:support@pantamitimes.com',
                        'description' => 'Relevant expressions of interest can be shared here for future review.',
                    ],
                    [
                        'title' => 'Editorial Standards',
                        'value' => 'Read our guidelines',
                        'href' => '/guidelines',
                        'description' => 'Our newsroom standards matter as much as technical skill.',
                    ],
                ],
            ],
            'corrections' => [
                'eyebrow' => 'Corrections',
                'title' => 'Corrections Policy',
                'description' => 'Pantami Times aims to correct significant factual errors quickly, clearly, and with respect for readers and sources.',
                'sections' => [
                    [
                        'title' => 'When we correct',
                        'paragraphs' => [
                            'If we publish a material factual error, we aim to fix it as quickly as we can after verification. The priority is accuracy, not defensiveness.',
                            'Minor style changes or small wording cleanups may be made without a formal note, but substantive corrections should be handled transparently.',
                        ],
                    ],
                    [
                        'title' => 'How to send a correction request',
                        'list' => [
                            'Send the article link or headline you are referring to',
                            'Explain the specific statement you believe is inaccurate',
                            'Include supporting information, documents, or context when available',
                            'Tell us how we can reach you if the newsroom needs clarification',
                        ],
                    ],
                    [
                        'title' => 'What readers can expect',
                        'paragraphs' => [
                            'The newsroom may review source material, reporting notes, and follow-up context before updating a story. If a correction is warranted, we will revise the article and keep the public-facing page accurate.',
                            'Requests can be sent to the editorial desk, and serious issues may also be raised through the contact page if more context is needed.',
                        ],
                    ],
                ],
                'cards' => [
                    [
                        'title' => 'Corrections Desk',
                        'value' => 'editorial@pantamitimes.com',
                        'href' => 'mailto:editorial@pantamitimes.com',
                        'description' => 'Use this address for factual corrections, clarifications, and follow-up information.',
                    ],
                    [
                        'title' => 'Editorial Guidelines',
                        'value' => 'Read our standards',
                        'href' => '/guidelines',
                        'description' => 'See the reporting standards and review principles that guide the newsroom.',
                    ],
                ],
                'primaryCta' => [
                    'label' => 'Email Corrections Desk',
                    'href' => 'mailto:editorial@pantamitimes.com',
                ],
                'secondaryCta' => [
                    'label' => 'Contact Pantami Times',
                    'href' => '/contact',
                ],
            ],
            'privacy' => [
                'eyebrow' => 'Privacy',
                'title' => 'Privacy Policy',
                'description' => 'This page explains, in plain language, the kinds of information Pantami Times may receive and how it may be used.',
                'sections' => [
                    [
                        'title' => 'Information we may receive',
                        'list' => [
                            'Information you choose to send directly, such as emails, corrections, or enquiries',
                            'Standard technical information like browser type, device details, referring pages, and server logs',
                            'Basic security, diagnostics, and performance information used to keep the site running reliably',
                        ],
                    ],
                    [
                        'title' => 'How that information may be used',
                        'paragraphs' => [
                            'We use information to respond to readers, maintain the site, improve performance, investigate errors, and support newsroom operations.',
                            'We do not publish personal information without a valid editorial, legal, or public-interest basis.',
                        ],
                    ],
                    [
                        'title' => 'Third-party tools and services',
                        'paragraphs' => [
                            'Embedded media, analytics tools, and advertising services may collect information according to their own policies when active on the site. Those services operate under their own terms in addition to ours.',
                        ],
                    ],
                ],
                'cards' => [
                    [
                        'title' => 'Privacy Questions',
                        'value' => 'support@pantamitimes.com',
                        'href' => 'mailto:support@pantamitimes.com',
                        'description' => 'Contact us if you have questions about privacy or data handling on the site.',
                    ],
                ],
            ],
            'terms' => [
                'eyebrow' => 'Terms',
                'title' => 'Terms of Service',
                'description' => 'These terms govern the use of Pantami Times and the material published on the site.',
                'sections' => [
                    [
                        'title' => 'Using the site',
                        'list' => [
                            'Do not misuse the site, interfere with its operation, or attempt unauthorized access',
                            'Do not use the site to distribute unlawful, deceptive, abusive, or harmful material',
                            'Use the content and services of the site in a lawful and respectful way',
                        ],
                    ],
                    [
                        'title' => 'Content and ownership',
                        'paragraphs' => [
                            'Unless stated otherwise, site branding, design, and editorial material belong to Pantami Times or their respective rights holders.',
                            'Brief quotations for commentary, review, or reporting may be used with proper attribution, subject to applicable law.',
                        ],
                    ],
                    [
                        'title' => 'External links and updates',
                        'paragraphs' => [
                            'We may link to external sites for reference or context. We are not responsible for the content or practices of third-party websites.',
                            'These terms may be updated as the website grows or our services change.',
                        ],
                    ],
                ],
            ],
            'cookie-policy' => [
                'eyebrow' => 'Cookies',
                'title' => 'Cookie Policy',
                'description' => 'This page explains how cookies and similar technologies may be used on Pantami Times.',
                'sections' => [
                    [
                        'title' => 'What cookies may do on this site',
                        'list' => [
                            'Remembering basic preferences and keeping sessions working correctly',
                            'Helping us understand traffic, performance, and reliability',
                            'Supporting embedded media, analytics, and advertising-related services when enabled',
                        ],
                    ],
                    [
                        'title' => 'Managing your choices',
                        'paragraphs' => [
                            'Most browsers allow you to block, delete, or limit cookies through their settings. Disabling some cookies may affect how parts of the website perform.',
                        ],
                    ],
                ],
            ],
            'help' => [
                'eyebrow' => 'Help',
                'title' => 'Help Center',
                'description' => 'Use this page if you need help finding a story, browsing the site, or reporting a problem.',
                'sections' => [
                    [
                        'title' => 'Finding what you need',
                        'list' => [
                            'Use search to look for a topic, person, or keyword',
                            'Browse categories from the main navigation bar',
                            'Open article pages to read full stories and related coverage',
                        ],
                    ],
                    [
                        'title' => 'Reporting a problem',
                        'paragraphs' => [
                            'If a page is inaccurate, a link is broken, or something on the website is not working as expected, send us the page link and a short description of the issue by email.',
                        ],
                    ],
                ],
                'cards' => [
                    [
                        'title' => 'Support',
                        'value' => 'support@pantamitimes.com',
                        'href' => 'mailto:support@pantamitimes.com',
                        'description' => 'General site support, access problems, and reader assistance.',
                    ],
                ],
            ],
            'guidelines' => [
                'eyebrow' => 'Guidelines',
                'title' => 'Editorial Guidelines',
                'description' => 'These guidelines reflect the standards we expect from Pantami Times reporting and submitted material.',
                'sections' => [
                    [
                        'title' => 'Core newsroom standards',
                        'list' => [
                            'Accuracy before speed',
                            'Original reporting or clearly attributed material',
                            'Clear sourcing for quotes, facts, claims, and statistics',
                            'Fair representation of people, events, and communities',
                        ],
                    ],
                    [
                        'title' => 'What we do not accept',
                        'list' => [
                            'Plagiarism, unattributed copying, or lightly rewritten duplicate material',
                            'Misleading headlines, unsupported claims, or weak sourcing',
                            'Defamatory, discriminatory, abusive, or needlessly inflammatory material',
                            'Conflicts of interest that are hidden from editors or readers',
                        ],
                    ],
                    [
                        'title' => 'Review and corrections',
                        'paragraphs' => [
                            'Submissions may be edited for clarity, structure, legal risk, style, and factual accuracy before publication. Material corrections should be handled quickly and responsibly.',
                        ],
                    ],
                ],
                'primaryCta' => [
                    'label' => 'Writing Tips',
                    'href' => '/writing-tips',
                ],
            ],
            'writing-tips' => [
                'eyebrow' => 'Writing Tips',
                'title' => 'Writing Tips',
                'description' => 'Strong writing makes reporting easier to trust. These habits help stories arrive cleaner, clearer, and easier to edit.',
                'sections' => [
                    [
                        'title' => 'Before you submit',
                        'list' => [
                            'Confirm names, dates, spellings, locations, and quoted details',
                            'Lead with the most important verified fact, not the slowest background detail',
                            'Separate reporting from opinion and label analysis honestly',
                            'Add context that helps readers understand why the story matters now',
                        ],
                    ],
                    [
                        'title' => 'Make the story easier to read',
                        'list' => [
                            'Use clear headlines and direct language',
                            'Keep paragraphs tight, focused, and easy to scan',
                            'Attribute quotes and claims close to where they appear',
                            'Cut repetition, vague claims, and unsupported filler',
                        ],
                    ],
                ],
                'primaryCta' => [
                    'label' => 'Read Guidelines',
                    'href' => '/guidelines',
                ],
            ],
            'e-paper' => [
                'eyebrow' => 'e-Paper',
                'title' => 'Pantami Times e-Paper',
                'description' => 'The Pantami Times e-Paper section is on the way. For now, the main website is the best place to follow our latest stories.',
                'sections' => [
                    [
                        'title' => 'What this section will offer',
                        'paragraphs' => [
                            'The e-Paper area is intended to make it easier to browse our digital edition and follow major stories in a single reading flow.',
                        ],
                    ],
                    [
                        'title' => 'What to use right now',
                        'list' => [
                            'Browse the latest coverage from the homepage',
                            'Explore topics through categories and search',
                            'Follow our social channels for updates and story links',
                        ],
                    ],
                ],
                'cards' => [
                    [
                        'title' => 'Latest Coverage',
                        'value' => 'Browse the newsroom',
                        'href' => '/',
                        'description' => 'Return to the homepage and continue reading the latest stories.',
                    ],
                ],
                'primaryCta' => [
                    'label' => 'Back to Home',
                    'href' => '/',
                ],
                'secondaryCta' => [
                    'label' => 'Contact Us',
                    'href' => '/contact',
                ],
            ],
        ];
    }
}
