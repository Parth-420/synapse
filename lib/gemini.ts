const { GoogleGenerativeAI } = require("@google/generative-ai");
if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004"});
const generativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function generateEmbedding(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(text)
  return result.embedding.values;
}

export async function generateAnswer(question: string, context: string[]): Promise<string> {
  const contextText = context.join('\n\n');
  
  const prompt = `
You are a helpful assistant that answers questions based on the user's personal knowledge base.
Use only the provided context to answer the question. If the context doesn't contain relevant information, 
say you don't have enough information to answer.

Context:
${contextText}

Question: ${question}

Answer:`;

  const result = await generativeModel.generateContent(prompt);
  const response = await result.response;
  return response.text() || "Sorry, I couldn't generate an answer.";
}

