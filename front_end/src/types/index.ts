export interface UniversalHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImageUrl?: string;
}

export interface WorkPost {
  id: string;
  title: string;
  slug: string;
  category: "kitchen" | "bathroom" | "living room" | "bedroom" | "outdoor" | "office";
  introduction_title: string;
  introduction: string;
  challenge: string;
  challenge_title: string;
  challenge_content: string;
  solution: string;
  solution_title: string;
  solution_content: string;
  conclusion_title: string;
  conclusion_content: string;
  image1Src: string;
  image1Alt: string;
  image2Src: string;
  image2Alt: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  category: string; // e.g. "DIY"
  subcategory: string; // e.g. "Kitchen"
  summary: string;
  content: string;
  img1: string;
  img2: string;
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

export type Service = {
  title: string;
  description: string;
  images: string[];
  link: string;
  details: string;
};

export type ServiceButton = {
  id: ServiceId;
  name: string;
  emoji: string;
};

export type EstimatorSection = "Home" | "ProjectType" | "Size" | "Materials" | "Result";

export type ServiceId = "bathroom" | "kitchen" | "livingRoom" | "patio" | "bedroom" | "custom";


