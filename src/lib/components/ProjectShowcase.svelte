<script lang="ts">
	import { BadgeCheck, SquareArrowOutUpRight } from '@jis3r/icons';
	import GithubMark from './GithubMark.svelte';
	import type { Project, ProjectLabels } from '$lib/types/project';

	let {
		project,
		labels,
		flipped = false
	}: { project: Project; labels: ProjectLabels; flipped?: boolean } = $props();

	const media = $derived(project.media);

	// --- Self-hosted recording -------------------------------------------------

	let videoEl = $state<HTMLVideoElement | null>(null);
	let videoPlaying = $state(false);
	// Once the visitor uses the play/pause control, scrolling no longer overrides them.
	let videoManual = $state(false);

	// The recording only downloads once it scrolls into view, and never when the
	// visitor asked for reduced motion.
	$effect(() => {
		const video = videoEl;

		if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (videoManual) {
					return;
				}

				for (const entry of entries) {
					if (entry.isIntersecting) {
						void video.play().catch(() => {});
					} else {
						video.pause();
					}
				}
			},
			{ threshold: 0.3 }
		);

		observer.observe(video);

		return () => observer.disconnect();
	});

	function toggleVideo() {
		const video = videoEl;

		if (!video) {
			return;
		}

		videoManual = true;

		if (video.paused) {
			void video.play().catch(() => {});
		} else {
			video.pause();
		}
	}

	// --- YouTube -------------------------------------------------------------

	// The poster stands in for the player until it is asked for, so YouTube is
	// only contacted once the visitor presses play.
	let youTubeStarted = $state(false);

	const youTubeEmbed = $derived(
		media?.kind === 'youtube'
			? `https://www.youtube-nocookie.com/embed/${media.id}?autoplay=1&rel=0`
			: ''
	);
	const youTubeWatch = $derived(media?.kind === 'youtube' ? `https://youtu.be/${media.id}` : '');
</script>

<article class="project-card project-feature reveal" class:flipped>
	{#if media}
		<div class="feature-media">
			<div class="media-chrome">
				<span class="chrome-dots" aria-hidden="true"><i></i><i></i><i></i></span>
				<span class="chrome-url" dir="ltr">{media.label}</span>

				{#if media.kind === 'video'}
					<button
						class="chrome-toggle"
						type="button"
						aria-label={videoPlaying ? labels.pause : labels.play}
						onclick={toggleVideo}
					>
						{#if videoPlaying}
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<rect x="7" y="5" width="3.4" height="14" rx="1.2" />
								<rect x="13.6" y="5" width="3.4" height="14" rx="1.2" />
							</svg>
						{:else}
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="M8 5.4 18.4 12 8 18.6Z" />
							</svg>
						{/if}
					</button>
				{:else}
					<a
						class="chrome-link"
						href={youTubeWatch}
						target="_blank"
						rel="noreferrer"
						aria-label={media.watch}
					>
						<SquareArrowOutUpRight size={13} strokeWidth={2.1} animate={false} />
					</a>
				{/if}
			</div>

			<div class="media-well">
				{#if media.kind === 'video'}
					<a
						class="media-stage"
						href={project.liveUrl}
						target="_blank"
						rel="noreferrer"
						aria-label={media.open}
					>
						<video
							bind:this={videoEl}
							class="media-frame"
							poster={media.poster}
							aria-label={media.alt}
							width="900"
							height="516"
							preload="none"
							playsinline
							muted
							loop
							onplay={() => (videoPlaying = true)}
							onpause={() => (videoPlaying = false)}
						>
							<source src={media.video} type="video/mp4" />
						</video>
						<div class="media-hint">
							<SquareArrowOutUpRight size={14} strokeWidth={2.1} animate={false} />
							<span>{project.liveLabel}</span>
						</div>
					</a>
				{:else if youTubeStarted}
					<div class="media-stage">
						<iframe
							class="media-frame"
							src={youTubeEmbed}
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
						onclick={() => (youTubeStarted = true)}
					>
						<img class="media-frame" src={media.poster} alt={media.title} loading="lazy" />
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

	<div class="feature-copy">
		<div class="project-meta">
			<span class="project-index" aria-hidden="true">{project.index}</span>
			<small>{project.meta}</small>
		</div>
		<h3>{project.title}</h3>
		<p class="project-subtitle">{project.subtitle}</p>
		<p class="feature-lede">{project.text}</p>

		<ul class="feature-points">
			{#each project.points as point (point)}
				<li>
					<BadgeCheck size={16} strokeWidth={2.1} animate={false} />
					<span>{point}</span>
				</li>
			{/each}
		</ul>

		<div class="project-tags">
			{#each project.tags as tag (tag)}
				<span>{tag}</span>
			{/each}
		</div>

		<div class="project-actions">
			<a
				class="button project-button button-primary"
				href={project.liveUrl}
				target="_blank"
				rel="noreferrer"
			>
				<SquareArrowOutUpRight size={16} strokeWidth={2.1} animate={false} />
				<span>{project.liveLabel}</span>
			</a>
			<a
				class="button project-button button-secondary"
				href={project.sourceUrl}
				target="_blank"
				rel="noreferrer"
			>
				<GithubMark class="project-brand-icon" />
				<span>{project.sourceLabel}</span>
			</a>
		</div>

		{#if project.note}
			<p class="project-note">{project.note}</p>
		{/if}
	</div>
</article>
