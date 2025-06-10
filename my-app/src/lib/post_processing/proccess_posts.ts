import { db } from '@/lib/utils/firebase_db';
import { generateBlogParts } from '@/lib/ai/aicontent';
import { GPTBlogParts, FacebookPost, Attachment } from '@/types';
import store_imgs from '@/lib/post_processing/store_imgs';

const extractImageSources = (attachments: Attachment[] = []): string[] => {
  const images: string[] = [];

  for (const attachment of attachments) {
    if (attachment.media_type === 'album' && attachment.subattachments?.data) {
      for (const subattachment of attachment.subattachments.data) {
        const img = subattachment.media?.image?.src;
        if (img) images.push(img);
      }
    } else {
      const img = attachment.media?.image?.src;
      if (img) images.push(img);
    }
  }

  return images;
};

// Changed parameter to accept posts directly as array, not wrapped in { data: posts }
const processPosts = async (posts: FacebookPost[]) => {
  for (const post of posts) {
    const postID = post.id;
    const title = post.message?.trim() || 'No title';
    const created_time = new Date(post.created_time);
    const permalink_url = post.permalink_url || '';

    const face_img_srcs = extractImageSources(post.attachments?.data);
    
    // Await the promise here!
    const img_srcs = await store_imgs(face_img_srcs);

    if (img_srcs.length === 0) {
      console.warn(`Skipping post ${postID}: No images found.`);
      continue;
    }

    let gptContent: GPTBlogParts | null = null;

    try {
      gptContent = await generateBlogParts(title, img_srcs);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`GPT generation failed for post ${postID}:`, err.message);
      } else {
        console.error(`GPT generation failed for post ${postID}:`, err);
      }
      continue;
    }

    if (!gptContent) {
      console.warn(`Skipping post ${postID}: GPT returned no content.`);
      continue;
    }

    const postData = {
      ...gptContent,
      created_time,
      img_srcs,
      permalink_url,
    };

    try {
      await db.collection('posts').doc(postID).set(postData, { merge: true });
      console.log(`Post ${postID} saved to Firestore.`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Failed to save post ${postID} to Firestore:`, err.message);
      } else {
        console.error(`Failed to save post ${postID} to Firestore:`, err);
      }
    }
  }
};

export default processPosts;
