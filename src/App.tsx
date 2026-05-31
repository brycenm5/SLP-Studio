/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import PhoneticsPortal from "./components/PhoneticsPortal";
import PediatricCenter from "./components/PediatricCenter";
import ClinicalInterventions from "./components/ClinicalInterventions";
import AIConsultant from "./components/AIConsultant";
import { Sparkles, Baby, Stethoscope, Activity, FileText, Zap, HelpCircle, GraduationCap, Github } from "lucide-react";

type PortfolioTab = "phonetics" | "pediatrics" | "clinical";

export default function App() {
  const [activeTab, setActiveTab] = useState<PortfolioTab>("phonetics");
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500/35 selection:text-white" id="main-portal-container">
      {/* Editorial Corporate Header Grid */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center font-bold text-slate-950 text-lg shadow-md shadow-indigo-500/10">
              Λ
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
                <span>Vocalis Specialty Portals</span>
                <span className="p-0.5 bg-indigo-500/10 text-indigo-400 text-[9px] uppercase tracking-wider font-mono rounded font-normal">SLP-CCC</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">Dr. Evelyn Vance • Clinical Phonetics & Pediatric Speech</p>
            </div>
          </div>

          {/* Navigation Tab Elements */}
          <div className="flex items-center bg-slate-900 border border-slate-800/80 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("phonetics")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                activeTab === "phonetics"
                  ? "bg-indigo-600 text-slate-50 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Activity size={13} />
              <span>Phonetics Lab</span>
            </button>
            <button
              onClick={() => setActiveTab("pediatrics")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                activeTab === "pediatrics"
                  ? "bg-indigo-600 text-slate-50 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Baby size={13} />
              <span>WeeSpeak Pediatric</span>
            </button>
            <button
              onClick={() => setActiveTab("clinical")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                activeTab === "clinical"
                  ? "bg-indigo-600 text-slate-50 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Stethoscope size={13} />
              <span>Interventions Lab</span>
            </button>
          </div>

          {/* Floaters Tray */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsConsultOpen(!isConsultOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isConsultOpen
                  ? "bg-emerald-600 text-slate-950 border-emerald-500"
                  : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300"
              }`}
            >
              <Sparkles size={13} className={isConsultOpen ? "animate-pulse" : ""} />
              <span>Clinical AI Consult</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Core Layout (With optional sidebar grid layout inside) */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        <main className="flex-1 bg-slate-950">
          {activeTab === "phonetics" && <PhoneticsPortal />}
          {activeTab === "pediatrics" && <PediatricCenter />}
          {activeTab === "clinical" && <ClinicalInterventions />}
        </main>

        {/* Persistent AI Consult side tray */}
        {isConsultOpen && (
          <aside className="w-full lg:w-96 lg:border-l border-slate-800 flex-shrink-0 bg-slate-900">
            <AIConsultant onClose={() => setIsConsultOpen(false)} />
          </aside>
        )}
      </div>

      {/* Corporate Editorial footer */}
      <footer className="bg-slate-950 border-t border-slate-900 px-6 py-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-xs">
          <div className="md:col-span-5 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <GraduationCap size={16} className="text-indigo-400" />
              <span>Evidence-Based Speech Pathology Integration</span>
            </div>
            <p className="text-slate-400 leading-normal max-w-sm">
              An advanced scientific toolkit for clinicians, researchers, and pediatric therapy support. Grounded in ASHA practice standards, articulatory acoustics, and motor speech planning theories.
            </p>
          </div>
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Vercel Deployment & Repository Specs</span>
            <div className="space-y-1 text-slate-400 font-mono text-[11px]">
              <div>Deploy Server: <span className="text-slate-200">Express + Vite Node JS</span></div>
              <div>Vercel Configuration: <span className="text-indigo-400">Continuous Integration Ready</span></div>
            </div>
          </div>
          <div className="md:col-span-3 text-left md:text-right space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Digital Stewardship</span>
            <div className="flex select-none gap-2 items-center md:justify-end text-slate-400">
              <span className="p-1 px-2 rounded bg-slate-900 border border-slate-800 text-[10px]">IPA V4.1 compliant</span>
              <span className="p-1 px-2 rounded bg-slate-900 border border-slate-800 text-[10px]">ASHA standards</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-900/60 pt-4 mt-4 flex flex-col sm:flex-row justify-between text-[10px] text-slate-500 font-mono">
          <span>&copy; 2026 Dr. Vance Vocalis Portals. All rights reserved. Registered SLP-CCC.</span>
          <span className="mt-2 sm:mt-0">Built securely with server-side Gemini API. Ready for Vercel.</span>
        </div>
      </footer>
    </div>
  );
}
