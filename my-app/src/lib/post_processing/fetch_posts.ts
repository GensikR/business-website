import axios from 'axios';
import fs from 'fs';

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
  try {
    const postsRes = await axios.get(`https://graph.facebook.com/v23.0/${pageId}/posts`, {
      params: {
        access_token: pageAccessToken,
        fields: 'id,message,created_time,full_picture,attachments{media_type,media,url,subattachments},permalink_url',
      },
    });

    // Save posts JSON to file
    fs.writeFileSync('facebook_posts.json', JSON.stringify(postsRes.data, null, 2));
    console.log('Posts saved to facebook_posts.json');

    return postsRes.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
      console.error('Error fetching posts:', error.response.data);
    } else if (error instanceof Error) {
      console.error('Error fetching posts:', error.message);
    } else {
      console.error('Error fetching posts:', error);
    }
    throw error;
  }
};

export default fetchFacebookPosts;
