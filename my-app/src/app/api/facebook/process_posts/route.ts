import { NextRequest, NextResponse } from 'next/server';
import processPosts from '@/lib/post_processing/proccess_posts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { posts } = body;

    if (!Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid or empty posts array.' },
        { status: 400 }
      );
    }

    await processPosts(posts);

    return NextResponse.json({ success: true, message: 'Posts processed.' });
  } catch (error: any) {
    console.error('Error processing posts:', error);
    return NextResponse.json(
      { success: false, message: 'Server error while processing posts.' },
      { status: 500 }
    );
  }
}
