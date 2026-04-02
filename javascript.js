//import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();




async function main(userMessage) {
  let API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" + process.env.GEMINI_API_KEY;
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage }]
          },
        ],
      }),
    });

    const data = await response.json();

    if (!data.candidates) {
      console.error("Erreur API :", data);
      return;
    }

    const generatedContent = data.candidates[0].content.parts[0].text;

    console.log("Generated Content:", generatedContent);

    //console.log(data);
    /*
        {
      candidates: [ { content: [Object], finishReason: 'STOP', index: 0 } ],
      usageMetadata: {
        promptTokenCount: 14,
        candidatesTokenCount: 541,
        totalTokenCount: 993,
        promptTokensDetails: [ [Object] ],
        thoughtsTokenCount: 438
      },
      modelVersion: 'gemini-3-flash-preview',
      },
      modelVersion: 'gemini-3-flash-preview',
      modelVersion: 'gemini-3-flash-preview',
      responseId: 'EWPOaa7bNe78xN8PvdL4KA'
      responseId: 'EWPOaa7bNe78xN8PvdL4KA'
    }
    
    */
  } catch (error) {
    console.error("Error:", error);
  }
}

main("Merci !");