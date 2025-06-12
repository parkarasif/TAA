import React from 'react';
import { AnalysisResult } from '../types';
import { ScoreCard } from './ScoreCard';
import { CheckCircle, XCircle, Lightbulb, Download } from 'lucide-react';

interface ResultsPanelProps {
  results: AnalysisResult;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
  const exportResults = () => {
    const reportContent = `
ATS Resume Analysis Report
==========================

Overall Score: ${results.overallScore}%
Keyword Match: ${results.keywordMatch}%
Skills Match: ${results.skillsMatch}%
Format Score: ${results.formatScore}%
Readability: ${results.readabilityScore}%

Matched Keywords:
${results.matchedKeywords.map(keyword => `• ${keyword}`).join('\n')}

Missing Keywords:
${results.missingKeywords.map(keyword => `• ${keyword}`).join('\n')}

Recommendations:
${results.recommendations.map(rec => `• ${rec}`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ats-analysis-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
        <button
          onClick={exportResults}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Score Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 lg:col-span-1">
          <ScoreCard
            title="Overall ATS Score"
            score={results.overallScore}
            icon="overall"
            description="Combined assessment of your resume's ATS compatibility"
          />
        </div>
        <ScoreCard
          title="Keyword Match"
          score={results.keywordMatch}
          icon="keywords"
          description="How well your resume matches job keywords"
        />
        <ScoreCard
          title="Skills Alignment"
          score={results.skillsMatch}
          icon="skills"
          description="Technical skills matching job requirements"
        />
        <ScoreCard
          title="Format Score"
          score={results.formatScore}
          icon="format"
          description="Resume structure and formatting quality"
        />
        <ScoreCard
          title="Readability"
          score={results.readabilityScore}
          icon="readability"
          description="How easy your resume is to read and scan"
        />
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Matched Keywords */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">Matched Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.matchedKeywords.slice(0, 15).map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-center space-x-2 mb-4">
            <XCircle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">Missing Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.missingKeywords.slice(0, 15).map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full border border-red-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800">Recommendations</h3>
        </div>
        <ul className="space-y-2">
          {results.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
              <span className="text-blue-800 text-sm">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};