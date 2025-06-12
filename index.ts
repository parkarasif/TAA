export interface AnalysisResult {
  overallScore: number;
  keywordMatch: number;
  skillsMatch: number;
  formatScore: number;
  readabilityScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
  strengthsFound: string[];
  improvementAreas: string[];
}

export interface FileUpload {
  name: string;
  content: string;
  type: string;
}