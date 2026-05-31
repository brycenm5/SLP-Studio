/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DEVELOPMENTAL_MILESTONES, ARTICULATION_DECK } from "../data";
import { Milestone, Flashcard } from "../types";
import { Baby, Calendar, HelpCircle, AlertCircle, RefreshCw, Star, Heart, Volume2, Smile, ArrowRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AssessmentResponse {
  processDetected: string;
  developmentalAnalysis: string;
  therapeuticClassification: string;
  simulatedGameName: string;
  gameInstructions: string[];
  reinforcementSlogan: string;
  parentTrainingTips: string[];
}

export default function PediatricCenter() {
  const [selectedAge, setSelectedAge] = useState<Milestone>(DEVELOPMENTAL_MILESTONES[2]); // Default 1-2 years
  const [targetCard, setTargetCard] = useState<Flashcard>(ARTICULATION_DECK[0]); // Default "Rabbit"
  const [childRealization, setChildRealization] = useState("wabbit");
  const [observations, setObservations] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AssessmentResponse | null>({
    processDetected: "Gliding of Liquids (/ɹ/ to [w])",
    developmentalAnalysis: "Typical phonological substitution for children under 5 years old. The rhotic approximant /ɹ/ is a complex motor-speech posture that usually solidifies fully around ages 5 to 6.",
    therapeuticClassification: "Typical developmental milestone variation (Not delayed, monitor progress regularly)",
    simulatedGameName: "The Sleepy Bear Rumble",
    gameInstructions: [
      "Ask your child to model a friendly, sleepy growling bear. Go 'Grrrrrr' first to trigger vocalic rhotic posture.",
      "Using toys, put 'Mr. Bear' onto a toy 'Rabbit'. Repeat 'Run, Run, Run, Bear, Run' modeling clear sound bursts.",
      "If they substitute 'w', playfully cue: 'Oh, you said wabbit! Put your lips back like this, let's growl together!'"
    ],
    reinforcementSlogan: "Super growls, buddy! Your tongue is learning to slide so strong!",
    parentTrainingTips: [
      "Avoid direct negative corrections (e.g. don't say 'No, that is wrong, say Rabbit').",
      "Use auditory bombardment: Speak stories using lots of r-words with slightly elongated 'r' sounds.",
      "Reinforce any approximation or throat-rumbling attempt with huge high fives!"
    ]
  });
  const [analysisError, setAnalysisError] = useState("");

  const handleAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!childRealization.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisError("");

    try {
      const response = await fetch("/api/pediatric-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childAgeGroup: selectedAge.age,
          targetWord: targetCard.word,
          childRealization: childRealization,
          observations: observations
        })
      });

      if (!response.ok) {
        let errMsg = "Pediatric core encountered an error. Please try again.";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errMsg = errData.error;
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || "Failed to analyze speech realization.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playTargetAudio = (word: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 space-y-8" id="pediatric-center">
      {/* Visual Header */}
      <div className="max-w-7xl mx-auto border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-indigo-400">Section II: Childhood speech Development Hub</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1 text-slate-50 font-sans">WeeSpeak Development Hub</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            A family-friendly, scientifically rigorous resource center. Track developmental speech milestones, browse developmental guidance, and diagnose speech processes.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-indigo-300">
          <Baby size={14} />
          <span>Development Tracker: Active</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: DEVELOPMENTAL MILESTONE SELECTOR (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
              <Calendar size={15} />
              <span>Milestone age cohorts</span>
            </h2>

            {/* Age Toggles */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {DEVELOPMENTAL_MILESTONES.map((m) => (
                <button
                  key={m.age}
                  onClick={() => setSelectedAge(m)}
                  className={`py-3 px-2 text-xs rounded-lg font-semibold border transition-all truncate text-center ${
                    selectedAge.age === m.age
                      ? "bg-indigo-600 text-white border-indigo-500 scale-[1.02] shadow-md shadow-indigo-600/10"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100"
                  }`}
                >
                  {m.age}
                </button>
              ))}
            </div>

            {/* Selected Age details */}
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950/80 rounded-lg p-3.5 border border-slate-800">
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 block mb-2">Receptive Communication</span>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {selectedAge.receptive.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/80 rounded-lg p-3.5 border border-slate-800">
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 block mb-2">Expressive Language</span>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {selectedAge.expressive.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/80 rounded-lg p-3.5 border border-slate-800">
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 block mb-2">Phonology & Sound Portfolio</span>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {selectedAge.phonology.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Enrichment activities */}
              <div className="bg-indigo-950/20 rounded-lg p-3.5 border border-indigo-950/60">
                <span className="text-[10px] uppercase font-mono tracking-wider text-teal-400 flex items-center gap-1 mb-2 font-bold">
                  <Star size={10} fill="currentColor" /> Parent Enrichment Guidance
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedAge.activities.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <Heart size={12} className="text-secondary text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE SPEECH GAME & AI ANALYSIS (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Smile size={16} className="text-teal-400" />
                <span>Pediatric Articulation Practice</span>
              </h2>
              <span className="text-[10px] text-teal-400 font-mono">Interactive Diagnostic Engine</span>
            </div>

            {/* Target Card Carousel selection */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Select Speech Target Card:</span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
                {ARTICULATION_DECK.slice(0, 5).map((card) => (
                  <button
                    key={card.id}
                    onClick={() => {
                      setTargetCard(card);
                      // Pre-fill pronunciation based on child substitution behaviors
                      if (card.targetSound === "r") setChildRealization("wabbit");
                      else if (card.targetSound === "s") setChildRealization("thastle");
                      else if (card.targetSound === "l") setChildRealization("yeaf");
                      else if (card.targetSound === "θ") setChildRealization("fumb");
                      else if (card.targetSound === "k") setChildRealization("tat");
                    }}
                    className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg border text-center font-sans w-24 transition-all cursor-pointer ${
                      targetCard.id === card.id
                        ? "bg-teal-600/20 border-teal-500 scale-[1.02] shadow text-white"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-bold mb-0.5">/{card.targetSound}/ Sound</span>
                    <span className="text-xs font-semibold text-slate-200">{card.word}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">{card.ipa}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Active Card Display */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-950 border border-slate-800/80 rounded-lg p-4">
              <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800/60 pb-3 md:pb-0 md:pr-4 text-center">
                <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">Sound Prompt</span>
                <span className="text-2xl font-bold text-slate-100 mt-1">{targetCard.word}</span>
                <span className="text-xs text-teal-400 font-mono mt-0.5 font-bold">{targetCard.ipa}</span>
                <button
                  type="button"
                  onClick={() => playTargetAudio(targetCard.word)}
                  className="mt-3 p-2 bg-teal-600/10 hover:bg-teal-600 hover:text-slate-950 text-teal-400 rounded-full transition-colors cursor-pointer border border-teal-500/20"
                >
                  <Volume2 size={14} />
                </button>
              </div>
              <div className="md:col-span-8 flex flex-col justify-center">
                <span className="text-[9px] uppercase font-mono text-slate-400 tracking-wider mb-1">Articulation Placement Cue for children</span>
                <p className="text-xs text-slate-300 italic leading-relaxed">“{targetCard.placementCue}”</p>
              </div>
            </div>

            {/* Child Playback Realization input */}
            <form onSubmit={handleAssessment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-mono text-slate-400 tracking-wider mb-1.5">Child Realization (What they said)</label>
                  <input
                    type="text"
                    required
                    value={childRealization}
                    onChange={(e) => setChildRealization(e.target.value)}
                    placeholder="e.g. 'wabbit', 'fumb', 'tat'"
                    className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500 text-slate-100 focus:outline-none placeholder-slate-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-mono text-slate-400 tracking-wider mb-1.5">Parent Observation Notes (Optional)</label>
                  <input
                    type="text"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    placeholder="e.g. 'Air slips out sideways', 'struggles with front tongue lift'"
                    className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500 text-slate-100 focus:outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !childRealization.trim()}
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 disabled:opacity-45 transition-colors cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="animate-spin" size={14} />
                    <span>AI Engine Processing Realization...</span>
                  </>
                ) : (
                  <>
                    <span>Run Clinical Phonological Analysis</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {analysisError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded p-3 text-xs flex items-center gap-2">
                <AlertCircle size={14} />
                <span>{analysisError}</span>
              </div>
            )}

            {/* Analysis Output Results display */}
            {analysisResult && (
              <div className="space-y-4 bg-slate-950 rounded-xl p-5 border border-slate-800/80 mt-2">
                <div className="border-b border-slate-800/60 pb-3 flex flex-col sm:flex-row items-baseline justify-between gap-2">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">Deducted Phonological Process</span>
                    <h4 className="text-sm font-bold text-teal-400 mt-0.5">{analysisResult.processDetected}</h4>
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950/40 text-indigo-300 border border-indigo-500/10">
                      {analysisResult.therapeuticClassification}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Developmental Context</span>
                    <p className="text-slate-300 leading-relaxed">{analysisResult.developmentalAnalysis}</p>
                  </div>
                  <div className="space-y-1 bg-slate-900/60 rounded-lg p-3 border border-slate-800">
                    <span className="text-[10px] text-slate-300 uppercase tracking-widest font-mono font-bold flex items-center gap-1 mb-1">
                      <Star size={11} fill="currentColor" className="text-teal-400" />
                      <span>Simulated Home Game: “{analysisResult.simulatedGameName}”</span>
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300">
                      {analysisResult.gameInstructions.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-8 space-y-1">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">Positive Auditory Reinforcement Slogan</span>
                    <p className="italic text-teal-300 font-medium">“{analysisResult.reinforcementSlogan}”</p>
                  </div>
                  <div className="md:col-span-4 text-right">
                    <span className="text-[9px] text-slate-400 uppercase font-mono block">Clinical Standard</span>
                    <span className="text-[11px] text-slate-300 font-semibold font-mono">ASHA Standard Practice</span>
                  </div>
                </div>

                {/* Parent home tips list */}
                <div className="bg-indigo-950/20 border border-indigo-950/50 rounded-lg p-3">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-indigo-400 block mb-1 font-bold">Parent Homework Training Quick Tips</span>
                  <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                    {analysisResult.parentTrainingTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
