import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialization helper for Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Serve public static assets (favicons, manifest, robots.txt, sitemap.xml, og-image.png)
app.use(express.static(path.join(process.cwd(), "public")));

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "AKorix Digital Solutions API" });
});

// AI Project Roadmap & Scope Generator Endpoint
app.post("/api/ai-roadmap", async (req, res) => {
  try {
    const { prompt, serviceType, targetTimeline, targetBudget } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Project prompt is required." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are the Lead Digital Architect at AKorix Digital Solutions, a top-tier digital product agency. 
Your goal is to analyze a client's project idea and return a detailed, professional, structured project proposal blueprint formatted as JSON.

Your response MUST be a valid JSON object matching this schema exactly:
{
  "projectName": "Catchy, professional project name",
  "tagline": "A 1-sentence value proposition",
  "overview": "Comprehensive 2-3 sentence strategic executive summary of the solution",
  "recommendedStack": ["Tech 1", "Tech 2", "Tech 3", "Tech 4", "Tech 5"],
  "architectureHighlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
  "phases": [
    {
      "phase": "Phase 1: Discovery & UI/UX Design",
      "duration": "2 Weeks",
      "deliverables": ["Wireframes", "Interactive Prototype", "Brand System"]
    },
    {
      "phase": "Phase 2: Core Engineering & Backend API",
      "duration": "4 Weeks",
      "deliverables": ["Database Architecture", "API Endpoints", "Auth Engine"]
    },
    {
      "phase": "Phase 3: Integration & Testing",
      "duration": "2 Weeks",
      "deliverables": ["QA Testing", "Performance Optimization", "Security Audit"]
    },
    {
      "phase": "Phase 4: Launch & Scaling",
      "duration": "1 Week",
      "deliverables": ["Production Deployment", "CI/CD Pipeline", "Handoff & Docs"]
    }
  ],
  "estimatedTimeline": "7-9 Weeks",
  "estimatedBudgetRange": "$8,500 - $14,000",
  "keyFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  "freelanceTalentNeeded": ["Lead Full-Stack Developer", "Senior UI/UX Designer", "DevOps Specialist"],
  "akorixValueAdd": "How AKorix ensures 10x quality, security, speed-to-market, and continuous post-launch support."
}

Do NOT wrap response in markdown code fences like \`\`\`json. Return pure raw JSON string only.`;

    const userPromptText = `Client Project Idea: "${prompt}"
${serviceType ? `Preferred Service Focus: ${serviceType}` : ""}
${targetTimeline ? `Target Timeline: ${targetTimeline}` : ""}
${targetBudget ? `Target Budget Range: ${targetBudget}` : ""}

Analyze this project request thoroughly and generate a complete AKorix architectural blueprint JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPromptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from Gemini model.");
    }

    const parsedJson = JSON.parse(text);
    return res.json(parsedJson);
  } catch (error: any) {
    console.error("Error generating AI roadmap:", error);
    return res.status(500).json({
      error: error?.message || "Failed to generate project roadmap blueprint.",
    });
  }
});

// Start server with Vite or Static
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 AKorix Digital Solutions server running on http://localhost:${PORT}`);
  });
}

startServer();
