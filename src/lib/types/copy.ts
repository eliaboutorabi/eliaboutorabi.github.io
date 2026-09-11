import type { Project } from './project';

export type Locale = 'en' | 'fa';

/** Everything the page says, in one language. */
export type Copy = {
	nav: {
		about: string;
		work: string;
		resume: string;
		contact: string;
		linkedin: string;
		github: string;
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
		cards: Array<{ title: string; text: string; icon: 'decisions' | 'ai' | 'growth' }>;
	};
	stats: Array<{ value: string; suffix: string; label: string }>;
	work: {
		kicker: string;
		title: string;
		intro: string;
		upcoming: string;
		projects: Project[];
	};
	resume: {
		kicker: string;
		titleLead: string;
		titleTail: string;
		accent: string;
		experienceHeading: string;
		experience: Array<{ role: string; period: string; place: string; text: string }>;
		skillsHeading: string;
		skills: Array<{ group: string; items: string[] }>;
		educationHeading: string;
		education: Array<{ degree: string; school: string }>;
		certsHeading: string;
		certs: string[];
		alsoHeading: string;
		also: string[];
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
		github: string;
		footer: string;
	};
	/** Presentation mode: the controls and the few slide titles the page itself does not carry. */
	deck: {
		open: string;
		label: string;
		close: string;
		exit: string;
		next: string;
		previous: string;
		fullscreen: string;
		exitFullscreen: string;
		highlights: string;
		principles: string;
		principlesTitle: string;
		toolkit: string;
		credentials: string;
		testimonial: string;
	};
};
