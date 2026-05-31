/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { CONSONANTS, VOWELS } from "../data";
import { PhonemeInfo } from "../types";
import { Speech, Volume2, Search, BookOpen, AlertCircle, RefreshCw, Cpu, Activity, Play, Square, Info } from "lucide-react";
import { motion } from "motion/react";

interface TranscribeResponse {
  overallIpa: string;
  syllablesCount: number;
  stressPattern: string;
  wordBreakdown: {
    word: string;
    ipa: string;
    soundsFocused: string[];
    clinicalCues: string;
  }[];
  scientificNote: string;
}

export default function PhoneticsPortal() {
  const [selectedPhoneme, setSelectedPhoneme] = useState<PhonemeInfo | null>(CONSONANTS[8]); // Default to voiceless dental fricative θ
  const [transcribeText, setTranscribeText] = useState("She speaks clearly");
  const [transcribeResult, setTranscribeResult] = useState<TranscribeResponse | null>({
    overallIpa: "/ʃiː spiːks ˈklɪɹ.li/",
    syllablesCount: 4,
    stressPattern: "Trochaic components",
    wordBreakdown: [
      {
        word: "She",
        ipa: "/ʃiː/",
        soundsFocused: ["ʃ", "i"],
        clinicalCues: "Let your teeth hover closed, round your lips and puff out warm sound."
      },
      {
        word: "speaks",
        ipa: "/spiːks/",
        soundsFocused: ["s", "p", "k"],
        clinicalCues: "Hold teeth tight, blow cold snake wind, then pop your lips and back of throat."
      },
      {
        word: "clearly",
        ipa: "/ˈklɪɹ.li/",
        soundsFocused: ["k", "l", "ɹ"],
        clinicalCues: "The back of the tongue taps the ceiling, then glides to tap the front alveolar ridge."
      }
    ],
    scientificNote: "Note alveolar-velar sequencing during 'speaks clearly' and the broad vocalic approximation of liquid rhotic sound."
  });
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribeError, setTranscribeError] = useState("");

  // Sound Spectrogram Simulator variables
  const [isAudioActive, setIsAudioActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // HTML5 TTS voice trigger
  const playPhonemeSound = (phoneme: PhonemeInfo) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const sentence = `The phoneme ${phoneme.symbol}. It is ${phoneme.name}. As in the word: ${phoneme.example}.`;
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech option not active in your current browser sandboxing.");
    }
  };

  // Broad Transcription fetch
  const handleTranscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcribeText.trim() || isTranscribing) return;

    setIsTranscribing(true);
    setTranscribeError("");

    try {
      const response = await fetch("/api/phonetic-transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcribeText })
      });

      if (!response.ok) {
        let errMsg = "Phonetic transcriber encountered an error. Please try again.";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errMsg = errData.error;
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      setTranscribeResult(data);
    } catch (err: any) {
      console.error(err);
      setTranscribeError(err.message || "Something went wrong in phonetic engine.");
    } finally {
      setIsTranscribing(false);
    }
  };

  // Real-time Spectrogram simulation drawer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    if (!isAudioActive) {
      // Draw idle line
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      return;
    }

    let time = 0;
    const drawFormants = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.2)"; // trail effect
      ctx.fillRect(0, 0, width, height);

      // We will draw simulated formant traces F1, F2, F3
      const f1Freq = height / 1.5 + Math.sin(time * 0.05) * 20 + Math.cos(time * 0.12) * 5;
      const f2Freq = height / 2.5 + Math.cos(time * 0.08) * 40 + Math.sin(time * 0.04) * 15;
      const f3Freq = height / 5 + Math.sin(time * 0.1) * 10;

      // Draw color spectrogram bands
      ctx.lineWidth = 4;
      
      // F1 Trace (Red)
      ctx.strokeStyle = "rgba(239, 68, 68, 0.8)";
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = f1Freq + Math.sin((x + time) * 0.03) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // F2 Trace (Yellow)
      ctx.strokeStyle = "rgba(245, 158, 11, 0.8)";
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = f2Freq + Math.cos((x + time * 0.8) * 0.05) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // F3 Trace (Emerald)
      ctx.strokeStyle = "rgba(16, 185, 129, 0.8)";
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = f3Freq + Math.sin((x + time * 1.5) * 0.07) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Acoustic energy pulses in background
      for (let i = 0; i < 5; i++) {
        const pulseX = Math.random() * width;
        const pulseY = Math.random() * height;
        const radius = Math.random() * 30 + 10;
        ctx.fillStyle = "rgba(99, 102, 241, 0.05)";
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 4;
      animationRef.current = requestAnimationFrame(drawFormants);
    };

    drawFormants();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAudioActive]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 space-y-8" id="phonetics-portal">
      {/* Editorial Title */}
      <div className="max-w-7xl mx-auto border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-indigo-400">Section I: Scientific & Acoustic Phonology</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1 text-slate-50 font-sans">The Phoneme Lab</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            An advanced auditory and articulatory acoustics researcher environment. Perfect for analyzing transcription variables and mastering broad IPA mechanics.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
          <Activity size={14} className="text-emerald-400 animate-pulse" />
          <span>Formant Engine: Active v4.1</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: IPA GRID EXPLORER (8 columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* IPA Consonants section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <span>[ Consonants ] Pulmonic Eggshell Matrix</span>
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">Consonant IPA chart catalog</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {CONSONANTS.map((phoneme) => (
                <button
                  key={phoneme.symbol}
                  id={`phoneme-${phoneme.symbol}`}
                  onClick={() => setSelectedPhoneme(phoneme)}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    selectedPhoneme?.symbol === phoneme.symbol
                      ? "bg-indigo-600/35 border-indigo-500 scale-105 shadow-md shadow-indigo-600/5 text-white"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-slate-100"
                  }`}
                >
                  <span className="text-xl font-bold tracking-normal font-sans">{phoneme.symbol}</span>
                  <span className="text-[9px] text-slate-400 mt-1 font-mono truncate max-w-full">{phoneme.example}</span>
                </button>
              ))}
            </div>
          </div>

          {/* IPA Vowels section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-teal-300 uppercase tracking-wider font-mono">
                <span>[ Vowels ] Acoustic Trapezoid Matrix</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Monophthongs and Diphthong elements</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
              {VOWELS.map((phoneme) => (
                <button
                  key={phoneme.symbol}
                  id={`phoneme-${phoneme.symbol}`}
                  onClick={() => setSelectedPhoneme(phoneme)}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    selectedPhoneme?.symbol === phoneme.symbol
                      ? "bg-teal-600/30 border-teal-500 scale-105 shadow-md text-white"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-slate-100"
                  }`}
                >
                  <span className="text-xl font-bold font-sans">{phoneme.symbol}</span>
                  <span className="text-[9px] text-slate-400 mt-1 font-mono truncate max-w-full">{phoneme.example}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI English to IPA Broad Transcriber */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4" id="phonetic-transcriber">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest font-mono flex items-center gap-2">
                <Cpu size={16} className="text-indigo-400" />
                <span>AI BROAD IPA TRANSCRIBER</span>
              </h3>
              <span className="text-[9px] text-indigo-400 font-mono">GEMINI API TRANSLATION CORE</span>
            </div>

            <form onSubmit={handleTranscribe} className="space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={transcribeText}
                  onChange={(e) => setTranscribeText(e.target.value)}
                  placeholder="Type an English phrase here to convert to broad phonetics..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isTranscribing || !transcribeText.trim()}
                  className="bg-indigo-600 hover:bg-indigo-500 text-slate-50 font-semibold px-5 py-3 rounded-lg text-xs flex items-center justify-center gap-2 disabled:opacity-45 transition-all text-nowrap"
                >
                  {isTranscribing ? (
                    <>
                      <RefreshCw className="animate-spin" size={14} />
                      <span>Transcribing...</span>
                    </>
                  ) : (
                    <>
                      <Speech size={14} />
                      <span>Generate IPA</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {transcribeError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2.5 text-xs text-red-300">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{transcribeError}</span>
              </div>
            )}

            {transcribeResult && (
              <div className="space-y-4 bg-slate-950/50 rounded-xl p-5 border border-slate-800/80 mt-3">
                <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-slate-800/60 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Phoneme Broad Spelling</span>
                    <div className="text-2xl font-bold text-teal-400 tracking-wide font-sans mt-0.5">{transcribeResult.overallIpa}</div>
                  </div>
                  <div className="flex gap-4 text-[11px] font-mono text-slate-400">
                    <div>Syllables: <span className="text-slate-200">{transcribeResult.syllablesCount}</span></div>
                    <div>Stress: <span className="text-slate-200">{transcribeResult.stressPattern}</span></div>
                  </div>
                </div>

                {/* Word Breakdowns */}
                <div className="space-y-2.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Phonological Word Breakdown</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {transcribeResult.wordBreakdown.map((item, idx) => (
                      <div key={idx} className="bg-slate-900/80 rounded-lg p-3 border border-slate-800 flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-slate-800/50 pb-1.5 mb-1.5">
                          <span className="text-xs font-semibold text-slate-200">{item.word}</span>
                          <span className="font-mono text-xs text-teal-400 font-bold">{item.ipa}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 leading-normal">
                          <span className="font-mono text-[9px] text-slate-500 block">Focus sounds: {item.soundsFocused.join(", ")}</span>
                          <p className="mt-1">{item.clinicalCues}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scientific Note */}
                <div className="pt-3 border-t border-slate-800/60 flex items-start gap-2.5 text-[11px] text-slate-400">
                  <Info size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="italic">{transcribeResult.scientificNote}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ACOUSTICS SCREEN & PHONEME CARD (4 columns) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Selected Phoneme Specs Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono border-b border-slate-800 pb-2.5">
              Phonetic Profile Viewer
            </h3>

            {selectedPhoneme ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-950 rounded-xl p-4 border border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-4xl font-extrabold tracking-normal text-indigo-400 font-sans">{selectedPhoneme.symbol}</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-mono">{selectedPhoneme.example.toUpperCase()}</span>
                  </div>
                  <button
                    onClick={() => playPhonemeSound(selectedPhoneme)}
                    className="p-3 bg-indigo-600/10 hover:bg-indigo-600 hover:text-slate-950 text-indigo-400 rounded-full transition-all border border-indigo-500/20 group cursor-pointer"
                  >
                    <Volume2 size={20} className="group-hover:scale-110 duration-200" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs py-1.5 border-b border-slate-800/50">
                    <span className="text-slate-400">Phoneme Name</span>
                    <span className="font-semibold text-slate-200 text-right max-w-[60%] truncate">{selectedPhoneme.name}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5 border-b border-slate-800/50">
                    <span className="text-slate-400">Manner of Artic.</span>
                    <span className="font-semibold text-slate-200">{selectedPhoneme.manner}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5 border-b border-slate-800/50">
                    <span className="text-slate-400">Place of Artic.</span>
                    <span className="font-semibold text-slate-200">{selectedPhoneme.place}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5 border-b border-slate-800/50">
                    <span className="text-slate-400">Voicing State</span>
                    <span className="font-semibold text-slate-200">{selectedPhoneme.voicing}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5">
                    <span className="text-slate-400">Example word</span>
                    <span className="font-mono font-semibold text-teal-400">“{selectedPhoneme.example}”</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 rounded-lg p-3 text-[11px] text-slate-400 border border-slate-800 leading-normal">
                  <span className="font-bold text-slate-300 block mb-1">Clinical Intervention Note:</span>
                  To teach {selectedPhoneme.symbol}, first make sure child can differentiate it visually and auditorily. Prompt phonetic motor movements (e.g. {selectedPhoneme.manner.toLowerCase()} closure) using a mirror.
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Select any phoneme key above to review its clinical and acoustic features.</p>
            )}
          </div>

          {/* Formant Real-time Signal Spectrogram Sim */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
                Formant Spectrogram
              </h3>
              <span className="text-[10px] text-slate-400 font-mono uppercase">Sim Mode</span>
            </div>

            <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800 relative">
              <canvas 
                ref={canvasRef} 
                width={320} 
                height={160} 
                className="w-full h-40 block"
              />
              
              <div className="absolute top-2 left-2 flex gap-1.5">
                <span className="text-[9px] bg-red-500/20 text-red-300 px-1 rounded font-mono">F1</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded font-mono">F2</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded font-mono">F3</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Formant Spectrogram Feed:</span>
              <span className={isAudioActive ? "text-emerald-400 animate-pulse" : "text-slate-500"}>
                {isAudioActive ? "ANALYZING EMISSION" : "STANDBY"}
              </span>
            </div>

            <button
              onClick={() => setIsAudioActive(!isAudioActive)}
              className={`w-full py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isAudioActive
                  ? "bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-950/60"
                  : "bg-emerald-600 hover:bg-emerald-500 text-slate-950"
              }`}
            >
              {isAudioActive ? (
                <>
                  <Square size={12} fill="currentColor" />
                  <span>Disable Acoustic Simulator</span>
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" />
                  <span>Activate Acoustic Simulator</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
