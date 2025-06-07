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
  } catch (error: any) {
    console.error('Error fetching posts:', error.response?.data || error.message);
    throw error;
  }
};

export default fetchFacebookPosts;
