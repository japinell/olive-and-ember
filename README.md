# Olive & Ember Food Ordering App

Simple React + Redux web application for ordering food.

The app lets users:

- Select food types (categories)
- Browse menu items with descriptions, serves, and ingredient lists
- View nutritional values (calories, protein, carbs, fat)
- Click food images to zoom in/out
- Add and remove items from an order
- Adjust item quantities and see order totals + nutrition summary
- Automatically apply a 10% value combo discount (at least 1 drink + 1 main)
- Fill customer and payment details in a checkout form
- Simulate placing an order and receive an order confirmation message

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

## Checkout Simulation

The checkout form in the order panel collects:

- Customer information (name, email, phone, address)
- Payment information (name on card, card number, expiry, CVV)

`Place Order` is a front-end simulation only. No real payment is processed.

## How to Place an Order

1. Select a category to filter the menu.
2. Click **Add to Order** on one or more items.
3. In **Current Order**, adjust quantities if needed.
4. Complete all checkout fields (customer + payment details).
5. Click **Place Order** to simulate checkout and view the confirmation message.

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

For Netlify, this repository already includes `netlify.toml` with an SPA fallback redirect to `/index.html`.

## One-Click Deploy

Use these links to deploy directly from GitHub:

- **Render (Blueprint + free tier):**
	[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/japinell/olive-and-ember)

- **Vercel (static deploy):**
	[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/japinell/olive-and-ember)

> Render uses the included `render.yaml` blueprint in this repository.
