"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp, Radar, BarChart4, AlertTriangle, CheckCircle2, Globe2, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function IntelligencePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Self-contained mock data for Vercel demo
        const mockBrain = { momentum_score: 94, trend_velocity: "Accelerating (+14% WoW)", disruption_potential: "Extreme", live_signals: [ {source: "Reddit", sentiment: "Bullish", content: "Developers are heavily discussing automated coding platforms."}, {source: "Venture News", sentiment: "Neutral", content: "Sequoia recently raised a $1B fund focusing on AI agents."} ] };
        const mockUnicorn = { unicorn_probability: 8.7, success_probability: 74.5, acquisition_probability: 45.2, ipo_probability: 12.4 };
        const mockXray = { loves: ["High recurring revenue potential.", "Strong network effects."], deal_breakers: ["Founding team lacks deep technical expertise.", "TAM is smaller than projected."] };
        const mockImpact = { global_impact_score: 84, jobs_created: 1500 };
        
        await new Promise(r => setTimeout(r, 1500));
        setData({ brain: mockBrain, unicorn: mockUnicorn, xray: mockXray, impact: mockImpact });
      } catch (err) {
        console.error("Failed to fetch intelligence", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading || !data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-blue-400">
        <BrainCircuit className="w-16 h-16 animate-pulse mb-4" />
        <p className="tracking-[0.2em] uppercase font-semibold text-sm">Synchronizing Live Intelligence...</p>
      </div>
    );
  }

  // Mock chart data for trend
  const chartData = [
    { name: "Mon", signals: 40 },
    { name: "Tue", signals: 55 },
    { name: "Wed", signals: 45 },
    { name: "Thu", signals: 70 },
    { name: "Fri", signals: parseInt(data.brain.momentum_score) }
  ];

  return (
    <div className="p-8 pb-32 max-w-7xl mx-auto space-y-8 overflow-y-auto h-full scrollbar-hide">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Radar className="w-8 h-8 text-blue-500" /> Genesis Live Intelligence
          </h1>
          <p className="text-gray-400 mt-2 text-sm tracking-wide">Real-time market brain and predictive probabilities.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 px-4 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Network Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Market Brain */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0B0C10] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full" />
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <Activity className="text-blue-400" /> Live Market Momentum
            </h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-2xl">
                <div className="text-gray-400 text-xs uppercase mb-1">Momentum Score</div>
                <div className="text-3xl font-black text-white">{data.brain.momentum_score}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl">
                <div className="text-gray-400 text-xs uppercase mb-1">Trend Velocity</div>
                <div className="text-xl font-bold text-green-400">{data.brain.trend_velocity}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl">
                <div className="text-gray-400 text-xs uppercase mb-1">Disruption</div>
                <div className="text-xl font-bold text-purple-400">{data.brain.disruption_potential}</div>
              </div>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#000", border: "1px solid #333" }} />
                  <Line type="monotone" dataKey="signals" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 8, fill: "#3b82f6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Live Signals Captured</h3>
              {data.brain.live_signals.map((sig: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between bg-black/40 border border-white/5 p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-1 bg-white/10 rounded-md text-gray-300">{sig.source}</span>
                    <span className="text-sm text-gray-200">{sig.content}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${sig.sentiment === 'Bullish' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {sig.sentiment}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Investor X-Ray */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-green-950/20 border border-green-500/20 rounded-3xl p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-green-500" /> What Investors Love
              </h2>
              <ul className="space-y-3">
                {data.xray.loves.map((love: string, i: number) => (
                  <li key={i} className="text-sm text-green-200 flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    {love}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-950/20 border border-red-500/20 rounded-3xl p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <AlertTriangle className="text-red-500" /> Critical Deal Breakers
              </h2>
              <ul className="space-y-3">
                {data.xray.deal_breakers.map((db: string, i: number) => (
                  <li key={i} className="text-sm text-red-200 flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    {db}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Probabilities & Impact */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-[#0B0C10] to-black border border-white/5 rounded-3xl p-6 text-center">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Unicorn Probability</h2>
            <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 mb-2">
              {data.unicorn.unicorn_probability}%
            </div>
            <p className="text-xs text-gray-500">Based on Genesis Algorithm Analysis</p>
            
            <div className="mt-8 space-y-4 text-left">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Success Probability</span>
                  <span className="text-green-400">{data.unicorn.success_probability}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${data.unicorn.success_probability}%` }} className="bg-green-500 h-1.5 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Acquisition Target</span>
                  <span className="text-blue-400">{data.unicorn.acquisition_probability}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${data.unicorn.acquisition_probability}%` }} className="bg-blue-500 h-1.5 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">IPO Readiness</span>
                  <span className="text-purple-400">{data.unicorn.ipo_probability}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${data.unicorn.ipo_probability}%` }} className="bg-purple-500 h-1.5 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0B0C10] border border-white/5 rounded-3xl p-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Globe2 className="text-cyan-400" /> Global Impact Score
            </h2>
            <div className="flex items-center justify-center mb-6">
               <div className="w-32 h-32 rounded-full border-8 border-cyan-500/20 flex items-center justify-center relative">
                 <div className="absolute inset-0 border-8 border-cyan-500 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 84%, 0 84%)' }} />
                 <span className="text-4xl font-black text-white">{data.impact.global_impact_score}</span>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-white/5 rounded-xl py-3">
                <div className="text-cyan-400 font-bold text-xl">{data.impact.jobs_created}</div>
                <div className="text-[10px] text-gray-400 uppercase">Jobs Created</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl py-3">
                <div className="text-cyan-400 font-bold text-xl">Top 1%</div>
                <div className="text-[10px] text-gray-400 uppercase">Economic</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
