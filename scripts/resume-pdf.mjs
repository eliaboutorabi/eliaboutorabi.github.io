// Build through Quiet Engineering, then copy its validated artifacts to this site.
// Usage: npm run resume:pdf -- [path/to/JobApply]
import { execFileSync } from 'node:child_process';
import { copyFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const resumeRepo = path.resolve(process.argv[2] ?? path.join(root, '../JobApply'));
const venv = path.join(resumeRepo, '.venv/bin');
const output = path.join(resumeRepo, 'output/elham');
execFileSync(
	path.join(venv, 'python'),
	[
		path.join(resumeRepo, 'resume-design/build_resume.py'),
		'--content',
		path.join(resumeRepo, 'elham.resume.json'),
		'--output-dir',
		output,
		'--preview'
	],
	{
		cwd: resumeRepo,
		env: { ...process.env, PATH: `${venv}${path.delimiter}${process.env.PATH ?? ''}` },
		stdio: 'inherit'
	}
);
const pdf = path.join(output, 'pdf/resume.pdf');
const validation = JSON.parse(readFileSync(path.join(output, 'pdf/validation.json'), 'utf8'));
const hash = createHash('sha256').update(readFileSync(pdf)).digest('hex');
if (hash !== validation.sha256) throw new Error('Resume PDF does not match its validation report.');
copyFileSync(pdf, path.join(root, 'static/Elham_Aboutorabi_Resume.pdf'));
copyFileSync(path.join(output, 'resume.md'), path.join(root, 'static/Elham_Aboutorabi_Resume.md'));
console.log('Synced the validated resume PDF and Markdown to static/.');
