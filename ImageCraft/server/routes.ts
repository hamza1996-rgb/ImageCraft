import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateImageRequestSchema } from "@shared/schema";
import { generateImage } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate image endpoint
  app.post("/api/images/generate", async (req, res) => {
    try {
      const validatedData = generateImageRequestSchema.parse(req.body);
      
      // Generate image using OpenAI
      const result = await generateImage({
        prompt: validatedData.prompt,
        maskType: validatedData.maskType,
        size: validatedData.size,
        style: validatedData.style,
      });
      
      // Store in database
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

  // Get all images
  app.get("/api/images", async (req, res) => {
    try {
      const images = await storage.getImages();
      res.json(images);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  });

  // Get single image
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

  // Delete image
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

  const httpServer = createServer(app);
  return httpServer;
}
