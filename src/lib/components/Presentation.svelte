<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import {
		Award,
		BadgeCheck,
		BookOpenCheck,
		BrainCog,
		BriefcaseBusiness,
		ChartColumnIncreasing,
		ChartNoAxesCombined,
		ChevronLeft,
		ChevronRight,
		FileText,
		HandHeart,
		MailCheck,
		MapPinCheck,
		Maximize,
		MessageSquareQuote,
		Minimize,
		SmartphoneNfc,
		SquareArrowOutUpRight,
		Telescope,
		UserRound,
		X
	} from '@jis3r/icons';
	import GithubMark from './GithubMark.svelte';
	import LinkedinMark from './LinkedinMark.svelte';
	import type { Copy } from '$lib/types/copy';
	import type { Project } from '$lib/types/project';
	import './presentation.css';

	type Slide =
		| {
				id: string;
				kind:
					| 'cover'
					| 'about'
					| 'values'
					| 'numbers'
					| 'work'
					| 'experience'
					| 'skills'
					| 'credentials'
					| 'testimonial'
					| 'contact';
				label: string;
		  }
		| { id: string; kind: 'project'; label: string; project: Project };

	type FullscreenDocument = Document & {
		webkitFullscreenElement?: Element | null;
		webkitFullscreenEnabled?: boolean;
		webkitExitFullscreen?: () => Promise<void> | void;
	};
	type FullscreenElement = HTMLElement & {
		webkitRequestFullscreen?: () => Promise<void> | void;
	};

	let {
		copy: c,
		isFarsi,
		email,
		phone,
		phoneDisplay,
		location,
		linkedin,
		linkedinUrl,
		github,
		githubUrl,
		onclose
	}: {
		copy: Copy;
		isFarsi: boolean;
		email: string;
		phone: string;
		phoneDisplay: string;
		location: string;
		linkedin: string;
		linkedinUrl: string;
		github: string;
		githubUrl: string;
		onclose: () => void;
	} = $props();

	// Every slide is laid out on a fixed 16:9 canvas and the canvas is scaled to
	// the screen, so the composition is identical on a laptop and a projector.
	const STAGE_WIDTH = 1600;
	const STAGE_HEIGHT = 900;
	const IDLE_AFTER = 2600;
	const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

	const slides = $derived<Slide[]>([
		{ id: 'cover', kind: 'cover', label: c.hero.eyebrow },
		{ id: 'about', kind: 'about', label: c.about.kicker },
		{ id: 'values', kind: 'values', label: c.deck.principles },
		{ id: 'numbers', kind: 'numbers', label: c.deck.highlights },
		{ id: 'work', kind: 'work', label: c.work.title },
		...c.work.projects.map((project) => ({
			id: `project-${project.id}`,
			kind: 'project' as const,
			label: project.title,
			project
		})),
		{ id: 'experience', kind: 'experience', label: c.resume.experienceHeading },
		{ id: 'skills', kind: 'skills', label: c.deck.toolkit },
		{ id: 'credentials', kind: 'credentials', label: c.deck.credentials },
		{ id: 'testimonial', kind: 'testimonial', label: c.deck.testimonial },
		{ id: 'contact', kind: 'contact', label: c.contact.kicker }
	]);
	const count = $derived(slides.length);

	let index = $state(0);
	let ready = $state(false);
	let scale = $state(1);
	let idle = $state(false);
	let fullscreen = $state(false);
	let fullscreenAvailable = $state(false);
	let playing = $state<string | null>(null);
	let hovered = $state<string | null>(null);
	let statValues = $state<string[]>([]);
	let deckEl = $state<HTMLDivElement>();

	let idleTimer: ReturnType<typeof setTimeout> | undefined;
	let swipeStart: { x: number; y: number } | null = null;

	const current = $derived(slides[index]);
	const tone = $derived(current.kind === 'contact' ? 'ink' : 'cream');
	const counter = $derived(`${pad(index + 1)} / ${pad(count)}`);
	const progress = $derived(((index + 1) / count) * 100);

	function digits(text: string) {
		return isFarsi ? text.replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]) : text;
	}

	function pad(n: number) {
		return digits(String(n).padStart(2, '0'));
	}

	function go(target: number) {
		const next = Math.max(0, Math.min(count - 1, target));
		if (next === index) return;
		index = next;
		// A walkthrough left playing on a slide we just left should not keep talking.
		playing = null;
		wake();
	}

	const next = () => go(index + 1);
	const previous = () => go(index - 1);

	function wake() {
		idle = false;
		clearTimeout(idleTimer);
		idleTimer = setTimeout(() => (idle = true), IDLE_AFTER);
	}

	function isFullscreen() {
		const doc = document as FullscreenDocument;
		return Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement);
	}

	async function enterFullscreen() {
		const el = deckEl as FullscreenElement | undefined;
		if (!el) return;
		try {
			if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' });
			else await el.webkitRequestFullscreen?.();
		} catch {
			// The deck already fills the window; a refusal changes nothing.
		}
	}

	async function exitFullscreen() {
		const doc = document as FullscreenDocument;
		try {
			if (doc.exitFullscreen) await doc.exitFullscreen();
			else await doc.webkitExitFullscreen?.();
		} catch {
			// Already out of fullscreen.
		}
	}

	function toggleFullscreen() {
		if (isFullscreen()) void exitFullscreen();
		else void enterFullscreen();
	}

	function syncFullscreen() {
		fullscreen = isFullscreen();
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
		// A held key should not race through the deck.
		if (event.repeat) return;
		const target = event.target instanceof Element ? event.target : null;
		const onControl = Boolean(
			target?.closest('button, a, input, textarea, select, iframe, [contenteditable]')
		);
		// The deck reads in the page's direction, so the arrows follow it too.
		const forward = isFarsi ? 'ArrowLeft' : 'ArrowRight';
		const backward = isFarsi ? 'ArrowRight' : 'ArrowLeft';

		const key = event.code === 'Space' ? ' ' : event.key;
		switch (key) {
			case ' ':
			case 'Enter':
				if (onControl) return;
				event.preventDefault();
				if (event.shiftKey) previous();
				else next();
				return;
			case forward:
			case 'ArrowDown':
			case 'PageDown':
				event.preventDefault();
				next();
				return;
			case backward:
			case 'ArrowUp':
			case 'PageUp':
				event.preventDefault();
				previous();
				return;
			case 'Backspace':
				if (onControl) return;
				event.preventDefault();
				previous();
				return;
			case 'Home':
				event.preventDefault();
				go(0);
				return;
			case 'End':
				event.preventDefault();
				go(count - 1);
				return;
			case 'f':
			case 'F':
				if (onControl) return;
				event.preventDefault();
				toggleFullscreen();
				return;
			case 'Escape':
				event.preventDefault();
				// One Escape leaves fullscreen, the next leaves the deck.
				if (isFullscreen()) void exitFullscreen();
				else onclose();
				return;
		}
	}

	function onPointerDown(event: PointerEvent) {
		if (event.pointerType === 'mouse') return;
		swipeStart = { x: event.clientX, y: event.clientY };
	}

	function onPointerUp(event: PointerEvent) {
		if (!swipeStart) return;
		const dx = event.clientX - swipeStart.x;
		const dy = event.clientY - swipeStart.y;
		swipeStart = null;
		if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
		const forward = isFarsi ? dx > 0 : dx < 0;
		if (forward) next();
		else previous();
	}

	function parseStat(value: string) {
		const latin = value.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));
		return Number(latin.replace(/\D/g, '')) || 0;
	}

	function formatStat(n: number, like: string) {
		const grouped = like.includes(',') ? n.toLocaleString('en-US') : String(n);
		return /[۰-۹]/.test(like) ? grouped.replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]) : grouped;
	}

	// The figures count up each time the numbers slide arrives.
	$effect(() => {
		const stats = c.stats;
		if (current.kind !== 'numbers') {
			statValues = stats.map((stat) => formatStat(0, stat.value));
			return;
		}
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			statValues = stats.map((stat) => stat.value);
			return;
		}
		const targets = stats.map((stat) => parseStat(stat.value));
		const duration = 1600;
		let start = 0;
		let frame = 0;
		const tick = (now: number) => {
			if (!start) start = now;
			const t = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - t, 4);
			statValues = stats.map((stat, i) => formatStat(Math.round(targets[i] * eased), stat.value));
			if (t < 1) frame = requestAnimationFrame(tick);
		};
		const timer = setTimeout(() => (frame = requestAnimationFrame(tick)), 420);
		return () => {
			clearTimeout(timer);
			cancelAnimationFrame(frame);
		};
	});

	onMount(() => {
		const el = deckEl;
		if (!el) return;
		const doc = document as FullscreenDocument;
		fullscreenAvailable = Boolean(document.fullscreenEnabled || doc.webkitFullscreenEnabled);

		const previousOverflow = document.documentElement.style.overflow;
		document.documentElement.style.overflow = 'hidden';

		const observer = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			scale = Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT);
		});
		observer.observe(el);

		document.addEventListener('fullscreenchange', syncFullscreen);
		document.addEventListener('webkitfullscreenchange', syncFullscreen);

		el.focus({ preventScroll: true });
		wake();

		// Two frames in, so the first slide's arrival is a transition rather than a jump.
		let frame = requestAnimationFrame(() => {
			frame = requestAnimationFrame(() => (ready = true));
		});

		return () => {
			cancelAnimationFrame(frame);
			clearTimeout(idleTimer);
			observer.disconnect();
			document.removeEventListener('fullscreenchange', syncFullscreen);
			document.removeEventListener('webkitfullscreenchange', syncFullscreen);
			document.documentElement.style.overflow = previousOverflow;
			if (isFullscreen()) void exitFullscreen();
		};
	});
