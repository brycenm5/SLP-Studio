/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint 1: Clinical Consulting Chat
app.post("/api/clinical-consult", async (req, res) => {
  try {
    const { messages, category } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const sysInstruction = `You are an elite Clinical Speech-Language Pathologist (SLP) AI consultant.
      Your goal is to assist speech pathologists, clinical directors, and speech researchers with highly professional, evidence-based guidance.
      Focus Category: ${category || "General SLP"}
      Guidelines:
      - Ground your responses in ASHA (American Speech-Language-Hearing Association) practices, motor learning theory, and evidence-based interventions.
      - Use exact phonetic notation (IPA /.../) when referencing phonemes.
      - Provide practical, structured therapy ideas, assessments, or scientific citations when relevant.
      - Keep responses supportive, authoritative, academic, and clinical.`;

    const contents = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: sysInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Clinical consult error:", error);
    res.status(500).json({ error: error.message || "Internal GenAI Server Error" });
  }
});

// Endpoint 2: English text to IPA phonetic transcriber
app.post("/api/phonetic-transcribe", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text string is required to transcribe." });
    }

    const prompt = `Transcribe the following text or words into Broad International Phonetic Alphabet (IPA). Include syllable stress marks (ˈ), syllable divisions (.), and vocalic components. For EACH distinct word in the selection, provide a detailed breakdown covering its phonetic features (e.g., voicing, place, manner of articulation of primary sounds) and target clinical focus area for therapy.

      Text: "${text}"`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        overallIpa: {
          type: Type.STRING,
          description: "Full broad phonetic transcription of the entire input, enclosed in slashes /.../."
        },
        syllablesCount: {
          type: Type.INTEGER,
          description: "Total count of syllables in the overall text."
        },
        stressPattern: {
          type: Type.STRING,
          description: "Stress pattern of the primary word(s) (e.g., Strong-Weak or Trochaic)."
        },
        wordBreakdown: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              ipa: { type: Type.STRING, description: "Phonetic spelling /.../" },
              soundsFocused: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Primary key phonemes targeting clinical speech (e.g., [r], [θ], [s])"
              },
              clinicalCues: {
                type: Type.STRING,
                description: "Therapeutic placement cue for patients struggling with these target sounds."
              }
            },
            required: ["word", "ipa", "soundsFocused", "clinicalCues"]
          }
        },
        scientificNote: {
          type: Type.STRING,
          description: "Brief academic phonetic note explaining co-articulation, assimilation, or dialectal variation observed."
        }
      },
      required: ["overallIpa", "syllablesCount", "stressPattern", "wordBreakdown", "scientificNote"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Transcription error:", error);
    res.status(500).json({ error: error.message || "Failed to transcribe phonetics." });
  }
});

// Endpoint 3: Pediatric Speech Assessment Simulator
app.post("/api/pediatric-assessment", async (req, res) => {
  try {
    const { childAgeGroup, targetWord, childRealization, observations } = req.body;
    if (!targetWord || !childRealization) {
      return res.status(400).json({ error: "Missing targetWord or childRealization for pediatric assessment." });
    }

    const prompt = `You are a Pediatric Speech-Language Pathologist. Analyze this child speech attempt:
      - Target Word/Phoneme: "${targetWord}"
      - Child's Phonologic Realization (what they actually said or substituted): "${childRealization}"
      - Child's Age Group: ${childAgeGroup || "3-4 years"}
      - Context / Parent Observations: "${observations || "Parent noted lateral/slurred emission"}"

      Analyze for phonological processes (e.g., fronting, gliding, stopping, cluster reduction), explain if this is developmentally appropriate for this age group, and generate highly engaging, evidence-based gamified activities and custom parent training instructions.`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        processDetected: {
          type: Type.STRING,
          description: "Name of the phonological process or articulation error (e.g., 'Gliding of Liquids /r/ to [w]', 'Velar Fronting /k/ to [t]')"
        },
        developmentalAnalysis: {
          type: Type.STRING,
          description: "Is this age-appropriate? Give research-backed milestone context for this age group."
        },
        therapeuticClassification: {
          type: Type.STRING,
          description: "Clinical rating (e.g., Typical variation, Monitor/Delayed, Direct clinical target recommended)"
        },
        simulatedGameName: {
          type: Type.STRING,
          description: "An engaging title for a 5-minute gamified home speech exercise."
        },
        gameInstructions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Step-by-step game guidelines for parent and child."
        },
        reinforcementSlogan: {
          type: Type.STRING,
          description: "A verbal reinforcement slogan to build phonetic confidence without negative feedback."
        },
        parentTrainingTips: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Professional coaching tips for parents doing homework (e.g., 'Do not correct sound directly, model with auditory bombardment')."
        }
      },
      required: ["processDetected", "developmentalAnalysis", "therapeuticClassification", "simulatedGameName", "gameInstructions", "reinforcementSlogan", "parentTrainingTips"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.4
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Pediatric assessment error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze pediatric attempt." });
  }
});

// Endpoint 4: Clinical Diagnostic Intervention POC Generator
app.post("/api/generate-poc", async (req, res) => {
  try {
    const { age, diagnosisText, symptoms, therapyFrequency } = req.body;
    if (!diagnosisText) {
      return res.status(400).json({ error: "diagnosisText is required to formulate Plan of Care." });
    }

    const prompt = `As a board-certifed SLP Clinical Director, draft an evidence-based clinical Plan of Care (POC) for this patient:
      - Patient Age: ${age || "6 years old"}
      - Primary Diagnosis / Impairment Area: "${diagnosisText}"
      - Characteristic Symptoms / Profile: "${symptoms || "difficulty producing alveolar sounds, highly unintelligible to unfamiliar listeners, frustrates easily."}"
      - Proposed Therapy Frequency: "${therapyFrequency || "2x weekly direct 30-minute sessions"}"

      Formulate a rigorous, professional treatment plan outline including SMART long-term goals, measurable short-term objectives, specific motor-speech or cognitive-communication evidence-based interventions, and clinician cues.`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        backgroundSummary: {
          type: Type.STRING,
          description: "Consolidated scientific summary of the child's communication profile."
        },
        longTermGoals: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "2 measurable Long-Term Goals (LTGs) for 6-months duration."
        },
        shortTermObjectives: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "3 highly specific, measurable Short-Term Objectives (STOs) targeting sound accuracy with percentage metrics."
        },
        clinicalMethodologies: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Therapeutic framework (e.g., Traditional Articulation Therapy, Cycles Approach, PROMPT, Core Vocabulary)" },
              description: { type: Type.STRING, description: "How this framework will be customized for this patient." }
            },
            required: ["name", "description"]
          }
        },
        placementCues: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Highly actionable cues (verbal, tactile, or visual) that the clinician can use at the table."
        },
        homeProgramOutline: {
          type: Type.STRING,
          description: "Structured home exercises and parental guidance outline."
        }
      },
      required: ["backgroundSummary", "longTermGoals", "shortTermObjectives", "clinicalMethodologies", "placementCues", "homeProgramOutline"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.3
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("POC Generator error:", error);
    res.status(500).json({ error: error.message || "Failed to generate Plan of Care." });
  }
});

// Setup Vite Dev Server / Static Asset Streaming
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SLP Backend Service] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
