import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  
  return response.data[0].embedding;
}

export async function generateAnswer(question: string, context: string[]): Promise<string> {
  const contextText = context.join('\n\n');
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that answers questions based on the user's personal knowledge base. Use only the provided context to answer the question. If the context doesn't contain relevant information, say you don't have enough information to answer."
      },
      {
        role: "user",
        content: `Context:\n${contextText}\n\nQuestion: ${question}\n\nAnswer:`
      }
    ],
    temperature: 0.5,
    max_tokens: 500,
  });
  
  return response.choices[0].message.content || "Sorry, I couldn't generate an answer.";
}

export default openai;