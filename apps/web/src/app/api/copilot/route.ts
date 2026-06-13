import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ response: "SYSTEM OFFLINE: OPENAI_API_KEY is missing in Vercel environment variables." });
    }

    const messages = [
      { 
        role: "system", 
        content: "You are the Genesis Founder Copilot, an elite AI operating system designed to advise startup founders. You are highly strategic, extremely concise, and speak with high confidence. Keep responses under 3 sentences." 
      },
      ...history,
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages as any,
      temperature: 0.7,
    });

    return NextResponse.json({ 
      response: response.choices[0].message.content 
    });
  } catch (error: any) {
    console.error("Copilot API Error:", error);
    return NextResponse.json({ response: `Error: ${error.message}` });
  }
}
