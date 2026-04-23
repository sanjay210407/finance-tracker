# Deployment Guide

This project deploys as two services:

- Frontend: React app in `frontend`, deployed to Vercel.
- Backend: Express API in `backend`, deployed to Render.

## 1. Push To GitHub

Commit and push the repository to:

```bash
git push origin main
```

## 2. Deploy Backend On Render

Create a new Render web service from the GitHub repository.

Use these settings:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`

Set these environment variables in Render:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=https://your-vercel-app-url.vercel.app
CORS_ORIGIN=https://your-vercel-app-url.vercel.app
```

After deployment, copy the Render service URL. It should look like:

```text
https://your-render-service.onrender.com
```

The API base URL for the frontend is that URL plus `/api`.

## 3. Deploy Frontend On Vercel

Create or update a Vercel project from the same GitHub repository.

Use these settings:

- Root directory: `frontend`
- Framework preset: Create React App
- Build command: `npm run build`
- Output directory: `build`

Set this environment variable in Vercel:

```env
REACT_APP_API_URL=https://your-render-service.onrender.com/api
```

Redeploy the frontend after setting the environment variable.

## 4. Final CORS Update

After Vercel gives you the final frontend URL, update the Render environment variables:

```env
FRONTEND_URL=https://your-vercel-app-url.vercel.app
CORS_ORIGIN=https://your-vercel-app-url.vercel.app
```

Then redeploy the Render backend.

## 5. Verify

Open:

```text
https://your-render-service.onrender.com/api/health
```

Expected response:

```json
{ "status": "ok" }
```

Then open the Vercel frontend, register/login, and add a transaction.
