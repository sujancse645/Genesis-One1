"use client";

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { BrainCircuit, Cpu, TrendingUp, Users, DollarSign, ShieldAlert, Scale, Target, Lightbulb } from 'lucide-react';

const agentData = [
  { id: 'ceo', label: 'Alpha-CEO', role: 'CEO', icon: Target },
  { id: 'cto', label: 'Beta-CTO', role: 'CTO', icon: Cpu },
  { id: 'product', label: 'Gamma-Product', role: 'Product', icon: BrainCircuit },
  { id: 'marketing', label: 'Delta-Marketing', role: 'Marketing', icon: Users },
  { id: 'finance', label: 'Epsilon-Finance', role: 'Finance', icon: DollarSign },
  { id: 'investor', label: 'Zeta-VC', role: 'Investor', icon: TrendingUp },
  { id: 'legal', label: 'Eta-Legal', role: 'Legal', icon: Scale },
  { id: 'competitor', label: 'Theta-Intel', role: 'Competitor', icon: ShieldAlert },
  { id: 'innovation', label: 'Iota-Labs', role: 'Innovation', icon: Lightbulb },
];

const generateRadialNodes = (): Node[] => {
  const nodes: Node[] = [];
  const centerX = 500;
  const centerY = 400;
  const radius = 300;

  // Central Startup Node
  nodes.push({
    id: 'startup-core',
    position: { x: centerX, y: centerY },
    data: { label: 'Startup Genesis Core' },
    style: {
      background: 'rgba(20, 20, 20, 0.8)',
      color: '#fff',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      width: 160,
      height: 160,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      boxShadow: '0 0 40px rgba(120, 120, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      zIndex: 10,
    },
  });

  // Orbital Agent Nodes
  const angleStep = (2 * Math.PI) / agentData.length;
  agentData.forEach((agent, index) => {
    const angle = index * angleStep - Math.PI / 2; // start from top
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    nodes.push({
      id: agent.id,
      position: { x, y },
      data: { label: agent.label, role: agent.role },
      style: {
        background: 'rgba(10, 10, 10, 0.9)',
        color: '#e5e5e5',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '15px',
        width: 150,
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
      },
    });
  });

  return nodes;
};

const generateEdges = (): Edge[] => {
  const edges: Edge[] = [];
  agentData.forEach((agent) => {
    edges.push({
      id: `edge-${agent.id}`,
      source: agent.id,
      target: 'startup-core',
      animated: false,
      style: { stroke: 'rgba(255, 255, 255, 0.2)', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(255, 255, 255, 0.2)' },
    });
  });
  return edges;
};

export default function AgentCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(generateRadialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateEdges());
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateDataFlow = () => {
    setIsSimulating(!isSimulating);
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: !isSimulating,
        style: {
          ...edge.style,
          stroke: !isSimulating ? 'rgba(120, 200, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)',
          strokeWidth: !isSimulating ? 3 : 2,
        },
      }))
    );
  };

  return (
    <div className="w-full h-full relative bg-neutral-950">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={simulateDataFlow}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-md border border-white/10 transition-all font-medium text-sm"
        >
          {isSimulating ? 'Halt Simulation' : 'Simulate Data Flow'}
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        className="bg-neutral-950"
      >
        <Background color="#333" gap={20} size={1} />
        <Controls className="bg-neutral-900 border-neutral-800 fill-white" />
      </ReactFlow>
    </div>
  );
}
