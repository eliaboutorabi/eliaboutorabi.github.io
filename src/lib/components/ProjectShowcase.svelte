<script lang="ts">
	import { BadgeCheck, SquareArrowOutUpRight } from '@jis3r/icons';
	import GithubMark from './GithubMark.svelte';
	import type { Project } from '$lib/types/project';

	let { project, flipped = false }: { project: Project; flipped?: boolean } = $props();

	const media = $derived(project.media);

	// The poster stands in for the player until it is asked for, so YouTube is
	// only contacted once the visitor presses play.
	let started = $state(false);

	const embedUrl = $derived(
		media ? `https://www.youtube-nocookie.com/embed/${media.id}?autoplay=1&rel=0` : ''
	);
	const watchUrl = $derived(media ? `https://youtu.be/${media.id}` : '');
</script>

<article class="project-card project-feature reveal" class:flipped>
	{#if media}
		<div class="feature-media">
			<div class="media-chrome">
				<span class="chrome-dots" aria-hidden="true"><i></i><i></i><i></i></span>
				<span class="chrome-url" dir="ltr">{media.label}</span>
				<a
					class="chrome-link"
					href={watchUrl}
					target="_blank"
					rel="noreferrer"
					aria-label={media.watch}
				>
					<SquareArrowOutUpRight size={13} strokeWidth={2.1} animate={false} />
				</a>
			</div>

			<div class="media-well">
				{#if started}
					<div class="media-stage">
						<iframe
							class="media-frame"
							src={embedUrl}
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
						onclick={() => (started = true)}
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
