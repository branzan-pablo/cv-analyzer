export interface AnalysisScore {
  dimension: string;
  score: number;
  maxScore: number;
  feedback: string;
  suggestions: string[];
  icon: string;
}

export interface AnalysisResult {
  overallScore: number;
  maxScore: number;
  scores: AnalysisScore[];
  summary: string;
  prioritySuggestions: string[];
  strengths: string[];
}

export interface UsageRecord {
  id: string;
  fingerprint: string;
  ip_address: string;
  analysis_count: number;
  last_analysis_at: string;
  created_at: string;
}
