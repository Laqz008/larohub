# LARO Project Structure

## 📁 Recommended Directory Structure

```
laro-app/
├── 📁 apps/
│   ├── 📁 web/                     # Next.js frontend application
│   │   ├── 📁 src/
│   │   │   ├── 📁 app/             # App Router (Next.js 13+)
│   │   │   │   ├── 📁 (auth)/      # Auth route group
│   │   │   │   │   ├── login/
│   │   │   │   │   ├── register/
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── 📁 (dashboard)/ # Dashboard route group
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── profile/
│   │   │   │   │   ├── teams/
│   │   │   │   │   ├── courts/
│   │   │   │   │   ├── games/
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── 📁 api/         # API routes
│   │   │   │   │   ├── auth/
│   │   │   │   │   ├── users/
│   │   │   │   │   ├── teams/
│   │   │   │   │   ├── courts/
│   │   │   │   │   └── games/
│   │   │   │   ├── globals.css
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── 📁 components/      # Reusable UI components
│   │   │   │   ├── 📁 ui/          # Base UI components
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── card.tsx
│   │   │   │   │   ├── modal.tsx
│   │   │   │   │   ├── input.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 game/        # Gaming-specific components
│   │   │   │   │   ├── game-button.tsx
│   │   │   │   │   ├── stat-card.tsx
│   │   │   │   │   ├── player-card.tsx
│   │   │   │   │   ├── team-lineup.tsx
│   │   │   │   │   └── achievement-badge.tsx
│   │   │   │   ├── 📁 layout/      # Layout components
│   │   │   │   │   ├── header.tsx
│   │   │   │   │   ├── sidebar.tsx
│   │   │   │   │   ├── mobile-nav.tsx
│   │   │   │   │   └── footer.tsx
│   │   │   │   ├── 📁 forms/       # Form components
│   │   │   │   │   ├── auth-form.tsx
│   │   │   │   │   ├── profile-form.tsx
│   │   │   │   │   ├── team-form.tsx
│   │   │   │   │   └── game-form.tsx
│   │   │   │   └── 📁 maps/        # Map-related components
│   │   │   │       ├── court-map.tsx
│   │   │   │       ├── map-marker.tsx
│   │   │   │       └── location-picker.tsx
│   │   │   ├── 📁 lib/             # Utility libraries
│   │   │   │   ├── 📁 auth/        # Authentication utilities
│   │   │   │   ├── 📁 db/          # Database utilities
│   │   │   │   ├── 📁 api/         # API utilities
│   │   │   │   ├── 📁 utils/       # General utilities
│   │   │   │   ├── 📁 hooks/       # Custom React hooks
│   │   │   │   ├── 📁 stores/      # State management (Zustand)
│   │   │   │   ├── 📁 validations/ # Form validation schemas
│   │   │   │   └── 📁 constants/   # App constants
│   │   │   ├── 📁 styles/          # Global styles and themes
│   │   │   │   ├── globals.css
│   │   │   │   ├── gaming-theme.css
│   │   │   │   └── components.css
│   │   │   └── 📁 types/           # TypeScript type definitions
│   │   │       ├── auth.ts
│   │   │       ├── user.ts
│   │   │       ├── team.ts
│   │   │       ├── court.ts
│   │   │       ├── game.ts
│   │   │       └── index.ts
│   │   ├── 📁 public/              # Static assets
│   │   │   ├── 📁 images/
│   │   │   │   ├── 📁 avatars/
│   │   │   │   ├── 📁 logos/
│   │   │   │   ├── 📁 achievements/
│   │   │   │   └── 📁 courts/
│   │   │   ├── 📁 icons/
│   │   │   ├── 📁 sounds/          # Gaming sound effects
│   │   │   └── favicon.ico
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── 📁 api/                     # Backend API (Express.js)
│       ├── 📁 src/
│       │   ├── 📁 controllers/     # Route controllers
│       │   │   ├── auth.controller.ts
│       │   │   ├── user.controller.ts
│       │   │   ├── team.controller.ts
│       │   │   ├── court.controller.ts
│       │   │   └── game.controller.ts
│       │   ├── 📁 middleware/      # Express middleware
│       │   │   ├── auth.middleware.ts
│       │   │   ├── validation.middleware.ts
│       │   │   ├── rate-limit.middleware.ts
│       │   │   └── error.middleware.ts
│       │   ├── 📁 routes/          # API routes
│       │   │   ├── auth.routes.ts
│       │   │   ├── user.routes.ts
│       │   │   ├── team.routes.ts
│       │   │   ├── court.routes.ts
│       │   │   └── game.routes.ts
│       │   ├── 📁 services/        # Business logic
│       │   │   ├── auth.service.ts
│       │   │   ├── user.service.ts
│       │   │   ├── team.service.ts
│       │   │   ├── court.service.ts
│       │   │   ├── game.service.ts
│       │   │   ├── matchmaking.service.ts
│       │   │   └── notification.service.ts
│       │   ├── 📁 utils/           # Utility functions
│       │   │   ├── database.ts
│       │   │   ├── jwt.ts
│       │   │   ├── email.ts
│       │   │   ├── upload.ts
│       │   │   └── validation.ts
│       │   ├── 📁 types/           # TypeScript types
│       │   ├── 📁 config/          # Configuration files
│       │   │   ├── database.ts
│       │   │   ├── redis.ts
│       │   │   ├── auth.ts
│       │   │   └── app.ts
│       │   ├── app.ts              # Express app setup
│       │   └── server.ts           # Server entry point
│       ├── 📁 tests/               # API tests
│       ├── package.json
│       └── tsconfig.json
│
├── 📁 packages/                    # Shared packages
│   ├── 📁 database/                # Prisma schema and migrations
│   │   ├── 📁 prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── 📁 migrations/
│   │   │   └── seed.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── 📁 shared-types/            # Shared TypeScript types
│   │   ├── 📁 src/
│   │   │   ├── auth.ts
│   │   │   ├── user.ts
│   │   │   ├── team.ts
│   │   │   ├── court.ts
│   │   │   ├── game.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── 📁 ui-components/           # Shared UI component library
│       ├── 📁 src/
│       │   ├── 📁 components/
│       │   ├── 📁 styles/
│       │   ├── 📁 utils/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── 📁 docs/                        # Documentation
│   ├── 📁 api/                     # API documentation
│   ├── 📁 design/                  # Design system docs
│   ├── 📁 deployment/              # Deployment guides
│   └── README.md
│
├── 📁 scripts/                     # Build and deployment scripts
│   ├── build.sh
│   ├── deploy.sh
│   ├── seed-data.ts
│   └── setup-dev.sh
│
├── 📁 .github/                     # GitHub workflows
│   └── 📁 workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       └── test.yml
│
├── .gitignore
├── .env.example
├── package.json                    # Root package.json for monorepo
├── turbo.json                      # Turborepo configuration
├── README.md
└── LARO_PROJECT_PLAN.md           # This comprehensive plan
```

## 🔧 Key Configuration Files

### Root package.json (Monorepo)
```json
{
  "name": "laro-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Turborepo Configuration (turbo.json)
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {},
    "type-check": {}
  }
}
```

## 🚀 Getting Started Commands

```bash
# Initialize the project structure
mkdir laro-app && cd laro-app

# Set up monorepo
npm init -y
npm install turbo --save-dev

# Create Next.js frontend
npx create-next-app@latest apps/web --typescript --tailwind --app

# Set up backend API
mkdir -p apps/api/src
cd apps/api && npm init -y

# Set up shared packages
mkdir -p packages/{database,shared-types,ui-components}

# Initialize Prisma
cd packages/database
npx prisma init

# Set up development environment
npm run dev
```

This structure provides a scalable, maintainable foundation for the LARO basketball matchmaking application with clear separation of concerns and shared resources.
