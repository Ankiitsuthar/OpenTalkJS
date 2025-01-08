import fs from 'fs';
import ollama from "ollama";


async function processQuery() {
    fs.readFile("q.txt", "utf8", async (readErr, q) => {
        if (readErr) {
            console.error("Error reading q.txt:", readErr);
            return;
        }

        try {
            
            const response = await ollama.chat({
                model: "qwen2:0.5b",
                messages: [{ role: "user", content: q }],
            });

            const a = response.message.content;

           
            fs.writeFile("a.txt", a, (writeErr) => {
                if (writeErr) {
                    console.error("Error writing to a.txt:", writeErr);
                } else {
                    console.log("Response written to a.txt successfully!");
                }
            });
        } catch (apiError) {
            console.error("Error processing the chat response:", apiError);
        }
    });
}


processQuery();