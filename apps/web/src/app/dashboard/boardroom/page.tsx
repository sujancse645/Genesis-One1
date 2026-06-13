"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Target, Cpu, DollarSign, Users, ShieldAlert, Sparkles, Send } from 'lucide-react';

interface ChatMessage {
  agent: string;
  role: string;
  message?: string;
  is_typing?: boolean;
}

const getAgentIcon = (role: string) => {
  switch(role) {
    case 'CEO': return <Target className="w-5 h-5 text-emerald-400" />;
    case 'CTO': return <Cpu className="w-5 h-5 text-blue-400" />;
    case 'Finance': return <DollarSign className="w-5 h-5 text-purple-400" />;
    case 'Marketing': return <Users className="w-5 h-5 text-rose-400" />;
    case 'system': return <ShieldAlert className="w-5 h-5 text-neutral-400" />;
    default: return <Sparkles className="w-5 h-5 text-yellow-400" />;
  }
};

const getAgentColor = (role: string) => {
  switch(role) {
    case 'CEO': return "text-emerald-400";
    case 'CTO': return "text-blue-400";
    case 'Finance': return "text-purple-400";
    case 'Marketing': return "text-rose-400";
    case 'system': return "text-neutral-500";
    default: return "text-white";
  }
};

export default function BoardroomPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initiateSession = () => {
    setIsSessionActive(true);
    setMessages([]);
    ws.current = new WebSocket('ws://localhost:8000/api/boardroom/ws');
    
    ws.current.onopen = () => {
      ws.current?.send("START");
    };

    ws.current.onmessage = (event) => {
      const data: ChatMessage = JSON.parse(event.data);
      
      setMessages((prev) => {
        // If there's an existing typing indicator for this agent, remove it
        const filtered = prev.filter(m => !(m.is_typing && m.agent === data.agent));
        return [...filtered, data];
      });
    };

    return () => {
      ws.current?.close();
    };
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white overflow-hidden">
      <div className="border-b border-white/10 p-6 flex justify-between items-center bg-neutral-900/50 backdrop-blur-md z-10 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-rose-400 bg-clip-text text-transparent flex items-center">
            <Sparkles className="mr-3 text-purple-400" /> AI Boardroom Live
          </h1>
          <p className="text-neutral-400 text-sm mt-1">Real-time Multi-Agent Debate Simulation</p>
        </div>
        {!isSessionActive && (
          <button 
            onClick={initiateSession}
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)]"
          >
            Initiate Board Session
          </button>
        )}
        {isSessionActive && (
          <div className="flex items-center text-sm text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 mr-2 animate-pulse"></span>
            Session Recording
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'system' ? 'justify-center' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            {msg.role === 'system' ? (
              <div className="text-neutral-500 text-sm italic py-2 px-4 bg-black/40 rounded-full border border-neutral-800 shadow-inner">
                {msg.message}
              </div>
            ) : (
              <div className="flex items-start max-w-3xl">
                <div className="w-10 h-10 rounded-full bg-black border border-neutral-700 flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                  {getAgentIcon(msg.role)}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline mb-1">
                    <span className={`font-semibold mr-2 ${getAgentColor(msg.role)}`}>{msg.agent}</span>
                    <span className="text-xs text-neutral-500 uppercase font-medium">{msg.role}</span>
                  </div>
                  {msg.is_typing ? (
                    <div className="bg-black/60 border border-neutral-800 rounded-2xl rounded-tl-none px-4 py-3 text-neutral-400 flex items-center w-24 shadow-md backdrop-blur-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl rounded-tl-none px-5 py-3 text-neutral-200 leading-relaxed shadow-lg backdrop-blur-md">
                      {msg.message}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="p-6 bg-neutral-950 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto flex shadow-lg">
          <input 
            type="text" 
            disabled 
            placeholder={isSessionActive ? "The Board is currently deliberating. Please wait..." : "Click 'Initiate Board Session' to begin."}
            className="flex-1 bg-black border border-neutral-800 rounded-l-lg px-4 py-3 text-white disabled:opacity-50 focus:outline-none"
          />
          <button disabled className="bg-neutral-900 text-neutral-600 px-6 rounded-r-lg border border-l-0 border-neutral-800">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
