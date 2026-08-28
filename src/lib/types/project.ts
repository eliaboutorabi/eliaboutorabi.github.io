/** A portfolio project and the media that introduces it. */

/** A self-hosted screen recording that plays inline once it scrolls into view. */
export type VideoMedia = {
	kind: 'video';
	/** Shown in the frame's title bar, usually the host the recording was taken from. */
	label: string;
	video: string;
	poster: string;
	alt: string;
	open: string;
};

/**
 * A YouTube video shown as a poster until the visitor asks for it, so nothing
 * is requested from YouTube unless they press play.
 */
export type YouTubeMedia = {
	kind: 'youtube';
	label: string;
	id: string;
	poster: string;
	title: string;
	play: string;
	watch: string;
};

export type ProjectMedia = VideoMedia | YouTubeMedia;

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

/** Translated labels for the showcase controls. */
export type ProjectLabels = {
	pause: string;
	play: string;
};
