import { db } from "./db";
import { slides, type Slide, type InsertSlide } from "@shared/schema";
import { asc } from "drizzle-orm";

export interface IStorage {
  getSlides(): Promise<Slide[]>;
  createSlide(slide: InsertSlide): Promise<Slide>;
}

export class DatabaseStorage implements IStorage {
  async getSlides(): Promise<Slide[]> {
    return await db.select().from(slides).orderBy(asc(slides.slideOrder));
  }

  async createSlide(slide: InsertSlide): Promise<Slide> {
    const [newSlide] = await db.insert(slides).values(slide).returning();
    return newSlide;
  }
}

export const storage = new DatabaseStorage();
