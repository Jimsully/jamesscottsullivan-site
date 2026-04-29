# James Scott Sullivan Portfolio

This project is a deployment-ready rebuild of `jamesscottsullivan.com` with a clearer content hierarchy for photography, adventure stories, prints, and inquiries.

## What is in here

- `index.html`, `about.html`, `portfolio.html`, `blog.html`, `prints.html`, `contact.html`: the new multi-page portfolio experience.
- `assets/styles.css`: the full visual system, layout, and responsive treatment.
- `assets/site.js`: lightweight progressive enhancement for the mobile nav, reveal animations, print inquiries, filtering, and the contact form.
- `preview.ps1`: a small local preview server so the site can be reviewed without adding dependencies.
- `docs/current-site-audit.md`: notes from the content/structure audit of the live WordPress site.
- `docs/deployment-checklist.md`: a host-agnostic rollout plan for preview deploy, DNS cutover, and rollback.

## Why this stack

The current machine did not expose a working Node/npm or .NET SDK toolchain for scaffolding a compiled frontend, so this rebuild is implemented as a zero-build, component-enhanced static site. That keeps it immediately deployable to any static host now, while preserving a clean information architecture that can be lifted into Astro, Next, or another compiled framework later without rewriting the content strategy.

## Preview locally

From this folder, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\preview.ps1 -Port 8080
```

Then open `http://localhost:8080/`.

## Deployment notes

- Deploy this folder as a static site to a preview host first.
- Keep the WordPress-managed domain pointed at the current site until the preview URL is approved.
- After the preview is approved, update the DNS records in the WordPress/domain dashboard to point the root domain and `www` host to the new provider.
- Leave the current WordPress site untouched until DNS propagation is complete, then archive it as the rollback option.

More detailed cutover guidance is in `docs/current-site-audit.md` and `docs/deployment-checklist.md`.
