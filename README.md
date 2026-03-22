# MyShop - E-Commerce App

A basic e-commerce web application built with React, TypeScript, and Tailwind CSS.

## Features

- Browse products in a responsive grid
- Filter products by multiple categories simultaneously
- Sort products by price or rating
- Filters persist in URL (shareable links, back button, page refresh)
- View detailed product information
- Add/remove items from cart
- Increase/decrease item quantity
- Cart persists using localStorage
- Mobile responsive
- Page transition animations
- E2E tests with Playwright

## Tech Stack

- React + TypeScript
- React Router
- Context API (cart state management)
- Tailwind CSS
- Playwright (E2E testing)
- fakestoreapi.com (data)

## Setup & Run

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

1. Clone the repository
  
   git clone https://github.com/chaudharyarchana/ecommerce-app.git
  

2. Install dependencies
  
   npm install
  

3. Install Playwright browsers
  
   npx playwright install
  

4. Start the development server
  
   npm start
  

5. Open your browser at
  
   http://localhost:3000
  

## Running E2E Tests

Make sure the app is running in one terminal:

npm start


Then in another terminal run:

npm run playwright:test


To see tests running visually:

npm run playwright:headed


To view HTML test report:

npm run playwright:report


## Project Structure
```
ecommerce-app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── context/
│   │   └── CartContext.tsx
│   ├── hooks/
│   │   └── useCart.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   └── CartPage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── e2e/
│   ├── home.spec.ts
│   ├── product.spec.ts
│   └── cart.spec.ts
├── playwright.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```
## Assumptions & Limitations

- Prices displayed in USD as returned by fakestoreapi.com
- Filters fetch each selected category in parallel via separate API calls
- Sorting is applied after API fetch since fakestoreapi has no sort parameter
- Cart state persists in localStorage across sessions
- Checkout button is UI only — no payment integration
- fakestoreapi.com is a public API and may occasionally be slow or unavailable

## Bonus Features Implemented

- Cart persisted to localStorage
- Page transition animations
- Add to cart animations
- Staggered product card animations
- Semantic HTML for accessibility
- Mobile responsive design
