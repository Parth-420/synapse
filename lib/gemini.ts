const { GoogleGenerativeAI } = require("@google/generative-ai");
if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004"});
const generativeModel =  genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "You are a helpful and knowledgeable assistant that answers questions based exclusively on the user's personal knowledge base. Use only the context in the prompt to craft a thorough and moderately detailed answer. Your answer should include relevant details and explanations that help the user understand the subject, but if the context does not contain sufficient information, respond with I don't have enough information to answer that question. Do not include any additional details or speculation outside of the given context.",
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(text)
  return result.embedding.values;
}

export async function generateAnswer(question: string, context: string[]): Promise<string> {
  const contextText = context.join('\n\n');

  
  console.log("Context Text:", contextText);
  
  const prompt = `Context:${contextText}

              Question: ${question}

              Answer:`;
  
  console.log("Prompt:", prompt);

  const result = await generativeModel.generateContent({
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      maxOutputTokens: 300,
      temperature: 0.5,
    }
});
  const response = await result.response;
  const responseText = await response.text();
  
  
  console.log("LLM Response:", responseText);
  
  return responseText || "Sorry, I couldn't generate an answer.";
}
