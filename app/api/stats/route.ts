import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

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
    
    // Get counts by type
    const totalCount = await db.collection('entries').countDocuments({ userId });
    const quoteCount = await db.collection('entries').countDocuments({ userId, type: 'quote' });
    const noteCount = await db.collection('entries').countDocuments({ userId, type: 'note' });
    const linkCount = await db.collection('entries').countDocuments({ userId, type: 'link' });
    
    return NextResponse.json({
      total: totalCount,
      quotes: quoteCount,
      notes: noteCount,
      links: linkCount
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 