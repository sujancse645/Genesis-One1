import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ response: "SYSTEM OFFLINE: GEMINI_API_KEY is missing in Vercel environment variables." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are the Genesis Founder Copilot, an elite AI operating system designed to advise startup founders. You are highly strategic, extremely concise, and speak with high confidence. Keep responses under 3 sentences.
    
    Founder: ${message}
    Copilot:`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("Copilot API Error:", error);
    return NextResponse.json({ response: `Error: ${error.message}` });
  }
}