</script>

<svelte:window onkeydown={onKeydown} />

<div
	class="deck"
	class:is-idle={idle}
	class:tone-ink={tone === 'ink'}
	style="--deck-scale: {scale}"
	role="dialog"
	aria-modal="true"
	aria-label={c.deck.label}
	tabindex="-1"
	bind:this={deckEl}
	transition:fade={{ duration: 360 }}
	onpointermove={wake}
	onpointerdown={onPointerDown}
	onpointerup={onPointerUp}
>
	<div class="deck-stage">
		{#each slides as slide, i (slide.id)}
			<section
				class="deck-slide deck-slide-{slide.kind}"
				class:is-active={ready && i === index}
				class:is-past={i < index}
				class:is-future={i > index || (!ready && i === index)}
				inert={i !== index}
				aria-hidden={i !== index}
				aria-roledescription="slide"
				aria-label="{digits(String(i + 1))} · {slide.label}"
			>
				{#if slide.kind === 'cover'}
					<div class="deck-cover">
						<div class="deck-cover-copy">
							<div class="section-kicker deck-rise" style="--i: 0">
								<MapPinCheck size={20} strokeWidth={2.1} animate={false} />
								<span>{c.hero.status}</span>
							</div>
							<h1 class="deck-hero deck-rise" style="--i: 1">
								<span class="deck-hero-line">
									{c.hero.titleLead} <span class="hero-name">{c.hero.titleName}</span>{c.hero
										.titleNameSuffix}{isFarsi && c.hero.titleTail ? ` ${c.hero.titleTail}` : ''}
								</span>
								<span class="deck-hero-role">
									{isFarsi ? '' : `${c.hero.titleTail} `}<em>{c.hero.accent}</em>{#if !isFarsi}<span
											class="terminal-mark">.</span
										>{/if}
								</span>
							</h1>
							<p class="deck-lede deck-rise" style="--i: 2">{c.hero.intro}</p>
							<div class="deck-keys deck-rise" style="--i: 3" aria-hidden="true">
								<span><kbd>Space</kbd><kbd>{isFarsi ? '←' : '→'}</kbd>{c.deck.next}</span>
								<span><kbd>F</kbd>{c.deck.fullscreen}</span>
								<span><kbd>Esc</kbd>{c.deck.exit}</span>
							</div>
						</div>
						<figure class="deck-portrait deck-rise" style="--i: 1">
							<span class="deck-portrait-halo" aria-hidden="true"></span>
							<img src="/hero_headshot.png" alt={c.hero.eyebrow} />
						</figure>
					</div>
				{:else if slide.kind === 'about'}
					<div class="deck-head deck-rise" style="--i: 0">
						<div class="section-kicker">
							<UserRound size={20} strokeWidth={2.1} animate={false} />
							<span>{c.about.kicker}</span>
						</div>
						<p class="about-name">{c.about.name}</p>
					</div>
					<div class="deck-split">
						<h2 class="deck-title deck-rise" style="--i: 1">
							{c.about.title}<br /><em>{c.about.accent}</em>
						</h2>
						<div class="deck-body">
							{#each c.about.body as paragraph, j (paragraph)}
								<p class="deck-rise" style="--i: {j + 2}">{paragraph}</p>
							{/each}
						</div>
					</div>
				{:else if slide.kind === 'values'}
					<div class="deck-head deck-rise" style="--i: 0">
						<div class="section-kicker">
							<UserRound size={20} strokeWidth={2.1} animate={false} />
							<span>{c.deck.principles}</span>
						</div>
						<h2 class="deck-title">{c.deck.principlesTitle}</h2>
					</div>
					<div class="deck-values">
						{#each c.about.cards as card, j (card.title)}
							<article class="deck-value deck-rise" style="--i: {j + 1}">
								<div class="icon-shell">
									{#if card.icon === 'decisions'}
										<ChartNoAxesCombined size={30} strokeWidth={1.8} animate={false} />
									{:else if card.icon === 'ai'}
										<BrainCog size={30} strokeWidth={1.8} animate={false} />
									{:else}
										<ChartColumnIncreasing size={30} strokeWidth={1.8} animate={false} />
									{/if}
								</div>
								<h3>{card.title}</h3>
								<p>{card.text}</p>
							</article>
						{/each}
					</div>
				{:else if slide.kind === 'numbers'}
					<div class="deck-head deck-head-center deck-rise" style="--i: 0">
						<div class="section-kicker">
							<ChartColumnIncreasing size={20} strokeWidth={2.1} animate={false} />
							<span>{c.deck.highlights}</span>
						</div>
					</div>
					<div class="deck-stats">
						{#each c.stats as stat, j (stat.label)}
							<div class="deck-stat deck-rise" style="--i: {j + 1}">
								<p class="stat-value">
									{#if isFarsi}
										<span class="stat-suffix">{stat.suffix === '%' ? '٪' : stat.suffix}</span><span
											class="stat-number">{statValues[j] ?? stat.value}</span
										>
									{:else}
										<span class="stat-number">{statValues[j] ?? stat.value}</span><span
											class="stat-suffix">{stat.suffix}</span
										>
									{/if}
								</p>
								<strong>{stat.label}</strong>
							</div>
						{/each}
					</div>
					<div class="ornament deck-rise" style="--i: 5" aria-hidden="true">
						<span></span><i></i><b></b><i></i><span></span>
					</div>
				{:else if slide.kind === 'work'}
					<div class="deck-center">
						<div class="section-kicker deck-rise" style="--i: 0">
							<BriefcaseBusiness size={20} strokeWidth={2.1} animate={false} />
							<span>{c.work.kicker}</span>
						</div>
						<h2 class="deck-title deck-display deck-rise" style="--i: 1">{c.work.title}</h2>
						<p class="deck-lede deck-rise" style="--i: 2">{c.work.intro}</p>
						<div class="mini-ornament deck-rise" style="--i: 3" aria-hidden="true">
							<span></span><i></i><span></span>
						</div>
						<ol class="deck-index deck-rise" style="--i: 4">
							{#each c.work.projects as project (project.id)}
								<li>
									<span class="project-index" aria-hidden="true">{project.index}</span>
									<strong>{project.title}</strong>
									<small>{project.meta}</small>
								</li>
							{/each}
						</ol>
						<p class="deck-upcoming deck-rise" style="--i: 5">
							<Telescope size={17} strokeWidth={2.1} animate={false} />
							<span>{c.work.upcoming}</span>
						</p>
					</div>
				{:else if slide.kind === 'project'}
					{@const project = slide.project}
					{@const media = project.media}
					<div class="deck-project">
						{#if media}
							<div class="deck-plate deck-rise" style="--i: 1">
								<div class="media-chrome">
									<span class="chrome-dots" aria-hidden="true"><i></i><i></i><i></i></span>
									<span class="chrome-url" dir="ltr">{media.label}</span>
									<a
										class="chrome-link"
										href="https://youtu.be/{media.id}"
										target="_blank"
										rel="noreferrer"
										aria-label={media.watch}
									>
										<SquareArrowOutUpRight size={13} strokeWidth={2.1} animate={false} />
									</a>
								</div>
								<div class="deck-media-well">
									{#if playing === project.id}
										<div class="media-stage">
											<iframe
												class="media-frame"
												src="https://www.youtube-nocookie.com/embed/{media.id}?autoplay=1&rel=0"
												title={media.title}
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												referrerpolicy="strict-origin-when-cross-origin"
												allowfullscreen
											></iframe>
										</div>
									{:else}
										<button
											class="media-stage video-facade"
											type="button"
											aria-label={media.play}
											onclick={() => (playing = project.id)}
										>
											<img class="media-frame" src={media.poster} alt={media.title} />
											<span class="facade-scrim"></span>
											<span class="facade-play" aria-hidden="true">
												<svg viewBox="0 0 24 24"><path d="M8 5.4 18.4 12 8 18.6Z" /></svg>
											</span>
											<span class="facade-caption">{media.title}</span>
										</button>
									{/if}
								</div>
								<div class="feature-figures">
									{#each project.figures as figure (figure.label)}
										<div>
											<strong>{figure.value}</strong>
											<span>{figure.label}</span>
										</div>
									{/each}
								</div>
							</div>
						{/if}
						<div class="deck-project-copy">
							<div class="project-meta deck-rise" style="--i: 0">
								<span class="project-index" aria-hidden="true">{project.index}</span>
								<small class="deck-meta">{project.meta}</small>
							</div>
							<h3 class="deck-project-title deck-rise" style="--i: 1">{project.title}</h3>
							<p class="deck-project-subtitle deck-rise" style="--i: 2">{project.subtitle}</p>
							<p class="deck-project-lede deck-rise" style="--i: 3">{project.text}</p>
							<ul class="feature-points deck-points">
								{#each project.points as point, j (point)}
									<li class="deck-rise" style="--i: {j + 4}">
										<BadgeCheck size={16} strokeWidth={2.1} animate={false} />
										<span>{point}</span>
									</li>
								{/each}
							</ul>
							<div class="project-tags deck-rise" style="--i: 8">
								{#each project.tags as tag (tag)}
									<span>{tag}</span>
								{/each}
							</div>
							<div class="deck-links deck-rise" style="--i: 9">
								<a
									class="deck-link deck-link-primary"
									href={project.liveUrl}
									target="_blank"
									rel="noreferrer"
									onmouseenter={() => (hovered = `${project.id}-live`)}
									onmouseleave={() => (hovered = null)}
								>
									<SquareArrowOutUpRight
										size={14}
										strokeWidth={2.1}
										animate={hovered === `${project.id}-live`}
									/>
									<span>{project.liveLabel}</span>
								</a>
								<a class="deck-link" href={project.sourceUrl} target="_blank" rel="noreferrer">
									<GithubMark class="deck-link-icon" />
									<span>{project.sourceLabel}</span>
								</a>
							</div>
						</div>
					</div>
				{:else if slide.kind === 'experience'}
					<div class="deck-head deck-rise" style="--i: 0">
						<div class="section-kicker">
							<FileText size={20} strokeWidth={2.1} animate={false} />
							<span>{c.resume.kicker}</span>
						</div>
						<h2 class="deck-title">{c.resume.titleLead}</h2>
					</div>
					<ol class="deck-timeline">
						{#each c.resume.experience as job, j (job.role)}
							<li class="deck-rise" style="--i: {j + 1}">
								<span class="deck-timeline-dot" aria-hidden="true"></span>
								<time>{job.period}</time>
								<h4>{job.role}</h4>
								<p class="deck-place">{job.place}</p>
								<p>{job.text}</p>
							</li>
						{/each}
					</ol>
				{:else if slide.kind === 'skills'}
					<div class="deck-head deck-rise" style="--i: 0">
						<div class="section-kicker">
							<FileText size={20} strokeWidth={2.1} animate={false} />
							<span>{c.resume.kicker}</span>
						</div>
						<h2 class="deck-title">{c.deck.toolkit}</h2>
					</div>
					<div class="deck-columns">
						<section>
							<h3 class="deck-label deck-rise" style="--i: 1">{c.resume.skillsHeading}</h3>
							{#each c.resume.skills as skillGroup, j (skillGroup.group)}
								<div class="skill-group deck-skill-group deck-rise" style="--i: {j + 2}">
									<p>{skillGroup.group}</p>
									<div>
										{#each skillGroup.items as item (item)}
											<span>{item}</span>
										{/each}
									</div>
								</div>
							{/each}
						</section>
						<section>
							<h3 class="deck-label deck-rise" style="--i: 2">{c.resume.educationHeading}</h3>
							<div class="education-list deck-education">
								{#each c.resume.education as edu, j (edu.degree)}
									<article class="deck-rise" style="--i: {j + 3}">
										<span></span>
										<div>
											<h4>{edu.degree}</h4>
											<p>{edu.school}</p>
										</div>
									</article>
								{/each}
							</div>
						</section>
					</div>
				{:else if slide.kind === 'credentials'}
					<div class="deck-head deck-rise" style="--i: 0">
						<div class="section-kicker">
							<Award size={20} strokeWidth={2.1} animate={false} />
							<span>{c.resume.kicker}</span>
						</div>
						<h2 class="deck-title">{c.deck.credentials}</h2>
					</div>
					<div class="deck-columns deck-credentials">
						<section>
							<div class="credential-heading deck-rise" style="--i: 1">
								<Award size={22} strokeWidth={2} animate={false} />
								<h3>{c.resume.certsHeading}</h3>
							</div>
							<div class="deck-cred-list">
								{#each c.resume.certs as cert, j (cert)}
									<div class="credential-list-item deck-rise" style="--i: {j + 2}">
										<BadgeCheck size={18} strokeWidth={2.1} animate={false} />
										<span>{cert}</span>
									</div>
								{/each}
							</div>
						</section>
						<section>
							<div class="credential-heading deck-rise" style="--i: 2">
								<BookOpenCheck size={22} strokeWidth={2} animate={false} />
								<h3>{c.resume.alsoHeading}</h3>
							</div>
							<div class="deck-cred-list">
								{#each c.resume.also as item, j (item)}
									<div class="credential-list-item deck-rise" style="--i: {j + 3}">
										<BadgeCheck size={18} strokeWidth={2.1} animate={false} />
										<span>{item}</span>
									</div>
								{/each}
							</div>
						</section>
					</div>
				{:else if slide.kind === 'testimonial'}
					<div class="deck-center deck-quote">
						<div class="deck-quote-mark deck-rise" style="--i: 0" aria-hidden="true">
							<MessageSquareQuote size={44} strokeWidth={1.6} animate={false} />
						</div>
						<blockquote class="deck-rise" style="--i: 1">{c.testimonial.quote}</blockquote>
						<div class="mini-ornament deck-rise" style="--i: 2" aria-hidden="true">
							<span></span><i></i><span></span>
						</div>
						<p class="deck-byline deck-rise" style="--i: 3">{c.testimonial.byline}</p>
					</div>
				{:else if slide.kind === 'contact'}
					<div class="deck-contact">
						<div class="deck-center">
							<div class="section-kicker deck-rise" style="--i: 0">
								<SmartphoneNfc size={20} strokeWidth={2.1} animate={false} />
								<span>{c.contact.kicker}</span>
							</div>
							<h2 class="deck-title deck-rise" style="--i: 1">{c.contact.title}</h2>
							<p class="deck-lede deck-rise" style="--i: 2">{c.contact.body}</p>
							<a
								class="button contact-button deck-cta deck-rise"
								style="--i: 3"
								href="mailto:{email}"
								onmouseenter={() => (hovered = 'cta')}
								onmouseleave={() => (hovered = null)}
							>
								<HandHeart size={17} strokeWidth={2.1} animate={hovered === 'cta'} />
								<span>{c.contact.cta}</span>
							</a>
						</div>
						<div class="deck-contact-grid deck-rise" style="--i: 4">
							<div>
								<div class="contact-label">
									<MailCheck size={14} strokeWidth={2.1} animate={false} />
									<span>{c.contact.email}</span>
								</div>
								<a href="mailto:{email}">{email}</a>
							</div>
							<div>
								<div class="contact-label">
									<SmartphoneNfc size={14} strokeWidth={2.1} animate={false} />
									<span>{c.contact.phone}</span>
								</div>
								<a
									class="phone-display"
									dir={isFarsi ? 'ltr' : undefined}
									href="tel:{phone.replace(/[^+\d]/g, '')}"
								>
									{phoneDisplay}
								</a>
							</div>
							<div>
								<div class="contact-label">
									<MapPinCheck size={14} strokeWidth={2.1} animate={false} />
									<span>{c.contact.location}</span>
								</div>
								<span>{location}</span>
							</div>
							<div>
								<div class="contact-label">
									<LinkedinMark class="linkedin-icon" />
									<span>{c.contact.linkedin}</span>
								</div>
								<a href={linkedinUrl} target="_blank" rel="noreferrer">{linkedin}</a>
							</div>
							<div>
								<div class="contact-label">
									<GithubMark class="github-icon" />
									<span>{c.contact.github}</span>
								</div>
								<a href={githubUrl} target="_blank" rel="noreferrer">{github}</a>
							</div>
						</div>
						<div class="deck-footer deck-rise" style="--i: 5">
							<p class="deck-script">Eli</p>
							<strong>{c.contact.footer}</strong>
						</div>
					</div>
				{/if}

				{#if slide.kind !== 'cover' && slide.kind !== 'contact'}
					<span class="deck-folio" aria-hidden="true">{pad(i + 1)}</span>
				{/if}
			</section>
		{/each}
	</div>

	<header class="deck-ui deck-chrome">
		<div class="deck-mark" aria-hidden="true">
			<span>Eli</span>
			<small>{c.deck.label}</small>
		</div>
		<button
			class="deck-btn deck-close"
			type="button"
			aria-label={c.deck.close}
			title={c.deck.close}
			onclick={onclose}
			onmouseenter={() => (hovered = 'close')}
			onmouseleave={() => (hovered = null)}
		>
			<X size={16} strokeWidth={2.2} animate={hovered === 'close'} />
			<kbd>Esc</kbd>
		</button>
	</header>

	<footer class="deck-ui deck-bar">
		<div class="deck-counter" aria-live="polite">{counter}</div>
		<div class="deck-dots">
			{#each slides as slide, i (slide.id)}
				<button
					type="button"
					class:is-current={i === index}
					aria-label="{digits(String(i + 1))} · {slide.label}"
					aria-current={i === index ? 'true' : undefined}
					onclick={() => go(i)}
				></button>
			{/each}
		</div>
		<div class="deck-actions">
			<button
				class="deck-btn"
				type="button"
				aria-label={c.deck.previous}
				title={c.deck.previous}
				disabled={index === 0}
				onclick={previous}
				onmouseenter={() => (hovered = 'previous')}
				onmouseleave={() => (hovered = null)}
			>
				{#if isFarsi}
					<ChevronRight size={18} strokeWidth={2.2} animate={hovered === 'previous'} />
				{:else}
					<ChevronLeft size={18} strokeWidth={2.2} animate={hovered === 'previous'} />
				{/if}
			</button>
			<button
				class="deck-btn"
				type="button"
				aria-label={c.deck.next}
				title={c.deck.next}
				disabled={index === count - 1}
				onclick={next}
				onmouseenter={() => (hovered = 'next')}
				onmouseleave={() => (hovered = null)}
			>
				{#if isFarsi}
					<ChevronLeft size={18} strokeWidth={2.2} animate={hovered === 'next'} />
				{:else}
					<ChevronRight size={18} strokeWidth={2.2} animate={hovered === 'next'} />
				{/if}
			</button>
			{#if fullscreenAvailable}
				<button
					class="deck-btn deck-fullscreen"
					type="button"
					aria-label={fullscreen ? c.deck.exitFullscreen : c.deck.fullscreen}
					title={fullscreen ? c.deck.exitFullscreen : c.deck.fullscreen}
					aria-pressed={fullscreen}
					onclick={toggleFullscreen}
					onmouseenter={() => (hovered = 'fullscreen')}
					onmouseleave={() => (hovered = null)}
				>
					{#if fullscreen}
						<Minimize size={16} strokeWidth={2.2} animate={hovered === 'fullscreen'} />
					{:else}
						<Maximize size={16} strokeWidth={2.2} animate={hovered === 'fullscreen'} />
					{/if}
				</button>
			{/if}
		</div>
	</footer>

	<div class="deck-progress" style="--deck-progress: {progress}%" aria-hidden="true"></div>
</div>
