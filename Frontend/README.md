# Gledam Frontend

This app is a React + Vite storefront with an Admin dashboard, localStorage-backed data, and light auth. Key notes:

## Admin Dashboard
- Add/edit/delete products by category (Creatine, Protein Powder, Mass Gainer, Multivitamins, BCAA, etc.).
- Super Saver Combos are created as normal products using category: "Super Saver Combo".
- Image input: Upload only (file upload stored as base64). The image URL field has been removed as requested.

## Auth & Login
- A simple auth context stores login state in localStorage.
- In the navbar, clicking the user icon opens a small menu with two options: User and Admin.
	- User: logs in as a regular user.
	- Admin: logs in as admin and navigates to /admin.
- Add to cart is gated: users must be logged in to add items to the cart.

## Development
- React 18/19 + Vite, React Router, Tailwind classes.
- Aliases: `@` points to `src`.

## Quick Start
- Install deps and run dev server.

```pwsh
cd Frontend
npm install
npm run dev
```

Open http://localhost:5173

## Notes
- Product data persists in the browser via localStorage.
- If you need to reset products to initial seed, a utility exists in `src/lib/data/products.js` (resetToInitialProducts), but it's not exposed in the UI.

