import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { generateEmbedding, generateAnswer } from '@/lib/gemini';
import { Entry, SearchResponse } from '@/lib/types';
import { WithId } from 'mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Verify user is authenticated
  const session = await getServerSession(authOptions);
  console.log(session);
  
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const userId = searchParams.get('userId');
  
  if (!query || !userId) {
    return NextResponse.json(
      { error: 'Query and userId are required' },
      { status: 400 }
    );
  }
  
  // Verify the userId matches the authenticated user
  if (userId !== session.user.id) {
    return NextResponse.json(
      { error: 'Unauthorized: You can only search your own entries' },
      { status: 403 }
    );
  }

  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('synapse');
    // const coll = db.collection("entries");
    let searchResults;
    try {
      // Execute vector search using MongoDB Atlas Vector Search
      const pipeline = [
        {
          $vectorSearch: {
            index: "default",
            queryVector: queryEmbedding,
            path: "embedding",
            numCandidates: 100,
            limit: 1
          }
        },
        {
          $match: {
            userId: userId
          }
        },
        {
          $project: {
            _id: 1,
            type: 1,
            content: 1,
            title: 1,
            source: 1,
            tags: 1,
            createdAt: 1,
            updatedAt: 1,
            score: { $meta: "vectorSearchScore" }
          }
        }
      ];
      
      searchResults = await db.collection('entries').aggregate(pipeline).toArray();
    } catch (vectorSearchError) {
      console.error('Vector search error:', vectorSearchError);
      
      // Return a specific error for vector search failure
      return NextResponse.json(
        { 
          error: 'Vector search not available', 
          message: 'Your MongoDB Atlas configuration could not vector search.'
        },
        { status: 400 }
      );
    }
    
    if (!searchResults || searchResults.length === 0) {
      return NextResponse.json({
        results: [],
        answer: "I couldn't find any relevant information in your knowledge base."
      });
    }
    
    // Extract content from search results to use as context
    const context = searchResults.map(result => {
      const entry = result as unknown as WithId<Entry> & { score?: number };
      
      // Only include relevant content, not the userId
      let contextText = entry.content || '';
      
      // Strip HTML tags if content appears to contain HTML using a regex
      if (contextText.includes('<') && contextText.includes('>')) {
        contextText = contextText.replace(/<[^>]*>/g, ' ').replace(/\s\s+/g, ' ').trim();
      }
      
      if (entry.title) {
        contextText = `Title: ${entry.title}\n${contextText}`;
      }
      
      if (entry.source) {
        contextText += `\nSource: ${entry.source}`;
      }
      
      if (entry.tags && entry.tags.length > 0) {
        contextText += `\nTags: ${entry.tags.join(', ')}`;
      }
      
      return contextText;
    });
    
    // Generate answer using Gemini
    const answer = await generateAnswer(query, context);
    
    // Format and return the response
    const response: SearchResponse = {
      results: searchResults.map(result => {
        const entry = result as unknown as WithId<Entry> & { score?: number };
        return {
          entry: {
            ...entry,
            _id: entry._id.toString(),
            createdAt: entry.createdAt instanceof Date ? entry.createdAt : new Date(entry.createdAt),
            updatedAt: entry.updatedAt instanceof Date ? entry.updatedAt : new Date(entry.updatedAt)
          },
          score: entry.score || 0
        };
      }),
      answer
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
