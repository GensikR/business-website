export interface Message {
    sender: 'user' | 'admin' | 'bot';
    text: string;
    time: string;
  }
  
  export interface Chat {
    id: string;
    title: string;
    messages: Message[];
  }
  