// Renders the markdown resume to a print-quality, text-based (ATS-readable) PDF.
//
//   npm run resume:pdf                      -> references/Elham_Aboutorabi_Resume.pdf
//   node scripts/resume-pdf.mjs in.md out.pdf
//
// The markdown subset understood: "# Name", contact lines before the first
// section ("Phone: … | Email: …"), "## Section", "### Company | Location | Role | Dates",
// "Degree | School | Dates" rows, "Thesis: …" notes, "- " bullets, **bold**, *italic*, URLs.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.resolve(process.argv[2] ?? path.join(root, 'static/Elham_Aboutorabi_Resume.md'));
const output = path.resolve(
	process.argv[3] ?? path.join(root, 'references/Elham_Aboutorabi_Resume.pdf')
);

// ---------- markdown -> HTML ----------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const looksLikeDates = (s) => /\b(19|20)\d{2}\b|present/i.test(s);
const displayUrl = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function inline(text) {
	let html = esc(text.trim());
	html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	html = html.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
	html = html.replace(/https?:\/\/[^\s)]+/g, (u) => `<a href="${u}">${displayUrl(u)}</a>`);
	html = html.replace(/(^|[\s(])([\w.+-]+@[\w-]+\.[\w.]+)/g, '$1<a href="mailto:$2">$2</a>');
	return html;
}

// "Label: rest" at the start of a bullet or note becomes a bold label.
const labelled = (text) =>
	inline(text).replace(/^([A-Z][^:<]{1,40}):(\s|$)/, '<strong>$1:</strong>$2');

function headRow(segments, { companyFirst = false } = {}) {
	const segs = segments.map((s) => s.trim()).filter(Boolean);
	const dates = segs.length > 1 && looksLikeDates(segs[segs.length - 1]) ? segs.pop() : '';
	let title = segs[0] ?? '';
	let org = segs.slice(1).join(' · ');
	if (companyFirst && segs.length >= 3) {
		// "### Company | Location | Role": lead with the role, then company and location.
		title = segs[2];
		org = [segs[0], segs[1], ...segs.slice(3)].join(' · ');
	}
	return (
		`<div class="entry-head"><div class="role">${inline(title)}</div>` +
		(dates ? `<div class="dates">${inline(dates)}</div>` : '') +
		`</div>` +
		(org ? `<div class="org">${inline(org)}</div>` : '')
	);
}

