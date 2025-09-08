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
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (shapeshift)/             # Route group for main app
│   │   │   ├── (root)/               # Homepage route
│   │   │   │   └── page.tsx          # Main landing page
│   │   │   ├── (tools)/              # Tools route group
│   │   │   │   ├── layout.tsx        # Tools layout
│   │   │   │   ├── rounded-border/   # Rounded border tool
│   │   │   │   ├── square-image/     # Square image tool
│   │   │   │   ├── svg-to-png/       # SVG to PNG converter
│   │   │   │   ├── svg-to-react/     # SVG to React component tool
│   │   │   │   └── png-to-webp/      # PNG to WebP component tool
│   │   │   └── layout.tsx            # Main app layout
│   │   ├── _components/              # App-specific components
│   │   │   ├── tools/                # Tool implementations
│   │   │   │   ├── rounded-border-tool/
│   │   │   │   ├── square-image-tool/
│   │   │   │   ├── svg-to-png-tool/
│   │   │   │   ├── svg-to-react-tool/
│   │   │   │   └── png-to-webp-tool/
│   │   │   ├── footer-section.tsx
│   │   │   ├── header-section.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── index.tsx
│   │   │   └── tools-navigation-card-section.tsx
│   │   ├── layout.tsx                # Root layout
│   │   ├── loading.tsx               # Global loading UI
│   │   └── not-found.tsx             # 404 page
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── alert.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── spinner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── theme-switcher.tsx
│   │   ├── border-radius-selector.tsx
│   │   ├── file-dropzone.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── option-selector.tsx
│   │   ├── providers.tsx
│   │   ├── svg-scale-selector.tsx
│   │   └── upload-box.tsx
│   ├── assets/                       # Static assets and icons
│   │   └── logos.tsx
│   ├── data/                         # Static data and configuration
│   │   └── site.ts
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-clipboard-paste.ts
│   │   ├── use-file-uploader.ts
│   │   ├── use-local-storage.ts
│   │   └── use-svg-converter.ts
│   ├── lib/                          # Utility libraries
│   │   ├── fonts.ts
│   │   └── utils.ts
│   ├── styles/                       # Global styles
│   │   └── globals.css
│   └── types/                        # TypeScript type definitions
│       ├── site.ts
│       └── svg-tool.ts
├── public/                           # Static public assets
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   └── logo.svg
├── components.json                   # shadcn/ui configuration
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.mjs                # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
├── package.json                      # Dependencies and scripts
└── pnpm-lock.yaml                    # Package manager lockfile
```

---

## Adding New Tools

ShapeShift is designed to be extensible with a modular tool architecture.  
To add a new tool:

### 1. Create the tool implementation

Create a new directory in `src/app/_components/tools/` with your tool components:

```text
src/app/_components/tools/your-new-tool/
├── index.tsx              # Main tool component
├── tool-core.tsx          # Core tool logic
├── renderer.tsx           # Preview/output renderer
└── utils.ts               # Tool-specific utilities
```

### 2. Add the route

Create a new route in `src/app/(shapeshift)/(tools)/`:

```text
src/app/(shapeshift)/(tools)/your-new-tool/
└── page.tsx               # Tool page component
```

### 3. Register in navigation

Add your tool to the tools navigation in:

- `src/app/_components/tools-navigation-card-section.tsx`
- `src/data/site.ts` (if using centralized configuration)

### 4. Tool Structure Pattern

Follow the established pattern:

- **Main Component**: Export from `index.tsx`
- **Core Logic**: Separate business logic in `tool-core.tsx`
- **Renderer**: Handle preview/output display
- **Utils**: Tool-specific helper functions
- **Types**: Add to `src/types/` if needed

### 5. Available Tools

Current tools in the project:

- **Rounded Border Tool**: Add rounded borders to images
- **Square Image Tool**: Convert images to square format
- **SVG to PNG Tool**: Convert SVG files to PNG format
- **SVG to React Tool**: Convert SVG files to React components
- **PNG to WebP Tool**: Convert PNG files to WebP format

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
