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

export type WorkPost = 
{
  id: string;
  title: string;
  slug?: string;
  intro: string;
  body1: string;
  body2: string;
  conclusion: string;
  category: Number;
  img_srcs: string[];
  createdAt: string; 
  permalink: string;
};


