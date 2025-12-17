
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async *streamResponse(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    const chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are 'Nexus Assistant', a world-class AI advisor for a SaaS platform called Nexus. Nexus provides productivity tools, AI-driven automation, and team collaboration software. Keep responses concise, professional, and helpful. Focus on how Nexus can improve workflow.",
      }
    });

    const result = await chat.sendMessageStream({ message: prompt });
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      yield c.text;
    }
  }
}

export const geminiService = new GeminiService();
