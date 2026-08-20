# Shree Krishna Kacchi Dabeli Centre — Premium Real-Food 3D Website

A production-oriented React + Vite frontend with an Express backend, redesigned to follow the supplied dark / gold reference layout much more closely.

## Major changes in this revision

- Replaced the previous CSS/illustrated dabeli with the **owner-provided real dabeli photograph** supplied in the conversation.
- Enhanced the supplied photo for web use: tighter crop, UI cleanup, contrast/color/sharpness tuning and high-resolution export.
- Hero now uses the real food photograph as the main visual.
- **Touch/click the hero dabeli** to switch from the assembled real photograph to an exploded view using real-photo layers for the upper pav, filling/topping zone and lower pav. No drawn/emoji dabeli graphics are used.
- Added premium labels for the exploded layers.
- Menu cards now use food photography and the requested order prices:
  - Amul Butter Dabeli — ₹18
  - Cheese Dabeli — ₹30
  - Special Dabeli — ₹40
  - Dryfruit Dabeli — ₹35
- Order panel now shows food photos, quantities, customer name/phone/notes and a connected backend order request.
- If the backend is unavailable, the order falls back to a WhatsApp order message.
- Added Google Maps, phone, WhatsApp and Instagram CTAs.
- Responsive mobile layout and premium dark/gold visual system retained.

## Important image-rights note

The hero/gallery photograph is based on the image supplied by the user and is marked in the UI as an owner-provided photo.

The menu currently includes a small number of **demo/reference food photographs from public food listings** for visual presentation. They are not claimed to be photographs of Shree Krishna Kacchi Dabeli Centre. Before selling/deploying commercially, replace those demo images with owner-approved original photographs. This is especially important for the Butter / Special / Dryfruit menu cards.

## Business information used

- Shree Krishna Kacchi Dabeli Centre
- Sant Rohidas Nagar, Peth, Manchar, Maharashtra 410503
- Phone: +91 99753 48154
- Google listing/search evidence found the business at the above Manchar location and showed a 4.4 rating with 7+ reviews at the time of the build.

## Frontend / backend

Frontend: React 19 + Vite + Framer Motion + Lucide React
Backend: Express 5 + CORS + Helmet + Morgan

API routes:

- `GET /api/health`
- `GET /api/menu`
- `POST /api/orders`
- `GET /api/orders`

The current order store is in-memory. For a commercial launch, move orders to Supabase/PostgreSQL and add an authenticated admin dashboard.

## Local development

```bash
npm run install:all
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:4100/api/health`

## Single-container production build

```bash
docker build -t shree-krishna-dabeli .
docker run -p 4100:4100 shree-krishna-dabeli
```

The backend serves the compiled frontend from `frontend-dist` in the production container.

## Production checklist

1. Replace demo menu photographs with owner-approved original photos.
2. Confirm the four prices, opening hours and address with the owner before launch.
3. Configure `FRONTEND_URL` for the deployed API if frontend and backend are on separate domains.
4. Move orders from memory to Supabase/PostgreSQL.
5. Connect WhatsApp Business or the restaurant's preferred ordering workflow.
6. Add payment integration only after confirming the owner's preferred provider.
7. Add Google Business review URL, analytics, SEO/OG images and Restaurant structured data.

## Deploy to Vercel (recommended)

This project is configured for Vercel as a single deployment: Vite builds the frontend and the `/api/*.js` files run as Vercel serverless functions.

1. Push the project to GitHub/GitLab.
2. In Vercel, import the repository and leave **Root Directory** as `./`.
3. Build command: `npm run build`.
4. Output directory: `frontend/dist`.
5. No `VITE_API_URL` is required for the single-domain deployment; the frontend automatically uses `/api`.
6. Deploy.

After deployment, test:
- `/api/health`
- `/api/menu`
- Place a test order from the website.

### Important backend note

The Vercel `/api/orders` endpoint is serverless and does not permanently store orders. It validates the request and returns an order ID. The website also has a WhatsApp fallback. For a real restaurant launch, connect `/api/orders` to Supabase/PostgreSQL so orders persist and add an authenticated admin dashboard.

### If Vercel asks for a framework

Select **Vite**. Do not set the Root Directory to `frontend`, because the serverless `/api` folder is at the project root.
