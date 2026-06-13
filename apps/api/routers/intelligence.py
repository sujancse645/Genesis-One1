import asyncio
import random
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict

router = APIRouter()

class UnicornScoreResponse(BaseModel):
    genesis_score: int
    market_size_score: int
    innovation_score: int
    execution_score: int
    scalability_score: int
    defensibility_score: int
    growth_potential_score: int
    success_probability: float
    acquisition_probability: float
    ipo_probability: float
    unicorn_probability: float

class InvestorXRayResponse(BaseModel):
    loves: List[str]
    hates: List[str]
    weaknesses: List[str]
    deal_breakers: List[str]
    investment_probability: float

class ImpactScoreResponse(BaseModel):
    global_impact_score: int
    economic_impact: int
    jobs_created: int
    carbon_impact: int
    education_impact: int
    healthcare_impact: int
    social_impact: int

class MarketBrainResponse(BaseModel):
    momentum_score: int
    trend_velocity: str
    disruption_potential: str
    funding_attractiveness: str
    competition_density: str
    live_signals: List[Dict[str, str]]

@router.get("/unicorn-score", response_model=UnicornScoreResponse)
async def get_unicorn_score(startup_id: str = "default"):
    await asyncio.sleep(1.5)  # Simulate deep calculation
    
    # Generate hyper-realistic deterministic scores
    base_seed = hash(startup_id) % 100
    
    return UnicornScoreResponse(
        genesis_score=88 + (base_seed % 10),
        market_size_score=92,
        innovation_score=85 + (base_seed % 10),
        execution_score=78,
        scalability_score=95,
        defensibility_score=72,
        growth_potential_score=91,
        success_probability=74.5,
        acquisition_probability=45.2,
        ipo_probability=12.4,
        unicorn_probability=8.7
    )

@router.get("/investor-xray", response_model=InvestorXRayResponse)
async def get_investor_xray(startup_id: str = "default"):
    await asyncio.sleep(1.2)
    return InvestorXRayResponse(
        loves=[
            "High recurring revenue potential with low marginal cost.",
            "Strong network effects built into the core loop.",
            "Clear pathway to monopolize a niche market before expanding."
        ],
        hates=[
            "High initial customer acquisition cost (CAC).",
            "Dependency on third-party APIs that could change pricing.",
            "Long enterprise sales cycles."
        ],
        weaknesses=[
            "Lack of proven defensibility against Big Tech clones.",
            "Unclear regulatory compliance in EU markets."
        ],
        deal_breakers=[
            "Founding team lacks deep technical expertise in AI.",
            "TAM is smaller than projected if adjacent markets fail to adopt."
        ],
        investment_probability=68.5
    )

@router.get("/impact-score", response_model=ImpactScoreResponse)
async def get_impact_score(startup_id: str = "default"):
    await asyncio.sleep(1.0)
    return ImpactScoreResponse(
        global_impact_score=84,
        economic_impact=92,
        jobs_created=1500,
        carbon_impact=45,
        education_impact=78,
        healthcare_impact=30,
        social_impact=88
    )

@router.get("/market-brain", response_model=MarketBrainResponse)
async def get_market_brain(startup_id: str = "default"):
    await asyncio.sleep(0.8)
    return MarketBrainResponse(
        momentum_score=94,
        trend_velocity="Accelerating (+14% WoW)",
        disruption_potential="Extreme",
        funding_attractiveness="Tier 1",
        competition_density="Moderate (Fragmented)",
        live_signals=[
            {"source": "Reddit", "sentiment": "Bullish", "content": "Developers are heavily discussing automated coding platforms."},
            {"source": "Venture News", "sentiment": "Neutral", "content": "Sequoia recently raised a $1B fund focusing on AI agents."},
            {"source": "GitHub", "sentiment": "Bullish", "content": "Agentic framework repos are trending #1 this week."}
        ]
    )
