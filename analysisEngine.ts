import { AnalysisResult } from '../types';

export class ATSAnalyzer {
  private extractKeywords(text: string): string[] {
    const commonWords = new Set([
      'the', 'is', 'at', 'which', 'on', 'and', 'a', 'to', 'are', 'as', 'was', 'with',
      'of', 'for', 'in', 'an', 'by', 'be', 'or', 'will', 'have', 'has', 'had', 'can',
      'this', 'that', 'from', 'they', 'we', 'been', 'their', 'said', 'each', 'would'
    ]);

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.has(word))
      .filter((word, index, arr) => arr.indexOf(word) === index);
  }

  private calculateKeywordMatch(resumeKeywords: string[], jobKeywords: string[]): {
    matchedKeywords: string[];
    missingKeywords: string[];
    matchPercentage: number;
  } {
    const matched = resumeKeywords.filter(keyword => 
      jobKeywords.some(jobKeyword => 
        jobKeyword.includes(keyword) || keyword.includes(jobKeyword)
      )
    );

    const missing = jobKeywords.filter(keyword => 
      !resumeKeywords.some(resumeKeyword => 
        resumeKeyword.includes(keyword) || keyword.includes(resumeKeyword)
      )
    ).slice(0, 15); // Limit missing keywords for readability

    const matchPercentage = jobKeywords.length > 0 
      ? Math.round((matched.length / jobKeywords.length) * 100) 
      : 0;

    return { matchedKeywords: matched, missingKeywords: missing, matchPercentage };
  }

  private calculateSkillsMatch(resumeText: string, jobText: string): number {
    const technicalSkills = [
      'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'sql',
      'aws', 'azure', 'docker', 'kubernetes', 'git', 'agile', 'scrum', 'api',
      'machine learning', 'data science', 'analytics', 'project management'
    ];

    const resumeSkills = technicalSkills.filter(skill => 
      resumeText.toLowerCase().includes(skill)
    );
    
    const jobSkills = technicalSkills.filter(skill => 
      jobText.toLowerCase().includes(skill)
    );

    if (jobSkills.length === 0) return 85; // Default score if no specific skills mentioned

    const matchedSkills = resumeSkills.filter(skill => jobSkills.includes(skill));
    return Math.round((matchedSkills.length / jobSkills.length) * 100);
  }

  private calculateFormatScore(resumeText: string): number {
    let score = 100;
    
    // Check for bullet points
    if (!resumeText.includes('•') && !resumeText.includes('-')) {
      score -= 10;
    }

    // Check for section headers
    const sections = ['experience', 'education', 'skills', 'summary'];
    const foundSections = sections.filter(section => 
      resumeText.toLowerCase().includes(section)
    );
    if (foundSections.length < 2) score -= 15;

    // Check for dates
    const datePattern = /\d{4}|\d{1,2}\/\d{4}/g;
    if (!datePattern.test(resumeText)) score -= 10;

    // Check for contact information
    const emailPattern = /\S+@\S+\.\S+/;
    const phonePattern = /\d{3}[-.]?\d{3}[-.]?\d{4}/;
    if (!emailPattern.test(resumeText)) score -= 10;
    if (!phonePattern.test(resumeText)) score -= 5;

    return Math.max(score, 0);
  }

  private calculateReadabilityScore(text: string): number {
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;

    // Ideal range: 15-20 words per sentence
    if (avgWordsPerSentence >= 15 && avgWordsPerSentence <= 20) return 95;
    if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 25) return 85;
    if (avgWordsPerSentence >= 8 && avgWordsPerSentence <= 30) return 75;
    return 65;
  }

  private generateRecommendations(result: Partial<AnalysisResult>): string[] {
    const recommendations: string[] = [];

    if (result.keywordMatch! < 70) {
      recommendations.push('Include more job-specific keywords from the job description');
    }

    if (result.skillsMatch! < 80) {
      recommendations.push('Highlight technical skills that match the job requirements');
    }

    if (result.formatScore! < 85) {
      recommendations.push('Improve resume formatting with clear sections and bullet points');
    }

    if (result.missingKeywords && result.missingKeywords.length > 0) {
      recommendations.push('Consider incorporating these missing keywords: ' + 
        result.missingKeywords.slice(0, 5).join(', '));
    }

    recommendations.push('Use action verbs to describe your accomplishments');
    recommendations.push('Quantify your achievements with specific numbers and metrics');

    return recommendations;
  }

  analyzeResume(resumeText: string, jobDescription: string): AnalysisResult {
    const resumeKeywords = this.extractKeywords(resumeText);
    const jobKeywords = this.extractKeywords(jobDescription);

    const keywordAnalysis = this.calculateKeywordMatch(resumeKeywords, jobKeywords);
    const skillsMatch = this.calculateSkillsMatch(resumeText, jobDescription);
    const formatScore = this.calculateFormatScore(resumeText);
    const readabilityScore = this.calculateReadabilityScore(resumeText);

    const overallScore = Math.round(
      (keywordAnalysis.matchPercentage * 0.4) +
      (skillsMatch * 0.3) +
      (formatScore * 0.2) +
      (readabilityScore * 0.1)
    );

    const result: Partial<AnalysisResult> = {
      overallScore,
      keywordMatch: keywordAnalysis.matchPercentage,
      skillsMatch,
      formatScore,
      readabilityScore,
      matchedKeywords: keywordAnalysis.matchedKeywords,
      missingKeywords: keywordAnalysis.missingKeywords,
      strengthsFound: [
        'Professional experience section',
        'Education background included',
        'Clear contact information'
      ]
    };

    result.recommendations = this.generateRecommendations(result);
    result.improvementAreas = [
      'Keyword optimization',
      'Skills alignment',
      'Achievement quantification'
    ];

    return result as AnalysisResult;
  }
}