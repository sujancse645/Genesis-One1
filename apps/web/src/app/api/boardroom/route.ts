import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

export async function POST(req: Request) {
  try {
    const { message, previous_messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY is missing." }, { status: 500 });
    }

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
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const agentData = JSON.parse(response.choices[0].message.content || '{}');
    
    return NextResponse.json(agentData);
  } catch (error: any) {
    console.error("Boardroom API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
