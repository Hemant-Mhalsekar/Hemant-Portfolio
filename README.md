# Hemant Mhalsekar — Full Stack Developer Portfolio

<div align="center">
  <img src="./public/favicon.svg" alt="Logo" width="80" height="80" />
  <p align="center">
    <strong>A high-performance, editorial portfolio experience.</strong>
    <br />
    Built with React 19, Vite, and Tailwind CSS v4.
    <br />
    <a href="https://hemant-mhalsekar.netlify.app/"><strong>View Live Portfolio</strong></a>
  </p>
</div>

---

## Overview

A personal portfolio built to present full-stack development work with clarity and restraint. The site uses a flat, editorial design system, interactive terminal-style elements, and a performance-first architecture, prioritizing fast load times and accessible interaction over decorative effects.

## Key Features

- **Editorial design system**: a flat, curated color palette (cream, ink, olive, mustard) with no gradients or glow effects
- **Interactive terminal widget**: an animated typewriter element in the hero section
- **Scroll-triggered animations**: reveal animations built on IntersectionObserver, respecting `prefers-reduced-motion` throughout
- **Accordion-based storytelling**: project details and experience entries expand on interaction rather than displaying all content at once
- **Accessible by default**: semantic HTML, reduced-motion support, and keyboard-navigable interactive elements
- **Integrated contact flow**: EmailJS-powered contact form, no backend required

## Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animation**: CSS transitions and IntersectionObserver for scroll reveals; GSAP for the navbar entrance animation; Lenis for smooth scroll

### Tools and Deployment
- **Hosting**: Netlify
- **Version Control**: Git and GitHub

## Project Structure

```text
src/
├── components/         # Reusable UI components (Navbar, Footer, NoiseOverlay, SmoothScroll)
├── context/             # React context providers
├── hooks/               # Custom React hooks (scroll-reveal logic, motion preferences)
├── sections/            # Page sections (Hero, Currently, WhatIBuild, SelectedWork, HowIBuild, Toolbox, Experience, BeyondCode, Contact)
├── App.jsx              # Root application component
└── index.css            # Global styles and Tailwind configuration
```

## Local Development

1. Clone the repository:
```bash
   git clone https://github.com/Hemant-Mhalsekar/Hemant-Portfolio.git
   cd Hemant-Portfolio
```

2. Install dependencies:
```bash
   npm install
```

3. Start the development server:
```bash
   npm run dev
```

4. Build for production:
```bash
   npm run build
```

## Featured Projects

- **Veyra**: A full e-commerce platform for a Kuwait-based food brand, starting as a landing page and growing into a complete storefront.
- **Real-Time AI Surveillance System**: Flags loitering, running, and intrusion in live video using YOLOv8, motion tracking, and a trained classifier.
- **TaskPilot**: A Kanban board that ranks tasks by urgency and breaks them into subtasks using an LLM.
- **CO-PO Mapper**: Replaced a manual Excel process for academic outcome reporting, running entirely in-browser with no backend.
- **Shortify**: A URL shortener with Google sign-in, click tracking, and a rate-limited API, built on Spring Boot.
- **Library Management System**: A console-based library system in Java and MySQL, with a fine engine that enforces a grace period.

---

## Author

**Hemant Mhalsekar**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hemant-mhalsekar)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hemant-Mhalsekar)
