import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

export async function POST(req: Request) {
  try {
    const { message, previous_messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is missing." }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const prompt = `
You are an AI Board of Directors consisting of a CEO, CTO, and Finance Agent.
The user (Founder) just said: "${message}"

Here is the recent board history:
${JSON.stringify(previous_messages)}

Pick ONE agent (either CEO, CTO, or Finance) who should respond to the founder's message.
Return ONLY a valid JSON object with the following structure:
{
  "agent": "Name of Agent (e.g., Sarah (CEO))",
  "role": "CEO" | "CTO" | "Finance",
  "message": "The highly strategic and assertive response (under 2 sentences)."
}
Do not wrap in markdown code blocks. Just return the JSON.
`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    // Remove markdown wrapping if gemini adds it
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    const agentData = JSON.parse(responseText || '{}');
    
    return NextResponse.json(agentData);
  } catch (error: any) {
    console.error("Boardroom API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
