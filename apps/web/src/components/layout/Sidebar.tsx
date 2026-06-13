"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Network, Activity, TrendingUp, Users, Presentation, Search, LayoutDashboard, BrainCircuit, Rocket } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Command Center', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Multi-Agent Flow', href: '/dashboard/orchestrator', icon: Network },
    { name: 'Research Engine', href: '/dashboard/research', icon: Activity },
    { name: 'Digital Twin', href: '/dashboard/simulation', icon: TrendingUp },
    { name: 'AI Boardroom', href: '/dashboard/boardroom', icon: Users },
    { name: 'Pitch Deck', href: '/dashboard/pitch', icon: Presentation },
    { name: 'Intelligence', href: '/dashboard/intelligence', icon: BrainCircuit },
    { name: 'Multiverse', href: '/dashboard/multiverse', icon: Network },
    { name: 'Startup Galaxy', href: '/dashboard/galaxy', icon: Rocket, color: 'text-red-500' },
  ];

  return (
    <div className="w-72 h-full bg-neutral-950/80 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 hidden lg:flex shadow-2xl relative z-50">
      
      {/* Header / Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Network className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Genesis One</span>
        </Link>
      </div>

      {/* Global Search Stub */}
      <div className="p-5">
        <button className="w-full flex items-center justify-between bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-500 hover:text-neutral-300 hover:border-neutral-700 transition-colors shadow-inner">
          <div className="flex items-center">
            <Search className="w-4 h-4 mr-3 opacity-70" />
            <span className="font-medium">Search modules...</span>
          </div>
          <kbd className="hidden sm:inline-block px-2 py-1 rounded-md bg-neutral-800/80 text-[11px] font-mono text-neutral-400 border border-neutral-700">⌘K</kbd>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto custom-scrollbar">
        <div className="text-[11px] font-bold text-neutral-600 uppercase tracking-widest mb-3 px-3 mt-2">Intelligence Systems</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}>
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-400' : 'text-neutral-500'}`} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-5 border-t border-white/5 bg-black/30 backdrop-blur-md">
        <div className="flex items-center justify-between bg-neutral-900/50 p-3 rounded-xl border border-white/5">
          <div className="flex items-center space-x-3">
             <UserButton appearance={{ elements: { userButtonAvatarBox: "w-9 h-9 rounded-lg" } }} />
             <div className="flex flex-col">
               <span className="text-sm font-semibold text-white">Founder Profile</span>
               <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">Premium Tier</span>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
