interface Message {
  sender: 'user' | 'bot' | 'admin';
  text: string;
  time: string;
  buttons?: { title: string; payload: string }[]; // Optional buttons property
}

  
  export interface Chat {
    id: string;
    title: string;
    messages: Message[];
  }
  