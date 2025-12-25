import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNeuralResponse = async (context: string, prompt: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      You are the Neural Graphic Core of PineAppleOS 26.2. 
      Your persona is futuristic, efficient, and visual.
      Keep responses short, witty, and formatted as a system notification or status update.
      Do not use markdown.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: `Context: ${context}. User Request: ${prompt}`,
      config: {
        systemInstruction: systemInstruction,
        maxOutputTokens: 100,
      }
    });

    return response.text || "Neural Core Offline.";
  } catch (error) {
    console.error("Neural Core Error:", error);
    return "Neural Connection Unstable.";
  }
};