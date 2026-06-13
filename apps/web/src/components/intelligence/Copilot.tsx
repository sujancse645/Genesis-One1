"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Brain, Sparkles } from "lucide-react";

export default function Copilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "I am your Genesis Copilot. How can I assist you with scaling or strategy today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput, history: messages.map(m => ({ role: m.role, content: m.text })) })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: "Error: Neural Core disconnected." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/20 text-white transition-all group"
          >
            <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-80 sm:w-96 bg-[#0B0C10] border border-blue-900/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-blue-950/20 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white tracking-wide text-sm">Founder Copilot</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] uppercase font-bold tracking-wider">Live</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white/5 border border-white/10 text-gray-300 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 text-gray-300 rounded-2xl rounded-bl-none px-4 py-2 text-sm flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/5 bg-black/20">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask a strategic question..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500 transition-all"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
