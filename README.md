# Hemant Mhalsekar — Full Stack Developer Portfolio

A modern, high-performance portfolio website built with React, Vite, Tailwind CSS, and GSAP. Designed to be minimal, professional, and accessible.

## Live Demo
Ready to be deployed to [Vercel](https://vercel.com/) (or your preferred hosting provider).

## Features
- **Dark Theme Aesthetics**: A sleek, professional dark mode UI with indigo accent colors.
- **GSAP Animations**: Purposeful, highly-optimized scroll reveals using ScrollTrigger that strictly respect users' `prefers-reduced-motion` settings.
- **Responsive Navigation**: A sticky glassmorphic navbar featuring active scroll-spy highlighting and a smooth mobile slide-down menu.
- **Minimal Contact Flow**: A refined layout allowing direct, friction-free connections via email, LinkedIn, GitHub, or direct resume downloads.
- **SEO Optimized**: Complete metadata injected via `index.html` (including OpenGraph properties) for accurate social sharing previews.
- **Production Ready**: Configured with `vercel.json` for foolproof Single Page Application (SPA) routing.

## Tech Stack
- **Framework**: React 19 / Vite
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP & ScrollTrigger
- **Deploy**: Vercel

## Local Development

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` to view it in your browser.

## Deployment
This project is pre-configured for Vercel. Thanks to the included `vercel.json`, React Router will function perfectly on direct load. Just import the repository into Vercel and it will automatically build (`npm run build`) and deploy the `dist/` folder.

## Author
**Hemant Mhalsekar**
Building ideas into products.
