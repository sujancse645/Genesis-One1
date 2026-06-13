from fastapi import APIRouter
from pydantic import BaseModel
from services.llm.consensus_engine import ConsensusEngine, ConsensusResult

router = APIRouter(prefix="/api/orchestrator", tags=["Orchestrator"])
engine = ConsensusEngine()

class ConsensusRequest(BaseModel):
    prompt: str

@router.post("/consensus", response_model=ConsensusResult)
async def get_consensus(request: ConsensusRequest):
    result = await engine.run_consensus(request.prompt)
    return result
