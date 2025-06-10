import axios from 'axios';

type FetchFacebookPostsParams = {
  userAccessToken: string;
  pageAccessToken: string;
  pageId: string;
};

const fetchFacebookPosts = async ({
  userAccessToken,
  pageAccessToken,
  pageId,
}: FetchFacebookPostsParams) => {
  console.log("User Access Token:", userAccessToken);

  const allPosts: any[] = [];

  let nextUrl: string | null = `https://graph.facebook.com/v23.0/${pageId}/posts?` +
    new URLSearchParams({
      access_token: pageAccessToken,
      fields: 'id,message,created_time,full_picture,attachments{media_type,media,url,subattachments},permalink_url',
    });

  try {
    while (nextUrl) {
      const response = await axios.get<{ data: any[]; paging?: { next?: string } }>(nextUrl);
      const data: { data: any[]; paging?: { next?: string } } = response.data;

      if (data?.data?.length) {
        allPosts.push(...data.data);
      }

      nextUrl = data.paging?.next || null; // set next page URL or null if done
    }

    console.log(`Fetched ${allPosts.length} total posts.`);
    return allPosts;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching posts:', error.response?.data || error.message);
    } else {
      console.error('Error fetching posts:', error);
    }
    throw error;
  }
};

export default fetchFacebookPosts;
