
import { GoogleGenAI } from "@google/genai";

/**
 * Provides farm advice using Gemini AI.
 * Follows @google/genai guidelines for client initialization and response handling.
 */
export const getFarmAdvice = async (farmData: any, query: string) => {
  // Always initialize with named parameter and direct process.env.API_KEY reference.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert agricultural consultant specializing in poultry and catfish farming.
      
      Farm Context: ${JSON.stringify(farmData)}
      
      User Query: ${query}
      
      Provide actionable, data-driven advice. Keep it concise and professional.`,
      config: {
        // Disabling thinking budget for quick conversational advice.
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    // Directly access the text property as per GenerateContentResponse definition.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble analyzing the farm data right now. Please try again later.";
  }
};
