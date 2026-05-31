# Vocalis Speech-Language Pathology Portal

An interconnected, professional, evidence-based digital platform built on TypeScript, React, Tailwind CSS, Express, and server-side Gemini AI. It houses three distinct, highly stylized portals tailored for clinicians, researchers, and families:

1. **Section I: The Phoneme Lab (Phonetics Research)** — Offers an acoustic & pulmonic consonant/vowel grid matrix, a simulated Formant Spectrogram tracker, and an English-to-IPA Broad Phonetic transcribing tool powered by Gemini AI.
2. **Section II: WeeSpeak Pediatric Hub (Childhood Development)** — Tracks receptive/expressive age-cohort milestones with automated speech realization analysis and gamified home assignments.
3. **Section III: The Interventions Lab (Clinical Diagnostics)** — Features an AI-powered Diagnostic Plan of Care (POC) synthesizer and an interactive diagnostic and trial data collector.
4. **Clinical AI Advisory Panel** — A sliding-pane board equipped with instant clinical insights grounded in ASHA best practices.

---

## 🚀 How to Add This to Your GitHub & Vercel Workspace

Since you already have a GitHub repository connected to **Vercel.com**, follow these steps to upload, host, and run the server-side AI integration seamlessly:

### Step 1: Export Code to Your GitHub Repository
You can directly push this workspace code to your connected GitHub repository in seconds:
1. In the **Google AI Studio** interface, open the **Settings** menu at the top-right.
2. Select **Export to GitHub** (or download as a ZIP file to extract and push manually using standard Git command lines).
3. Select your desired repository and commit the files.

### Step 2: Configure Environment Variables on Vercel
Our AI engines depend on the secure server-side Gemini key. Ensure Vercel knows how to authenticate calls:
1. Go to your **Vercel Dashboard** and click on your speech-language pathology project.
2. Under **Settings ➔ Environment Variables**, create a new variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** *[Your Google Gemini API Key from AI Studio or Google Cloud Console]*
3. Click **Save**.

### Step 3: Deployment Architecture & Server Configuration
Vercel is primarily a serverless platform. To support our Express backend API endpoints (`/api/*`), create a simple `vercel.json` file in your root folder (your directory already has standard Express routes mapped ready to run serverless or via the command line):

```json
{
  "version": 2,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "server.ts" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📦 Splitting Portals into Independent Repositories (Optional)

The directory structure is completely **modular**! You can easily split this project into 3 distinct standalone websites if your workflow demands completely independent hostings:

* **Repository A (The Phonetics Lab):** Grab `/src/components/PhoneticsPortal.tsx` and map it as the main screen. Run lightweight serverless handlers for `/api/phonetic-transcribe`.
* **Repository B (WeeSpeak Pediatric):** Run `/src/components/PediatricCenter.tsx` independently with raw static assets for your parenting resources and milestone checklists.
* **Repository C (The Interventions Lab):** Deploy `/src/components/ClinicalInterventions.tsx` behind clinical authorization gateways for internal clinicians' goal-tracking.
