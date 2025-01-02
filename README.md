# Mohamed Bailla - Portfolio Website

A modern, responsive portfolio website built with React and Supabase.

## Features

- Responsive design for all devices
- Dark/Light mode toggle
- Admin panel for content management
- Contact form with Supabase backend
- Project showcase
- Skills and experience sections
- SEO optimized

## Tech Stack

- React
- Vite
- Material-UI
- Framer Motion
- Supabase
- React Router

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting provider

## Admin Panel

Access the admin panel at `/admin`. Only authenticated users can access this section.

## License

MIT
