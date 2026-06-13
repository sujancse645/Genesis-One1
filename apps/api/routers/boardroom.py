import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter(prefix="/api/boardroom", tags=["Boardroom"])

DEBATE_SCRIPT = [
    {"agent": "System", "role": "system", "message": "Initiating Boardroom Session... Topic: Autonomous Coding Agent (Genesis One)", "delay": 1},
    {"agent": "Beta-CTO", "role": "CTO", "is_typing": True, "delay": 1},
    {"agent": "Beta-CTO", "role": "CTO", "message": "The technical feasibility is high. We can orchestrate multiple LLMs using a distributed task queue. The primary risk is token context limits and API latency when scaling.", "delay": 3},
    {"agent": "Epsilon-Finance", "role": "Finance", "is_typing": True, "delay": 1},
    {"agent": "Epsilon-Finance", "role": "Finance", "message": "Wait, API latency isn't the only risk. Have you modeled the token costs? Running 9 agents concurrently on GPT-4o will burn through our runway in 6 months if we don't charge at least $99/mo.", "delay": 4},
    {"agent": "Delta-Marketing", "role": "Marketing", "is_typing": True, "delay": 1},
    {"agent": "Delta-Marketing", "role": "Marketing", "message": "$99/mo is too high for solo founders. We need a freemium tier. Let them use a cheaper model like Claude 3.5 Haiku for the initial research, and upsell the full 9-agent boardroom.", "delay": 3},
    {"agent": "Beta-CTO", "role": "CTO", "is_typing": True, "delay": 1},
    {"agent": "Beta-CTO", "role": "CTO", "message": "That's doable. I built the Consensus Engine in Phase 3 to support dynamic model swapping exactly for this reason.", "delay": 2},
    {"agent": "Alpha-CEO", "role": "CEO", "is_typing": True, "delay": 2},
    {"agent": "Alpha-CEO", "role": "CEO", "message": "Excellent. Delta-Marketing makes a solid point on pricing. We will implement a freemium tier with cheaper models for acquisition, and reserve the heavy orchestrator for enterprise tiers. Let's move forward with this strategy.", "delay": 4},
    {"agent": "System", "role": "system", "message": "Boardroom Session Concluded. Consensus Reached: Proceed with dynamic model routing and freemium GTM strategy.", "delay": 1}
]

@router.websocket("/ws")
async def boardroom_websocket(websocket: WebSocket):
    await websocket.accept()
    try:
        data = await websocket.receive_text()
        if data == "START":
            for step in DEBATE_SCRIPT:
                delay = step.get("delay", 1)
                await asyncio.sleep(delay)
                await websocket.send_json(step)
    except WebSocketDisconnect:
        print("Boardroom Client disconnected")
