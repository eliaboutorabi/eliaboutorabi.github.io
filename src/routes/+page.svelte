<script lang="ts">
	import {
		Award,
		BadgeCheck,
		BrainCog,
		BookOpenCheck,
		BriefcaseBusiness,
		ChartColumnIncreasing,
		ChartNoAxesCombined,
		CloudMoon,
		FileText,
		HandHeart,
		MailCheck,
		MapPinCheck,
		Play,
		SmartphoneNfc,
		Sun,
		Telescope,
		UserRound
	} from '@jis3r/icons';
	import { page } from '$app/state';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import GithubMark from '$lib/components/GithubMark.svelte';
	import Presentation from '$lib/components/Presentation.svelte';
	import ProjectShowcase from '$lib/components/ProjectShowcase.svelte';
	import type { Copy, Locale } from '$lib/types/copy';

	type NavKey = 'about' | 'work' | 'resume' | 'contact';
	type HeaderNavKey = NavKey | 'linkedin' | 'github';
	type ContactKey = 'email' | 'phone' | 'location' | 'linkedin' | 'github';

	// Locale-independent project facts, spread into each translation below.
	const rowbot = {
		id: 'rowbot',
		index: '01',
		liveUrl: 'https://rowbot.sh',
		sourceUrl: 'https://github.com/eliaboutorabi/rowbot'
	};
	const rowbotMedia = {
		kind: 'youtube' as const,
		label: 'youtube.com · Rowbot',
		id: 'sFGWTywSG4c',
		poster: '/media/rowbot-video-poster.jpg'
	};

	const verity = {
		id: 'verity',
		index: '03',
		liveUrl: 'https://eliaboutorabi.github.io/Verity/',
		sourceUrl: 'https://github.com/eliaboutorabi/Verity'
	};
	const verityMedia = {
		kind: 'youtube' as const,
		label: 'youtube.com · Verity',
		id: 'LBTob-cq140',
		poster: '/media/verity-video-poster.jpg'
	};

	const firmScope = {
		id: 'firmscope',
		index: '02',
		liveUrl: 'https://eliaboutorabi.github.io/big4dash/',
		sourceUrl: 'https://github.com/eliaboutorabi/big4dash'
	};
	const firmScopeMedia = {
		kind: 'youtube' as const,
		label: 'youtube.com · FirmScope',
		id: 'Ltra3naLB0Q',
		poster: '/media/firmscope-video-poster.jpg'
	};

	const copy: Record<Locale, Copy> = {
		en: {
			nav: {
				about: 'About',
				work: 'Work',
				resume: 'Resume',
				contact: 'Contact',
				linkedin: 'LinkedIn',
				github: 'GitHub',
				language: 'FA',
				languageHref: '/fa'
			},
			hero: {
				status: 'Dallas, TX · Open to local and remote roles',
				eyebrow: 'Elham "Eli" Aboutorabi',
				titleLead: "Hi, I'm",
				titleName: 'Eli',
				titleNameSuffix: ',',
				titleTail: 'an',
				accent: 'accountant and full-stack AI builder',
				intro:
					'I combine end-to-end accounting ownership and enterprise analysis with full-stack AI applications that I design, build and deploy.',
				primary: 'Portfolio',
				secondary: 'Resume'
			},
			about: {
				kicker: 'About',
				name: 'Elham "Eli" Aboutorabi',
				title: 'From accounting systems to full-stack AI',
				accent: 'Business experience behind every build',
				body: [
					"I hold a Master's in Accounting and bring more than ten years across small businesses and enterprise operations. I can independently run a small business's accounting function, from system setup to reporting and close. At Shoniz, I reviewed and reconciled 100+ daily invoices, mostly sales invoices, and automated approximately 90% of Excel performance reporting for 15 sales representatives.",
					'I also build and deploy full-stack AI applications: document-to-Excel automation, research dashboards and real-time voice agents. My projects combine agent orchestration, data pipelines and custom UI/UX. I use advanced Excel in practice and have hands-on academic experience with Power BI and QuickBooks.'
				],
				cards: [
					{
						title: 'Data-Driven Decisions',
						text: 'Complex data turned into clear insight that drives smarter, faster business calls.',
						icon: 'decisions'
					},
					{
						title: 'AI-Powered Efficiency',
						text: 'Agentic AI and automation that streamline the work and give back real, valuable time.',
						icon: 'ai'
					},
					{
						title: 'Growth-Focused',
						text: 'Accounting and sales discipline aimed squarely at measurable, durable growth.',
						icon: 'growth'
					}
				]
			},
			stats: [
				{ value: '10', suffix: '+', label: 'Years of Experience' },
				{ value: '41', suffix: '%', label: 'Year-over-year sales growth at Shoniz' },
				{ value: '2,500', suffix: '', label: 'Approx. active accounts analyzed' },
				{ value: '100', suffix: '', label: 'Approx. products in sales portfolio' }
			],
			work: {
				kicker: 'Selected Work',
				title: 'The Portfolio',
				intro:
					'Projects where financial judgement and applied AI meet. Each one is live, and each one shows its working: the sources, the code and the checks.',
				upcoming:
					'More in progress: a driver-based forecast engine, an agentic close workflow and an executive reporting suite.',
				projects: [
					{
						...rowbot,
						meta: 'Agentic AI · Document Automation',
						title: 'Rowbot',
						subtitle: 'Agentic OCR that turns paper into spreadsheets',
						text: 'I built and deployed this full-stack application on Vercel, integrating Mistral OCR, OpenAI models, a SvelteKit/TypeScript interface and a persistent database. PDFs, photos and scans become multi-sheet Excel workbooks with source-linked figures and verified arithmetic.',
						points: [
							'LangGraph/Deep Agents workflows plan the task, execute tools, delegate sheet audits and pause for human input when a decision needs review.',
							'Tested parsers preserve table structure; code checks totals and runs custom calculations. Figures that do not reconcile retain the source value and carry a flag.',
							'Every cell remembers the text the page showed and how sure the reader was, surfaced in the grid and as comments in the exported file.',
							'Database checkpoints preserve resumable runs; authentication, invite codes and usage allowances support the deployed application.'
						],
						figures: [
							{ value: 'GPT-5.6', label: 'Deep Agents harness' },
							{ value: 'Mistral', label: 'Document AI OCR' },
							{ value: '.xlsx', label: 'Typed, traceable export' }
						],
						tags: ['SvelteKit 2', 'TypeScript', 'Deep Agents', 'LangGraph', 'Turso', 'Vercel'],
						liveLabel: 'Open Rowbot',
						sourceLabel: 'View the code',
						note: 'Rowbot runs on my own OpenAI and Mistral keys, so sign-up is invite-only. Message me on LinkedIn for a code.',
						media: {
							...rowbotMedia,
							title: 'Rowbot: Agentic OCR that turns paper into spreadsheets',
							play: 'Play the Rowbot walkthrough',
							watch: 'Watch the Rowbot walkthrough on YouTube'
						}
					},
					{
						...firmScope,
						meta: 'Data Visualization · Research Product',
						title: 'FirmScope',
						subtitle: 'The Big Four dashboard that explains itself',
						text: 'I orchestrated AI-assisted search, extraction and data analysis to assemble 651 observations from 71 primary sources. I then designed a custom interactive dashboard comparing the Big Four across scale, growth, business mix, geography and workforce, with every figure linked to its evidence.',
						points: [
							'A 26-scene tour narrated in a clone of my own voice drives the dashboard, opening charts and evidence with synchronized captions and a transcript.',
							'Branching service-line flows, connected rankings and share rings, read as one continuous story rather than a wall of tiles.',
							'An office atlas that opens as a detailed globe and unfolds into a zoomable flat map.',
							'Validated data pipeline and searchable evidence ledger preserve source excerpts, reporting periods, comparability scores and revision history; a research notebook supports exports.'
						],
						figures: [
							{ value: '651', label: 'Evidence records' },
							{ value: '71', label: 'Official sources' },
							{ value: '26', label: 'Narrated scenes' }
						],
						tags: ['Svelte 5', 'SvelteKit', 'TypeScript', 'D3', 'Three.js', 'ElevenLabs'],
						liveLabel: 'Open the dashboard',
						sourceLabel: 'View the code',
						media: {
							...firmScopeMedia,
							title: 'FirmScope: Self-explaining dashboard, comparing the Big Four',
							play: 'Play the FirmScope walkthrough',
							watch: 'Watch the FirmScope walkthrough on YouTube'
						}
					},
					{
						...verity,
						meta: 'Voice AI · Regulatory Research',
						title: 'Verity',
						subtitle: 'A desk robot that reads the regulation before she answers',
						text: 'I built a custom TypeScript agent harness connecting OpenAI Realtime voice over WebRTC to regulatory research tools. It executes searches, retrieves federal regulations and checks citations, with tool results appearing on screen during the conversation.',
						points: [
							'Voice and text share tool execution and conversation state. Real-time speech supports interruptions, with an animated character driven by the audio you hear.',
							'Hand her a lease or an engagement letter and she names the passages a reviewer would stop at, then marks them on the page itself, colour-coded by severity.',
							'She checks her own answer before you see it: every citation is matched against the lookups the turn really made, so an invented sub-paragraph gets caught.',
							'She teaches, too — a rule as a lesson with a citation under every point, or exam-style questions with the answer held back until you ask for it.'
						],
						figures: [
							{ value: 'Realtime', label: 'Speech-to-speech voice' },
							{ value: '6', label: 'CFR titles indexed' },
							{ value: 'Zero', label: 'Servers in the path' }
						],
						tags: ['Svelte 5', 'SvelteKit', 'TypeScript', 'GPT Realtime', 'Three.js', 'pdf.js'],
						liveLabel: 'Open Verity',
						sourceLabel: 'View the code',
						note: 'Verity runs entirely in your browser on your own OpenAI key, which never passes through a server of mine. Research assistance, not a tax opinion.',
						media: {
							...verityMedia,
							title: 'Verity: a talking robot that reads tax regulations for accountants',
							play: 'Play the Verity walkthrough',
							watch: 'Watch the Verity walkthrough on YouTube'
						}
					}
				]
			},
			resume: {
				kicker: 'The Resume',
				titleLead: 'Accounting. Analysis. Automation.',
				titleTail: '',
				accent: '',
				download: 'Download resume (PDF)',
				experienceHeading: 'Professional Experience',
				experience: [
					{
						role: 'Independent Full-Stack AI Developer',
						period: 'Jun 2026 - Present',
						place: 'Independent Projects · Dallas, TX',
						text: 'Build and deploy full-stack AI applications: Rowbot on Vercel with OCR and human-reviewed agents; FirmScope with AI-assisted research and custom visualizations; Verity with a custom real-time voice agent harness.'
					},
					{
						role: 'Sales Specialist',
						period: 'Feb 2025 - Jun 2026',
						place: "Dillard's · United States",
						text: "Recognized for typically exceeding $2,000 in daily sales against a $1,800 target. Completed Dillard's Home Style Academy training in home and decor sales. Increased units per transaction and served dozens of customers daily; handled POS transactions, cash, reconciliation and compliance."
					},
					{
						role: 'Senior Sales Operations Analyst',
						period: '2019 - 2024',
						place: 'Shoniz · Birjand, Iran',
						text: 'Helped launch the branch; reviewed and reconciled 100+ invoices daily, mostly sales invoices. Automated approximately 90% of Excel performance reporting for 15 sales representatives, with linear rewards based on targets, average product sales and selling difficulty. Analyzed customer histories, coordinated factory replenishment and reported directly to headquarters across 88 routes, 11 cities, about 100 products and 2,500 accounts during 41% year-over-year sales growth.'
					},
					{
						role: 'Senior Accountant',
						period: '2015 - 2019',
						place: 'Esalat Food Distribution Company · Birjand, Iran',
						text: 'Led financial reporting, quarterly tax filings, year-end close and warehouse financial audits. Managed 20-30 daily invoices, A/P, A/R, the general ledger, payroll, insurance and bank reconciliations; built automated sales commission tracking models.'
					},
					{
						role: 'Accountant & Systems Implementer',
						period: '2010 - 2015',
						place: 'Palaz Carpet Store · Birjand, Iran',
						text: "Designed and implemented the store's entire accounting system from the ground up. Managed cash, installment and check-based A/P and A/R, payroll, insurance compliance, benefits and operating expenses."
					}
				],
				skillsHeading: 'Core Skills',
				skills: [
					{
						group: 'Accounting & Systems',
						items: [
							'Full-cycle accounting',
							'A/P & A/R',
							'Year-end close & tax reporting',
							'Holu & Sepidar',
							'Custom ERP systems'
						]
					},
					{
						group: 'Excel & Financial Analysis',
						items: [
							'PivotTables',
							'VLOOKUP & SUMIF',
							'Automated reports & incentives',
							'Forecasting & KPI reporting'
						]
					},
					{
						group: 'AI & Automation',
						items: [
							'Claude Code & OpenAI Codex',
							'Prompt engineering',
							'Agent orchestration & human review',
							'Full-stack AI applications',
							'SvelteKit, TypeScript & Vercel'
						]
					},
					{
						group: 'Hands-on Coursework & Academic Use',
						items: ['Power BI', 'QuickBooks']
					}
				],
				educationHeading: 'Education',
				education: [
					{
						degree: "Master's Degree in Accounting",
						school: 'Islamic Azad University, Tehran Science and Research Branch · 2013-2017'
					},
					{
						degree: "Bachelor's Degree in Applied Scientific Accounting",
						school: 'Islamic Azad University of Birjand · 2010-2013'
					},
					{
						degree: 'Associate Degree in Business Accounting',
						school: 'Birjand Technical School · 2008-2010'
					},
					{
						degree: 'Diploma in Accounting',
						school: 'Resalat Liberal Arts School · 2006-2008'
					}
				],

				certsHeading: 'LinkedIn Learning Certificates',
				certs: [
					'The AI-Driven Accountant',
					'Leveraging Generative AI in Finance and Accounting',
					'The Future of AI for Finance and Accounting',
					'Microsoft Copilot: The Art of Prompt Writing'
				],
				alsoHeading: 'Additional Qualifications',
				also: [
					'Professional Baking Certificate',
					'Karate Brown Belt',
					'Certified CPR and Basic Life Support',
					'Aboumoslem Soccer Club, 2004-2024: player, certified coach and official, with four years of club leadership.'
				]
			},
			testimonial: {
				quote:
					'She was always willing to take on new challenges, learn quickly, and bring fresh ideas to the team. She didn’t just focus on completing her tasks; she often looked for better and more practical ways to get things done.',
				byline: 'Farzad Adelzadeh Sadabadi, PhD',
				role: 'University Professor · Strategic Planning Manager, Shoniz',
				sourceLabel: 'Read the recommendation on LinkedIn'
			},
			contact: {
				kicker: "Let's Connect",
				title: 'Reimagining accounting through the lens of AI',
				accent: '',
				body: 'Open to local and remote roles in accounting, financial analysis and AI automation. I bring end-to-end accounting ownership, enterprise reporting experience and deployed full-stack AI applications.',
				cta: 'Work With Eli',
				email: 'Email',
				phone: 'Phone',
				location: 'Location',
				linkedin: 'LinkedIn',
				github: 'GitHub',
				footer: 'Accounting | Financial Analysis | AI Automation'
			},
			deck: {
				open: 'Present',
				label: 'Presentation',
				close: 'Exit presentation',
				exit: 'Exit',
				next: 'Next slide',
				previous: 'Previous slide',
				fullscreen: 'Fullscreen',
				exitFullscreen: 'Exit fullscreen',
				highlights: 'Career highlights',
				principles: 'What I bring',
				principlesTitle: 'Three things I bring to every team',
				toolkit: 'The toolkit',
				credentials: 'Credentials and more',
				testimonial: 'Testimonial'
			}
		},
		fa: {
			nav: {
				about: 'درباره',
				work: 'نمونه کار',
				resume: 'رزومه',
				contact: 'تماس',
				linkedin: 'LinkedIn',
				github: 'GitHub',
				language: 'EN',
				languageHref: '/'
			},
			hero: {
				status: 'دالاس، تگزاس · آماده همکاری حضوری و دورکاری',
				eyebrow: 'الهام «الی» ابوترابی',
				titleLead: 'سلام، من',
				titleName: 'الی',
				titleNameSuffix: ' هستم',
				titleTail: '',
				accent: 'حسابدار و سازنده برنامه های هوش مصنوعی فول استک',
				intro:
					'مدیریت کامل حسابداری و تحلیل در شرکت های بزرگ را با برنامه های هوش مصنوعی فول استک که طراحی، توسعه و منتشر می کنم ترکیب می کنم.',
				primary: 'نمونه کارها',
				secondary: 'رزومه'
			},
			about: {
				kicker: 'درباره',
				name: 'الهام «الی» ابوترابی',
				title: 'از سیستم های حسابداری تا برنامه های هوش مصنوعی فول استک',
				accent: 'تجربه کسب وکار پشت هر برنامه',
				body: [
					'کارشناسی ارشد حسابداری و بیش از ده سال تجربه در کسب وکارهای کوچک و شرکت های بزرگ دارم. می توانم تمام امور حسابداری یک کسب وکار کوچک را از راه اندازی سیستم تا گزارشگری و بستن حساب ها مستقل مدیریت کنم. در شونیز روزانه بیش از ۱۰۰ فاکتور، عمدتا فروش، را بررسی و تطبیق می دادم و حدود ۹۰ درصد گزارشگری عملکرد در اکسل را برای ۱۵ نماینده فروش خودکار کردم.',
					'برنامه های کامل هوش مصنوعی را توسعه می دهم و منتشر می کنم: تبدیل سند به اکسل، داشبورد پژوهشی و عامل صوتی بلادرنگ. پروژه هایم هماهنگی عامل ها، پردازش داده و طراحی رابط کاربری اختصاصی را ترکیب می کنند. در اکسل تجربه پیشرفته عملی و در Power BI و QuickBooks تجربه عملی در دوره ها و محیط آموزشی دارم.'
				],
				cards: [
					{
						title: 'تصمیم گیری داده محور',
						text: 'تبدیل داده های پیچیده به بینشی روشن برای تصمیم های سریع تر و هوشمندتر.',
						icon: 'decisions'
					},
					{
						title: 'بهره وری با هوش مصنوعی',
						text: 'اتوماسیون و AI عاملی که کار را ساده تر می کند و زمان ارزشمند آزاد می سازد.',
						icon: 'ai'
					},
					{
						title: 'تمرکز بر رشد',
						text: 'ترکیب نظم حسابداری و فروش برای رشد قابل اندازه گیری و پایدار.',
						icon: 'growth'
					}
				]
			},
			stats: [
				{ value: '۱۰', suffix: '+', label: 'سال تجربه' },
				{ value: '۴۱', suffix: '%', label: 'رشد فروش شونیز نسبت به سال قبل' },
				{ value: '۲,۵۰۰', suffix: '', label: 'حدود حساب فعال در تحلیل فروش' },
				{ value: '۱۰۰', suffix: '', label: 'حدود محصول در سبد فروش' }
			],
			work: {
				kicker: 'نمونه کارها',
				title: 'پورتفولیو',
				intro:
					'پروژه هایی که در آن ها قضاوت مالی و هوش مصنوعی کاربردی به هم می رسند. هر پروژه زنده است و کار خودش را نشان می دهد: منابع، کد و بررسی ها.',
				upcoming:
					'پروژه های بعدی در راه است: موتور پیش بینی محرک محور، فرایند بستن حساب با عامل هوشمند و مجموعه گزارش های مدیریتی.',
				projects: [
					{
						...rowbot,
						meta: 'هوش مصنوعی عاملی · اتوماسیون اسناد',
						title: 'Rowbot',
						subtitle: 'OCR عاملی که کاغذ را به صفحه گسترده تبدیل می کند',
						text: 'این برنامه فول استک را با رابط SvelteKit/TypeScript، پایگاه داده پایدار، OCR میسترال و مدل های OpenAI ساختم و روی Vercel منتشر کردم. PDF، عکس و اسکن به فایل اکسل چند شیتی با اعداد قابل ردیابی تا منبع و محاسبات بررسی شده تبدیل می شوند.',
						points: [
							'عامل های LangGraph/Deep Agents برنامه ریزی و اجرای ابزارها را انجام می دهند، بررسی شیت را به عامل دیگر می سپارند و برای تصمیم های نیازمند بازبینی، منتظر نظر انسان می مانند.',
							'پارسرهای آزمون شده ساختار جدول را حفظ می کنند و کد، جمع ها و محاسبات سفارشی را بررسی می کند. اعداد ناسازگار با حفظ مقدار منبع علامت گذاری می شوند.',
							'هر سلول متن اصلی صفحه و میزان اطمینان خواننده را به یاد دارد؛ هم در جدول و هم به شکل یادداشت در فایل خروجی.',
							'نقطه های ذخیره در پایگاه داده امکان ادامه اجرا را فراهم می کنند؛ احراز هویت، کد دعوت و سهمیه مصرف از برنامه منتشرشده پشتیبانی می کنند.'
						],
						figures: [
							{ value: 'GPT-5.6', label: 'هسته عامل هوشمند' },
							{ value: 'Mistral', label: 'خواندن سند با AI' },
							{ value: '.xlsx', label: 'خروجی قابل ردیابی' }
						],
						tags: ['SvelteKit 2', 'TypeScript', 'Deep Agents', 'LangGraph', 'Turso', 'Vercel'],
						liveLabel: 'باز کردن Rowbot',
						sourceLabel: 'دیدن کد',
						note: 'Rowbot با کلید های شخصی من روی OpenAI و Mistral کار می کند، به همین دلیل ثبت نام فقط با دعوت نامه است. برای دریافت کد در لینکدین پیام بدهید.',
						media: {
							...rowbotMedia,
							title: 'Rowbot: OCR عاملی که کاغذ را به صفحه گسترده تبدیل می کند',
							play: 'پخش ویدیوی معرفی Rowbot',
							watch: 'تماشای ویدیوی Rowbot در یوتیوب'
						}
					},
					{
						...firmScope,
						meta: 'تجسم داده · محصول پژوهشی',
						title: 'FirmScope',
						subtitle: 'داشبورد بیگ فور که خودش را توضیح می دهد',
						text: 'با هدایت جستجو، استخراج و تحلیل داده به کمک هوش مصنوعی، ۶۵۱ مشاهده از ۷۱ منبع دست اول گردآوری کردم. سپس داشبوردی تعاملی با طراحی اختصاصی برای مقایسه مقیاس، رشد، خدمات، جغرافیا و نیروی انسانی Big Four ساختم که هر عدد آن به شواهد مرتبط است.',
						points: [
							'تور ۲۶ صحنه ای با نسخه شبیه سازی شده صدای خودم، داشبورد را هدایت می کند و نمودارها و شواهد را همراه با زیرنویس هماهنگ و متن روایت باز می کند.',
							'جریان های شاخه ای خطوط خدمات، رتبه بندی های پیوسته و حلقه های سهم، به شکل یک روایت پیوسته و نه انبوهی از کاشی.',
							'اطلس دفاتر که با یک کره دقیق باز می شود و به نقشه تخت و قابل بزرگنمایی تبدیل می شود.',
							'فرایند پردازش و اعتبارسنجی داده و دفتر شواهد قابل جستجو، متن منبع، دوره گزارشگری، امتیاز قابلیت مقایسه و سابقه اصلاح ارقام را حفظ می کنند؛ دفترچه پژوهش خروجی قابل دریافت دارد.'
						],
						figures: [
							{ value: '۶۵۱', label: 'سند شواهد' },
							{ value: '۷۱', label: 'منبع رسمی' },
							{ value: '۲۶', label: 'صحنه روایت شده' }
						],
						tags: ['Svelte 5', 'SvelteKit', 'TypeScript', 'D3', 'Three.js', 'ElevenLabs'],
						liveLabel: 'دیدن داشبورد',
						sourceLabel: 'دیدن کد',
						media: {
							...firmScopeMedia,
							title: 'FirmScope: داشبوردی که خودش چهار شرکت بزرگ را توضیح می دهد',
							play: 'پخش ویدیوی معرفی FirmScope',
							watch: 'تماشای ویدیوی FirmScope در یوتیوب'
						}
					},
					{
						...verity,
						meta: 'هوش مصنوعی صوتی · پژوهش مقرراتی',
						title: 'Verity',
						subtitle: 'رباتی که پیش از پاسخ دادن، خود مقرره را می خواند',
						text: 'یک چارچوب عامل اختصاصی با TypeScript ساختم که صدای بلادرنگ OpenAI را از طریق WebRTC به ابزارهای پژوهش مقررات وصل می کند. عامل، جستجو و بازیابی مقررات فدرال و بررسی ارجاع ها را انجام می دهد و نتیجه ابزارها حین گفتگو روی صفحه ظاهر می شود.',
						points: [
							'صدا و متن از ابزارها و وضعیت مشترک گفتگو استفاده می کنند. مکالمه بلادرنگ امکان قطع صحبت را دارد و حرکت شخصیت متحرک با صدایی که می شنوید هماهنگ است.',
							'یک قرارداد اجاره یا نامه پذیرش کار به او بدهید تا بندهایی را که یک بازبین روی آن ها می ایستد نام ببرد و همان ها را روی صفحه سند و بر اساس شدت، رنگ گذاری کند.',
							'پیش از آنکه پاسخ به شما برسد خودش آن را بررسی می کند: هر ارجاع با جستجوهایی که واقعا در همان نوبت انجام شده مقایسه می شود، پس بند ساختگی گرفته می شود.',
							'آموزش هم می دهد: یک قاعده را به شکل درس با ارجاع زیر هر نکته، یا پرسش های سبک آزمون که پاسخ تا زمان درخواست شما پنهان می ماند.'
						],
						figures: [
							{ value: 'Realtime', label: 'گفتگوی صوتی دوطرفه' },
							{ value: '۶', label: 'عنوان از مقررات فدرال' },
							{ value: 'صفر', label: 'سرور در مسیر داده' }
						],
						tags: ['Svelte 5', 'SvelteKit', 'TypeScript', 'GPT Realtime', 'Three.js', 'pdf.js'],
						liveLabel: 'باز کردن Verity',
						sourceLabel: 'دیدن کد',
						note: 'Verity کاملا در مرورگر شما و با کلید OpenAI خودتان کار می کند و از هیچ سروری از من عبور نمی کند. این ابزار کمک پژوهشی است، نه نظر مالیاتی.',
						media: {
							...verityMedia,
							title: 'Verity: رباتی که مقررات مالیاتی را برای حسابداران می خواند',
							play: 'پخش ویدیوی معرفی Verity',
							watch: 'تماشای ویدیوی Verity در یوتیوب'
						}
					}
				]
			},
			resume: {
				kicker: 'رزومه',
				titleLead: 'حسابداری، تحلیل مالی، اتوماسیون',
				titleTail: '',
				accent: '',
				download: 'دریافت رزومه (PDF انگلیسی)',
				experienceHeading: 'سوابق حرفه ای',
				experience: [
					{
						role: 'توسعه دهنده مستقل هوش مصنوعی فول استک',
						period: 'ژوئن ۲۰۲۶ - اکنون',
						place: 'پروژه های مستقل · دالاس، تگزاس',
						text: 'ساخت و انتشار برنامه های هوش مصنوعی: Rowbot روی Vercel با OCR و عامل های قابل بازبینی توسط انسان؛ FirmScope با پژوهش به کمک AI و نمودارهای اختصاصی؛ Verity با چارچوب عامل صوتی بلادرنگ.'
					},
					{
						role: 'متخصص فروش',
						period: 'فوریه ۲۰۲۵ - ژوئن ۲۰۲۶',
						place: "Dillard's · ایالات متحده",
						text: "تقدیر بابت فروش معمول روزانه بیش از ۲۰۰۰ دلار در برابر هدف ۱۸۰۰ دلاری. اتمام آموزش فروش خانه و دکور Home Style Academy در Dillard's. افزایش اقلام هر تراکنش و خدمت رسانی به ده ها مشتری روزانه؛ انجام تراکنش های POS، دریافت وجه، مغایرت گیری و رعایت رویه ها."
					},
					{
						role: 'تحلیلگر ارشد عملیات فروش',
						period: '۲۰۱۹ - ۲۰۲۴',
						place: 'شونیز · بیرجند، ایران',
						text: 'مشارکت در راه اندازی شعبه؛ بررسی و تطبیق بیش از ۱۰۰ فاکتور روزانه، عمدتا فروش. خودکارسازی حدود ۹۰ درصد گزارش عملکرد در اکسل برای ۱۵ نماینده فروش و محاسبه خطی پاداش براساس تحقق هدف، متوسط فروش محصول و دشواری فروش. تحلیل سابقه مشتری، هماهنگی تامین موجودی با کارخانه و گزارش مستقیم به ستاد در ۸۸ مسیر، ۱۱ شهر، حدود ۱۰۰ محصول و ۲۵۰۰ حساب، در دوره رشد ۴۱ درصدی فروش نسبت به سال قبل.'
					},
					{
						role: 'حسابدار ارشد',
						period: '۲۰۱۵ - ۲۰۱۹',
						place: 'شرکت پخش مواد غذایی اصالت · بیرجند، ایران',
						text: 'مدیریت گزارشگری مالی، اظهارنامه های فصلی، بستن سال و حسابرسی مالی انبار. رسیدگی به ۲۰ تا ۳۰ فاکتور روزانه، پرداختنی و دریافتنی، دفتر کل، حقوق و دستمزد، بیمه و مغایرت گیری بانکی؛ ساخت مدل های خودکار محاسبه پورسانت فروش.'
					},
					{
						role: 'حسابدار و پیاده ساز سیستم',
						period: '۲۰۱۰ - ۲۰۱۵',
						place: 'فروشگاه فرش پالاز · بیرجند، ایران',
						text: 'طراحی و پیاده سازی تمام سیستم حسابداری فروشگاه از صفر. مدیریت دریافتنی و پرداختنی نقدی، اقساطی و چکی، حقوق و دستمزد، الزامات بیمه، مزایا و هزینه های عملیاتی.'
					}
				],
				skillsHeading: 'مهارت های اصلی',
				skills: [
					{
						group: 'حسابداری و سیستم ها',
						items: [
							'حسابداری کامل',
							'پرداختنی و دریافتنی',
							'بستن سال و گزارش مالیاتی',
							'هلو و سپیدار',
							'ERP اختصاصی'
						]
					},
					{
						group: 'اکسل و تحلیل مالی',
						items: [
							'PivotTables',
							'VLOOKUP و SUMIF',
							'گزارش و محاسبه پاداش خودکار',
							'پیش بینی و گزارش KPI'
						]
					},
					{
						group: 'هوش مصنوعی و اتوماسیون',
						items: [
							'Claude Code و OpenAI Codex',
							'مهندسی پرامپت',
							'هماهنگی عامل ها و بازبینی انسانی',
							'برنامه های هوش مصنوعی فول استک',
							'SvelteKit, TypeScript & Vercel'
						]
					},
					{
						group: 'کاربرد عملی در دوره ها و محیط آموزشی',
						items: ['Power BI', 'QuickBooks']
					}
				],
				educationHeading: 'تحصیلات',
				education: [
					{
						degree: 'کارشناسی ارشد حسابداری',
						school: 'دانشگاه آزاد اسلامی، واحد علوم و تحقیقات تهران · ۲۰۱۳-۲۰۱۷'
					},
					{
						degree: 'کارشناسی حسابداری علمی کاربردی',
						school: 'دانشگاه آزاد اسلامی بیرجند · ۲۰۱۰-۲۰۱۳'
					},
					{
						degree: 'کاردانی حسابداری بازرگانی',
						school: 'آموزشکده فنی بیرجند · ۲۰۰۸-۲۰۱۰'
					},
					{
						degree: 'دیپلم حسابداری',
						school: 'دبیرستان رسالت · ۲۰۰۶-۲۰۰۸'
					}
				],

				certsHeading: 'گواهی های LinkedIn Learning',
				certs: [
					'The AI-Driven Accountant',
					'Leveraging Generative AI in Finance and Accounting',
					'The Future of AI for Finance and Accounting',
					'Microsoft Copilot: The Art of Prompt Writing'
				],
				alsoHeading: 'مدارک و تجربه های تکمیلی',
				also: [
					'گواهی حرفه ای شیرینی پزی',
					'کمربند قهوه ای کاراته',
					'گواهی CPR و حمایت حیاتی پایه',
					'باشگاه ابومسلم، ۲۰۰۴ تا ۲۰۲۴: بازیکن، مربی و داور دارای گواهی، با چهار سال مدیریت باشگاه.'
				]
			},
			testimonial: {
				quote:
					'او همیشه آماده بود چالش های تازه را بپذیرد، سریع یاد بگیرد و ایده های نو به تیم بیاورد. او فقط به انجام وظایفش بسنده نمی کرد؛ اغلب به دنبال راه های بهتر و عملی تری برای انجام کارها بود.',
				byline: 'Farzad Adelzadeh Sadabadi, PhD',
				role: 'استاد دانشگاه · مدیر برنامه ریزی استراتژیک شونیز',
				sourceLabel: 'متن اصلی توصیه نامه در لینکدین (انگلیسی)'
			},
			contact: {
				kicker: 'ارتباط',
				title: 'تصور دوباره حساب داری از روزنه ی هوش مصنوعی',
				accent: '',
				body: 'آماده همکاری حضوری و دورکاری در حسابداری، تحلیل مالی و اتوماسیون با هوش مصنوعی هستم. مدیریت کامل حسابداری، تجربه گزارشگری در شرکت بزرگ و برنامه های فول استک منتشرشده را به تیم های مالی می آورم.',
				cta: 'همکاری با الی',
				email: 'ایمیل',
				phone: 'تلفن',
				location: 'موقعیت',
				linkedin: 'لینکدین',
				github: 'گیت هاب',
				footer: 'حسابداری | تحلیل مالی | اتوماسیون با هوش مصنوعی'
			},
			deck: {
				open: 'ارائه',
				label: 'ارائه',
				close: 'خروج از ارائه',
				exit: 'خروج',
				next: 'اسلاید بعد',
				previous: 'اسلاید قبل',
				fullscreen: 'تمام صفحه',
				exitFullscreen: 'خروج از تمام صفحه',
				highlights: 'نقاط برجسته',
				principles: 'آنچه با خود می آورم',
				principlesTitle: 'سه چیزی که به هر تیم می آورم',
				toolkit: 'جعبه ابزار',
				credentials: 'گواهی ها و بیشتر',
				testimonial: 'توصیه نامه'
			}
		}
	};

	const currentLocale = $derived(getLocale() as Locale);
	const c = $derived(copy[currentLocale]);
	const isFarsi = $derived(currentLocale === 'fa');
	const homeHref = $derived(resolve(localizeHref('/', { locale: currentLocale }) as Pathname));
	const pathWithoutLocale = $derived(page.url.pathname.replace(/^\/fa(?=\/|$)/, '') || '/');
	const languageHref = $derived(getLanguageHref(pathWithoutLocale, isFarsi));
	const linkedin = '/in/elham-aboutorabi';
	const linkedinUrl = 'https://www.linkedin.com/in/elham-aboutorabi/';
	const github = '@eliaboutorabi';
	const githubUrl = 'https://github.com/eliaboutorabi';
	const navItems = $derived<
		Array<
			| { key: NavKey; label: string; href: string; kind: 'section' }
			| { key: 'linkedin' | 'github'; label: string; href: string; kind: 'external' }
		>
	>([
		{ key: 'about', label: c.nav.about, href: '#about', kind: 'section' },
		{ key: 'work', label: c.nav.work, href: '#work', kind: 'section' },
		{ key: 'resume', label: c.nav.resume, href: '#resume', kind: 'section' },
		{ key: 'contact', label: c.nav.contact, href: '#contact', kind: 'section' },
		{ key: 'linkedin', label: c.nav.linkedin, href: linkedinUrl, kind: 'external' },
		{ key: 'github', label: c.nav.github, href: githubUrl, kind: 'external' }
	]);
	let theme = $state<'light' | 'dark'>('light');
	let themeIconActive = $state(false);
	let activeNavKey = $state<HeaderNavKey | null>(null);
	let contactCtaActive = $state(false);
	let activeContactKey = $state<ContactKey | null>(null);
	const isDark = $derived(theme === 'dark');
	let presenting = $state(false);
	let presentIconActive = $state(false);
	let presentButton = $state<HTMLButtonElement>();

	const projects = $derived(c.work.projects);

	function openDeck() {
		presenting = true;
	}

	function closeDeck() {
		presenting = false;
		// Hand focus back to where the deck was opened from.
		presentButton?.focus({ preventScroll: true });
	}

	function toggleTheme() {
		theme = isDark ? 'light' : 'dark';
		themeIconActive = true;
	}

	function getLanguageHref(path: string, fromFarsi = isFarsi) {
		const cleanPath = path === '/' ? '' : path;
		return fromFarsi ? path : `/fa${cleanPath}`;
	}

	function switchLanguage(event: MouseEvent) {
		event.preventDefault();

		const nextPath = window.location.pathname.replace(/^\/fa(?=\/|$)/, '') || '/';
		window.location.href = getLanguageHref(nextPath);
	}

	const email = 'Eli.abotorabi@gmail.com';
	const phone = '+1 (469) 618-8462';
	const phoneDisplay = $derived(isFarsi ? '+۱ (۴۶۹) ۶۱۸-۸۴۶۲' : phone);
	const location = 'Dallas, TX';
