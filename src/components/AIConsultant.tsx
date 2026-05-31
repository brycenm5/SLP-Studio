/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { Bot, Send, Sparkles, User, Loader2, X, Speech, HelpCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIConsultantProps {
  onClose?: () => void;
}

export default function AIConsultant({ onClose }: AIConsultantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Welcome to the SLP AI Consult Board. I am your specialized speech clinical assistant tuned on ASHA recommendations, phonetic structures, and developmental milestones. How can I assist you with diagnostic strategies, phonological processes, or therapeutic drill creations today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [category, setCategory] = useState("General Clinical Practice");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    "General Clinical Practice",
    "Phonological Interventions",
    "Motor-Speech (Apraxia / Dysarthria)",
    "Early Intervention & Pediatrics",
    "Adult Aphasia & Dysphagia"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/clinical-consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            sender: m.sender,
            text: m.text
          })),
          category: category
        })
      });

      if (!response.ok) {
        throw new Error("Failed to consult our AI Clinical core.");
      }

      const data = await response.json();
      const aiResponse: Message = {
        id: Math.random().toString(),
        sender: "ai",
        text: data.text || "I was unable to formulate clinical feedback at this moment. Please verify parameter syntax.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "ai",
          text: `[Clinical Connection Alert]: ${err.message || "An unexpected error occurred. Please make sure the server is online and try again."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const insertSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const suggestions = [
    "Difference between articulation delay and phonological processing disorder?",
    "How to treat child lateralized air emission on alveolar sounds like /s/?",
    "Cues or drills for a 6-year-old struggling with back-up vocalic /r/?"
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-100 font-sans" id="ai-consultant-sidebar">
      {/* Sidebar Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 rounded text-emerald-400">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight">Clinical AI Consult</h3>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">SECURE SLP ADVISORY ENGINE</p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Domain Selection */}
      <div className="p-3 bg-slate-950/50 border-b border-slate-800/80">
        <label className="block text-[10px] uppercase tracking-wider font-mono text-slate-400 mb-1.5">Consultation Domain</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-xs rounded p-2 focus:ring-1 focus:ring-emerald-500 text-slate-200 focus:outline-none"
        >
          {categories.map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.sender === "ai" && (
              <div className="w-7 h-7 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5 border border-emerald-500/20">
                <Bot size={14} />
              </div>
            )}
            
            <div className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
              m.sender === "user" 
                ? "bg-indigo-600 text-white rounded-tr-none" 
                : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50"
            }`}>
              <div className="whitespace-pre-wrap">{m.text}</div>
              <span className="block text-[9px] text-right text-slate-400 mt-1.5 font-mono">{m.timestamp}</span>
            </div>

            {m.sender === "user" && (
              <div className="w-7 h-7 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5 border border-indigo-500/20">
                <User size={14} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-400 flex-shrink-0 border border-emerald-500/20">
              <Loader2 className="animate-spin" size={14} />
            </div>
            <div className="bg-slate-800/60 rounded-lg p-3 text-xs text-slate-400 flex items-center gap-2 border border-slate-800 rounded-tl-none">
              <span>Synthesizing evidence-based response...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions Tray (if empty input) */}
      {!inputText.trim() && (
        <div className="p-3 bg-slate-950/40 border-t border-slate-800/60 space-y-1.5">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1">
            <HelpCircle size={10} /> Suggested Queries
          </p>
          <div className="flex flex-col gap-1">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => insertSuggestedQuestion(s)}
                className="text-left text-[11px] bg-slate-900 hover:bg-slate-800/80 p-1.5 rounded text-slate-300 hover:text-white border border-slate-800/60 transition-all text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input form */}
      <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask clinical or phonetic criteria..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded font-semibold disabled:opacity-40 disabled:hover:bg-emerald-600 transition-all flex items-center justify-center"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
