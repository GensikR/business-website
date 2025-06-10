import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fetchFacebookPosts from '@/lib/post_processing/fetch_posts';
import processPosts from '@/lib/post_processing/proccess_posts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accessToken } = body;

    if (!accessToken || typeof accessToken !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Access token missing or invalid' },
        { status: 400 }
      );
    }

    const appAccessToken = `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`;
    
    // Validate token using Facebook Debug Tool
    const fbDebugRes = await axios.get('https://graph.facebook.com/debug_token', {
      params: {
        input_token: accessToken,
        access_token: appAccessToken,
      },
    });

    if (!fbDebugRes.data.data?.is_valid) {
      return NextResponse.json(
        { success: false, message: 'Invalid Facebook token' },
        { status: 401 }
      );
    }

    const userId = fbDebugRes.data.data.user_id;

    // Get managed pages
    const pagesRes = await axios.get(`https://graph.facebook.com/v23.0/me/accounts`, {
      params: { access_token: accessToken },
    });

    const page = pagesRes.data.data?.[0];

    if (!page?.id || !page?.access_token) {
      return NextResponse.json(
        { success: false, message: 'No managed pages found for user' },
        { status: 400 }
      );
    }

    // Fetch posts from page
    const posts = await fetchFacebookPosts({
      userAccessToken: accessToken,
      pageAccessToken: page.access_token,
      pageId: page.id,
    });

    // Process posts
    if (posts.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No posts found for the page' },
        { status: 404 }
      );
    }


    return NextResponse.json({
      success: true,
      userId,
      pageId: page.id,
      posts,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Facebook fetch error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return NextResponse.json(
      { success: false, message: 'Server error while fetching posts' },
      { status: 500 }
    );
  }
}
