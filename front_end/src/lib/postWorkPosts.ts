import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { faker } from '@faker-js/faker';
import firebaseConfig from '@/lib/fb_config';
import { WorkPost } from '@/types';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define valid categories
const categories = [
  "kitchen",
  "bathroom",
  "living room",
  "bedroom",
  "outdoor",
  "office",
] as ("kitchen" | "bathroom" | "living room" | "bedroom" | "outdoor" | "office")[];

const imageSources = [
  "/images/header.png",
  "/images/header2.png",
  "/images/header3.png",
  "/images/header4.png",
  "/images/header5.png",
];

// Slugify function (basic version)
const slugTitle = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const createFakeWorkPost = (): WorkPost => {
  const img1 = getRandom(imageSources);
  let img2 = getRandom(imageSources);
  while (img1 === img2) img2 = getRandom(imageSources);

  const title = faker.company.catchPhrase();

  return {
    id: faker.string.uuid(),
    title,
    slug: slugTitle(title),
    category: getRandom(categories),
    challenge: faker.hacker.phrase(),
    challenge_summary: faker.lorem.sentence(),
    challenge_content: faker.lorem.paragraphs(2),
    solution: faker.hacker.verb() + ' ' + faker.hacker.noun(),
    solution_summary: faker.lorem.sentence(),
    solution_content: faker.lorem.paragraphs(2),
    conclusion_title: faker.company.catchPhrase(),
    conclusion_content: faker.lorem.paragraph(),
    image1Src: img1,
    image1Alt: faker.lorem.words(4),
    image2Src: img2,
    image2Alt: faker.lorem.words(4),
  };
};

export const postWorkPosts = async () => {
  const workPostsCollection = collection(db, 'workPosts');

  try {
    for (let i = 0; i < 20; i++) {
      const post = createFakeWorkPost();
      await addDoc(workPostsCollection, post);
      console.log(`✅ Posted "${post.title}"`);
    }
    console.log('🎉 All 20 work posts uploaded!');
  } catch (error) {
    console.error('❌ Error posting work posts:', error);
  }
};
