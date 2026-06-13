"use client";

import { useEffect, useState, useCallback } from "react";
import { ReactFlow, Background, Controls, MarkerType, applyNodeChanges, applyEdgeChanges, addEdge, Node, Edge } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { Network, ArrowLeft } from "lucide-react";
import Link from "next/link";

const initialNodes: Node[] = [
  { id: 'ceo', position: { x: 400, y: 100 }, data: { label: 'CEO Agent' }, type: 'default', style: { background: '#0B0C10', color: 'white', border: '1px solid #3b82f6', borderRadius: '12px', padding: '15px' } },
  { id: 'cto', position: { x: 200, y: 250 }, data: { label: 'CTO Agent' }, type: 'default', style: { background: '#0B0C10', color: 'white', border: '1px solid #10b981', borderRadius: '12px', padding: '15px' } },
  { id: 'cfo', position: { x: 600, y: 250 }, data: { label: 'CFO Agent' }, type: 'default', style: { background: '#0B0C10', color: 'white', border: '1px solid #f59e0b', borderRadius: '12px', padding: '15px' } },
  { id: 'cmo', position: { x: 100, y: 400 }, data: { label: 'CMO Agent' }, type: 'default', style: { background: '#0B0C10', color: 'white', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '15px' } },
  { id: 'research', position: { x: 400, y: 400 }, data: { label: 'Research Agent' }, type: 'default', style: { background: '#0B0C10', color: 'white', border: '1px solid #06b6d4', borderRadius: '12px', padding: '15px' } },
  { id: 'investor', position: { x: 700, y: 400 }, data: { label: 'Investor Agent' }, type: 'default', style: { background: '#0B0C10', color: 'white', border: '1px solid #ef4444', borderRadius: '12px', padding: '15px' } },
];

const initialEdges: Edge[] = [
  { id: 'e1', source: 'research', target: 'ceo', animated: true, label: 'Market Trend Sync', style: { stroke: '#06b6d4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#06b6d4' } },
  { id: 'e2', source: 'cto', target: 'cfo', animated: true, label: 'Cost Estimation', style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },
  { id: 'e3', source: 'cmo', target: 'investor', animated: true, label: 'CAC Projections', style: { stroke: '#8b5cf6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  { id: 'e4', source: 'ceo', target: 'cto', animated: true, label: 'Prioritization', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
  { id: 'e5', source: 'research', target: 'cmo', animated: true, label: 'Competitor Weaknesses', style: { stroke: '#06b6d4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#06b6d4' } },
];

export default function HiveMindPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [loading, setLoading] = useState(true);

  const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  useEffect(() => {
    // Simulate fetching live network state from backend
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-indigo-400">
        <Network className="w-16 h-16 animate-pulse mb-4" />
        <p className="tracking-[0.2em] uppercase font-semibold text-sm">Connecting to Hive Mind Neural Graph...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 pb-0 flex items-center justify-between z-10 bg-transparent pointer-events-auto">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/multiverse" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Genesis Hive Mind
            </h1>
            <p className="text-gray-400 text-xs tracking-wide">Real-time inter-agent neural knowledge transfer.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-indigo-900/20 border border-indigo-500/30 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Neural Link Active</span>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          className="bg-[#050505]"
          colorMode="dark"
        >
          <Background color="#ffffff" gap={20} size={1} opacity={0.05} />
          <Controls className="bg-black border border-white/10 fill-white" />
        </ReactFlow>
      </div>
    </div>
  );
}
