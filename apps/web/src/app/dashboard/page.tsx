"use client";

import React from 'react';
import Link from 'next/link';
import { Network, Activity, TrendingUp, Presentation, ArrowRight } from 'lucide-react';

export default function DashboardHomePage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto p-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 text-white">
      
      <header className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Welcome to <span className="bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">Genesis One</span></h1>
        <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
          The world's first Autonomous Venture Intelligence OS. Transform your raw ideas into fully simulated, mathematically validated, and investor-ready startups.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        
        {/* Module Cards */}
        <Link href="/dashboard/orchestrator" className="group">
          <div className="h-full bg-neutral-900/40 border border-white/5 rounded-3xl p-8 hover:bg-neutral-800/60 hover:border-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Network className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">Agent Orchestrator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">View the multi-agent neural network architecture visualizing the collaboration of 9 specialized AI personas.</p>
            <div className="mt-6 flex items-center text-sm font-semibold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
              Access Module <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/research" className="group">
          <div className="h-full bg-neutral-900/40 border border-white/5 rounded-3xl p-8 hover:bg-neutral-800/60 hover:border-emerald-500/30 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">Research Engine</h3>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">Autonomously generate massive market intelligence dossiers, TAM/SAM sizing, and Competitor Threat Matrices.</p>
            <div className="mt-6 flex items-center text-sm font-semibold text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
              Access Module <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/simulation" className="group">
          <div className="h-full bg-neutral-900/40 border border-white/5 rounded-3xl p-8 hover:bg-neutral-800/60 hover:border-purple-500/30 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">Digital Twin</h3>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">Simulate 60 months of financial compounding, MRR growth, and cash runway using deterministic SaaS math models.</p>
            <div className="mt-6 flex items-center text-sm font-semibold text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
              Access Module <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/pitch" className="group">
          <div className="h-full bg-neutral-900/40 border border-white/5 rounded-3xl p-8 hover:bg-neutral-800/60 hover:border-rose-500/30 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Presentation className="w-7 h-7 text-rose-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-rose-400 transition-colors">Pitch Deck</h3>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">Synthesize all validated intelligence into a premium, interactive 10-slide presentation ready for Seed investors.</p>
            <div className="mt-6 flex items-center text-sm font-semibold text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
              Access Module <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </Link>

      </div>

      <div className="mt-12 bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300">
        <div className="max-w-xl mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-3">System Status: <span className="text-emerald-400">All Nodes Operational</span></h2>
          <p className="text-neutral-400">The Global Knowledge Brain and Consensus Engine are currently standing by. Initiate a new startup simulation from the Research Engine module to begin.</p>
        </div>
        <Link href="/dashboard/research">
          <button className="bg-white text-black hover:bg-neutral-200 font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] text-lg whitespace-nowrap">
            Launch New Startup
          </button>
        </Link>
      </div>

    </div>
  );
}
