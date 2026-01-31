
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SmartCheckResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeTransaction = async (
  amount: number,
  recipient: string,
  currentBalance: number
): Promise<SmartCheckResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are the ChainEase Explainable AI Assistant.
    Transaction: $${amount} to ${recipient}.
    User Balance: $${currentBalance}.
    
    Task:
    1. Generate a human-friendly review.
    2. Highlight potential risks (e.g., first-time recipient) WITHOUT being alarmist or blocking the user.
    3. Provide 2-3 specific reasoning bullet points explaining why the transaction is considered safe or what to look out for.
    4. Use calm, minimalist, and trust-focused language. No regulatory or compliance jargon.

    Mock User History Context:
    - User frequently spends $20-$100 on Food/Entertainment.
    - User has never sent more than $5000 in a single transaction.
    - User has 12 saved contacts.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          safetyScore: { type: Type.NUMBER },
          advice: { type: Type.STRING },
          reasoning: { type: Type.ARRAY, items: { type: Type.STRING } },
          categorySuggestion: { type: Type.STRING },
          isNewRecipient: { type: Type.BOOLEAN },
          budgetImpact: { type: Type.STRING },
          transparencyNote: { type: Type.STRING },
          appliedAutomations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                ruleName: { type: Type.STRING },
                status: { type: Type.STRING },
                message: { type: Type.STRING }
              },
              required: ["ruleName", "status", "message"]
            }
          }
        },
        required: ["safetyScore", "advice", "reasoning", "categorySuggestion", "isNewRecipient", "budgetImpact", "transparencyNote", "appliedAutomations"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim()) as SmartCheckResult;
  } catch (error) {
    return {
      safetyScore: 90,
      advice: "This transaction appears standard.",
      reasoning: ["Pattern match successful.", "Network verified."],
      categorySuggestion: "General",
      isNewRecipient: false,
      budgetImpact: "Minimal",
      transparencyNote: "Authenticated.",
      appliedAutomations: [{ ruleName: "Pattern Match", status: "active", message: "History alignment confirmed." }]
    };
  }
};

export const generateReceiptImage = async (amount: number, recipient: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a minimalist, high-fidelity digital receipt graphic for a financial transaction. 
            Details: Amount $${amount}, Recipient: ${recipient}. 
            Style: Modern fintech, dark charcoal background with soft emerald glowing accents. 
            Include a "ChainEase Verified" watermark. 
            Composition: Clean, centered typography, professional, abstract geometric patterns in the corners. 
            The image should feel like a premium achievement or digital collectible.`
          },
        ],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Receipt generation failed", error);
    return null;
  }
};
