
import { GoogleGenAI } from "@google/genai";

export async function generateRoyalGreeting(guestName: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Estamos creando una invitación digital para el cumpleaños número 10 de Valentina, con temática de la película 'Brave' (Valiente).
    Escribe un mensaje de bienvenida corto y épico (máximo 25 palabras) para un invitado llamado "${guestName}".
    El tono debe ser el de una princesa guerrera de las Tierras Altas de Escocia, hablando sobre valentía, el clan y el destino.
    Idioma: Español.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "¡Ven a celebrar una aventura legendaria!";
  } catch (error) {
    return `¡${guestName}, tu presencia es requerida para celebrar a Valentina!`;
  }
}

export async function generateMeridaImage(): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = "A beautiful digital painting of a princess with wild curly red hair, wearing a dark green medieval dress, holding a bow, standing in a misty Scottish highland forest, cinematic lighting, Disney Brave style, high quality.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio: "16:9" }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
}
