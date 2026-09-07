import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { getPageSEO, BRAND_NAME } from "./src/components/seo/seoData";

dotenv.config();

const getDirname = () => {
  if (typeof __dirname !== "undefined") return __dirname;
  try {
    return path.dirname(fileURLToPath(import.meta.url));
  } catch {
    return process.cwd();
  }
};
const currentDirname = getDirname();

const app = express();
const PORT = 3000;

function getPublicBaseUrl(req: express.Request): string {
  const envUrl = process.env.APP_URL || process.env.SITE_URL || process.env.PUBLIC_URL;
  if (envUrl && envUrl.trim() !== "" && !envUrl.includes("localhost")) {
    return envUrl.trim().replace(/\/$/, "");
  }

  const forwardedProto = req.headers["x-forwarded-proto"];
  const proto = typeof forwardedProto === "string" ? forwardedProto.split(",")[0].trim() : (req.protocol || "https");
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (host && typeof host === "string" && !host.includes("localhost") && !host.includes("127.0.0.1")) {
    return `${proto}://${host}`.replace(/\/$/, "");
  }

  return "https://ais-dev-mzkr66cz6y3y3g4j5pzpkd-91515516273.asia-southeast1.run.app";
}

function injectMetaTags(html: string, req: express.Request): string {
  const baseUrl = getPublicBaseUrl(req);
  const seo = getPageSEO(req.path, baseUrl);

  let updated = html;

  // Replace Title
  updated = updated.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);

  // Replace standard tags
  updated = updated.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${seo.description}" />`);
  updated = updated.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, `<meta name="keywords" content="${seo.keywords}" />`);
  updated = updated.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${seo.canonical}" />`);

  // Replace OG tags
  updated = updated.replace(/<meta\s+property="og:site_name"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:site_name" content="${seo.ogSiteName}" />`);
  updated = updated.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${seo.ogUrl}" />`);
  updated = updated.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${seo.ogTitle}" />`);
  updated = updated.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${seo.ogDescription}" />`);
  updated = updated.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${seo.ogImage}" />`);
  updated = updated.replace(/<meta\s+property="og:image:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image:url" content="${seo.ogImageUrl}" />`);
  updated = updated.replace(/<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image:secure_url" content="${seo.ogImageSecureUrl}" />`);
  updated = updated.replace(/<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image:alt" content="${seo.ogImageAlt}" />`);

  // Replace Twitter tags
  updated = updated.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${seo.twitterTitle}" />`);
  updated = updated.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${seo.twitterDescription}" />`);
  updated = updated.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${seo.twitterImage}" />`);
  updated = updated.replace(/<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image:alt" content="${seo.twitterImageAlt}" />`);

  return updated;
}

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

    // Custom HTML SEO middleware for crawler previews & dynamic metadata in dev
    app.use(async (req, res, next) => {
      const isHtmlRequest =
        req.method === "GET" &&
        (req.headers.accept?.includes("text/html") || req.path === "/" || !req.path.includes(".")) &&
        !req.path.startsWith("/@") &&
        !req.path.startsWith("/src") &&
        !req.path.startsWith("/node_modules");

      if (isHtmlRequest) {
        try {
          const rawHtml = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8");
          const transformed = await vite.transformIndexHtml(req.originalUrl || req.url, rawHtml);
          const enriched = injectMetaTags(transformed, req);
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.send(enriched);
        } catch (err) {
          return next(err);
        }
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      try {
        const indexPath = path.join(distPath, "index.html");
        const html = fs.readFileSync(indexPath, "utf-8");
        const enriched = injectMetaTags(html, req);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(enriched);
      } catch (_e) {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 AKorix Digital Solutions server running on http://localhost:${PORT}`);
  });
}

startServer();
