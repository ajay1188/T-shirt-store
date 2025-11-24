# LOOMSPACE E-commerce Store

A production-ready e-commerce solution built with Next.js, Node.js, and React.

## Directory Structure

- `/frontend`: Next.js 14 App Router (Storefront)
- `/api`: Node.js Express + Prisma (Backend)
- `/admin`: React + Vite (Admin Panel)

## Prerequisites

- Node.js (v18+)
- PostgreSQL

## Setup Instructions

### 1. Database Setup

Ensure PostgreSQL is running. The project is configured to use the `loomspace` database.

### 2. Backend (`/api`)

```bash
cd api
npm install
# Create .env file with DATABASE_URL="postgresql://postgres:ajay%402005a@localhost:5432/loomspace?schema=public"
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

Server runs on `http://localhost:3001`.

### 3. Frontend (`/frontend`)

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:3000`.

### 4. Admin Panel (`/admin`)

```bash
cd admin
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## Features

- **Storefront**: Browse products, filter by category, cart management, checkout simulation, user orders.
- **Admin**: Dashboard stats, product listing, order listing.
- **API**: RESTful endpoints for auth, products, and orders.

## Deployment

- **Frontend**: Deploy to Vercel.
- **Admin**: Deploy to Vercel or Netlify.
- **API**: Deploy to Vercel Serverless, AWS Lambda, or a VPS (DigitalOcean/Heroku).
