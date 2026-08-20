# Shree Krishna Kacchi Dabeli — Vercel Clean Build

This is the **Vercel-ready root project**. The frontend is at the repository root and the API functions are in `/api`.

## Vercel
1. Push the contents of this folder to a GitHub repository (do not put the folder inside another project folder).
2. Import the repository into Vercel.
3. Framework Preset: **Vite** (or leave Auto Detect).
4. Root Directory: **`.`**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Install Command: `npm install`
8. Deploy.

No `frontend` Root Directory setting is required.

## Important
- The order API is `/api/orders`.
- The frontend calls `/api/orders` in production, so it does not depend on localhost.
- Orders are validated by the serverless function and return an order ID. Permanent order storage requires a database such as Supabase/Postgres.
- If the Vercel deployment screen still fails, copy the **first red error line after `Running build...`**; the initial `Retrieving list of deployment files...` message is normal and is not itself an error.
