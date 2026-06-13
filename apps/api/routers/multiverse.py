import asyncio
import random
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict

router = APIRouter()

class WarRoomResponse(BaseModel):
    competitor_name: str
    startup_win_probability: float
    pricing_war_result: str
    marketing_war_result: str
    feature_war_result: str
    predicted_winner: str

class DnaResponse(BaseModel):
    growth_dna: int
    risk_dna: int
    innovation_dna: int
    business_dna: int
    funding_dna: int
    primary_mutation: str

class Scenario(BaseModel):
    name: str
    strategy: str
    success_probability: float
    revenue_outcome: str
    risk_level: str

class MultiverseResponse(BaseModel):
    scenarios: List[Scenario]

class HiveMindNode(BaseModel):
    id: str
    label: str
    role: str

class HiveMindEdge(BaseModel):
    source: str
    target: str
    transfer_type: str

class HiveMindResponse(BaseModel):
    nodes: List[HiveMindNode]
    edges: List[HiveMindEdge]
    active_transfers: int

@router.get("/war-room", response_model=WarRoomResponse)
async def get_war_room(startup_id: str = "default"):
    await asyncio.sleep(1)
    return WarRoomResponse(
        competitor_name="LegacyCorp Enterprise",
        startup_win_probability=78.4,
        pricing_war_result="Dominant - 40% lower CAC allows underpricing.",
        marketing_war_result="Competitive - Requires heavily targeted viral campaigns.",
        feature_war_result="Crushing - AI orchestration layer cannot be replicated quickly.",
        predicted_winner="Genesis Startup"
    )

@router.get("/dna", response_model=DnaResponse)
async def get_dna(startup_id: str = "default"):
    await asyncio.sleep(0.5)
    return DnaResponse(
        growth_dna=88,
        risk_dna=34,
        innovation_dna=96,
        business_dna=72,
        funding_dna=85,
        primary_mutation="Hyper-scalable AI Agent Architecture"
    )

@router.get("/scenarios", response_model=MultiverseResponse)
async def get_scenarios(startup_id: str = "default"):
    await asyncio.sleep(1.2)
    return MultiverseResponse(
        scenarios=[
            Scenario(name="Aggressive Growth", strategy="Raise Series A, burn high to capture market share.", success_probability=45.0, revenue_outcome="$50M ARR (Year 3)", risk_level="Extreme"),
            Scenario(name="Bootstrapped", strategy="Organic growth, zero VC funding.", success_probability=82.0, revenue_outcome="$5M ARR (Year 3)", risk_level="Low"),
            Scenario(name="Enterprise Focus", strategy="Target Fortune 500 exclusively.", success_probability=60.5, revenue_outcome="$20M ARR (Year 3)", risk_level="High"),
            Scenario(name="Global Expansion", strategy="Launch in EU and Asia immediately.", success_probability=35.0, revenue_outcome="$100M ARR (Year 3)", risk_level="Critical")
        ]
    )

@router.get("/hive-mind", response_model=HiveMindResponse)
async def get_hive_mind(startup_id: str = "default"):
    nodes = [
        HiveMindNode(id="ceo", label="CEO Agent", role="Leadership"),
        HiveMindNode(id="cto", label="CTO Agent", role="Technology"),
        HiveMindNode(id="cfo", label="CFO Agent", role="Finance"),
        HiveMindNode(id="cmo", label="CMO Agent", role="Marketing"),
        HiveMindNode(id="research", label="Research Agent", role="Data"),
        HiveMindNode(id="investor", label="Investor Agent", role="Capital"),
    ]
    edges = [
        HiveMindEdge(source="research", target="ceo", transfer_type="Market Trend Sync"),
        HiveMindEdge(source="cto", target="cfo", transfer_type="Infrastructure Cost Estimation"),
        HiveMindEdge(source="cmo", target="investor", transfer_type="CAC vs LTV Projections"),
        HiveMindEdge(source="ceo", target="cto", transfer_type="Roadmap Prioritization"),
        HiveMindEdge(source="research", target="cmo", transfer_type="Competitor Weaknesses"),
    ]
    return HiveMindResponse(nodes=nodes, edges=edges, active_transfers=5)
