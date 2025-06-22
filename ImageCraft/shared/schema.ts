import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const generatedImages = pgTable("generated_images", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  maskType: text("mask_type").notNull(),
  imageUrl: text("image_url").notNull(),
  size: text("size").notNull().default("1024x1024"),
  style: text("style").notNull().default("realistic"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertImageSchema = createInsertSchema(generatedImages).omit({
  id: true,
  createdAt: true,
});

export const generateImageRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  maskType: z.enum(["medical", "fashion", "carnival", "sports", "artistic", "custom"]),
  size: z.enum(["1024x1024", "1792x1024", "1024x1792"]).default("1024x1024"),
  style: z.enum(["realistic", "artistic", "cartoon", "abstract"]).default("realistic"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GeneratedImage = typeof generatedImages.$inferSelect;
export type InsertImage = z.infer<typeof insertImageSchema>;
export type GenerateImageRequest = z.infer<typeof generateImageRequestSchema>;
