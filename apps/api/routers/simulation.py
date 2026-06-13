from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from services.simulation.engine import SimulationEngine, MonthData

router = APIRouter(prefix="/api/simulation", tags=["Simulation"])
engine = SimulationEngine()

class SimulationRequest(BaseModel):
    scenario: str

@router.post("/run", response_model=List[MonthData])
async def run_simulation(request: SimulationRequest):
    result = await engine.run_simulation(request.scenario)
    return result
