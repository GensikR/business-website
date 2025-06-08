import { db } from '@/lib/firebase_db';
import { generateBlogParts } from '@/lib/aicontent';
import { GPTBlogParts, FacebookPost, Attachment } from '@/types';

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

    const img_srcs = extractImageSources(post.attachments?.data);

    if (img_srcs.length === 0) {
      console.warn(`Skipping post ${postID}: No images found.`);
      continue;
    }

    let gptContent: GPTBlogParts | null = null;

    try {
      gptContent = await generateBlogParts(title, img_srcs);
    } catch (err: unknown) {
      console.error(`GPT generation failed for post ${postID}:`, err.message);
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
      // Consider not returning here, so you process all posts
    } catch (err: unknown) {
      console.error(`Failed to save post ${postID} to Firestore:`, err.message);
    }
  }
  // You may want to return something meaningful or void
};

export default processPosts;
