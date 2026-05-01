import express, { response } from 'express'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import cors from 'cors'

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());


const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "My App"
    }
})

app.post("/chat", async(req, res) => {
    try {
        const { message } = req.body;
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
        console.log('err==', err)
    }
})


app.listen(3000, "0.0.0.0", () => {
  console.log("server running");
});
