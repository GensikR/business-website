export interface UniversalHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImageUrl?: string;
}

// Interface for Message
export interface Message {
  sender: 'user' | 'admin' | 'bot';
  text: string;
  time: string;
  buttons?: { title: string; payload: string }[]; // Optional buttons
}

// Interface for Chat
export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

export type Appointment = {
  id: string;
  date: string; // in YYYY-MM-DD format
  time: string;
  createdAt: string; // updated to be a string to fit common date formats
};

export interface Service {
  title: string;
  description: string;
  details: string;
  image: string;
  link: string;
  gallery?: string[];           // Optional: list of image paths
  features?: string[];          // Optional: list of short feature titles
  featureDetails?: string[];    // Optional: detailed explanations for each feature
  quoteCTA?: string;            // Optional: call-to-action text for contact/quote
}


export type ServiceButton = {
  id: ServiceId;
  name: string;
  emoji: string;
};

export type EstimatorSection = "Home" | "ProjectType" | "Size" | "Materials" | "Result";

export type ServiceId = "bathroom" | "kitchen" | "livingRoom" | "patio" | "bedroom" | "custom";

export type WorkPost = 
{
  id: string;
  title: string;
  slug?: string;
  intro: string;
  body1: string;
  body2: string;
  conclusion: string;
  category: number;
  img_srcs: string[];
  created_time: string; 
  permalink: string;
};

export const categories = [
  "kitchen",
  "bathroom",
  "custom furniture",
  "flooring",
  "walls",
  "outdoor living",
  "home office",
  "consultation",
  "interior design",
];

// types.ts or types/index.ts

export interface MediaImage {
  src: string;
}

export interface AttachmentMedia {
  image?: MediaImage;
}

export interface SubAttachment {
  media?: AttachmentMedia;
}

export interface Attachment {
  media_type?: string;
  media?: AttachmentMedia;
  subattachments?: {
    data: SubAttachment[];
  };
}

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url?: string;
  attachments?: {
    data: Attachment[];
  };
}

export interface GPTBlogParts {
  title: string;
  excerpt: string;
  body: string;
}
