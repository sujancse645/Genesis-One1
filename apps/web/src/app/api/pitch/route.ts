import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

export async function POST(req: Request) {
  try {
    const { startup_idea } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is missing." }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
Generate a 5-slide pitch deck for the following startup idea: "${startup_idea}"
Return ONLY a valid JSON object with the following structure:
{
  "slides": [
    {
      "title": "Slide Title",
      "content": ["Point 1", "Point 2"],
      "visual_type": "none"
    }
  ]
}
Ensure there are exactly 5 slides covering: The Problem, The Solution, Market Size (use chart_tam), Financial Projections (use chart_mrr), and The Ask (use metric). Do not wrap in markdown code blocks. Just return the JSON.
`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    // Remove markdown wrapping if gemini adds it
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    const deckData = JSON.parse(responseText || '{}');
    
    return NextResponse.json(deckData);
  } catch (error: any) {
    console.error("Pitch API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
