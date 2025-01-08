import fs from 'fs';

import ollama from "ollama";

const q = fs.readFileSync("q.txt", "utf8");


const response = await ollama.chat({
    model: "qwen2:0.5b",
    messages: [{ role: "user", content: q }],
});

const a = response.message.content;

fs.writeFileSync("a.txt", a);