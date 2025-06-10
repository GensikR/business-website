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

  try {
    const postsRes = await axios.get(`https://graph.facebook.com/v23.0/${pageId}/posts`, {
      params: {
        access_token: pageAccessToken,
        fields: 'id,message,created_time,full_picture,attachments{media_type,media,url,subattachments},permalink_url',
      },
    });

    const data = postsRes.data.data || postsRes.data;

    return data;
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
