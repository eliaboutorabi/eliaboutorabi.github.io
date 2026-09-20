# eliaboutorabi.github.io

Personal GitHub Pages site for Elham "Eli" Aboutorabi, built with SvelteKit, Tailwind CSS, adapter-static, and Paraglide localization.

## Presentation mode

The **Present** button in the navbar turns the site into a full-screen slide deck built from the page's own content: cover, about, principles, career highlights, the portfolio and each of its projects, experience, toolkit, credentials, testimonial and contact. Slides are composed on a fixed 16:9 stage that scales to the screen, so they look the same on a laptop and a projector. It works in both languages and both themes; the Farsi deck reads right to left, and the arrow keys follow the reading direction.

| Key                                             | Action                          |
| ----------------------------------------------- | ------------------------------- |
| `Space`, `→`, `↓`, `Page Down`, `Enter`         | Next slide                      |
| `←`, `↑`, `Page Up`, `Backspace`, `Shift+Space` | Previous slide                  |
| `Home` / `End`                                  | First / last slide              |
| `F`                                             | Toggle fullscreen               |
| `Esc`                                           | Leave fullscreen, then the deck |

Swiping works on touch screens, the dots at the bottom jump to any slide, and the controls fade away when the mouse rests. The deck lives in `src/lib/components/Presentation.svelte` and `presentation.css`; its strings sit alongside the rest of the copy in `src/routes/+page.svelte`.

## Developing

Install dependencies and start the local dev server:

```sh
npm install
npm run dev
```

## Validating

```sh
npm run check
npm run build
```

## Resume source and downloads

The authoritative resume content lives in `../JobApply/elham.resume.json`.
The Quiet Engineering builder in that repository is the only PDF authoring entry point.
The homepage keeps concise English and Persian summaries in `src/routes/+page.svelte`,
which also feed presentation mode.

After editing the resume, rebuild and synchronize its validated PDF and matching Markdown:

```sh
npm run resume:pdf
# Or, when the resume repository is elsewhere:
npm run resume:pdf -- /path/to/JobApply
npm run check
npm run build
```

The resume repository needs its `.venv` and Poppler installed as described in its README.
`resume:pdf` copies the generated files into `static/Elham_Aboutorabi_Resume.pdf` and
`static/Elham_Aboutorabi_Resume.md`. Do not independently edit these copies.
The site build includes both downloads; the deployment workflow refreshes the root copies.
Building and reviewing locally does not publish the site.

Paraglide output is generated during `prepare` and `check`; the generated `src/lib/paraglide` directory is intentionally ignored.
