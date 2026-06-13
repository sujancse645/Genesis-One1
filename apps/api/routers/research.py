from fastapi import APIRouter
from pydantic import BaseModel
from services.research.engine import ResearchEngine, ResearchResult

router = APIRouter(prefix="/api/research", tags=["Research"])
engine = ResearchEngine()

class ResearchRequest(BaseModel):
    startup_idea: str
    demo_mode: bool = True

@router.post("/generate", response_model=ResearchResult)
async def generate_research(request: ResearchRequest):
    result = await engine.generate_research(request.startup_idea, request.demo_mode)
    return result
