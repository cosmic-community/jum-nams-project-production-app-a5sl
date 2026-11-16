# Papan Ide Inovasi
![App Preview](https://imgix.cosmicjs.com/c7204250-e205-11f1-9f56-ef8bff2d9157-autopilot-photo-1531403009284-440f080d1e12-1794864986859.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

An idea showcase and innovation board built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Browse ideas, filter them by category and status, and meet the contributors behind them. The UI is in Indonesian.

## Features
- 🏠 Home page with hero, featured high-impact ideas, category highlights, and top contributors
- 💡 Ideas grid filterable by category and status
- 📊 Visual impact meter (1-10) and status badges
- 🏷️ Category pages using each category's emoji icon and color
- 👤 Contributor profiles with photo, role, bio, and ideas
- 📱 Responsive, accessible design
- 🔐 All Cosmic requests run on the server
- 👀 Draft preview support via `getCosmic()`

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6afb7726f5f1bc5615b72446&clone_repository=6afb7817f5f1bc5615b72493)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: membangun ide ide yang bagus"

### Code Generation Prompt

> Build a Next.js application for a content management system called "jum-nams-project-production-app-a5sl". The content is managed in Cosmic CMS with the following object types: ideas, categories, contributors. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An idea showcase / innovation board website (Indonesian language content) for sharing and exploring ideas. Pages:
> - Home: hero section introducing the idea board, featured/high-impact ideas (sorted by impact_score), category highlights, and top contributors.
> - Ideas listing: grid of idea cards showing cover image, title, summary, status badge (Baru, Sedang Dikembangkan, Divalidasi, Diarsipkan), impact score, category (with emoji icon and color), and contributor. Filterable by category and status.
> - Idea detail page: cover image, title, status, impact score (1-10 visual meter), rich-text details, category link, contributor card.
> - Categories listing and category detail pages showing ideas in that category, using each category's emoji icon and color.
> - Contributors listing and contributor profile pages with photo, role, bio, and their ideas.
> Modern, clean, responsive design with a friendly, optimistic feel. UI text in Indonesian to match the content.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies
- [Next.js 16](https://nextjs.org) (App Router, Server Components)
- React 19 and TypeScript (strict)
- Tailwind CSS with the Typography plugin
- [Cosmic SDK](https://www.cosmicjs.com/docs)
- Bun as the package manager and runtime

## Getting Started

### Prerequisites
- [Bun](https://bun.sh)
- A Cosmic bucket with the `ideas`, `categories`, and `contributors` object types

### Installation
```bash
bun install
bun run dev
```
Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your environment (they are provided automatically on Cosmic deployments).

## Cosmic SDK Examples
```typescript
// Fetch ideas with their category and contributor
const { objects } = await cosmic.objects
  .find({ type: 'ideas' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)

// Fetch ideas in one category by Object id
const { objects: inCategory } = await cosmic.objects
  .find({ type: 'ideas', 'metadata.category': categoryId })
  .depth(1)
```

## Cosmic CMS Integration
- `ideas` link to `categories` and `contributors` through object metafields, loaded with `depth(1)`.
- Status values match the content model exactly: Baru, Sedang Dikembangkan, Divalidasi, Diarsipkan.
- Cosmic returns 404 for empty results, and the data layer converts that into empty arrays.
- Draft content is shown only inside the dashboard preview. Public visitors see published content only.

## Deployment Options
- **Vercel**: import the repository and set the three Cosmic environment variables.
- **Netlify**: use the Next.js runtime and set the same environment variables.
- Run `bun run type-check` before deploying. It also runs automatically as `prebuild`.
<!-- README_END -->