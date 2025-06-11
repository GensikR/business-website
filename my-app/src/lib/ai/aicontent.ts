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
  imageUrls: string[]
): Promise<GPTBlogParts> {
  const prompt = `
You are a professional blog writer specializing in high-end home remodeling.

Your task is to create a structured, engaging blog post using the provided rough title and image URLs. The content will be published on the company's website and should reflect expertise, creativity, and a warm, professional tone.

Use the title to infer the type and purpose of the project. Use the image URLs (e.g., before/after shots, process photos) to imagine what was remodeled, the steps taken, materials used, and the final result. Fill in missing context realistically but professionally.

Respond ONLY with a valid JSON object using these exact keys:

{
  "title": (Improved and polished blog post title),
  "intro": (1 engaging paragraph introducing the project and its relevance),
  "body1": (1 paragraph describing the overall project and goals),
  "body2": (2 paragraphs about the remodeling process, materials used, and any challenges),
  "conclusion": (1 paragraph summarizing the final result and benefits to the homeowner),
  "category": (one category selected from: ${categoryList})
}

Inputs:
- Title: ${roughTitle}
- Images: ${imageUrls.join(", ")}

IMPORTANT: Respond ONLY with a properly formatted JSON object. No markdown, no commentary, no extra text.
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
