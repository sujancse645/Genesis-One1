"use client";

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Activity, TrendingUp, AlertTriangle, Battery, Target, TrendingDown } from 'lucide-react';

interface MonthData {
  month: number;
  users: number;
  mrr: number;
  cash_balance: number;
  burn_rate: number;
  cac: number;
  ltv: number;
  churn: number;
}

export default function SimulationPage() {
  const [scenario, setScenario] = useState('Conservative');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MonthData[]>([]);

  const handleSimulate = async (selectedScenario: string) => {
    setScenario(selectedScenario);
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/simulation/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: selectedScenario }),
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg shadow-xl">
          <p className="text-white font-bold mb-2">Month {label}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} style={{ color: p.color }} className="text-sm">
              {p.name}: ${p.value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentMonthData = data.length > 0 ? data[data.length - 1] : null;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white p-8 overflow-y-auto">
      <div className="mb-8 border-b border-white/10 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent flex items-center">
            <Activity className="mr-3 text-blue-400" /> Digital Twin Simulation
          </h1>
          <p className="text-neutral-400 mt-2">60-Month Financial & Growth Forecasting Engine</p>
        </div>
        
        <div className="flex space-x-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
          {['Conservative', 'Aggressive', 'Worst Case'].map((s) => (
            <button
              key={s}
              onClick={() => handleSimulate(s)}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                scenario === s 
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {data.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/20">
          <Target className="w-12 h-12 text-neutral-600 mb-4" />
          <p className="text-neutral-400">Select a scenario to generate the 5-year simulation.</p>
          <button 
            onClick={() => handleSimulate('Conservative')}
            className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          >
            Initialize Engine
          </button>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64 border border-blue-500/30 rounded-2xl bg-blue-900/10 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-400 font-mono animate-pulse">Computing 5-Year Trajectory...</p>
        </div>
      )}

      {data.length > 0 && !isLoading && currentMonthData && (
        <div className="animate-in fade-in zoom-in duration-700">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 shadow-lg">
              <div className="text-neutral-500 text-xs uppercase tracking-wider mb-1 flex items-center"><TrendingUp className="w-4 h-4 mr-1"/> Year 5 MRR</div>
              <div className="text-3xl font-bold text-emerald-400">${currentMonthData.mrr.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 shadow-lg">
              <div className="text-neutral-500 text-xs uppercase tracking-wider mb-1 flex items-center"><Activity className="w-4 h-4 mr-1"/> Year 5 Users</div>
              <div className="text-3xl font-bold text-blue-400">{currentMonthData.users.toLocaleString()}</div>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 shadow-lg">
              <div className="text-neutral-500 text-xs uppercase tracking-wider mb-1 flex items-center"><Battery className="w-4 h-4 mr-1"/> Final Cash Balance</div>
              <div className={`text-3xl font-bold ${currentMonthData.cash_balance > 0 ? 'text-white' : 'text-rose-500'}`}>
                ${currentMonthData.cash_balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 shadow-lg">
              <div className="text-neutral-500 text-xs uppercase tracking-wider mb-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1"/> Final CAC / LTV</div>
              <div className="text-3xl font-bold text-purple-400">${currentMonthData.cac.toFixed(0)} / ${currentMonthData.ltv.toFixed(0)}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Cash Balance vs Burn Chart */}
            <div className="bg-neutral-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
              <h3 className="text-neutral-300 font-semibold mb-6 flex items-center">
                <Battery className="mr-2 text-indigo-400"/> Runway & Cash Flow (60 Months)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="month" stroke="#666" tickFormatter={(m) => `M${m}`}/>
                    <YAxis stroke="#666" tickFormatter={(v) => `$${v >= 1000 || v <= -1000 ? (v/1000).toFixed(0) + 'k' : v}`}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="cash_balance" name="Cash Balance" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCash)" />
                    <Area type="monotone" dataKey="burn_rate" name="Monthly Burn" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorBurn)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* MRR Growth Chart */}
            <div className="bg-neutral-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
              <h3 className="text-neutral-300 font-semibold mb-6 flex items-center">
                <TrendingUp className="mr-2 text-emerald-400"/> Revenue Growth (MRR)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="month" stroke="#666" tickFormatter={(m) => `M${m}`}/>
                    <YAxis stroke="#666" tickFormatter={(v) => `$${v >= 1000 ? (v/1000).toFixed(0) + 'k' : v}`}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="mrr" name="MRR" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#10b981', stroke: '#fff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
