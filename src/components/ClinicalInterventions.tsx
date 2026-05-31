/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Scale, FileText, ClipboardList, RefreshCw, AlertCircle, Plus, Check, Award, Brain, Stethoscope, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface POCMethodology {
  name: string;
  description: string;
}

interface POCResponse {
  backgroundSummary: string;
  longTermGoals: string[];
  shortTermObjectives: string[];
  clinicalMethodologies: POCMethodology[];
  placementCues: string[];
  homeProgramOutline: string;
}

interface SessionLog {
  id: string;
  date: string;
  trialName: string;
  trialsCount: number;
  accuracy: number; // percentage
  clinicianNotes: string;
}

export default function ClinicalInterventions() {
  const [patientAge, setPatientAge] = useState("6 years old");
  const [diagnosisText, setDiagnosisText] = useState("Severe Articulation Delay (Speech Sound Disorder)");
  const [symptoms, setSymptoms] = useState("Alveolar and liquid speech substitution, highly unintelligible with stranger contact, displays stress responses.");
  const [frequency, setFrequency] = useState("2x weekly direct 30-minute sessions");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [pocResult, setPocResult] = useState<POCResponse | null>({
    backgroundSummary: "The patient is a 6-year-old presenting with a severe Speech Sound Disorder characterized by pervasive consonant substitutions. These phonetic deviations significantly impact conversational intelligibility with unfamiliar partners, leading to social avoidance and situational frustration.",
    longTermGoals: [
      "The patient will produce target liquid sound /ɹ/ and alveolar fricatives /s, z/ across standard linguistic levels with 85% accuracy in conversational speech.",
      "The patient will demonstrate elevated speech intelligibility over 90% across various conversational environments with peers/caregivers."
    ],
    shortTermObjectives: [
      "Patient will produce the voiced liquid sound /ɹ/ in initial and medial positions of single words given visual/tactile placement cues with 80% correctness.",
      "Patient will articulate voiceless alveolar fricatives /s/ in final positions of high-frequency words with 75% accuracy over three consecutive data-tracking trials.",
      "Patient will independently correct speech sound errors when given immediate auditory/visual feedback clues at the sentence level in 8 of 10 opportunities."
    ],
    clinicalMethodologies: [
      {
        name: "Traditional Articulation Approach (Van Riper)",
        description: "Focuses on sensory-perceptual (ear) training, followed by production training ranging systematically from isolation to conversational speech levels."
      },
      {
        name: "Cycles Phonological Remediation Approach (Hodson)",
        description: "Remediates phonological processes through rotational auditory bombardment target stimulation, tactile cueing, and guided production-practice drills."
      }
    ],
    placementCues: [
      "For alveolar sounds: Teach 'the shelf' behind the front teeth where the tongue rests. Keep tongue wide and let cold air slide down the central groove.",
      "For liquid rhotics: Use a mirror. Prompt the patient to show the wide, bunched back of the tongue anchoring to the top back molars."
    ],
    homeProgramOutline: "Engage in 5 minutes of daily auditory bombardment. Read a list of 10-15 target cards clearly to the patient. Play 'Sound Matcher' with high-frequency initial-r toy items, providing positive conversational corrections."
  });

  // Local Session Practice logger
  const [logsList, setLogsList] = useState<SessionLog[]>([
    {
      id: "log-1",
      date: new Date().toLocaleDateString(),
      trialName: "/ɹ/ initial positions (Rabbit, Red)",
      trialsCount: 20,
      accuracy: 70,
      clinicianNotes: "Patient made substantial progress with lateral tongue bunched positioning. Responded well to physical mirror prompts."
    },
    {
      id: "log-2",
      date: new Date(Date.now() - 86400000).toLocaleDateString(),
      trialName: "/s/ final position (Yes, Bus)",
      trialsCount: 15,
      accuracy: 80,
      clinicianNotes: "Excellent teeth alignment observed. Steady stream of cold central air emission maintained without lateral splattering."
    }
  ]);

  // Form states for adding session logs
  const [newTrialName, setNewTrialName] = useState("");
  const [newTrialsCount, setNewTrialsCount] = useState(20);
  const [newAccuracy, setNewAccuracy] = useState(80);
  const [newClinicianNotes, setNewClinicianNotes] = useState("");

  const handleGeneratePOC = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosisText.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenerationError("");

    try {
      const response = await fetch("/api/generate-poc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: patientAge,
          diagnosisText: diagnosisText,
          symptoms: symptoms,
          therapyFrequency: frequency
        })
      });

      if (!response.ok) {
        throw new Error("Unable to formulate Treatment Plan POC at this moment.");
      }

      const data = await response.json();
      setPocResult(data);
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || "Failed to generate plan.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrialName.trim()) return;

    const newLog: SessionLog = {
      id: Math.random().toString(),
      date: new Date().toLocaleDateString(),
      trialName: newTrialName,
      trialsCount: Number(newTrialsCount),
      accuracy: Number(newAccuracy),
      clinicianNotes: newClinicianNotes
    };

    setLogsList(prev => [newLog, ...prev]);
    setNewTrialName("");
    setNewClinicianNotes("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 space-y-8" id="clinical-interventions">
      {/* Editorial Title banner */}
      <div className="max-w-7xl mx-auto border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-indigo-400">Section III: Evidence-Based Clinical Interventions</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1 text-slate-50 font-sans">The Interventions Lab</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            A secure therapeutic synthesizer. Draft tailored treatment plans, formulate measurable goals, and audit patient developmental speech metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-emerald-300">
          <Stethoscope size={14} />
          <span>Intervention Engine: Connected</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: TREATMENT PLAN GENERATOR (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Brain size={16} className="text-indigo-400" />
                <span>AI Clinical Treatment Planner</span>
              </h2>
              <span className="text-[10px] text-indigo-400 font-mono">Evidence-Based Treatment Goals Generator</span>
            </div>

            <form onSubmit={handleGeneratePOC} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-mono text-slate-400 tracking-wider mb-1.5">Patient Cohort Age/Status</label>
                  <input
                    type="text"
                    required
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="e.g. '5 years, 3 months old'"
                    className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 text-slate-100 focus:outline-none placeholder-slate-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-mono text-slate-400 tracking-wider mb-1.5">Therapy Frequency Standard</label>
                  <input
                    type="text"
                    required
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="e.g. '2x weekly, 30 minute blocks'"
                    className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 text-slate-100 focus:outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-mono text-slate-400 tracking-wider mb-1.5">Primary Impairment / Diagnosis Area</label>
                <input
                  type="text"
                  required
                  value={diagnosisText}
                  onChange={(e) => setDiagnosisText(e.target.value)}
                  placeholder="e.g. 'Moderate Phonological Disruption (Stopping of Fricatives)'"
                  className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 text-slate-100 focus:outline-none placeholder-slate-600"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-mono text-slate-400 tracking-wider mb-1.5">Observable symptoms & Clinical presentation</label>
                <textarea
                  rows={3}
                  required
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe patient phoneme inaccuracies, conversational struggle points, developmental regressions, etc."
                  className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 text-slate-100 focus:outline-none placeholder-slate-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating || !diagnosisText.trim()}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-slate-50 font-bold rounded-lg text-xs flex items-center justify-center gap-2 disabled:opacity-45 transition-colors cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin" size={14} />
                    <span>Compiling plan according to ASHA & scientific criteria...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Clinical Plan of Care</span>
                    <ChevronRight size={14} />
                  </>
                )}
              </button>
            </form>

            {generationError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded p-3 text-xs flex items-center gap-2">
                <AlertCircle size={14} />
                <span>{generationError}</span>
              </div>
            )}
          </div>

          {/* AI POC Generator Result Board */}
          {pocResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-5" id="treatment-plan-result">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">DRAFT PLAN OF CARE (POC)</span>
                  <h3 className="text-base font-bold text-slate-100 mt-0.5">Synthesized Treatment Plan</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-indigo-950/40 text-indigo-300 border border-indigo-500/10 px-2 py-0.5 rounded font-mono">
                    Evidence Level: Strong
                  </span>
                </div>
              </div>

              {/* Background summary */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Diagnostic Background Summary</span>
                <p className="text-xs text-slate-300 leading-relaxed italic">“{pocResult.backgroundSummary}”</p>
              </div>

              {/* LONG TERM GOALS */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">6-Month SMART Long-Term Goals (LTGs)</span>
                <div className="space-y-1.5 ml-1">
                  {pocResult.longTermGoals.map((ltg, idx) => (
                    <div key={idx} className="flex gap-2 text-xs text-slate-300 items-start">
                      <div className="w-4 h-4 rounded-full bg-indigo-600/10 text-indigo-400 text-[10px] flex items-center justify-center font-bold font-mono mt-0.5 flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed">{ltg}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SHORT TERM OBJECTIVES */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Measurable Short-Term Objectives (STOs)</span>
                <div className="space-y-2 ml-1">
                  {pocResult.shortTermObjectives.map((sto, idx) => (
                    <div key={idx} className="flex gap-2.5 text-xs text-slate-300 items-start bg-slate-950 border border-slate-800 p-2.5 rounded-lg">
                      <div className="p-1 bg-emerald-500/10 rounded-full text-emerald-400 flex-shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <p className="leading-normal">{sto}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Methodologies info */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">EBP Clinical Methodologies</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pocResult.clinicalMethodologies.map((method, idx) => (
                    <div key={idx} className="bg-slate-950/40 border border-slate-800 rounded-lg p-3">
                      <h4 className="text-xs font-bold text-slate-200">{method.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{method.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Placement cues and home support */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/60 text-xs">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Direct Tabletop Placement Cues</span>
                  <ul className="list-disc list-inside space-y-1 leading-relaxed text-slate-300">
                    {pocResult.placementCues.map((cue, idx) => (
                      <li key={idx}>{cue}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1.5 bg-indigo-950/20 border border-indigo-950/50 rounded-lg p-3">
                  <span className="text-[10px] text-teal-400 uppercase tracking-wider font-mono font-bold block">Guided Parent Home Training Homework</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{pocResult.homeProgramOutline}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: CLINICAL LOGS & SESSION TRACKING (5 columns) */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <ClipboardList size={16} className="text-emerald-400" />
                <span>Intervention Tracker & Logs</span>
              </h2>
              <span className="text-[10px] text-emerald-400 font-mono">Diagnostic Progress</span>
            </div>

            {/* Form to submit direct diagnostic session logs */}
            <form onSubmit={handleCreateLog} className="space-y-3 bg-slate-950 p-4 border border-slate-800 rounded-lg">
              <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-widest font-bold">Log therapeutic drill metrics</span>
              
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-mono mb-1">Target Word/Sound Group Practiced</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /θ/ initial positions (Thumb, Thin, Thief)"
                  value={newTrialName}
                  onChange={(e) => setNewTrialName(e.target.value)}
                  className="bg-slate-900 border border-slate-800 px-2 py-1.5 rounded text-xs focus:ring-1 focus:ring-emerald-500 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-mono mb-1">Number of Trials</label>
                  <input
                    type="number"
                    min={1}
                    max={150}
                    value={newTrialsCount}
                    onChange={(e) => setNewTrialsCount(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-800 px-2 py-1.5 rounded text-xs focus:ring-1 focus:ring-emerald-500 text-slate-200 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-400 font-mono mb-1">Accuracy (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={newAccuracy}
                    onChange={(e) => setNewAccuracy(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-800 px-2 py-1.5 rounded text-xs focus:ring-1 focus:ring-emerald-500 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-mono mb-1">Observations / Quick Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g., Respoded well to central air cues. Still struggling with final th."
                  value={newClinicianNotes}
                  onChange={(e) => setNewClinicianNotes(e.target.value)}
                  className="bg-slate-900 border border-slate-800 px-2 py-1.5 rounded text-xs focus:ring-1 focus:ring-emerald-500 text-slate-200 focus:outline-none resize-none placeholder-slate-600"
                />
              </div>

              <button
                type="submit"
                disabled={!newTrialName}
                className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded transition-colors cursor-pointer"
              >
                Record Active Trial Log
              </button>
            </form>

            {/* Trial logs list rendering */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-widest">Active Data Logs</span>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {logsList.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex flex-col justify-between gap-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[11px] font-bold text-slate-100">{log.trialName}</span>
                      <span className="text-[9px] font-mono text-slate-400">{log.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-mono py-1 border-b border-slate-900">
                      <div>Count: <span className="text-slate-200 font-bold">{log.trialsCount} drill repetitions</span></div>
                      <div>Accuracy: 
                        <span className={`font-bold ml-1 ${
                          log.accuracy >= 80 ? "text-emerald-400" : log.accuracy >= 65 ? "text-indigo-400" : "text-amber-400"
                        }`}>
                          {log.accuracy}%
                        </span>
                      </div>
                    </div>
                    {log.clinicianNotes && (
                      <p className="text-[10px] italic text-slate-400 leading-normal mt-1">{log.clinicianNotes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
