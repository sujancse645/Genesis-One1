"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Activity, ShieldAlert, Zap } from 'lucide-react';

interface ResearchData {
  tam: number;
  sam: number;
  som: number;
  swot: {
    Strengths: string[];
    Weaknesses: string[];
    Opportunities: string[];
    Threats: string[];
  };
  competitors: Array<{
    name: string;
    strength: string;
    weakness: string;
    threat_level: number;
  }>;
  opportunity_score: number;
}

export default function ResearchPage() {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [data, setData] = useState<ResearchData | null>(null);

  const loadingMessages = [
    "Initializing Consensus Engine...",
    "Scanning global market vectors...",
    "Analyzing competitor landscapes via GPT-4o...",
    "Calculating TAM/SAM/SOM via Claude 3.5...",
    "Synthesizing threat intelligence...",
    "Finalizing Research Report..."
  ];

  const handleGenerate = async () => {
    if (!idea) return;
    setIsLoading(true);
    setLoadingStep(0);

    // Simulate terminal typing
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= loadingMessages.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    try {
      const res = await fetch('http://localhost:8000/api/research/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startup_idea: idea, demo_mode: true }),
      });
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = data ? [
    { name: 'TAM', value: data.tam },
    { name: 'SAM', value: data.sam },
    { name: 'SOM', value: data.som },
  ] : [];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white p-8 overflow-y-auto">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent flex items-center">
          <Activity className="mr-3 text-blue-400" /> Autonomous Research Engine
        </h1>
        <p className="text-neutral-400 mt-2">Generate comprehensive market intelligence in seconds.</p>
      </div>

      {!data && !isLoading && (
        <div className="max-w-2xl mx-auto w-full mt-20 p-8 bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <h2 className="text-xl font-semibold mb-4">Input Startup Idea</h2>
          <textarea 
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full h-32 bg-black/50 border border-neutral-800 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
            placeholder="e.g., An AI-powered SaaS that automates the generation of startup research and pitches..."
          />
          <button 
            onClick={handleGenerate}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            Engage Research Engine
          </button>
        </div>
      )}

      {isLoading && (
        <div className="max-w-2xl mx-auto w-full mt-20 p-8 bg-black border border-green-500/30 rounded-xl font-mono text-sm shadow-[0_0_30px_rgba(0,255,0,0.1)]">
          <div className="flex items-center mb-4 text-green-500">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            System Processing
          </div>
          {loadingMessages.slice(0, loadingStep + 1).map((msg, idx) => (
            <div key={idx} className="text-green-400 mb-2 opacity-80 animate-pulse">&gt; {msg}</div>
          ))}
          <div className="text-green-400 animate-pulse mt-4">_</div>
        </div>
      )}

      {data && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-700">
          
          {/* Opportunity Score Card */}
          <div className="col-span-1 bg-neutral-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl">
            <Target className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-neutral-400 uppercase tracking-widest text-sm font-semibold">Opportunity Score</h3>
            <div className="text-6xl font-black text-white mt-2">{data.opportunity_score}</div>
            <p className="text-emerald-400 text-sm mt-2 font-medium">Highly Viable</p>
          </div>

          {/* Market Size Chart */}
          <div className="col-span-2 bg-neutral-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
            <h3 className="text-neutral-400 uppercase tracking-widest text-sm font-semibold mb-6">Market Sizing (Billions)</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip cursor={{fill: '#222'}} contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SWOT Analysis */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {Object.entries(data.swot).map(([category, items]) => (
              <div key={category} className="bg-neutral-900/40 border border-white/10 rounded-xl p-5 shadow-lg">
                <h4 className={`font-bold mb-3 ${category === 'Strengths' || category === 'Opportunities' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {category}
                </h4>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="text-sm text-neutral-300 flex items-start">
                      <Zap className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 opacity-50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Competitor Matrix */}
          <div className="col-span-1 md:col-span-3 mt-2 bg-neutral-900/40 border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-neutral-400 uppercase tracking-widest text-sm font-semibold mb-6 flex items-center">
              <ShieldAlert className="mr-2" /> Competitor Threat Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500">
                    <th className="pb-3 font-medium">Competitor</th>
                    <th className="pb-3 font-medium">Key Strength</th>
                    <th className="pb-3 font-medium">Core Weakness</th>
                    <th className="pb-3 font-medium text-right">Threat Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {data.competitors.map((comp, i) => (
                    <tr key={i}>
                      <td className="py-4 font-semibold text-white">{comp.name}</td>
                      <td className="py-4 text-emerald-400 text-sm">{comp.strength}</td>
                      <td className="py-4 text-rose-400 text-sm">{comp.weakness}</td>
                      <td className="py-4 text-right">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Level {comp.threat_level}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
