import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const slides = pgTable("slides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: jsonb("content").notNull(), // Array of strings or object structure
  slideOrder: integer("slide_order").notNull(),
  theme: text("theme").default("default"), // For different slide layouts
});

export const insertSlideSchema = createInsertSchema(slides);

export type Slide = typeof slides.$inferSelect;
export type InsertSlide = z.infer<typeof insertSlideSchema>;
