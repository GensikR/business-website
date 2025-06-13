import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

import { GPTBlogParts } from "@/types";
import { categoryList } from "../utils/getService";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBlogParts(
  roughTitle: string,
  imageUrls: string[],
  fbDescription?: string
): Promise<GPTBlogParts> {
  const prompt = `
You are an expert home remodeling content strategist and professional blog writer.

You are given a Facebook post with the following:
- A rough title: "${roughTitle}"
- A description: "${fbDescription || 'No description provided.'}"
- A set of image URLs: ${imageUrls.join(", ")}

Your job is to:
1. Infer the remodeling service that this post is most likely about.
   Choose **one** category from this list: ${categoryList}.
2. Generate a polished blog post draft for the company's website that showcases the project.
3. Use visual cues (like before/after, tools, rooms, finishes) and inferred project details to write realistically.
4. Maintain a warm, expert, and trustworthy tone.

Respond ONLY with this valid JSON object structure (no markdown, no extra explanation):

{
  "title": (Improved and polished blog post title),
  "intro": (1 engaging paragraph introducing the project and its relevance),
  "body1": (1 paragraph describing the overall project and goals),
  "body2": (2 paragraphs about the remodeling process, materials used, and any challenges),
  "conclusion": (1 paragraph summarizing the final result and benefits to the homeowner),
  "category": (best matching category from the provided list)
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0].message.content;

  if (!content) {
    throw new Error("No response from OpenAI.");
  }

  try {
    return JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse JSON response from OpenAI:", err);
    throw err;
  }
}

