# Ekopechka — Frontend

React SPA (Single Page Application) for the Ekopechka e-commerce platform. Connects to the Ekopechka backend API.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Routing:** React Router DOM v5
- **State management:** Redux Toolkit
- **UI library:** MUI (Material UI v5) + MUI Joy
- **HTTP client:** Axios
- **Styling:** CSS + styled-components + Emotion
- **Alerts:** SweetAlert2
- **Carousel:** Swiper
- **Auth cookies:** universal-cookie
- **Dates:** moment.js

## Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Root component with routing
│   ├── store.ts                # Redux store
│   ├── context/                # Auth context (useGlobals)
│   ├── hooks/                  # useBasket, useGlobals
│   ├── components/
│   │   ├── headers/            # Navbar, Basket drawer
│   │   ├── footer/
│   │   ├── auth/               # Login & signup modals
│   │   └── PaymeButton.tsx     # Payme payment button
│   ├── screens/
│   │   ├── homePage/           # Hero, PopularProducts, NewProducts, Events, Services, Statistics
│   │   ├── productsPage/       # Product list + product detail
│   │   ├── articlesPage/       # Article list + article detail
│   │   ├── ordersPage/         # Order history & management
│   │   ├── userPage/           # User profile page
│   │   └── helpPage/           # Help & contact
│   └── services/               # Axios API service classes
├── lib/
│   ├── enums/                  # Shared TypeScript enums
│   ├── types/                  # TypeScript interfaces
│   └── sweetAlert.ts           # Alert helpers
└── css/                        # Per-page stylesheets
```

## Getting Started

### Prerequisites

- Node.js >= 16
- Ekopechka backend running (see [ekopechka](../ekopechka))

### Installation

```bash
git clone <repo-url>
cd ekopechka-react
yarn install
# or
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_API_URL=http://localhost:3003
```

### Running

```bash
# Development
yarn start
# or
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
yarn build
# or
npm run build
```

## Pages

| Route        | Description                     |
|--------------|---------------------------------|
| `/`          | Home — hero, products, events   |
| `/products`  | Product catalog & detail        |
| `/articles`  | Blog articles & detail          |
| `/orders`    | User order history              |
| `/my-page`   | User profile & settings         |
| `/help`      | Help & contact form             |

## Features

- Browse and filter products by category
- Add products to basket and manage quantities
- Stripe & Payme payment support
- User registration and login via modal
- View and manage personal orders
- Read articles with like and view tracking
- Fully responsive layout

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
