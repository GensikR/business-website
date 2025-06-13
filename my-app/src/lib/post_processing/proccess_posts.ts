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

const processPosts = async (posts: FacebookPost[]) => {
  for (const post of posts) {
    const postID = post.id;
    const title = post.message?.trim();

    // Skip if title is missing or empty
    if (!title || title === '') {
      console.warn(`Skipping post ${postID}: Missing title.`);
      continue;
    }

    const face_img_srcs = extractImageSources(post.attachments?.data);

    // Skip if fewer than 2 images
    if (face_img_srcs.length < 2) {
      console.warn(`Skipping post ${postID}: Less than 2 images.`);
      continue;
    }

    const img_srcs = await store_imgs(face_img_srcs);
    const created_time = new Date(post.created_time);
    const permalink_url = post.permalink_url || '';

    let gptContent: GPTBlogParts | null = null;

    try {
      gptContent = await generateBlogParts(title, img_srcs, post.message);
    } catch (err: unknown) {
      console.error(`GPT generation failed for post ${postID}:`, err);
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
      console.error(`Failed to save post ${postID} to Firestore:`, err);
    }
  }
};


export default processPosts;
