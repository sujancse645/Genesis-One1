import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import Copilot from "@/components/intelligence/Copilot";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-950 font-sans selection:bg-blue-500/30">
      <ClerkLoading>
        <div className="flex h-screen w-full items-center justify-center bg-neutral-950">
           <div className="flex flex-col items-center">
             <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
             <div className="text-blue-400 font-mono text-sm animate-pulse tracking-widest uppercase">Authenticating Identity...</div>
           </div>
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <Sidebar />
        <main className="flex-1 relative w-full h-full overflow-hidden bg-neutral-950">
          {children}
        </main>
        
        {/* Persistent Floating Copilot */}
        <Copilot />
      </ClerkLoaded>
    </div>
  );
}
