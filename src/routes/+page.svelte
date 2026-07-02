<script lang="ts">
	import {
		BriefcaseBusiness,
		CloudMoon,
		FileText,
		SmartphoneNfc,
		Sun,
		UserRound
	} from '@jis3r/icons';
	import { page } from '$app/state';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';

	type Locale = 'en' | 'fa';
	type NavKey = 'about' | 'work' | 'resume' | 'contact';

	type Copy = {
		nav: {
			about: string;
			work: string;
			resume: string;
			contact: string;
			language: string;
			languageHref: string;
		};
		hero: {
			status: string;
			eyebrow: string;
			titleLead: string;
			titleName: string;
			titleNameSuffix: string;
			titleTail: string;
			accent: string;
			intro: string;
			primary: string;
			secondary: string;
		};
		about: {
			kicker: string;
			name: string;
			title: string;
			accent: string;
			body: string[];
			cards: Array<{ title: string; text: string; icon: 'chart' | 'ai' | 'target' }>;
		};
		stats: Array<{ value: string; suffix: string; label: string }>;
		work: {
			kicker: string;
			title: string;
			intro: string;
			items: Array<{
				label: string;
				meta: string;
				title: string;
				text?: string;
				theme: 'cream' | 'gold' | 'dark';
				featured?: boolean;
			}>;
		};
		resume: {
			kicker: string;
			titleLead: string;
			titleTail: string;
			accent: string;
			download: string;
			experienceHeading: string;
			experience: Array<{ role: string; period: string; place: string; text: string }>;
			skillsHeading: string;
			skills: Array<{ group: string; items: string[] }>;
			educationHeading: string;
			education: Array<{ degree: string; school: string }>;
			certsHeading: string;
			certs: string[];
			also: string;
		};
		testimonial: {
			quote: string;
			byline: string;
		};
		contact: {
			kicker: string;
			title: string;
			accent: string;
			body: string;
			cta: string;
			email: string;
			phone: string;
			location: string;
			linkedin: string;
			footer: string;
		};
	};

	const copy: Record<Locale, Copy> = {
		en: {
			nav: {
				about: 'About',
				work: 'Work',
				resume: 'Resume',
				contact: "Let's Connect",
				language: 'FA',
				languageHref: '/fa'
			},
			hero: {
				status: 'Dallas, TX · Open to select work',
				eyebrow: 'Elham "Eli" Aboutorabi',
				titleLead: "Hi, I'm",
				titleName: 'Eli',
				titleNameSuffix: ',',
				titleTail: 'an',
				accent: 'AI-enabled accountant',
				intro:
					'I care about clear books, useful systems, and calmer decisions. My work blends accounting, sales operations, data analysis, and practical AI automation.',
				primary: 'Portfolio',
				secondary: 'Resume'
			},
			about: {
				kicker: '01 - About',
				name: 'Elham "Eli" Aboutorabi',
				title: 'A decade of ledgers, now fluent in',
				accent: 'machines',
				body: [
					"Results-driven and tech-forward, I hold a Master's in Accounting and more than ten years across financial reporting, data analysis and full-cycle operations. I've built accounting infrastructures from the ground up and engineered the dashboards that grew revenue.",
					'Today I merge that traditional rigor with agentic AI, prompt engineering and no-code automation, solving intricate problems and bringing financial innovation to corporate and Big Four environments.'
				],
				cards: [
					{
						title: 'Data-Driven Decisions',
						text: 'Complex data turned into clear insight that drives smarter, faster business calls.',
						icon: 'chart'
					},
					{
						title: 'AI-Powered Efficiency',
						text: 'Agentic AI and automation that streamline the work and give back real, valuable time.',
						icon: 'ai'
					},
					{
						title: 'Growth-Focused',
						text: 'Accounting and sales discipline aimed squarely at measurable, durable growth.',
						icon: 'target'
					}
				]
			},
			stats: [
				{ value: '10', suffix: '+', label: 'Years of Experience' },
				{ value: '41', suffix: '%', label: 'Sales Growth Achieved' },
				{ value: '2,500', suffix: '+', label: 'Accounts Served' },
				{ value: '100', suffix: '+', label: 'Products Managed' }
			],
			work: {
				kicker: '02 - Selected Work',
				title: 'The Portfolio',
				intro:
					'A gallery of projects where financial discipline and AI meet. Each tile opens a closer look, placeholders for now, ready for the real work to come.',
				items: [
					{
						label: '[ dashboard preview ]',
						meta: 'Financial Modeling & Forecasting · Featured',
						title: 'Dynamic Forecast Engine',
						text: 'Driver-based models that turn assumptions into board-ready scenarios and clearer planning.',
						theme: 'cream',
						featured: true
					},
					{
						label: '[ workflow diagram ]',
						meta: 'AI & Automation',
						title: 'Agentic Close Workflow',
						theme: 'gold'
					},
					{
						label: '[ kpi dashboard ]',
						meta: 'Dashboards',
						title: 'Live Sales Command Center',
						theme: 'cream'
					},
					{
						label: '[ report ]',
						meta: 'Reporting',
						title: 'Executive Reporting Suite',
						theme: 'cream'
					},
					{
						label: '[ system map ]',
						meta: 'Process Design',
						title: 'Ground-Up Ledger System',
						theme: 'dark'
					},
					{
						label: '[ playbook ]',
						meta: 'Revenue Strategy',
						title: 'UPT Optimization Playbook',
						theme: 'gold'
					}
				]
			},
			resume: {
				kicker: '03 - The Resume',
				titleLead: 'Experience,',
				titleTail: 'in outcomes.',
				accent: 'measured',
				download: 'Download Resume',
				experienceHeading: 'Professional Experience',
				experience: [
					{
						role: 'Sales Specialist',
						period: 'Feb 2025 - Present',
						place: "Dillard's · United States",
						text: 'KPI tracking, forecasting and UPT optimization across high-volume POS operations, turning single-item visits into multi-item sales.'
					},
					{
						role: 'Senior Sales Operations Manager',
						period: '2018 - 2023',
						place: 'Shoniz · Birjand, Iran',
						text: 'Launched a regional branch and drove a 41% rise in monthly sales via automated performance dashboards, analyzing 88 routes across 11 cities for about 2,500 accounts.'
					},
					{
						role: 'Senior Accountant',
						period: '2015 - 2019',
						place: 'Esalat Food Distribution · Birjand, Iran',
						text: 'Full-cycle accounting, financial reporting, payroll, reconciliations and audits for an 11-city distribution network of about 1,000 customers.'
					},
					{
						role: 'Accountant & Systems Implementer',
						period: '2010 - 2015',
						place: 'Palaz Carpet Store · Birjand, Iran',
						text: "Architected the company's first accounting system from the ground up, standardizing product coding, inventory and zero-discrepancy reconciliation."
					}
				],
				skillsHeading: 'Core Skills',
				skills: [
					{
						group: 'AI & Automation',
						items: [
							'Agentic & Prompt Engineering',
							'Agent Design & Eval',
							'No/Low-Code Automation',
							'CI/CD'
						]
					},
					{
						group: 'Accounting & Finance',
						items: ['Full-Cycle Accounting', 'A/P & A/R', 'Year-End Close', 'Tax Reporting']
					},
					{
						group: 'Data & Systems',
						items: ['Forecasting', 'BI Reporting', 'Advanced Excel & Copilot', 'ERP Implementation']
					}
				],
				educationHeading: 'Education',
				education: [
					{ degree: 'M.S., Accounting', school: 'Islamic Azad University, Tehran · 2013-2017' },
					{
						degree: 'B.S., Applied Accounting',
						school: 'Islamic Azad University, Birjand · 2010-2013'
					},
					{
						degree: 'Associate, Business Accounting',
						school: 'Birjand Technical School · 2008-2010'
					}
				],
				certsHeading: 'AI Certifications',
				certs: [
					'The AI-Driven Accountant',
					'Generative AI in Finance & Accounting',
					'The Future of AI for Finance'
				],
				also: 'Also: Professional Baking · Karate Brown Belt · CPR & Basic Life Support · 20 years leading Aboumoslem Soccer Club.'
			},
			testimonial: {
				quote:
					"Eli's analytical mindset and attention to detail transformed our financial processes, and gave us the clarity we needed to scale with confidence.",
				byline: 'Operations Director'
			},
			contact: {
				kicker: "04 - Let's Connect",
				title: "Let's build something",
				accent: 'precise',
				body: "Open to corporate and Big Four opportunities where accounting rigor and AI strategy meet. I'd love to hear what you're working on.",
				cta: 'Work With Eli',
				email: 'Email',
				phone: 'Phone',
				location: 'Location',
				linkedin: 'LinkedIn',
				footer: 'AI-Enabled Accountant & Sales Expert'
			}
		},
		fa: {
			nav: {
				about: 'درباره',
				work: 'نمونه کار',
				resume: 'رزومه',
				contact: 'ارتباط',
				language: 'EN',
				languageHref: '/'
			},
			hero: {
				status: 'دالاس، تگزاس · آماده همکاری منتخب',
				eyebrow: 'الهام «الی» ابوترابی',
				titleLead: 'سلام، من',
				titleName: 'الی',
				titleNameSuffix: '',
				titleTail: 'هستم؛ یک',
				accent: 'حسابدار مجهز به هوش مصنوعی',
				intro:
					'کار من ترکیب حسابداری دقیق، تحلیل داده، تجربه فروش و اتوماسیون کاربردی با هوش مصنوعی است؛ برای تصمیم های شفاف تر و کارهای روزمره آرام تر.',
				primary: 'نمونه کارها',
				secondary: 'رزومه'
			},
			about: {
				kicker: '۰۱ - درباره',
				name: 'الهام «الی» ابوترابی',
				title: 'یک دهه تجربه در دفترها، حالا مسلط به',
				accent: 'ماشین ها',
				body: [
					'من یک متخصص حسابداری نتیجه محور و علاقه مند به فناوری هستم، با کارشناسی ارشد حسابداری و بیش از ده سال تجربه در گزارشگری مالی، تحلیل داده و عملیات کامل حسابداری.',
					'امروز این دقت سنتی را با هوش مصنوعی عاملی، مهندسی پرامپت و اتوماسیون کم کد ترکیب می کنم تا مسائل پیچیده را حل کنم و نوآوری مالی را وارد محیط های شرکتی و Big Four کنم.'
				],
				cards: [
					{
						title: 'تصمیم گیری داده محور',
						text: 'تبدیل داده های پیچیده به بینشی روشن برای تصمیم های سریع تر و هوشمندتر.',
						icon: 'chart'
					},
					{
						title: 'بهره وری با هوش مصنوعی',
						text: 'اتوماسیون و AI عاملی که کار را ساده تر می کند و زمان ارزشمند آزاد می سازد.',
						icon: 'ai'
					},
					{
						title: 'تمرکز بر رشد',
						text: 'ترکیب نظم حسابداری و فروش برای رشد قابل اندازه گیری و پایدار.',
						icon: 'target'
					}
				]
			},
			stats: [
				{ value: '۱۰', suffix: '+', label: 'سال تجربه' },
				{ value: '۴۱', suffix: '%', label: 'رشد فروش' },
				{ value: '۲,۵۰۰', suffix: '+', label: 'حساب فعال' },
				{ value: '۱۰۰', suffix: '+', label: 'محصول مدیریت شده' }
			],
			work: {
				kicker: '۰۲ - نمونه کارها',
				title: 'پورتفولیو',
				intro:
					'گالری پروژه هایی که در آن ها نظم مالی و هوش مصنوعی به هم می رسند. کاشی ها فعلا جایگزین هستند و برای نمونه های واقعی آماده اند.',
				items: [
					{
						label: '[ پیش نمایش داشبورد ]',
						meta: 'مدل سازی مالی و پیش بینی · ویژه',
						title: 'موتور پیش بینی پویا',
						text: 'مدل های محرک محور که فرضیه ها را به سناریوهای آماده ارائه و برنامه ریزی روشن تبدیل می کنند.',
						theme: 'cream',
						featured: true
					},
					{
						label: '[ نمودار جریان کار ]',
						meta: 'AI و اتوماسیون',
						title: 'فرایند بستن حساب با عامل هوشمند',
						theme: 'gold'
					},
					{
						label: '[ داشبورد KPI ]',
						meta: 'داشبوردها',
						title: 'مرکز زنده فرمان فروش',
						theme: 'cream'
					},
					{
						label: '[ گزارش ]',
						meta: 'گزارشگری',
						title: 'مجموعه گزارش های مدیریتی',
						theme: 'cream'
					},
					{
						label: '[ نقشه سیستم ]',
						meta: 'طراحی فرایند',
						title: 'سیستم دفتر کل از پایه',
						theme: 'dark'
					},
					{
						label: '[ پلی بوک ]',
						meta: 'استراتژی درآمد',
						title: 'راهنمای بهینه سازی UPT',
						theme: 'gold'
					}
				]
			},
			resume: {
				kicker: '۰۳ - رزومه',
				titleLead: 'تجربه ای که با',
				titleTail: 'سنجیده می شود.',
				accent: 'نتیجه',
				download: 'دانلود رزومه',
				experienceHeading: 'سوابق حرفه ای',
				experience: [
					{
						role: 'متخصص فروش',
						period: 'فوریه ۲۰۲۵ - اکنون',
						place: "Dillard's · ایالات متحده",
						text: 'پیگیری KPI، پیش بینی و بهینه سازی UPT در عملیات فروش پرتراکنش، با تبدیل خریدهای تک محصولی به فروش چندمحصولی.'
					},
					{
						role: 'مدیر ارشد عملیات فروش',
						period: '۲۰۱۸ - ۲۰۲۳',
						place: 'شونیز · بیرجند، ایران',
						text: 'راه اندازی شعبه منطقه ای و افزایش ۴۱ درصدی فروش ماهانه با داشبوردهای خودکار، بر پایه تحلیل ۸۸ مسیر در ۱۱ شهر برای حدود ۲۵۰۰ حساب.'
					},
					{
						role: 'حسابدار ارشد',
						period: '۲۰۱۵ - ۲۰۱۹',
						place: 'پخش مواد غذایی اصالت · بیرجند، ایران',
						text: 'حسابداری کامل، گزارشگری مالی، حقوق و دستمزد، مغایرت گیری و حسابرسی برای شبکه توزیع ۱۱ شهری با حدود ۱۰۰۰ مشتری.'
					},
					{
						role: 'حسابدار و پیاده ساز سیستم',
						period: '۲۰۱۰ - ۲۰۱۵',
						place: 'فروشگاه فرش پالاز · بیرجند، ایران',
						text: 'طراحی نخستین سیستم حسابداری شرکت از پایه، با استانداردسازی کدینگ محصولات، موجودی و مغایرت گیری بدون اختلاف.'
					}
				],
				skillsHeading: 'مهارت های اصلی',
				skills: [
					{
						group: 'AI و اتوماسیون',
						items: ['مهندسی عامل و پرامپت', 'طراحی و ارزیابی عامل', 'اتوماسیون کم کد', 'CI/CD']
					},
					{
						group: 'حسابداری و مالی',
						items: [
							'حسابداری کامل',
							'حساب های پرداختنی و دریافتنی',
							'بستن سال مالی',
							'گزارش مالیاتی'
						]
					},
					{
						group: 'داده و سیستم',
						items: ['پیش بینی', 'گزارشگری BI', 'اکسل پیشرفته و Copilot', 'پیاده سازی ERP']
					}
				],
				educationHeading: 'تحصیلات',
				education: [
					{ degree: 'کارشناسی ارشد حسابداری', school: 'دانشگاه آزاد اسلامی، تهران · ۲۰۱۳-۲۰۱۷' },
					{
						degree: 'کارشناسی حسابداری کاربردی',
						school: 'دانشگاه آزاد اسلامی، بیرجند · ۲۰۱۰-۲۰۱۳'
					},
					{ degree: 'کاردانی حسابداری بازرگانی', school: 'آموزشکده فنی بیرجند · ۲۰۰۸-۲۰۱۰' }
				],
				certsHeading: 'گواهی های AI',
				certs: [
					'The AI-Driven Accountant',
					'Generative AI in Finance & Accounting',
					'The Future of AI for Finance'
				],
				also: 'همچنین: گواهی شیرینی پزی حرفه ای · کمربند قهوه ای کاراته · CPR و کمک های اولیه · ۲۰ سال فعالیت در باشگاه ابومسلم.'
			},
			testimonial: {
				quote:
					'ذهنیت تحلیلی و توجه الی به جزئیات، فرایندهای مالی ما را متحول کرد و شفافیتی ساخت که برای رشد با اطمینان لازم داشتیم.',
				byline: 'مدیر عملیات'
			},
			contact: {
				kicker: '۰۴ - ارتباط',
				title: 'بیایید چیزی',
				accent: 'دقیق',
				body: 'آماده فرصت های شرکتی و Big Four؛ جایی که دقت حسابداری و استراتژی هوش مصنوعی به هم می رسند. خوشحال می شوم درباره کاری که می سازید بشنوم.',
				cta: 'همکاری با الی',
				email: 'ایمیل',
				phone: 'تلفن',
				location: 'موقعیت',
				linkedin: 'لینکدین',
				footer: 'حسابدار و متخصص فروش مجهز به AI'
			}
		}
	};

	const currentLocale = $derived(getLocale() as Locale);
	const c = $derived(copy[currentLocale]);
	const isFarsi = $derived(currentLocale === 'fa');
	const homeHref = $derived(resolve(localizeHref('/', { locale: currentLocale }) as Pathname));
	const pathWithoutLocale = $derived(page.url.pathname.replace(/^\/fa(?=\/|$)/, '') || '/');
	const languageHref = $derived(getLanguageHref(pathWithoutLocale, isFarsi));
	const resumeHref = resolve('/Elham_Aboutorabi_Resume.md' as Pathname);
	const navItems = $derived<Array<{ key: NavKey; label: string; href: string }>>([
		{ key: 'about', label: c.nav.about, href: '#about' },
		{ key: 'work', label: c.nav.work, href: '#work' },
		{ key: 'resume', label: c.nav.resume, href: '#resume' },
		{ key: 'contact', label: c.nav.contact, href: '#contact' }
	]);
	let theme = $state<'light' | 'dark'>('light');
	let themeIconActive = $state(false);
	let activeNavKey = $state<NavKey | null>(null);
	const isDark = $derived(theme === 'dark');

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
	const location = 'Dallas, TX';
	const linkedin = '/in/elham-aboutorabi';
	const linkedinUrl = 'https://www.linkedin.com/in/elham-aboutorabi/';
