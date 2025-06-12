import React from 'react';
import { TrendingUp, Target, FileText, Eye } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  score: number;
  icon: 'overall' | 'keywords' | 'skills' | 'format' | 'readability';
  description: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, icon, description }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getIcon = () => {
    switch (icon) {
      case 'overall':
        return <TrendingUp className="w-6 h-6" />;
      case 'keywords':
        return <Target className="w-6 h-6" />;
      case 'skills':
        return <FileText className="w-6 h-6" />;
      case 'format':
        return <FileText className="w-6 h-6" />;
      case 'readability':
        return <Eye className="w-6 h-6" />;
      default:
        return <TrendingUp className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getScoreBg(score)}`}>
          <div className={getScoreColor(score)}>
            {getIcon()}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
};