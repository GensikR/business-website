import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fetchFacebookPosts from '@/lib/post_processing/fetch_posts';
//import process_posts from '@/lib/post_processing/proccess_posts';

export async function POST(req: NextRequest) 
{
  try {
    const body = await req.json();
    const { accessToken } = body;

    if (!accessToken || typeof accessToken !== 'string') {
      return NextResponse.json({ success: false, message: 'Access token missing or invalid' }, { status: 400 });
    }

    const appAccessToken = `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`;
    const fbDebugRes = await axios.get('https://graph.facebook.com/debug_token', {
      params: {
        input_token: accessToken,
        access_token: appAccessToken,
      },
    });

    if (!fbDebugRes.data.data.is_valid) {
      return NextResponse.json({ success: false, message: 'Invalid Facebook token' }, { status: 401 });
    }

    const userId = fbDebugRes.data.data.user_id;

    const pagesRes = await axios.get(`https://graph.facebook.com/v23.0/me/accounts`, {
      params: { access_token: accessToken },
    });

    const page = pagesRes.data.data[0];
    if (!page || !page.id || !page.access_token) {
      return NextResponse.json({ success: false, message: 'No managed pages found for user' }, { status: 400 });
    }

    const posts = await fetchFacebookPosts({
      userAccessToken: accessToken,
      pageAccessToken: page.access_token,
      pageId: page.id,
    });

    //await process_posts(posts);

    return NextResponse.json({
      success: true,
      userId,
      pageId: page.id,
      postsProcessed: posts.length,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Facebook login error:', error.response?.data || error.message);
    } else {
      console.error('Facebook login error:', error);
    }
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
