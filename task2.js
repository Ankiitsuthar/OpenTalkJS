import fs from 'fs/promises'; 
import ollama from "ollama";

async function chatWithOllama() {
    try {
        const q = await fs.readFile("q.txt", "utf8"); 

        const response = await ollama.chat({
            model: "qwen2:0.5b",
            messages: [{ role: "user", content: q }],
        });

        const a = response.message.content;

        await fs.writeFile("a.txt", a); 
        console.log("Response saved to a.txt");
    } catch (error) {
        console.error("Error:", error);
    }
}

chatWithOllama();