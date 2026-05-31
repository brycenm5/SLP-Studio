/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface PhonemeInfo {
  symbol: string;
  name: string;
  manner: string;
  place: string;
  voicing: string;
  example: string;
  audioText: string;
}

export interface Milestone {
  age: string;
  receptive: string[];
  expressive: string[];
  phonology: string[];
  activities: string[];
}

export interface Flashcard {
  id: string;
  word: string;
  targetSound: string;
  position: 'initial' | 'medial' | 'final';
  ipa: string;
  placementCue: string;
  imageUrl?: string;
}

export interface DrillAttempt {
  timestamp: string;
  word: string;
  result: 'correct' | 'approximate' | 'incorrect';
}

export interface TreatmentPlan {
  patientAge: string;
  diagnoses: string[];
  goals: {
    shortTerm: string[];
    longTerm: string[];
  };
  interventions: string[];
  coachingTips: string[];
}
