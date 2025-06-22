# PROJECT_DOCUMENTATION

## Overview

ImagenIA is a full-stack web application that generates AI-powered images using OpenAI's DALL-E 3 API. The application allows users to create images with different mask types (medical, fashion, carnival, sports, artistic, custom) and various styling options. It features a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and dark theme
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight client-side routing
- **Internationalization**: Custom hook-based translation system supporting Spanish and English

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for RESTful API
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **AI Integration**: OpenAI API for DALL-E 3 image generation

### Project Structure
```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── migrations/      # Database migrations
└── dist/           # Production build output
```

## Key Components

### Database Schema
- **users**: User authentication and profile data
- **generated_images**: Storage for generated image metadata including prompts, mask types, URLs, and creation timestamps

### API Endpoints
- `POST /api/images/generate`: Generate new images using OpenAI DALL-E 3
- `GET /api/images`: Retrieve all generated images
- `GET /api/images/:id`: Get specific image by ID
- `DELETE /api/images/:id`: Delete image by ID

### Core Features
- **Image Generation**: Advanced prompt engineering with mask type and style integration
- **Gallery Management**: View, download, share, and delete generated images
- **Responsive Design**: Mobile-first design with grid and list view modes
- **Multi-language Support**: Spanish and English localization
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Data Flow

1. **Image Generation Flow**:
   - User inputs prompt and selects options via React form
   - Frontend validates input using Zod schemas
   - Request sent to Express API endpoint
   - Backend enhances prompt based on mask type and style
   - OpenAI DALL-E 3 API generates image
   - Image metadata stored in PostgreSQL database
   - Generated image returned to frontend and cached

2. **Gallery Flow**:
   - Frontend fetches images via TanStack Query
   - Images displayed in responsive grid/list layout
   - User interactions (download, delete) trigger API calls
   - Real-time UI updates using optimistic updates and cache invalidation

## External Dependencies

### Core Dependencies
- **OpenAI API**: DALL-E 3 for image generation
- **Neon Database**: Serverless PostgreSQL hosting
- **Radix UI**: Accessible component primitives
- **Date-fns**: Date formatting and manipulation

### Development Tools
- **Drizzle Kit**: Database schema management and migrations
- **ESBuild**: Fast bundling for production builds
- **TSX**: TypeScript execution for development

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20, PostgreSQL 16 modules
- **Hot Reload**: Vite HMR for frontend, nodemon-like behavior for backend
- **Database**: Automatic PostgreSQL provisioning via Replit

### Production Build
- **Frontend**: Vite build with code splitting and optimization
- **Backend**: ESBuild bundling with external packages
- **Static Assets**: Served from Express with proper caching headers
- **Database**: Drizzle migrations applied automatically

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (auto-provisioned in Replit)
- **OPENAI_API_KEY**: Required for image generation functionality
- **NODE_ENV**: Environment detection for development/production modes

## Recent Changes
- June 19, 2025: Initial ImagenIA setup completed
- June 19, 2025: Fixed image generation functionality and download issues
- June 19, 2025: User successfully generated first image with mask functionality
- June 19, 2025: Improved download functionality with CORS handling and fallback options
- June 19, 2025: Fixed accessibility warnings in dialog components

## User Preferences

Preferred communication style: Simple, everyday language.