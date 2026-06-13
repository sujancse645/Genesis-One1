import AgentCanvas from "@/components/orchestration/AgentCanvas";

export default function OrchestratorPage() {
  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white overflow-hidden">
      <header className="h-16 border-b border-white/10 flex items-center px-6 bg-neutral-950/50 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          Genesis One Command Center
        </h1>
        <div className="ml-auto flex items-center space-x-4 text-sm text-neutral-400">
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span> Systems Online</span>
          <span>Phase 4 Active</span>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* The React Flow Canvas takes up the full remaining height */}
        <AgentCanvas />
        
        {/* Overlay UI elements to make it feel like a command center */}
        <div className="absolute bottom-6 left-6 w-80 bg-black/60 backdrop-blur-lg border border-white/10 rounded-xl p-4 z-10">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-3 font-semibold">Active Agents</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-300"><span>Alpha-CEO</span> <span className="text-blue-400">IDLE</span></div>
            <div className="flex justify-between text-neutral-300"><span>Beta-CTO</span> <span className="text-blue-400">IDLE</span></div>
            <div className="flex justify-between text-neutral-300"><span>Gamma-Product</span> <span className="text-blue-400">IDLE</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}
