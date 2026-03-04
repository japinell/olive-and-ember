# Olive & Ember Food Ordering App

Simple React + Redux web application for ordering food.

The app lets users:

- Select food types (categories)
- Browse menu items with descriptions
- View nutritional values (calories, protein, carbs, fat)
- Add and remove items from an order
- Adjust item quantities and see order totals

## Tech Stack

- React
- Redux Toolkit + React Redux
- Vite
- Express (for production static hosting on Heroku)

## Local Development

1. Install dependencies:

	```bash
	npm install
	```

2. Start development server:

	```bash
	npm run dev
	```

3. Open the app at:

	```
	http://localhost:5173
	```

## Production Build

Build the frontend assets:

```bash
npm run build
```

Run the production server locally:

```bash
npm start
```

The server listens on `PORT` or defaults to `3000`.

## Deployment Options

This repository is configured for Node-based hosting with:

- `Procfile` (`web: npm start`)
- `heroku-postbuild` script to generate the Vite build
- Express server (`server.js`) to serve `dist`
- Node version in `package.json` via `engines.node`

### Option A: Heroku (paid)

> Note: Heroku no longer has a free tier.

Deploy with Heroku CLI:

```bash
heroku login
heroku create your-app-name
git push heroku main
heroku open
```

Useful troubleshooting command:

```bash
heroku logs --tail
```

### Option B: Render (free tier)

1. Push this repository to GitHub.
2. In Render, click **New +** → **Web Service**.
3. Connect your GitHub repo and select the `main` branch.
4. Use these settings:
	- **Build Command:** `npm install && npm run build`
	- **Start Command:** `npm start`
	- **Plan:** `Free`
5. Click **Create Web Service**.

> Note: Free Render services can sleep when idle.

### Option C: Netlify or Vercel (free static hosting)

This app can also be hosted as a static SPA.

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

For client-side routes, add a rewrite rule to `/index.html` if your host requires it.
