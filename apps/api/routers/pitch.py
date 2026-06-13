from fastapi import APIRouter
from pydantic import BaseModel
from services.pitch.generator import PitchGenerator, PitchDeck

router = APIRouter(prefix="/api/pitch", tags=["Pitch"])
generator = PitchGenerator()

class PitchRequest(BaseModel):
    startup_idea: str

@router.post("/generate", response_model=PitchDeck)
async def generate_pitch(request: PitchRequest):
    return await generator.generate_deck(request.startup_idea)
