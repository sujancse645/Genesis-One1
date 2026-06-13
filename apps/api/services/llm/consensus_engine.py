import os
import asyncio
from pydantic import BaseModel
from typing import List, Optional
import json

class ConsensusResult(BaseModel):
    model_a_response: str
    model_b_response: str
    model_c_response: str
    agreements: List[str]
    disagreements: List[str]
    final_consensus: str
    confidence_score: float

class ConsensusEngine:
    def __init__(self):
        self.openai_key = os.getenv("OPENAI_API_KEY")
        self.anthropic_key = os.getenv("ANTHROPIC_API_KEY")
        self.gemini_key = os.getenv("GEMINI_API_KEY")

    async def _query_openai(self, prompt: str) -> str:
        if not self.openai_key or self.openai_key == "dummy_openai_key":
            await asyncio.sleep(1)
            return "OpenAI (GPT-4o) analysis: The startup has a strong market fit but high execution complexity."
        
        try:
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=self.openai_key)
            response = await client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"OpenAI Error: {e}"

    async def _query_anthropic(self, prompt: str) -> str:
        if not self.anthropic_key or self.anthropic_key == "dummy_anthropic_key":
            await asyncio.sleep(1.5)
            return "Anthropic (Claude 3.5) analysis: The financial model is solid, but the TAM is slightly overestimated."
        
        try:
            from anthropic import AsyncAnthropic
            client = AsyncAnthropic(api_key=self.anthropic_key)
            response = await client.messages.create(
                model="claude-3-5-sonnet-20240620",
                max_tokens=1024,
                messages=[{"role": "user", "content": prompt}]
            )
            return response.content[0].text
        except Exception as e:
            return f"Anthropic Error: {e}"

    async def _query_gemini(self, prompt: str) -> str:
        if not self.gemini_key or self.gemini_key == "dummy_gemini_key":
            await asyncio.sleep(1.2)
            return "Gemini (1.5 Pro) analysis: The innovation score is exceptional. Competitor landscape is crowded."
        
        try:
            import google.generativeai as genai
            genai.configure(api_key=self.gemini_key)
            model = genai.GenerativeModel('gemini-1.5-pro')
            response = await asyncio.to_thread(model.generate_content, prompt)
            return response.text
        except Exception as e:
            return f"Gemini Error: {e}"

    async def _synthesize(self, prompt: str, openai_res: str, anthropic_res: str, gemini_res: str) -> ConsensusResult:
        if not self.openai_key or self.openai_key == "dummy_openai_key":
            await asyncio.sleep(1)
            return ConsensusResult(
                model_a_response=openai_res,
                model_b_response=anthropic_res,
                model_c_response=gemini_res,
                agreements=["High innovation", "Strong financial model"],
                disagreements=["Market size estimation (TAM)"],
                final_consensus="The startup is highly innovative and financially viable, provided the TAM calculations are adjusted to reflect the competitive landscape.",
                confidence_score=0.88
            )
        
        try:
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=self.openai_key)
            
            system_prompt = f"""
            You are the Genesis One Consensus Engine. Analyze the following three AI model responses to the user's prompt.
            Identify agreements, disagreements, and provide a final synthesized consensus.
            Respond in JSON format with keys: agreements (list of str), disagreements (list of str), final_consensus (str), confidence_score (float 0.0 to 1.0).
            
            Prompt: {prompt}
            Model A (GPT): {openai_res}
            Model B (Claude): {anthropic_res}
            Model C (Gemini): {gemini_res}
            """
            
            response = await client.chat.completions.create(
                model="gpt-4o",
                response_format={ "type": "json_object" },
                messages=[{"role": "system", "content": system_prompt}]
            )
            
            data = json.loads(response.choices[0].message.content)
            return ConsensusResult(
                model_a_response=openai_res,
                model_b_response=anthropic_res,
                model_c_response=gemini_res,
                agreements=data.get("agreements", []),
                disagreements=data.get("disagreements", []),
                final_consensus=data.get("final_consensus", ""),
                confidence_score=data.get("confidence_score", 0.9)
            )
        except Exception as e:
             return ConsensusResult(
                model_a_response=openai_res,
                model_b_response=anthropic_res,
                model_c_response=gemini_res,
                agreements=[],
                disagreements=[],
                final_consensus=f"Failed to synthesize consensus: {e}",
                confidence_score=0.0
            )

    async def run_consensus(self, prompt: str) -> ConsensusResult:
        openai_task = asyncio.create_task(self._query_openai(prompt))
        anthropic_task = asyncio.create_task(self._query_anthropic(prompt))
        gemini_task = asyncio.create_task(self._query_gemini(prompt))
        
        openai_res, anthropic_res, gemini_res = await asyncio.gather(
            openai_task, anthropic_task, gemini_task
        )
        
        consensus = await self._synthesize(prompt, openai_res, anthropic_res, gemini_res)
        return consensus
