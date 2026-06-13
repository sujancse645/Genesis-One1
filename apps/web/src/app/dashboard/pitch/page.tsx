"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Presentation, Download, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Slide {
  title: string;
  content: string[];
  visual_type: string;
}

interface PitchDeck {
  slides: Slide[];
}

export default function PitchDeckPage() {
  const [deck, setDeck] = useState<PitchDeck | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // Self-contained mock data for Vercel demo
      await new Promise(r => setTimeout(r, 2000));
      const data = {
        slides: [
          { title: "The Problem", content: ["Developers waste 40% of time on boilerplate.", "Current AI tools lack full-stack context."], visual_type: "none" },
          { title: "The Solution", content: ["Autonomous multi-agent orchestration.", "End-to-end repository generation."], visual_type: "none" },
          { title: "Market Size", content: ["$120B TAM by 2030.", "Enterprise SaaS is the primary wedge."], visual_type: "chart_tam" },
          { title: "Financial Projections", content: ["$10M ARR in Year 5.", "90% gross margins."], visual_type: "chart_mrr" },
          { title: "The Ask", content: ["$1.5M Seed Round.", "18 months runway."], visual_type: "metric" }
        ]
      };
      setDeck(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = () => {
    if (deck && currentSlide < deck.slides.length - 1) {
      setCurrentSlide(s => s + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
    }
  };

  // Dummy chart data for visual representations
  const mrrData = [
    { month: 'Y1', mrr: 100 }, { month: 'Y2', mrr: 400 },
    { month: 'Y3', mrr: 1200 }, { month: 'Y4', mrr: 3500 },
    { month: 'Y5', mrr: 10000 }
  ];

  const tamData = [
    { name: 'TAM', value: 120.5 }, { name: 'SAM', value: 30.2 }, { name: 'SOM', value: 5.1 }
  ];

  const renderVisual = (visual_type: string) => {
    if (visual_type === 'chart_tam') {
      return (
        <div className="h-64 w-full mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tamData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip cursor={{fill: '#222'}} contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    if (visual_type === 'chart_mrr') {
      return (
        <div className="h-64 w-full mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mrrData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
              <Line type="monotone" dataKey="mrr" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
    if (visual_type === 'metric') {
      return (
        <div className="mt-12 flex justify-center w-full">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-12 text-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">Seed Round Ask</h4>
            <div className="text-7xl font-black text-white">$1.5M</div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white overflow-hidden">
      <div className="border-b border-white/10 p-6 flex justify-between items-center bg-neutral-900/50 backdrop-blur-md z-10">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent flex items-center">
            <Presentation className="mr-3 text-blue-400" /> Pitch Deck Generator
          </h1>
          <p className="text-neutral-400 text-sm mt-1">Consolidating Autonomous Intelligence into 10 Slides</p>
        </div>
        
        {deck && (
          <button className="flex items-center text-sm bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg transition-colors border border-neutral-700">
            <Download className="w-4 h-4 mr-2" /> Export to PDF
          </button>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950">
        {!deck && !isLoading && (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <button 
              onClick={handleGenerate}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] text-lg flex items-center"
            >
              <Presentation className="mr-3 w-6 h-6" /> Generate Pitch Deck
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-blue-400 font-mono animate-pulse text-lg">Synthesizing Market Intelligence...</p>
          </div>
        )}

        {deck && (
          <div className="relative w-full max-w-6xl aspect-[16/9] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
            
            {/* Slide Content */}
            <div className="flex-1 relative overflow-hidden p-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                >
                  <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    {deck.slides[currentSlide].title}
                  </h2>
                  
                  <div className="flex-1 flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 flex flex-col justify-center space-y-8">
                      {deck.slides[currentSlide].content.map((point, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle2 className="w-8 h-8 text-blue-500 mr-5 flex-shrink-0 mt-1" />
                          <p className="text-2xl text-neutral-300 leading-relaxed font-light">{point}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                      {renderVisual(deck.slides[currentSlide].visual_type)}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Bar */}
            <div className="h-16 border-t border-neutral-800 bg-black/50 flex items-center justify-between px-8 backdrop-blur-md">
              <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-2 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <div className="text-neutral-500 font-mono tracking-widest text-sm">
                SLIDE {currentSlide + 1} / {deck.slides.length}
              </div>

              <button 
                onClick={nextSlide}
                disabled={currentSlide === deck.slides.length - 1}
                className="p-2 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
