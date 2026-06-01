/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import PhoneticsPortal from "./components/PhoneticsPortal";
import PediatricCenter from "./components/PediatricCenter";
import ClinicalInterventions from "./components/ClinicalInterventions";
import AIConsultant from "./components/AIConsultant";
import { Sparkles, Baby, Stethoscope, Activity, FileText, Zap, HelpCircle, GraduationCap, Github, Lock, Unlock, ArrowRight, ShieldAlert, Key } from "lucide-react";

type PortfolioTab = "phonetics" | "pediatrics" | "clinical";

export default function App() {
  const [activeTab, setActiveTab] = useState<PortfolioTab>("phonetics");
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("vocalis_passcode");
      return !!stored && stored.trim().toLowerCase() === "olivia0924";
    }
    return false;
  });
  const [authError, setAuthError] = useState("");

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = passcodeInput.trim().toLowerCase();
    if (sanitized === "olivia0924") {
      localStorage.setItem("vocalis_passcode", "Olivia0924");
      setIsAuthorized(true);
      setAuthError("");
    } else {
      setAuthError("Invalid credentials. Please check password formatting.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("vocalis_passcode");
    setIsAuthorized(false);
    setPasscodeInput("");
  };

  // Render Passcode Screen if unauthorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-center items-center px-4 py-12 selection:bg-indigo-500/35 selection:text-white" id="main-portal-container">
        {/* Subtle background ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full relative z-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-indigo-500/10 mb-4">
              Λ
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white font-sans">
              Vocalis Specialty Portals
            </h1>
            <p className="text-[11px] text-slate-400 font-mono tracking-wide uppercase mt-1">
              Dr. Olivia Giammona • SLP-CCC
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 shadow-xl shadow-black/40">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Lock size={12} />
              <span>Gated Clinical Portal</span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed mb-6">
              This terminal is reserved for authorized clinical staff and direct collaborators of Dr. Olivia Giammona. Please insert your credentials below to synchronize patient registries and specialty speech diagnostics.
            </p>

            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                  Enter Password Credentials
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <Key size={14} />
                  </span>
                  <input
                    type="password"
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-indigo-500 font-mono transition-all"
                    autoFocus
                  />
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-medium leading-normal animate-shake">
                  <ShieldAlert size={14} className="flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-slate-50 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Authorize & Synchronize</span>
                <ArrowRight size={13} />
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-[10px] text-slate-500 font-mono">
              Authorized access only. Registered Speech-Language Pathology CCC.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
              <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">Dr. Olivia Giammona • Clinical Phonetics & Pediatric Speech</p>
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
          <div className="flex items-center gap-3">
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

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-rose-950 hover:text-rose-400 text-slate-400 transition-all cursor-pointer"
            >
              <Lock size={12} />
              <span className="hidden sm:inline">Lock Portal</span>
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
          <div className="md:col-span-12 lg:col-span-5 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <GraduationCap size={16} className="text-indigo-400" />
              <span>Evidence-Based Speech Pathology Integration</span>
            </div>
            <p className="text-slate-400 leading-normal max-w-sm">
              An advanced scientific toolkit for clinicians, researchers, and pediatric therapy support. Grounded in ASHA practice standards, articulatory acoustics, and motor speech planning theories.
            </p>
          </div>
          <div className="md:col-span-6 lg:col-span-4 space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Vercel Deployment & Repository Specs</span>
            <div className="space-y-1 text-slate-400 font-mono text-[11px]">
              <div>Deploy Server: <span className="text-slate-200">Express + Vite Node JS</span></div>
              <div>Vercel Configuration: <span className="text-indigo-400">Continuous Integration Ready</span></div>
            </div>
          </div>
          <div className="md:col-span-6 lg:col-span-3 text-left md:text-right space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Digital Stewardship</span>
            <div className="flex select-none gap-2 items-center md:justify-end text-slate-400">
              <span className="p-1 px-2 rounded bg-slate-900 border border-slate-800 text-[10px]">IPA V4.1 compliant</span>
              <span className="p-1 px-2 rounded bg-slate-900 border border-slate-800 text-[10px]">ASHA standards</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-900/60 pt-4 mt-4 flex flex-col sm:flex-row justify-between text-[10px] text-slate-500 font-mono">
          <span>&copy; 2026 Dr. Giammona Vocalis Portals. All rights reserved. Registered SLP-CCC.</span>
          <span className="mt-2 sm:mt-0">Built securely with server-side Gemini API. Ready for Vercel.</span>
        </div>
      </footer>
    </div>
  );
}
