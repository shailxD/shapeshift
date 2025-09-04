# Development

This guide provides instructions on how to set up and run ShapeShift locally.

---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)  
- [pnpm](https://pnpm.io/)  
- [Git](https://git-scm.com/)  

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/shailxD/shapeshift.git
cd shapeshift
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

If needed, create a `.env.local` file:

```bash
cp .env.example .env.local
```

Update variables in `.env.local` as required.

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  

---

## Building for Production

```bash
pnpm build
```

Then start the production server:

```bash
NODE_ENV=production pnpm start
```

---

## Project Structure

```
shapeshift/
├── app/               # Next.js app directory
├── components/        # Reusable UI components
├── public/            # Static assets
├── styles/            # Global styles
├── utils/             # Utility functions (cn, helpers, etc.)
└── package.json
```

---

## Adding New Tools

ShapeShift is designed to be extensible.  
To add a new image tool:

1. Create a new component in `components/tools/`  
2. Add a route in `app/tools/`  
3. Register it in the navigation/menu  

---

## Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build with Turbopack
pnpm start    # Start production server
pnpm lint     # Run ESLint
pnpm format   # Format with Prettier
```

---

## Deployment

ShapeShift is optimized for [Vercel](https://vercel.com).  
Connect your GitHub repo and deploy instantly.  
