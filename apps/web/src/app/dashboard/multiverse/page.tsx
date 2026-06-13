"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Network, Swords, Dna, GitMerge, Bot, Zap, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function MultiversePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ceoActive, setCeoActive] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Self-contained mock data for Vercel demo
        const mockWarRoom = { startup_win_probability: 78.4, competitor_name: "LegacyCorp Enterprise", pricing_war_result: "Dominant - 40% lower CAC allows underpricing.", marketing_war_result: "Competitive - Requires heavily targeted viral campaigns.", feature_war_result: "Crushing - AI orchestration layer cannot be replicated quickly." };
        const mockDna = { innovation_dna: 96, growth_dna: 88, funding_dna: 85, business_dna: 72, risk_dna: 34, primary_mutation: "Hyper-scalable AI Agent Architecture" };
        const mockScenarios = { scenarios: [
          { name: "Aggressive Growth", strategy: "Raise Series A, burn high to capture market share.", success_probability: 45.0, revenue_outcome: "$50M ARR (Year 3)", risk_level: "Extreme" },
          { name: "Bootstrapped", strategy: "Organic growth, zero VC funding.", success_probability: 82.0, revenue_outcome: "$5M ARR (Year 3)", risk_level: "Low" },
          { name: "Enterprise Focus", strategy: "Target Fortune 500 exclusively.", success_probability: 60.5, revenue_outcome: "$20M ARR (Year 3)", risk_level: "High" },
          { name: "Global Expansion", strategy: "Launch in EU and Asia immediately.", success_probability: 35.0, revenue_outcome: "$100M ARR (Year 3)", risk_level: "Critical" }
        ]};
        
        await new Promise(r => setTimeout(r, 1500));
        setData({ warRoom: mockWarRoom, dna: mockDna, scenarios: mockScenarios });
      } catch (err) {
        console.error("Failed to fetch multiverse", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading || !data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-indigo-400">
        <Network className="w-16 h-16 animate-pulse mb-4" />
        <p className="tracking-[0.2em] uppercase font-semibold text-sm">Initializing Multiverse Engine...</p>
      </div>
    );
  }

  return (
    <div className="p-8 pb-32 max-w-7xl mx-auto space-y-8 overflow-y-auto h-full scrollbar-hide">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Network className="w-8 h-8 text-indigo-500" /> The Multiverse
          </h1>
          <p className="text-gray-400 mt-2 text-sm tracking-wide">Parallel simulations, DNA traits, and War Room projections.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/multiverse/hive-mind" className="flex items-center gap-2 bg-indigo-900/20 hover:bg-indigo-900/40 border border-indigo-500/30 px-6 py-2 rounded-full text-indigo-400 text-sm font-bold uppercase transition-colors">
            <BrainCircuitIcon /> Enter Hive Mind
          </Link>
          <button 
            onClick={() => setCeoActive(!ceoActive)}
            className={`flex items-center gap-2 border px-6 py-2 rounded-full text-sm font-bold uppercase transition-all ${
              ceoActive 
                ? "bg-green-600 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]" 
                : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
            }`}
          >
            {ceoActive ? <CheckCircle2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {ceoActive ? "Auto-CEO Active" : "Run Company"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* War Room */}
        <div className="bg-[#0B0C10] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-3xl rounded-full" />
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <Swords className="text-red-500" /> AI War Room
          </h2>
          <div className="flex justify-between items-center bg-black/40 border border-white/5 rounded-2xl p-4 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-400 uppercase">Genesis Startup</div>
              <div className="text-2xl font-black text-blue-400">{data.warRoom.startup_win_probability}% Win</div>
            </div>
            <div className="text-red-500 font-bold italic">VS</div>
            <div className="text-center">
              <div className="text-sm text-gray-400 uppercase">{data.warRoom.competitor_name}</div>
              <div className="text-2xl font-black text-red-400">{(100 - data.warRoom.startup_win_probability).toFixed(1)}% Win</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xs text-gray-400 uppercase mb-1">Pricing War</div>
              <div className="text-sm text-gray-200">{data.warRoom.pricing_war_result}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xs text-gray-400 uppercase mb-1">Marketing War</div>
              <div className="text-sm text-gray-200">{data.warRoom.marketing_war_result}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xs text-gray-400 uppercase mb-1">Feature War</div>
              <div className="text-sm text-gray-200">{data.warRoom.feature_war_result}</div>
            </div>
          </div>
        </div>

        {/* DNA Engine */}
        <div className="bg-[#0B0C10] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full" />
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <Dna className="text-emerald-500" /> Startup DNA Engine
          </h2>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <DnaBar label="Innovation" value={data.dna.innovation_dna} color="bg-emerald-500" />
              <DnaBar label="Growth" value={data.dna.growth_dna} color="bg-blue-500" />
              <DnaBar label="Funding" value={data.dna.funding_dna} color="bg-yellow-500" />
            </div>
            <div className="space-y-4">
              <DnaBar label="Business" value={data.dna.business_dna} color="bg-purple-500" />
              <DnaBar label="Risk" value={data.dna.risk_dna} color="bg-red-500" />
            </div>
          </div>
          
          <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-xs text-emerald-400 uppercase font-bold tracking-widest mb-1">Primary Mutation Profile</div>
            <div className="text-lg text-emerald-200">{data.dna.primary_mutation}</div>
          </div>
        </div>

      </div>

      {/* Multiverse Scenarios */}
      <div className="bg-[#0B0C10] border border-white/5 rounded-3xl p-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <GitMerge className="text-purple-500" /> Parallel Scenarios (Multiverse)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.scenarios.scenarios.map((scenario: any, idx: number) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors cursor-pointer group">
              <h3 className="text-lg font-bold text-white mb-2">{scenario.name}</h3>
              <p className="text-sm text-gray-400 mb-4 h-10">{scenario.strategy}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Success Prob</span>
                  <span className="text-green-400 font-bold">{scenario.success_probability}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Year 3 Revenue</span>
                  <span className="text-white font-bold">{scenario.revenue_outcome}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Risk Level</span>
                  <span className={`font-bold ${scenario.risk_level === 'Extreme' ? 'text-red-500' : scenario.risk_level === 'Critical' ? 'text-orange-500' : 'text-blue-400'}`}>
                    {scenario.risk_level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

function DnaBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400 uppercase">{label}</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} className={`${color} h-2 rounded-full`} />
      </div>
    </div>
  );
}

function BrainCircuitIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><path d="M22 10v4a2 2 0 0 1-2 2h-4"/><path d="M18 22V15"/><path d="M4 11v4a2 2 0 0 0 2 2h4"/></svg>
  );
}
