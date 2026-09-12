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

Paraglide output is generated during `prepare` and `check`; the generated `src/lib/paraglide` directory is intentionally ignored.
