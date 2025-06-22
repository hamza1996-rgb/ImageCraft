![image](https://github.com/user-attachments/assets/4eb13575-d49e-4fd4-85c4-f94f44a5339a)


ImagenIA - AI-Powered Image Generator
Overview
ImagenIA is a full-stack web application that generates AI-powered images using OpenAI's DALL-E 3 API. The application specializes in creating images with different mask types (medical, fashion, carnival, sports, artistic, custom) and allows users to manage a gallery of their generated images. The system supports bilingual functionality (Spanish/English) and provides a modern, responsive user interface.

System Architecture
Frontend Architecture
Framework: React 18 with TypeScript for type safety and modern development
Build Tool: Vite for fast development and optimized production builds
UI Framework: shadcn/ui components built on Radix UI primitives for accessible, consistent design
Styling: Tailwind CSS with custom design tokens and dark theme support
State Management: TanStack Query (React Query) for efficient server state management and caching
Form Handling: React Hook Form with Zod validation for robust form management
Routing: Wouter for lightweight client-side routing
Internationalization: Custom hook-based translation system supporting Spanish and English
Backend Architecture
Runtime: Node.js with TypeScript for type-safe server development
Framework: Express.js providing RESTful API endpoints
Database: PostgreSQL with Drizzle ORM for type-safe database operations
Database Provider: Neon Database (serverless PostgreSQL) for scalable data storage
AI Integration: OpenAI DALL-E 3 API for high-quality image generation
Storage Strategy: Flexible storage implementation supporting both in-memory and database persistence
Development Environment
Deployment: Replit-optimized with static deployment configuration
Package Management: npm with comprehensive dependency management
Code Quality: TypeScript strict mode enabled across all modules
Key Components
Database Schema
The application uses a simple but effective schema:

users: User authentication and profile management (prepared for future auth implementation)
generated_images: Stores image metadata including prompts, mask types, URLs, sizes, styles, and timestamps
API Endpoints
POST /api/images/generate: Generate new images using OpenAI DALL-E 3 with enhanced prompt engineering
GET /api/images: Retrieve all generated images with proper error handling
GET /api/images/:id: Get specific image by ID
DELETE /api/images/:id: Delete image by ID with cascading cleanup
Core Features
Advanced Image Generation: Sophisticated prompt engineering that combines user input with mask type and style preferences
Gallery Management: Comprehensive image management with view, download, share, and delete capabilities
Responsive Design: Mobile-first approach with adaptive layouts
Bilingual Support: Seamless language switching between Spanish and English
Error Handling: Robust error management with user-friendly feedback
Loading States: Smooth user experience with proper loading indicators
Data Flow
Image Generation Flow:

User inputs prompt, selects mask type and advanced options
Frontend validates input using Zod schemas
Enhanced prompt is constructed based on mask type and style
OpenAI API request is made with optimized parameters
Generated image URL is stored in database with metadata
Image appears in gallery with real-time updates
Gallery Management Flow:

Images are fetched using React Query for efficient caching
Users can view images in grid or list layout
Download functionality handles both direct downloads and fallback methods
Delete operations update the UI optimistically
External Dependencies
Core Dependencies
OpenAI: DALL-E 3 API for image generation
Neon Database: Serverless PostgreSQL hosting
Drizzle ORM: Type-safe database operations
React Query: Server state management
Radix UI: Accessible component primitives
Tailwind CSS: Utility-first styling
Development Dependencies
Vite: Build tool and development server
TypeScript: Type checking and development experience
ESBuild: Fast bundling for production
Deployment Strategy
The application is configured for multiple deployment scenarios:

Replit Deployment
Static deployment with Vite build process
Automatic port configuration (5000 internal, 80 external)
Development workflow with hot reloading
Standalone Deployment
Self-contained package with all dependencies
Environment variable configuration for different environments
Production-ready build scripts
Environment Configuration
Development: In-memory storage fallback, detailed logging
Production: Database persistence, optimized builds
OpenAI Integration: Configurable API key with fallback handling
