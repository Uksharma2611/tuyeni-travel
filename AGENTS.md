# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
# Tuyeni Travel - Project Context & Coding Standards

## 1. Project Overview
Tuyeni Travel is a premium Namibian travel and safari agency built on Next.js (App Router). The focus is on high-performance, cinematic visuals, enterprise-grade SEO, and strict web accessibility (A11y).

## 2. Core Tech Stack
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **CMS / Backend:** Sanity (`@sanity/client`)
* **Video Hosting:** Mux (`@mux/mux-player-react`)
* **Smooth Scrolling:** Lenis (`lenis/react`)
* **Security:** Google reCAPTCHA v2 (`react-google-recaptcha`)

## 3. Architectural Pattern: Server/Client Separation
* **Server Components (`page.tsx`):** Strictly reserved for data fetching (Sanity), generating JSON-LD Structured Data, and exporting Next.js `Metadata`. They must pass data down as props.
* **Client Components (`*Client.tsx`):** Reserved for interactivity, forms, DOM manipulation, and smooth scrolling. They must start with `"use client";`.

## 4. STRICT STYLING RULE (CRITICAL)
* **DO NOT alter existing styling (Tailwind classes) unless explicitly requested by the user.** * Maintain the exact padding, margins, flex/grid layouts, and transition durations currently implemented.
* When adding new elements, match the existing design language (e.g., `rounded-[2.5rem]`, `text-orange-500`, backdrop blurs, and shadow depths).

## 5. SEO & Accessibility (A11y) Standards
All new code must pass strict Google Lighthouse checks:
* **Semantic HTML:** Use `<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, and `<time>` where appropriate instead of generic `<div>` tags.
* **ARIA Attributes:** * Add `aria-label` to all icon-only buttons and external links.
    * Add `aria-hidden="true"` to purely decorative SVGs and background elements.
    * Use `aria-expanded`, `aria-controls`, and `aria-pressed` for interactive UI states.
* **Focus Trapping:** When hiding elements (like mobile menus), ensure they are removed from the focus order using `tabIndex={-1}` and `aria-hidden="true"`.
* **External Links:** Must include `target="_blank"` and `rel="noopener noreferrer"`.
* **Structured Data:** All major `page.tsx` files must inject accurate schema.org JSON-LD via `<script type="application/ld+json">`.

## 6. Performance & Media Rules
* **Scroll Listeners:** Always use `{ passive: true }` on `window.addEventListener("scroll", ...)` to prevent scroll janking.
* **Smooth Scrolling:** Always use the Lenis instance (`useLenis()`) for programmatic scrolling. Do not use native `window.scrollTo` if Lenis is active, as they will fight for control.
* **Images:** Always use `next/image`. Provide `sizes` attributes for responsive loading and explicitly use `loading="lazy"` for below-the-fold images.
* **Video:** Use `<MuxPlayer>` for all hero and cinematic videos. Pass the `playbackId` and `poster` from Sanity.

## 7. Form Handling
* Forms must include distinct loading states (`isSubmitting`) and disable buttons while processing.
* Provide clear, accessible success/error toast notifications using `role="alert"` or `aria-live="assertive"`.
* Protect public-facing forms (Contact) with ReCAPTCHA validation before submitting to `/api/` routes.