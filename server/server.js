import express from 'express'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import cors from 'cors'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.use(cors());
app.use(express.json());

const client = OPENROUTER_API_KEY
    ? new OpenAI({
          apiKey: OPENROUTER_API_KEY,
          baseURL: "https://openrouter.ai/api/v1",
          defaultHeaders: {
              "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
              "X-Title": "My App"
          }
      })
    : null;

app.get("/", (_req, res) => {
    res.json({ ok: true, message: "Server is running" });
});

app.post("/chat", async(req, res) => {
    try {
        if (!client) {
            return res.status(500).json({
                error: "OPENROUTER_API_KEY is missing on the server"
            });
        }

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "message is required"
            });
        }

        const response = await client.chat.completions.create({
            model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
            messages: [
                { role: "system", content: "You are helpful assitant" },
                { role: "user", content: message }
            ]
        });

        res.json({
            reply: response.choices[0].message.content
        })
    } catch (err) {
        console.error('chat route error:', err);
        res.status(500).json({
            error: "Failed to generate response"
        });
    }
})

process.on("uncaughtException", (err) => {
  console.error("uncaughtException:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("unhandledRejection:", reason);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT, shutting down");
  server.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM, shutting down");
  server.close(() => process.exit(0));
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`server running on port ${PORT}`);
});

server.on("close", () => {
  console.log("HTTP server closed");
});

server.on("error", (err) => {
  console.error("HTTP server error:", err);
});
