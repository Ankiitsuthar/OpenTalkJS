import fs from 'fs';
import path from 'path';
import ollama from 'ollama';

// Function to ask questions to Ollama
function askOllama(question) {
    return ollama.chat({
        model: 'qwen2:0.5b', // Updated model from previous code
        messages: [{ role: 'user', content: question }],
    })
    .then(response => response.message.content)
    .catch(error => {
        console.error('Error:', error);
        return null;
    });
}

// Function to process batch questions
async function processBatchQuestions() {
    const questionsDir = './questions';
    const answersDir = './answers';

    // Create answers directory if it doesn't exist
    if (!fs.existsSync(answersDir)) {
        fs.mkdirSync(answersDir);
    }

    const files = fs.readdirSync(questionsDir)
        .filter(file => file.startsWith('q') && file.endsWith('.txt'))
        .sort();

    for (const file of files) {
        // Extract number from filename (e.g., "q1.txt" -> "1")
        const number = file.match(/q(\d+)\.txt/)[1];

        // Read question
        const question = fs.readFileSync(path.join(questionsDir, file), 'utf8');

        console.log(`Processing question ${number}...`);
        const answer = await askOllama(question);
        if (answer) {
            const answerFile = `a${number}.txt`;
            fs.writeFileSync(path.join(answersDir, answerFile), answer);
            console.log(`Answer ${number} has been written to ${answerFile}`);
        } else {
            console.log(`Failed to get answer for question ${number}`);
        }
    }
}

// Execute batch processing
processBatchQuestions().then(() => {
    console.log('Batch processing completed');
}).catch(error => {
    console.error('Batch processing failed:', error);
});