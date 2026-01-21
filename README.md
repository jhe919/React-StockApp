# React StockApp

A React stock dashboard UI inspired by modern brokerage apps. It shows a portfolio summary, a mock price chart, popular topic chips, and a stock list that pulls real-time quotes while optionally reading your holdings from Firebase Firestore.

## Features
- Portfolio summary with a mock line chart and time range selector
- Stock list with live quotes from Finnhub
- Optional holdings list backed by Firebase Firestore
- MUI-based chips and avatars for popular topic tags

## Tech Stack
- React (Create React App)
- Chart.js via `react-chartjs-2`
- Firebase Firestore (compat SDK)
- Finnhub API for quotes
- MUI for UI elements

## Getting Started
```bash
npm install
npm start
```

The app runs at `http://localhost:3000`.

## Configuration Notes
- Finnhub token: update `TOKEN` in `src/Stats.js`.
- Firebase: copy `.env.example` to `.env` and set the `REACT_APP_FIREBASE_*` values for your project.
- Firestore data: the app expects a `myStocks` collection with documents like:
  ```json
  {
    "ticker": "AAPL",
    "shares": 10
  }
  ```

## Scripts
- `npm start` start the dev server
- `npm test` run tests in watch mode
- `npm run build` build for production

## Project Structure
- `src/App.js` main layout
- `src/Newsfeed.js` portfolio panel + chart + popular lists
- `src/Stats.js` stocks list and Firestore integration
- `src/LineGraph.js` chart rendering (mock data)
