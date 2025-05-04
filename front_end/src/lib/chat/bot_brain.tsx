type Rule = {
    pattern: RegExp;
    response: string;
  };
  
  export function getBotResponse(userInput: string): string {
    const input = userInput.toLowerCase().trim();
    console.log('User Input:', input); // Log the user input to see what you're processing
    
    const rules: Rule[] = [
      // Online estimate tool
      {
        pattern: /(?:online|calculator|tool|web\s+estimate)/i,
        response: `You can use our online calculator here: [Get your free online estimate!](#free-estimate). It's quick and easy!`,
      },
  
      // In-person estimate scheduling tool
      {
        pattern: /(?:in[-\s]?person|home\s+visit|someone\s+come|on[-\s]?site|schedule|appointment|book|available|when|can i (?:book|schedule|get))/i,
        response: `You can schedule your free in-person estimate here: [Schedule your in-person estimate now!](#schedule-appointment).`,
      },
  
      // Human representative
      {
        pattern: /(?:human|person|representative|talk to someone|real (?:person|agent))/i,
        response: "Sure! A member of our team will be with you shortly.",
      },
  
      // Pricing questions
      {
        pattern: /how\s+much|what(?:'s| is)\s+(?:the\s+)?price|cost|charge/i,
        response: "Our estimates are completely free! Would you like an online quote or to schedule an in-person visit?",
      },
  
      // Greetings
      {
        pattern: /(?:hi|hello|hey|good\s*(morning|afternoon|evening))/i,
        response: "Hi there! 👋 I'm here to help you get a free estimate or connect you with a representative.",
      },
  
      // Gratitude
      {
        pattern: /(?:thanks|thank you|thx)/i,
        response: "You're welcome! Let me know if there's anything else I can help with.",
      },
  
      // About Us Section (Why Us / Who Are We)
      {
        pattern: /(?:why (?:you|should i hire you)|who (?:are you|is this)|about (?:you|your company)|what (?:do you stand for|makes you different))/i,
        response: `Here's a bit about us:
        
                  🏡 **What We Stand For**  
                  Our values guide every remodel, ensuring your home gets the care and craftsmanship it deserves.
                  
                  🛠️ **Craftsmanship**  
                  Meticulous attention to detail and pride in every cut, tile, and finish.
                  
                  🤝 **Honesty**  
                  Clear communication, fair pricing, and dependable service from start to finish.
                  
                  👨‍👩‍👧 **Family-Driven Service**  
                  A family business rooted in trust, respect, and personal care for every client.
                  
                  🔧 **Adaptability**  
                  Flexible solutions that meet your space, style, and budget needs.
                  
                  At **Mauri Remodeling**, our mission is to turn houses into dream homes through quality craftsmanship, attention to detail, and a commitment to client satisfaction.
                  
                  — *Mauricio Comar, Founder*`,
      },
    ];
  
    for (const rule of rules) {
      if (rule.pattern.test(input)) {
        console.log('Matched Response:', rule.response); // Log the matched response
        return rule.response;
      }
    }
  
    // Fallback
    console.log('No Match, using fallback');
    return "I'm here to help you get a free estimate or schedule a visit. Would you like help with either?";
  }
  
  