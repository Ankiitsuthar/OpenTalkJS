// import ollama from "ollama";

// async function runChat() {
//   try {
//     const response = await ollama.chat({
//       model: "qwen2:0.5b",
//       messages: [{ role: 'user', content: "Write product descriptions" }]
//     });

//     console.log("Chatbot Response:", response.message.content);
//   } catch (error) {
//     console.error("Error occurred:", error.message);
//   }
// }

// runChat();



//Stage 2
// import fs from 'fs';
// import ollama from "ollama";


// async function processQuery() {
//     fs.readFile("q.txt", "utf8", async (readErr, q) => {
//         if (readErr) {
//             console.error("Error reading q.txt:", readErr);
//             return;
//         }

//         try {
            
//             const response = await ollama.chat({
//                 model: "qwen2:0.5b",
//                 messages: [{ role: "user", content: q }],
//             });

//             const a = response.message.content;

           
//             fs.writeFile("a.txt", a, (writeErr) => {
//                 if (writeErr) {
//                     console.error("Error writing to a.txt:", writeErr);
//                 } else {
//                     console.log("Response written to a.txt successfully!");
//                 }
//             });
//         } catch (apiError) {
//             console.error("Error processing the chat response:", apiError);
//         }
//     });
// }


// processQuery();


//Stage 3
// import fs from 'fs';
// import path from 'path';
// import ollama from 'ollama';

// // Function to ask questions to Ollama
// function askOllama(question) {
//     return ollama.chat({
//         model: 'qwen2:0.5b', // Updated model from previous code
//         messages: [{ role: 'user', content: question }],
//     })
//     .then(response => response.message.content)
//     .catch(error => {
//         console.error('Error:', error);
//         return null;
//     });
// }

// // Function to process batch questions
// async function processBatchQuestions() {
//     const questionsDir = './questions';
//     const answersDir = './answers';

//     // Create answers directory if it doesn't exist
//     if (!fs.existsSync(answersDir)) {
//         fs.mkdirSync(answersDir);
//     }

//     const files = fs.readdirSync(questionsDir)
//         .filter(file => file.startsWith('q') && file.endsWith('.txt'))
//         .sort();

//     for (const file of files) {
//         // Extract number from filename (e.g., "q1.txt" -> "1")
//         const number = file.match(/q(\d+)\.txt/)[1];

//         // Read question
//         const question = fs.readFileSync(path.join(questionsDir, file), 'utf8');

//         console.log(`Processing question ${number}...`);
//         const answer = await askOllama(question);
//         if (answer) {
//             const answerFile = `a${number}.txt`;
//             fs.writeFileSync(path.join(answersDir, answerFile), answer);
//             console.log(`Answer ${number} has been written to ${answerFile}`);
//         } else {
//             console.log(`Failed to get answer for question ${number}`);
//         }
//     }
// }

// // Execute batch processing
// processBatchQuestions().then(() => {
//     console.log('Batch processing completed');
// }).catch(error => {
//     console.error('Batch processing failed:', error);
// });




