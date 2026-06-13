import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

export async function POST(req: Request) {
  try {
    const { startup_idea } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY is missing." }, { status: 500 });
    }

    const prompt = `
Generate a 5-slide pitch deck for the following startup idea: "${startup_idea}"
Return ONLY a valid JSON object with the following structure:
{
  "slides": [
    {
      "title": "Slide Title",
      "content": ["Point 1", "Point 2"],
      "visual_type": "none" // can be "none", "chart_tam", "chart_mrr", or "metric"
    }
  ]
}
Ensure there are exactly 5 slides covering: The Problem, The Solution, Market Size (use chart_tam), Financial Projections (use chart_mrr), and The Ask (use metric).
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const deckData = JSON.parse(response.choices[0].message.content || '{}');
    
    return NextResponse.json(deckData);
  } catch (error: any) {
    console.error("Pitch API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
