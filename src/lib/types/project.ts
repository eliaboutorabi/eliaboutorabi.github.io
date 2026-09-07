/** A portfolio project and the media that introduces it. */

/**
 * A YouTube video shown as a poster until the visitor asks for it, so nothing
 * is requested from YouTube unless they press play.
 */
export type ProjectMedia = {
	kind: 'youtube';
	/** Shown in the frame's title bar. */
	label: string;
	id: string;
	poster: string;
	title: string;
	play: string;
	watch: string;
};

export type Project = {
	id: string;
	index: string;
	meta: string;
	title: string;
	subtitle: string;
	text: string;
	points: string[];
	figures: Array<{ value: string; label: string }>;
	tags: string[];
	liveUrl: string;
	liveLabel: string;
	sourceUrl: string;
	sourceLabel: string;
	/** Optional caveat shown under the actions, e.g. an invite-only sign-up. */
	note?: string;
	media?: ProjectMedia;
};
