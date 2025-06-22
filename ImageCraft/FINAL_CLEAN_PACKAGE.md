# ImagenIA - Complete Clean Package (No Replit References)

Este es el código fuente completo de ImagenIA sin ninguna referencia a Replit. Listo para descargar y ejecutar en cualquier computadora.

## Estructura de Archivos

Crea esta estructura de carpetas y archivos:

```
imagenia/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── .env
├── README.md
├── client/
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── components/
│       │   ├── image-generator.tsx
│       │   ├── image-gallery.tsx
│       │   ├── language-provider.tsx
│       │   └── ui/ (componentes de shadcn)
│       ├── hooks/
│       │   ├── use-translations.ts
│       │   └── use-toast.ts
│       ├── lib/
│       │   ├── queryClient.ts
│       │   └── utils.ts
│       └── pages/
│           ├── home.tsx
│           └── not-found.tsx
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── services/
│       └── openai.ts
└── shared/
    └── schema.ts
```

## Instalación Rápida

1. Crear carpeta: `mkdir imagenia && cd imagenia`
2. Copiar todos los archivos de abajo
3. Ejecutar: `npm install`
4. Crear archivo `.env` con tu API key de OpenAI
5. Ejecutar: `npm run dev`
6. Abrir: http://localhost:3000

---

## ARCHIVOS DEL PROYECTO

### package.json
```json
{
  "name": "imagenia",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "description": "Generador de imágenes AI con máscaras personalizadas",
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "NODE_ENV=development tsx server/index.ts",
    "client": "vite",
    "build": "vite build && tsx build-server.ts",
    "start": "NODE_ENV=production node dist/server.js"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-collapsible": "^1.1.4",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@tanstack/react-query": "^5.60.5",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "drizzle-orm": "^0.39.1",
    "drizzle-zod": "^0.7.0",
    "embla-carousel-react": "^8.6.0",
    "express": "^4.21.2",
    "framer-motion": "^11.13.1",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.453.0",
    "next-themes": "^0.4.6",
    "openai": "^5.5.1",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.15.2",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "wouter": "^3.3.5",
    "zod": "^3.24.2",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.15",
    "@types/express": "4.17.21",
    "@types/node": "20.16.11",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "concurrently": "^8.2.2",
    "esbuild": "^0.25.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.19.1",
    "typescript": "5.6.3",
    "vite": "^5.4.14"
  }
}
```

### .env
```
OPENAI_API_KEY=tu_clave_de_openai_aqui
NODE_ENV=development
PORT=5000
```

### README.md
```markdown
# ImagenIA - Generador de Imágenes con IA

Aplicación web full-stack que genera imágenes de personas con máscaras usando la API DALL-E 3 de OpenAI.

## Características

- Genera imágenes de personas con diferentes tipos de máscaras
- Interfaz bilingüe (Español/Inglés)
- Opciones avanzadas de tamaño y estilo
- Galería interactiva con descarga y compartición
- Diseño responsivo para móvil y escritorio

## Instalación

1. Clonar o extraer este repositorio
2. Instalar dependencias: `npm install`
3. Crear archivo `.env` con tu API key de OpenAI
4. Ejecutar: `npm run dev`
5. Abrir: http://localhost:3000

## Comandos

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción

## Stack Tecnológico

- Frontend: React 18, TypeScript, Tailwind CSS
- Backend: Express.js, Node.js
- IA: OpenAI DALL-E 3 API
- Build: Vite

## Licencia

MIT
```

### server/index.ts
```typescript
import express, { type Request, Response, NextFunction } from "express";
import { storage } from "./storage.js";
import { generateImageRequestSchema } from "../shared/schema.js";
import { generateImage } from "./services/openai.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API Routes
app.post("/api/images/generate", async (req, res) => {
  try {
    const validatedData = generateImageRequestSchema.parse(req.body);
    
    const result = await generateImage({
      prompt: validatedData.prompt,
      maskType: validatedData.maskType,
      size: validatedData.size,
      style: validatedData.style,
    });
    
    const savedImage = await storage.createImage({
      prompt: validatedData.prompt,
      maskType: validatedData.maskType,
      imageUrl: result.url,
      size: validatedData.size,
      style: validatedData.style,
    });
    
    res.json(savedImage);
  } catch (error) {
    console.error("Error generating image:", error);
    
    if (error instanceof Error) {
      res.status(400).json({ 
        error: error.message,
        type: "generation_error"
      });
    } else {
      res.status(500).json({ 
        error: "Internal server error",
        type: "server_error"
      });
    }
  }
});

app.get("/api/images", async (req, res) => {
  try {
    const images = await storage.getImages();
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.get("/api/images/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const image = await storage.getImageById(id);
    
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    
    res.json(image);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

app.delete("/api/images/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await storage.deleteImage(id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Image not found" });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "public");
  app.use(express.static(publicPath));
  
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({ 
    error: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : err.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
```

Este es el código completamente limpio sin referencias a Replit. ¿Te gustaría que continúe con los demás archivos del proyecto?