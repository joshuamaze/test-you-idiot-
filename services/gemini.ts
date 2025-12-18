import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  // Removed static member to follow the rule of creating instance right before API calls
  
  async *streamResponse(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    // Initializing GoogleGenAI inside the method to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      // Correctly passing existing conversation history to the model
      history: history,
      config: {
        systemInstruction: "You are 'Nexus Assistant', a world-class AI advisor for a SaaS platform called Nexus. Nexus provides productivity tools, AI-driven automation, and team collaboration software. Keep responses concise, professional, and helpful. Focus on how Nexus can improve workflow.",
      }
    });

    const result = await chat.sendMessageStream({ message: prompt });
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      // Accessing text property directly as per @google/genai guidelines
      if (c.text) {
        yield c.text;
      }
    }
  }
}

export const geminiService = new GeminiService();