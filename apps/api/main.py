from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from routers import orchestrator, research, simulation, boardroom, pitch

app = FastAPI(
    title="Genesis One API",
    description="The Autonomous Venture Intelligence OS",
    version="1.0.0"
)

app.include_router(orchestrator.router)
app.include_router(research.router)
app.include_router(simulation.router)
app.include_router(boardroom.router)
app.include_router(pitch.router)

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Genesis One API is running."}

@app.websocket("/ws/boardroom")
async def boardroom_websocket(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_json({"event": "connected", "message": "Welcome to the AI Boardroom"})
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_json({"event": "message", "data": f"Echo: {data}"})
    except Exception as e:
        print(f"WebSocket Error: {e}")
    finally:
        print("WebSocket Disconnected")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
