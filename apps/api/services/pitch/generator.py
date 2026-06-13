import asyncio
from pydantic import BaseModel
from typing import List

class Slide(BaseModel):
    title: str
    content: List[str]
    visual_type: str # 'text', 'metric', 'chart_mrr', 'chart_tam'

class PitchDeck(BaseModel):
    slides: List[Slide]

class PitchGenerator:
    async def generate_deck(self, startup_idea: str) -> PitchDeck:
        # Simulate LLM generation and aggregation delay
        await asyncio.sleep(1.5)
        
        slides = [
            Slide(
                title="Genesis One",
                content=["The Autonomous Venture Intelligence OS", "Transforming ideas into simulated, investor-ready startups."],
                visual_type="text"
            ),
            Slide(
                title="The Problem",
                content=[
                    "Founders waste months on market research and financial modeling.", 
                    "90% of startups fail due to poor market fit and cash flow mismanagement.", 
                    "VCs receive thousands of unvalidated, poorly researched pitch decks."
                ],
                visual_type="text"
            ),
            Slide(
                title="The Solution",
                content=[
                    "A Multi-Agent System (CEO, CTO, Finance, Marketing) that autonomously debates and validates ideas.", 
                    "Real-time Digital Twin simulation of 5-year financial growth.", 
                    "Instant generation of TAM, SAM, SOM, and Competitor Matrices."
                ],
                visual_type="text"
            ),
            Slide(
                title="Market Sizing (TAM/SAM/SOM)",
                content=[
                    "TAM: $120.5B (Global SaaS / AI Orchestration)", 
                    "SAM: $30.2B (Startup Tooling & VC Tech)", 
                    "SOM: $5.1B (Early Stage Founders & Incubators)"
                ],
                visual_type="chart_tam"
            ),
            Slide(
                title="Business Model",
                content=[
                    "Freemium Strategy: Free market research to acquire solo founders.", 
                    "Pro Tier: $99/mo for full AI Boardroom access.", 
                    "Enterprise: Custom API limits for VC firms and incubators."
                ],
                visual_type="text"
            ),
            Slide(
                title="Financial Projections (5 Year)",
                content=[
                    "Targeting $10M ARR by Year 5.", 
                    "Assuming $1M Seed funding, break-even achieved in Month 18.", 
                    "LTV to CAC ratio stabilizes at 4:1 by Year 2."
                ],
                visual_type="chart_mrr"
            ),
            Slide(
                title="The Team (The AI Board)",
                content=[
                    "Alpha-CEO: Executive Strategy", 
                    "Beta-CTO: Technical Architecture", 
                    "Epsilon-Finance: Burn Rate & Unit Economics", 
                    "Delta-Marketing: GTM Strategy"
                ],
                visual_type="text"
            ),
            Slide(
                title="The Ask",
                content=[
                    "Raising $1.5M Seed Round.", 
                    "Provides 18 Months of Runway.", 
                    "Goal: Reach $1M ARR milestone."
                ],
                visual_type="metric"
            )
        ]
        return PitchDeck(slides=slides)