function contactLink(item) {
	const value = item.replace(/^[A-Za-z ]+:\s*/, '').trim();
	if (/^https?:\/\//.test(value)) return `<a href="${esc(value)}">${esc(displayUrl(value))}</a>`;
	if (/@/.test(value)) return `<a href="mailto:${esc(value)}">${esc(value)}</a>`;
	if (/^\+?[\d\s()-]{7,}$/.test(value))
		return `<a href="tel:${value.replace(/[^\d+]/g, '')}">${esc(value)}</a>`;
	return esc(value);
}

function markdownToHtml(md) {
	const blocks = md
		.replace(/\r\n/g, '\n')
		.split(/\n\s*\n/)
		.map((b) => b.trim())
		.filter(Boolean);
	let name = '';
	const contact = [];
	let body = '';
	let inSection = false;
	let openEntry = false;
	const closeEntry = () => {
		if (openEntry) {
			body += '</div>';
			openEntry = false;
		}
	};

	for (const block of blocks) {
		if (block.startsWith('# ')) {
			name = block.slice(2).trim();
			continue;
		}
		if (block.startsWith('## ')) {
			closeEntry();
			inSection = true;
			body += `<h2>${inline(block.slice(3))}</h2>`;
			continue;
		}
		if (!inSection) {
			// contact lines under the name
			block.split('|').forEach((part) => contact.push(part.trim()));
			continue;
		}
		if (block.startsWith('### ')) {
			closeEntry();
			openEntry = true;
			body += `<div class="entry">${headRow(block.slice(4).split('|'), { companyFirst: true })}`;
			continue;
		}
		const lines = block.split('\n');
		if (lines.every((l) => /^[-*]\s/.test(l))) {
			if (!openEntry) {
				body += '<div class="entry">';
				openEntry = true;
			}
			body += `<ul class="bullets">${lines.map((l) => `<li>${labelled(l.replace(/^[-*]\s+/, ''))}</li>`).join('')}</ul>`;
			continue;
		}
		if (block.includes(' | ')) {
			closeEntry();
			openEntry = true;
			body += `<div class="entry">${headRow(block.split('|'))}`;
			continue;
		}
		if (/^Thesis:/i.test(block)) {
			if (!openEntry) {
				body += '<div class="entry">';
				openEntry = true;
			}
			body += `<div class="note">${labelled(block)}</div>`;
			continue;
		}
		closeEntry();
		body += `<p>${inline(block)}</p>`;
	}
	closeEntry();

	const contactHtml = contact
		.filter(Boolean)
		.map((c) => `<div>${contactLink(c)}</div>`)
		.join('');
	return {
		name,
		html: `<header class="header"><h1 class="name">${esc(name)}</h1><div class="contact">${contactHtml}</div></header>${body}`
	};
}

const css = `
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: 'Lato', 'Helvetica Neue', Arial, sans-serif; font-size: 9.8pt; line-height: 1.34; color: #1f2933;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }
a { color: inherit; text-decoration: none; }
.header { display: flex; justify-content: space-between; align-items: flex-start; gap: 18pt; border-bottom: 2pt solid #17324d; padding-bottom: 8pt; }
.name { font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-size: 25pt; font-weight: 700; color: #17324d; line-height: 1.05; margin: 0; }
.contact { text-align: right; font-size: 9.2pt; line-height: 1.5; color: #3d4b5c; white-space: nowrap; padding-top: 2pt; }
h2 { font-size: 9.8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1.4pt; color: #17324d; margin: 10pt 0 4pt;
  padding-bottom: 2.5pt; border-bottom: 0.75pt solid #c9a227; break-after: avoid; }
p { margin: 0 0 3pt; }
.entry { margin: 0 0 6.5pt; break-inside: avoid; }
.entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10pt; }
.role { font-weight: 700; font-size: 10.4pt; color: #17324d; }
.dates { white-space: nowrap; font-size: 9.3pt; color: #3d4b5c; }
.org { font-size: 9.5pt; color: #3d4b5c; font-style: italic; margin-top: 0.5pt; }
.note { font-size: 9.3pt; color: #3d4b5c; margin-top: 1pt; }
ul.bullets { margin: 2pt 0 0; padding-left: 12pt; }
ul.bullets li { margin: 0 0 1.2pt; padding-left: 2pt; }
ul.bullets li::marker { color: #c9a227; }
`;

const md = readFileSync(input, 'utf8');
const { name, html } = markdownToHtml(md);
const title = `${name.replace(/\w\S*/g, (w) => w[0] + w.slice(1).toLowerCase())} – Resume`;
const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
<style>${css}</style></head><body>${html}</body></html>`;

mkdirSync(path.dirname(output), { recursive: true });
const htmlPath = output.replace(/\.pdf$/i, '') + '.html';
writeFileSync(htmlPath, page);

const footer =
	'<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7.5px;color:#8a94a1;padding:0 0.62in;display:flex;justify-content:space-between;">' +
	`<span>${esc(title)}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 697, height: 900 } });
await tab.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
const fontsLoaded = await tab.evaluate(async () => {
	await document.fonts.ready;
	return document.fonts.check('10pt Lato');
});
if (!fontsLoaded) console.warn('Google Fonts unavailable; fell back to system fonts.');
await tab.emulateMedia({ media: 'print' });
await tab.pdf({
	path: output,
	format: 'Letter',
	printBackground: true,
	displayHeaderFooter: true,
	headerTemplate: '<span></span>',
	footerTemplate: footer,
	margin: { top: '0.55in', right: '0.62in', bottom: '0.62in', left: '0.62in' },
	tagged: true
});
await browser.close();

// Document metadata + a machine-readability check (text must extract in reading order).
const check = `
from pypdf import PdfReader, PdfWriter
p = ${JSON.stringify(output)}
w = PdfWriter(clone_from=p)
w.add_metadata({'/Title': ${JSON.stringify(title)}, '/Author': ${JSON.stringify(title.replace(/ – Resume$/, ''))}, '/Subject': 'Resume'})
w.write(p)
r = PdfReader(p)
print('pages:', len(r.pages))
print('extracted text starts:', repr(r.pages[0].extract_text()[:120]))
`;
try {
	console.log(execFileSync('python3', ['-c', check], { encoding: 'utf8' }).trim());
} catch {
	console.warn('python3 with pypdf not found; PDF written without Title/Author metadata.');
}
console.log('wrote', output);
