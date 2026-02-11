import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { slides } from "@shared/schema";
import { db } from "./db";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.slides.list.path, async (req, res) => {
    const slides = await storage.getSlides();
    res.json(slides);
  });

  await seedDatabase();

  return httpServer;
}

export async function seedDatabase() {
  const existingSlides = await storage.getSlides();
  if (existingSlides.length > 0) return;

  const initialSlides = [
    {
      title: "SMART HOUSE: EVOLUTION",
      content: { 
        subtitle: "The Future of Living", 
        description: "Experience the next generation of home automation where every element of your living space is interconnected and intelligent. A Smart House is more than just technology; it is a lifestyle transformation focused on comfort, security, and sustainability.",
        image: "/images/ultra-hero.jpg"
      },
      slideOrder: 1,
      theme: "cover"
    },
    {
      title: "What is a Smart House?",
      content: {
        points: [
          "Global Connectivity: Devices communicate seamlessly across a unified network.",
          "Intelligent Automation: Learning your habits to pre-emptively adjust settings.",
          "Remote Management: Full control from anywhere in the world via smartphone.",
          "Enhanced Living: Focusing on reducing manual tasks and maximizing relaxation.",
          "Adaptive Environments: Rooms that react to your presence and mood automatically."
        ],
        image: "/images/smart-living.jpg"
      },
      slideOrder: 2,
      theme: "default"
    },
    {
      title: "System Architecture",
      content: {
        steps: [
          { icon: "Cpu", label: "Edge Sensors", targetSlide: 4 },
          { icon: "Wifi", label: "Neural Mesh Network", targetSlide: 5 },
          { icon: "Cloud", label: "AI Cloud Core", targetSlide: 6 },
          { icon: "Smartphone", label: "Master Command App", targetSlide: 10 }
        ],
        description: "The backbone of any modern smart home involves a multi-layered approach to data flow. Click any node to explore its details."
      },
      slideOrder: 3,
      theme: "architecture"
    },
    {
      title: "Core Technologies",
      content: {
        grid: [
          { title: "IoT 5.0", desc: "Ultra-low latency connectivity for thousands of simultaneous devices.", icon: "iot" },
          { title: "Quantum AI", desc: "Predictive algorithms that anticipate your needs before you do.", icon: "ai" },
          { title: "Fog Computing", desc: "Localized processing for instantaneous reaction times and privacy.", icon: "cloud" },
          { title: "Bio-Authentication", desc: "Secure access through advanced facial and gait recognition.", icon: "cpu" }
        ],
        image: "/images/datacenter.jpg"
      },
      slideOrder: 4,
      theme: "grid"
    },
    {
      title: "Smart Devices Ecosystem",
      content: {
        list: [
          "Dynamic Holographic Displays for home entertainment and information.",
          "Smart Kitchen surfaces with integrated induction and nutrition analysis.",
          "Robotic maintenance systems for automated cleaning and minor repairs.",
          "Immersive audio environments that follow you through the house.",
          "Smart glass that adjusts transparency based on sunlight and privacy needs."
        ],
        image: "/images/smart-kitchen.jpg"
      },
      slideOrder: 5,
      theme: "default"
    },
    {
      title: "Advanced Security Hub",
      content: {
        features: [
          { title: "Intrusion Prevention", description: "Multi-layered perimeter defense with automated drone response." },
          { title: "Cyber-Shield", description: "Enterprise-grade encryption for all internal home communications." },
          { title: "Health Guardian", description: "Constant monitoring of air quality and biometric vitals for occupants." },
          { title: "Instant Alerts", description: "Real-time notifications sent to emergency services and your mobile." }
        ],
        image: "/images/ultra-security.jpg"
      },
      slideOrder: 6,
      theme: "security"
    },
    {
      title: "Energy & Sustainability",
      content: {
        points: [
          "Net-Zero living through optimized solar and wind energy harvesting.",
          "Smart Grid integration for selling excess power back to the city.",
          "Water recycling systems that monitor and minimize every drop used.",
          "Predictive climate control that uses 40% less energy than standard systems.",
          "AI-driven appliance management to avoid peak electricity pricing."
        ],
        image: "/images/ultra-energy.jpg"
      },
      slideOrder: 7,
      theme: "green"
    },
    {
      title: "Smart Living Spaces",
      content: {
        list: [
          "Automated Bedroom climate and lighting for optimal sleep cycles.",
          "Intelligent Bathrooms with health monitoring and water conservation.",
          "Futuristic Kitchens with inventory tracking and recipe assistance.",
          "Smart Gardens with autonomous irrigation and pest control."
        ],
        image: "/images/smart-bathroom.jpg"
      },
      slideOrder: 8,
      theme: "default"
    },
    {
      title: "The Future: Smart Cities",
      content: {
        points: [
          "Houses that share data with city traffic and health networks.",
          "Fully autonomous drone delivery pads integrated into every roof.",
          "Vertical urban farming modules within the home ecosystem.",
          "Modular architecture that can expand or shrink based on needs.",
          "Community-wide energy sharing networks for total efficiency."
        ],
        image: "/images/smart-garden.jpg"
      },
      slideOrder: 9,
      theme: "future"
    },
    {
      title: "The Connected Horizon",
      content: { 
        subtitle: "Embrace Innovation", 
        description: "The future isn't just about the gadgets we use, but the environments we build to support our human potential. Smart Homes are the first step towards a truly integrated and sustainable planetary civilization.",
        image: "/images/ultra-hero.jpg"
      },
      slideOrder: 10,
      theme: "cover"
    }
  ];

  for (const slide of initialSlides) {
    await storage.createSlide(slide);
  }
}
