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

## Heroku Deployment

This repository is configured for Heroku with:

- `Procfile` (`web: npm start`)
- `heroku-postbuild` script to generate the Vite build
- Express server (`server.js`) to serve `dist`

### Deploy with Heroku CLI

```bash
heroku login
heroku create your-app-name
git push heroku main
heroku open
```

### Optional: set Node version

The project includes an `engines.node` field in `package.json`.
