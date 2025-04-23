'use server';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import firebaseConfig from './fb_config';
import { WorkPost } from '@/types';
import openAIkey from './ai_key';

// Firebase setup
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// OpenAI configuration
const openai = new OpenAI({
  apiKey: openAIkey,
});

// Main function to generate and upload work post
async function generateAndUploadWorkPost({
  category,
  image1Src,
  image2Src,
  description,
}: {
  category: WorkPost['category'];
  image1Src: string;
  image2Src: string;
  description: string;
}) {
  try {
    const image1Url = image1Src.startsWith('http')
      ? image1Src
      : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${image1Src}`;
    const image2Url = image2Src.startsWith('http')
      ? image2Src
      : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${image2Src}`;

    // GPT-4 API call
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      temperature: 0.8,
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content:
            'You are the best renovation copywriter in the world generating detailed work post title, introduction, challenge, solution, and conclusion for any remodeling project. You take a lot of pride in your work that every post is worth 1 billion dollars',
        },
        {
          role: 'user',
          content: `Generate ONLY the following fields as JSON for a remodeling project:
            - title
            - introduction_title
            - introduction
            - challenge
            - challenge_title
            - challenge_content
            - solution
            - solution_title
            - solution_content
            - conclusion_title
            - conclusion_content

            Context:
            Category: ${category}
            Description: ${description}

            Also, the Provided images are before and after pictures of the work, please use them to generate the content.
            Please make the content of each section be at least 2 paragraphs each. (Excluding the titles, which are just one sentence)
            Return valid JSON with exact keys.`,
        },
        {
          role: 'user',
          content: JSON.stringify({
            type: 'image_url',
            image_url: image1Url,
          }),
        },
        {
          role: 'user',
          content: JSON.stringify({
            type: 'image_url',
            image_url: image2Url,
          }),
        },
      ],
    });

    // Log the entire response to see the structure
    console.log('Response from OpenAI:', response);

    const content = response.choices[0].message?.content || '{}';
    const generated = JSON.parse(content);

    // Debug: Log generated content to see if the fields are populated
    console.log('Generated JSON:', generated);

    // If any field is undefined, log it
    for (const field of [
      'title',
      'introduction_title',
      'introduction',
      'challenge',
      'challenge_title',
      'challenge_content',
      'solution',
      'solution_title',
      'solution_content',
      'conclusion_title',
      'conclusion_content',
    ]) {
      if (!generated[field]) {
        console.warn(`Field ${field} is undefined!`);
      }
    }

    const slug = generated.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    const post: WorkPost = {
      id: uuidv4(),
      title: generated.title,
      slug,
      category,
      image1Src,
      image1Alt: 'No Image',
      image2Src,
      image2Alt: 'No Image',
      introduction_title: generated.introduction_title,
      introduction: generated.introduction,
      challenge: generated.challenge,
      challenge_title: generated.challenge_title,
      challenge_content: generated.challenge_content,
      solution: generated.solution,
      solution_title: generated.solution_title,
      solution_content: generated.solution_content,
      conclusion_title: generated.conclusion_title,
      conclusion_content: generated.conclusion_content,
    };

    // If we encounter any undefined fields, log and abort uploading
    if (Object.values(post).includes(undefined)) {
      console.error('❌ Error: One or more fields are undefined. Aborting upload.');
      return;
    }

    // Upload to Firestore
    await addDoc(collection(db, 'workPosts'), post);
    console.log('✅ Post uploaded to Firestore:', post.title);

  } catch (err) {
    console.error('❌ Error:', err);
  }
}

export default generateAndUploadWorkPost;
