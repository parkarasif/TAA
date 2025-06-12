import React, { useState } from 'react';
import { FileText, Target, Zap } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { TextInput } from './components/TextInput';
import { ResultsPanel } from './components/ResultsPanel';
import { ATSAnalyzer } from './utils/analysisEngine';
import { AnalysisResult, FileUpload as FileUploadType } from './types';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzer = new ATSAnalyzer();

  const handleResumeFileUpload = (file: FileUploadType) => {
    if (file.content) {
      setResumeText(file.content);
    }
  };

  const handleJobFileUpload = (file: FileUploadType) => {
    if (file.content) {
      setJobDescription(file.content);
    }
  };

  const analyzeResume = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert('Please provide both resume and job description');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const analysisResults = analyzer.analyzeResume(resumeText, jobDescription);
      setResults(analysisResults);
      setIsAnalyzing(false);
    }, 1500);
  };

  const resetAnalysis = () => {
    setResults(null);
    setResumeText('');
    setJobDescription('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ATS Resume Analyzer
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Designed and built with pride by Asif Parkar
                </p>
              </div>
            </div>
            {results && (
              <button
                onClick={resetAnalysis}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!results ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Optimize Your Resume for ATS Success
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Get instant feedback on how well your resume matches job requirements. 
                Our AI-powered analyzer checks keyword compatibility, formatting, and provides actionable recommendations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
                  <FileText className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Upload & Analyze</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Upload your resume and job description in multiple formats
                  </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
                  <Target className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">ATS Scoring</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Get detailed scores for keywords, skills, and formatting
                  </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
                  <Zap className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Recommendations</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Receive actionable tips to improve your resume's performance
                  </p>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  Your Resume
                </h3>
                
                <div className="space-y-6">
                  <FileUpload
                    onFileUpload={handleResumeFileUpload}
                    label="Upload Resume File"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  
                  <div className="text-center text-gray-500">
                    <span className="text-sm">OR</span>
                  </div>
                  
                  <TextInput
                    value={resumeText}
                    onChange={setResumeText}
                    placeholder="Paste your resume content here..."
                    label="Copy & Paste Resume Text"
                    rows={10}
                  />
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Target className="w-5 h-5 text-green-600 mr-2" />
                  Job Description
                </h3>
                
                <div className="space-y-6">
                  <FileUpload
                    onFileUpload={handleJobFileUpload}
                    label="Upload Job Description"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  
                  <div className="text-center text-gray-500">
                    <span className="text-sm">OR</span>
                  </div>
                  
                  <TextInput
                    value={jobDescription}
                    onChange={setJobDescription}
                    placeholder="Paste the job description here..."
                    label="Copy & Paste Job Description"
                    rows={10}
                  />
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="text-center">
              <button
                onClick={analyzeResume}
                disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-3" />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <ResultsPanel results={results} />
        )}
      </div>
    </div>
  );
}

export default App;