</script>

<svelte:head>
	<title>Elham "Eli" Aboutorabi | AI-Enabled Accountant</title>
	<meta
		name="description"
		content="Elham Aboutorabi is an AI-enabled accounting professional in Dallas, TX, blending full-cycle accounting, sales operations, data analysis and automation."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class:rtl={isFarsi} class:dark-theme={isDark} class="site-shell">
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
					{:else}
						<SmartphoneNfc size={17} strokeWidth={2.1} animate={activeNavKey === item.key} />
					{/if}
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="nav-actions">
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

	<section class="hero-section">
		<div class="hero-grid">
			<div class="hero-copy reveal">
				<h1>
					{c.hero.titleLead} <span class="hero-name">{c.hero.titleName}</span>{c.hero
						.titleNameSuffix}
					{c.hero.titleTail}
					<em dir="ltr">{c.hero.accent}</em><span class="terminal-mark">.</span>
				</h1>
				<p class="hero-intro">{c.hero.intro}</p>
				<div class="button-row">
					<a class="button hero-button button-primary" href="#work">
						<BriefcaseBusiness size={17} strokeWidth={2.1} animate={activeNavKey === 'work'} />
						<span>{c.hero.primary}</span>
					</a>
					<a class="button hero-button button-secondary" href="#resume">
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
					<p class="section-kicker">{c.about.kicker}</p>
					<p class="about-name">{c.about.name}</p>
					<h2>{c.about.title} <em>{c.about.accent}</em>.</h2>
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
						<div class="icon-shell">
							{#if card.icon === 'chart'}
								<svg viewBox="0 0 26 26" aria-hidden="true">
									<line x1="4" y1="22" x2="22" y2="22"></line>
									<rect x="5.5" y="13" width="3.6" height="7"></rect>
									<rect x="11.2" y="8" width="3.6" height="12"></rect>
									<rect x="16.9" y="4" width="3.6" height="16"></rect>
								</svg>
							{:else if card.icon === 'ai'}
								<strong>AI</strong>
							{:else}
								<svg viewBox="0 0 26 26" aria-hidden="true">
									<circle cx="13" cy="13" r="9"></circle>
									<circle cx="13" cy="13" r="4.6"></circle>
									<circle cx="13" cy="13" r="1.3"></circle>
								</svg>
							{/if}
						</div>
						<h3>{card.title}</h3>
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
					<p>{stat.value}<span>{stat.suffix}</span></p>
					<strong>{stat.label}</strong>
				</div>
			{/each}
		</div>
	</section>

	<section id="work" class="band band-cream bordered-band">
		<div class="wide-wrap">
			<div class="center-heading reveal">
				<p class="section-kicker">{c.work.kicker}</p>
				<h2>{c.work.title}</h2>
				<p>{c.work.intro}</p>
				<div class="mini-ornament" aria-hidden="true"><span></span><i></i><span></span></div>
			</div>

			<div class="portfolio-grid">
				{#each c.work.items as item (item.title)}
					<a
						class:featured-tile={item.featured}
						class:gold-tile={item.theme === 'gold'}
						class:dark-tile={item.theme === 'dark'}
						class="portfolio-tile reveal"
						href="#work"
					>
						<span class="tile-label">{item.label}</span>
						<div class="tile-scrim"></div>
						<div class="tile-copy">
							<small>{item.meta}</small>
							<h3>{item.title}</h3>
							{#if item.text}
								<p>{item.text}</p>
							{/if}
							<strong>{item.featured ? 'View Project' : 'View'} <span>-></span></strong>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<section id="resume" class="band band-warm">
		<div class="content-wrap">
			<div class="resume-heading reveal">
				<div>
					<p class="section-kicker">{c.resume.kicker}</p>
					<h2>{c.resume.titleLead} <em>{c.resume.accent}</em><br />{c.resume.titleTail}</h2>
				</div>
				<a class="button button-primary" href={resumeHref} download>
					{c.resume.download}<span>v</span>
				</a>
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

					<section class="cert-card">
						<h3>{c.resume.certsHeading}</h3>
						{#each c.resume.certs as cert (cert)}
							<p><span></span>{cert}</p>
						{/each}
						<small>{c.resume.also}</small>
					</section>
				</aside>
			</div>
		</div>
	</section>

	<section class="testimonial-band">
		<div class="testimonial reveal">
			<div aria-hidden="true">"</div>
			<blockquote>{c.testimonial.quote}</blockquote>
			<div class="mini-ornament" aria-hidden="true"><span></span><i></i><span></span></div>
			<p>{c.testimonial.byline}</p>
		</div>
	</section>

	<section id="contact" class="contact-band">
		<div class="contact-wrap">
			<div class="contact-copy reveal">
				<p class="section-kicker">{c.contact.kicker}</p>
				<h2>{c.contact.title}<br /><em>{c.contact.accent}</em>.</h2>
				<p>{c.contact.body}</p>
				<a class="button contact-button" href={`mailto:${email}`}>{c.contact.cta}<span>-></span></a>
			</div>

			<div class="contact-grid reveal">
				<div>
					<p>{c.contact.email}</p>
					<a href={`mailto:${email}`}>{email}</a>
				</div>
				<div>
					<p>{c.contact.phone}</p>
					<span>{phone}</span>
				</div>
				<div>
					<p>{c.contact.location}</p>
					<span>{location}</span>
				</div>
				<div>
					<p>{c.contact.linkedin}</p>
					<a href={linkedinUrl} target="_blank" rel="noreferrer">{linkedin}</a>
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
