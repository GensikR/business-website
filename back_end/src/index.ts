import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import fetchFacebookPosts from './fetch_posts';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Backend server is running!');
});

app.post('/api/facebook-login', async (req: Request, res: Response): Promise<void> => {
  const { accessToken } = req.body;

  if (!accessToken || typeof accessToken !== 'string') {
    res.status(400).json({ success: false, message: 'Access token missing or invalid' });
    return;
  }

  try {
    // Step 1: Verify the user access token
    const appAccessToken = `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`;
    const fbDebugRes = await axios.get('https://graph.facebook.com/debug_token', {
      params: {
        input_token: accessToken,
        access_token: appAccessToken,
      },
    });

    if (!fbDebugRes.data.data.is_valid) {
      res.status(401).json({ success: false, message: 'Invalid Facebook token' });
      return;
    }

    const userId = fbDebugRes.data.data.user_id;

    // Step 2: Get the first managed page and its access token
    const pagesRes = await axios.get(`https://graph.facebook.com/v23.0/me/accounts`, {
      params: {
        access_token: accessToken,
      },
    });

    const page = pagesRes.data.data[0]; // Take the first page
    if (!page || !page.id || !page.access_token) {
      res.status(400).json({ success: false, message: 'No managed pages found for user' });
      return;
    }

    const pageId = page.id;
    const pageAccessToken = page.access_token;

    // Step 3: Fetch posts via external function (which saves to file)
    const posts = await fetchFacebookPosts({ userAccessToken: accessToken, pageAccessToken, pageId });

    // Return success response
    res.status(200).json({ success: true, userId, pageId, posts });
  } catch (error: any) {
    console.error('Error during Facebook login flow:', error?.response?.data || error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
