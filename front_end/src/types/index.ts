// Example interface for BlogPost
export interface BlogPost {
  id: string;
  title: string;
  category: "kitchen" | "bathroom" | "living room" | "bedroom" | "outdoor" | "office";
  challenge: string;
  challenge_summary: string;
  challenge_content: string;
  solution: string;
  solution_summary: string;
  solution_content: string;
  conclusion_title: string;
  conclusion_content: string;
  imageSrc: string;
  imageAlt: string;
}

// Interface for Message (unchanged)
export interface Message {
  sender: 'user' | 'admin' | 'bot';
  text: string;
  time: string;
}

// Interface for Chat (unchanged)
export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}
