import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { generateEmbedding } from '@/lib/gemini';
import { Entry, SearchResult, SearchResponse } from '@/lib/types';
import { WithId, Document } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const userId = searchParams.get('userId');
    
    if (!query || !userId) {
      return NextResponse.json(
        { error: 'Query and userId are required' },
        { status: 400 }
      );
    }
    
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('synapse');
    
    // Perform vector search
    // Note: This assumes you've set up a vector search index in MongoDB Atlas
    // In a real implementation, you would use MongoDB Atlas Vector Search
    // For simplicity, we're using a basic approach here
    const entries = await db.collection('entries')
      .find({ userId })
      .toArray();
    
    // Calculate cosine similarity between query and each entry
    // This is a simplified approach - in production use MongoDB's vector search
    const results: SearchResult[] = entries.map(entry => {
      // Cast MongoDB document to Entry type
      const entryWithId = entry as unknown as WithId<Entry>;
      const similarity = cosineSimilarity(queryEmbedding, entryWithId.embedding || []);
      return {
        entry: {
          ...entryWithId,
          _id: entryWithId._id.toString(),
          createdAt: new Date(entryWithId.createdAt),
          updatedAt: new Date(entryWithId.updatedAt)
        },
        score: similarity
      };
    });
    
    // Sort by similarity score
    results.sort((a, b) => b.score - a.score);
    
    // Take top 5 results
    const topResults = results.slice(0, 5);
    
    // Generate a simple answer based on top results
    const answer = `Found ${topResults.length} relevant entries.`;
    
    const response: SearchResponse = {
      results: topResults,
      answer
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}

// Helper function to calculate cosine similarity
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must be of the same length');
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] ** 2;
    normB += vecB[i] ** 2;
  }
  
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  
  if (normA === 0 || normB === 0) {
    return 0;
  }
  
  return dotProduct / (normA * normB);
}