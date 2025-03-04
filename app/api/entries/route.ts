import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { generateEmbedding } from '@/lib/gemini';
import { Entry } from '@/lib/types';
// import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, type, content, source, tags, userId } = body;
    
    if (!title || !type || !content || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate embedding for the content
    const embedding = await generateEmbedding(content);
    
    // Create entry object without _id (MongoDB will generate it)
    const entry :Entry = {
      userId,
      type,
      title,
      content,
      source: source || undefined,
      tags: tags || [],
      embedding,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('synapse');
    
    // Insert entry
    const result = await db.collection('entries').insertOne(entry);
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error creating entry:', error);
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('synapse');
    
    // Get entries for user
    const entries = await db.collection('entries')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    );
  }
}