</script>

<svelte:head>
	<title>Elham "Eli" Aboutorabi | Accounting, Financial Analysis &amp; AI Automation</title>
	<meta
		name="description"
		content="Elham Aboutorabi: full-cycle accounting, financial analysis and deployed full-stack AI applications. Dallas, TX; open to local and remote roles. Download her resume."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main
	class:rtl={isFarsi}
	class:dark-theme={isDark}
	class="site-shell"
	data-persian-font="iranNastaliq"
	lang={currentLocale}
>
	<header class="site-nav" aria-label="Primary navigation">
		<a class="wordmark" href={homeHref}>
			<span>Eli</span>
			<small>AI-Enabled Accountant</small>
		</a>

		<nav>
			{#each navItems as item (item.key)}
				<a
					href={item.href}
					aria-label={item.label}
					target={item.kind === 'external' ? '_blank' : undefined}
					rel={item.kind === 'external' ? 'noreferrer' : undefined}
					onmouseenter={() => (activeNavKey = item.key)}
					onmouseleave={() => (activeNavKey = null)}
					onfocus={() => (activeNavKey = item.key)}
					onblur={() => (activeNavKey = null)}
				>
					{#if item.key === 'about'}
						<UserRound size={17} strokeWidth={2.1} animate={activeNavKey === item.key} />
					{:else if item.key === 'work'}
						<BriefcaseBusiness size={17} strokeWidth={2.1} animate={activeNavKey === item.key} />
					{:else if item.key === 'resume'}
						<FileText size={17} strokeWidth={2.1} animate={activeNavKey === item.key} />
					{:else if item.key === 'contact'}
						<MailCheck size={17} strokeWidth={2.1} animate={activeNavKey === item.key} />
					{:else if item.key === 'linkedin'}
						<svg class="brand-icon nav-brand-icon" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M20.45 20.45h-3.56v-5.58c0-1.33-0.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V8.99h3.42v1.57h0.05c0.48-0.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.43c-1.14 0-2.06-0.93-2.06-2.06s0.92-2.06 2.06-2.06 2.06 0.92 2.06 2.06-0.92 2.06-2.06 2.06zM7.1 20.45H3.54V8.99H7.1v11.46zM22.22 0H1.77C0.79 0 0 0.77 0 1.72v20.56C0 23.23 0.79 24 1.77 24h20.45c0.98 0 1.78-0.77 1.78-1.72V1.72C24 0.77 23.2 0 22.22 0z"
							/>
						</svg>
					{:else}
						<GithubMark class="nav-brand-icon" />
					{/if}
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="nav-actions">
			<button
				class="present-toggle"
				type="button"
				aria-label={c.deck.open}
				title={c.deck.open}
				bind:this={presentButton}
				onclick={openDeck}
				onmouseenter={() => (presentIconActive = true)}
				onmouseleave={() => (presentIconActive = false)}
				onfocus={() => (presentIconActive = true)}
				onblur={() => (presentIconActive = false)}
			>
				<Play size={13} strokeWidth={2.3} animate={presentIconActive} />
				<span>{c.deck.open}</span>
			</button>
			<a
				class="language-link"
				href={languageHref}
				aria-label={isFarsi ? 'Switch to English' : 'تغییر زبان به فارسی'}
				onclick={switchLanguage}
			>
				{c.nav.language}
			</a>
			<button
				class="theme-toggle"
				type="button"
				aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
				aria-pressed={isDark}
				onclick={toggleTheme}
				onmouseenter={() => (themeIconActive = true)}
				onmouseleave={() => (themeIconActive = false)}
			>
				{#if isDark}
					<Sun size={17} strokeWidth={2.1} animate={themeIconActive} />
				{:else}
					<CloudMoon size={17} strokeWidth={2.1} animate={themeIconActive} />
				{/if}
			</button>
		</div>
	</header>

	{#if presenting}
		<Presentation
			copy={c}
			{isFarsi}
			{email}
			{phone}
			{phoneDisplay}
			{location}
			{linkedin}
			{linkedinUrl}
			{github}
			{githubUrl}
			onclose={closeDeck}
		/>
	{/if}

	<section class="hero-section">
		<div class="hero-grid">
			<div class="hero-copy reveal">
				<h1>
					<span class="hero-title-line">
						{c.hero.titleLead} <span class="hero-name">{c.hero.titleName}</span>{c.hero
							.titleNameSuffix}{currentLocale === 'fa' && c.hero.titleTail
							? ` ${c.hero.titleTail}`
							: ''}
					</span>
					<span class="hero-title-role">
						{currentLocale === 'en' ? `${c.hero.titleTail} ` : ''}<em>{c.hero.accent}</em
						>{#if currentLocale === 'en'}<span class="terminal-mark">.</span>{/if}
					</span>
				</h1>
				<p class="hero-intro">{c.hero.intro}</p>
				<div class="button-row">
					<a class="button hero-button button-primary" href="#work">
						<BriefcaseBusiness size={17} strokeWidth={2.1} animate={activeNavKey === 'work'} />
						<span>{c.hero.primary}</span>
					</a>
					<a
						class="button hero-button button-secondary"
						href="/Elham_Aboutorabi_Resume.pdf"
						download
					>
						<FileText size={17} strokeWidth={2.1} animate={activeNavKey === 'resume'} />
						<span>{c.hero.secondary}</span>
					</a>
				</div>
			</div>

			<div class="portrait-mark reveal" aria-label="Portrait of Eli">
				<div class="portrait-frame">
					<img src="/hero_headshot.png" alt="Portrait of Eli" />
				</div>
			</div>
		</div>
	</section>

	<div class="ornament" aria-hidden="true">
		<span></span><i></i><b></b><i></i><span></span>
	</div>

	<section id="about" class="band band-warm">
		<div class="content-wrap">
			<div class="split-heading">
				<div class="reveal">
					<div class="section-kicker" aria-label={c.about.kicker}>
						<UserRound size={18} strokeWidth={2.1} animate={false} />
						<span>{c.about.kicker}</span>
					</div>
					<p class="about-name">{c.about.name}</p>
					<h2>{c.about.title}<br /><em>{c.about.accent}</em></h2>
				</div>
				<div class="body-copy reveal">
					{#each c.about.body as paragraph (paragraph)}
						<p>{paragraph}</p>
					{/each}
				</div>
			</div>

			<div class="value-grid">
				{#each c.about.cards as card (card.title)}
					<article class="value-card reveal">
						<div class="value-card-heading">
							<div class="icon-shell">
								{#if card.icon === 'decisions'}
									<ChartNoAxesCombined size={24} strokeWidth={1.9} animate={false} />
								{:else if card.icon === 'ai'}
									<BrainCog size={24} strokeWidth={1.9} animate={false} />
								{:else}
									<ChartColumnIncreasing size={24} strokeWidth={1.9} animate={false} />
								{/if}
							</div>
							<h3>{card.title}</h3>
						</div>
						<p>{card.text}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="stats-band" aria-label="Career highlights">
		<div class="stats-grid">
			{#each c.stats as stat (stat.label)}
				<div class="stat-cell reveal">
					<p class="stat-value">
						{#if isFarsi}
							<span class="stat-suffix">{stat.suffix === '%' ? '٪' : stat.suffix}</span><span
								class="stat-number">{stat.value}</span
							>
						{:else}
							<span class="stat-number">{stat.value}</span><span class="stat-suffix"
								>{stat.suffix}</span
							>
						{/if}
					</p>
					<strong>{stat.label}</strong>
				</div>
			{/each}
		</div>
	</section>

	<section id="work" class="band band-cream bordered-band">
		<div class="wide-wrap">
			<div class="center-heading reveal">
				<div class="section-kicker" aria-label={c.work.kicker}>
					<BriefcaseBusiness size={18} strokeWidth={2.1} animate={false} />
					<span>{c.work.kicker}</span>
				</div>
				<h2>{c.work.title}</h2>
				<p>{c.work.intro}</p>
				<div class="mini-ornament" aria-hidden="true"><span></span><i></i><span></span></div>
			</div>

			<div class="project-list">
				{#each projects as project, index (project.id)}
					<ProjectShowcase {project} flipped={index % 2 === 1} />
				{/each}

				<div class="project-upcoming">
					<Telescope size={17} strokeWidth={2.1} animate={false} />
					<span>{c.work.upcoming}</span>
				</div>
			</div>
		</div>
	</section>

	<section id="resume" class="band band-warm">
		<div class="content-wrap">
			<div class="resume-heading reveal">
				<div>
					<div class="section-kicker" aria-label={c.resume.kicker}>
						<FileText size={18} strokeWidth={2.1} animate={false} />
						<span>{c.resume.kicker}</span>
					</div>
					<h2>
						{c.resume.titleLead}{#if c.resume.accent}
							<em>{c.resume.accent}</em>{/if}{#if c.resume.titleTail}<br />{c.resume.titleTail}{/if}
					</h2>
				</div>
				<a
					class="button button-secondary resume-download"
					href="/Elham_Aboutorabi_Resume.pdf"
					download>{c.resume.download}</a
				>
			</div>

			<div class="resume-grid">
				<div class="timeline reveal">
					<h3>{c.resume.experienceHeading}</h3>
					<div class="timeline-track">
						{#each c.resume.experience as job (job.role)}
							<article>
								<span class="timeline-dot"></span>
								<div class="job-heading">
									<h4>{job.role}</h4>
									<time>{job.period}</time>
								</div>
								<p class="job-place">{job.place}</p>
								<p>{job.text}</p>
							</article>
						{/each}
					</div>
				</div>

				<aside class="resume-side reveal">
					<section class="side-card">
						<h3>{c.resume.skillsHeading}</h3>
						{#each c.resume.skills as skillGroup (skillGroup.group)}
							<div class="skill-group">
								<p>{skillGroup.group}</p>
								<div>
									{#each skillGroup.items as item (item)}
										<span>{item}</span>
									{/each}
								</div>
							</div>
						{/each}
					</section>

					<section class="side-card">
						<h3>{c.resume.educationHeading}</h3>
						<div class="education-list">
							{#each c.resume.education as edu (edu.degree)}
								<article>
									<span></span>
									<div>
										<h4>{edu.degree}</h4>
										<p>{edu.school}</p>
									</div>
								</article>
							{/each}
						</div>
					</section>
				</aside>
			</div>

			<div class="credentials-grid reveal">
				<section class="credential-card credential-card-unified">
					<div class="credential-sections">
						<div class="credential-section">
							<div class="credential-heading">
								<Award size={22} strokeWidth={2} animate={false} />
								<h3>{c.resume.certsHeading}</h3>
							</div>
							<div class="credential-list">
								{#each c.resume.certs as cert (cert)}
									<div class="credential-list-item">
										<BadgeCheck size={17} strokeWidth={2.1} animate={false} />
										<span>{cert}</span>
									</div>
								{/each}
							</div>
						</div>

						<div class="credential-section">
							<div class="credential-heading">
								<BookOpenCheck size={22} strokeWidth={2} animate={false} />
								<h3>{c.resume.alsoHeading}</h3>
							</div>
							<div class="credential-list">
								{#each c.resume.also as item (item)}
									<div class="credential-list-item">
										<BadgeCheck size={17} strokeWidth={2.1} animate={false} />
										<span>{item}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	</section>

	<section class="testimonial-band">
		<div class="testimonial reveal">
			<div aria-hidden="true">"</div>
			<blockquote cite={linkedinUrl}>{c.testimonial.quote}</blockquote>
			<div class="mini-ornament" aria-hidden="true"><span></span><i></i><span></span></div>
			<p class="testimonial-byline" dir="auto">{c.testimonial.byline}</p>
			<p class="testimonial-role">{c.testimonial.role}</p>
			<a class="testimonial-source" href={linkedinUrl} target="_blank" rel="noreferrer">
				{c.testimonial.sourceLabel}
			</a>
		</div>
	</section>

	<section id="contact" class="contact-band">
		<div class="contact-wrap">
			<div class="contact-copy reveal">
				<div class="section-kicker" aria-label={c.contact.kicker}>
					<SmartphoneNfc size={18} strokeWidth={2.1} animate={false} />
					<span>{c.contact.kicker}</span>
				</div>
				<h2>
					{c.contact.title}{#if c.contact.accent}<br /><em>{c.contact.accent}</em>.{/if}
				</h2>
				<p>{c.contact.body}</p>
				<a
					class="button contact-button"
					href={`mailto:${email}`}
					onmouseenter={() => (contactCtaActive = true)}
					onmouseleave={() => (contactCtaActive = false)}
					onfocus={() => (contactCtaActive = true)}
					onblur={() => (contactCtaActive = false)}
				>
					<HandHeart size={17} strokeWidth={2.1} animate={contactCtaActive} />
					<span>{c.contact.cta}</span>
				</a>
			</div>

			<div class="contact-grid reveal">
				<div
					class="contact-item"
					role="group"
					aria-label={c.contact.email}
					onmouseenter={() => (activeContactKey = 'email')}
					onmouseleave={() => (activeContactKey = null)}
					onfocusin={() => (activeContactKey = 'email')}
					onfocusout={() => (activeContactKey = null)}
				>
					<div>
						<div class="contact-label">
							<MailCheck size={14} strokeWidth={2.1} animate={activeContactKey === 'email'} />
							<span>{c.contact.email}</span>
						</div>
						<a href={`mailto:${email}`}>{email}</a>
					</div>
				</div>
				<div
					class="contact-item"
					role="group"
					aria-label={c.contact.phone}
					onmouseenter={() => (activeContactKey = 'phone')}
					onmouseleave={() => (activeContactKey = null)}
					onfocusin={() => (activeContactKey = 'phone')}
					onfocusout={() => (activeContactKey = null)}
				>
					<div>
						<div class="contact-label">
							<SmartphoneNfc size={14} strokeWidth={2.1} animate={activeContactKey === 'phone'} />
							<span>{c.contact.phone}</span>
						</div>
						<a
							class="phone-display"
							dir={isFarsi ? 'ltr' : undefined}
							href={`tel:${phone.replace(/[^+\d]/g, '')}`}
						>
							{phoneDisplay}
						</a>
					</div>
				</div>
				<div
					class="contact-item"
					role="group"
					aria-label={c.contact.location}
					onmouseenter={() => (activeContactKey = 'location')}
					onmouseleave={() => (activeContactKey = null)}
					onfocusin={() => (activeContactKey = 'location')}
					onfocusout={() => (activeContactKey = null)}
				>
					<div>
						<div class="contact-label">
							<MapPinCheck size={14} strokeWidth={2.1} animate={activeContactKey === 'location'} />
							<span>{c.contact.location}</span>
						</div>
						<span>{location}</span>
					</div>
				</div>
				<div
					class="contact-item"
					role="group"
					aria-label={c.contact.linkedin}
					onmouseenter={() => (activeContactKey = 'linkedin')}
					onmouseleave={() => (activeContactKey = null)}
					onfocusin={() => (activeContactKey = 'linkedin')}
					onfocusout={() => (activeContactKey = null)}
				>
					<div>
						<div class="contact-label">
							<svg class="brand-icon linkedin-icon" viewBox="0 0 24 24" aria-hidden="true">
								<path
									d="M20.45 20.45h-3.56v-5.58c0-1.33-0.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V8.99h3.42v1.57h0.05c0.48-0.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.43c-1.14 0-2.06-0.93-2.06-2.06s0.92-2.06 2.06-2.06 2.06 0.92 2.06 2.06-0.92 2.06-2.06 2.06zM7.1 20.45H3.54V8.99H7.1v11.46zM22.22 0H1.77C0.79 0 0 0.77 0 1.72v20.56C0 23.23 0.79 24 1.77 24h20.45c0.98 0 1.78-0.77 1.78-1.72V1.72C24 0.77 23.2 0 22.22 0z"
								/>
							</svg>
							<span>{c.contact.linkedin}</span>
						</div>
						<a href={linkedinUrl} target="_blank" rel="noreferrer">{linkedin}</a>
					</div>
				</div>
				<div
					class="contact-item"
					role="group"
					aria-label={c.contact.github}
					onmouseenter={() => (activeContactKey = 'github')}
					onmouseleave={() => (activeContactKey = null)}
					onfocusin={() => (activeContactKey = 'github')}
					onfocusout={() => (activeContactKey = null)}
				>
					<div>
						<div class="contact-label">
							<GithubMark class="github-icon" />
							<span>{c.contact.github}</span>
						</div>
						<a href={githubUrl} target="_blank" rel="noreferrer">{github}</a>
					</div>
				</div>
			</div>

			<footer class="footer-mark">
				<p>Eli</p>
				<strong>{c.contact.footer}</strong>
				<div class="mini-ornament" aria-hidden="true"><span></span><i></i><span></span></div>
				<small>© 2026 Elham Aboutorabi · Designed with care in Dallas, TX</small>
			</footer>
		</div>
	</section>
</main>
