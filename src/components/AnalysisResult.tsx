import type { AnalysisResult } from '@/types';
import ScoreCard from './ScoreCard';

interface AnalysisResultProps {
    result: AnalysisResult;
    onNewAnalysis: () => void;
}

function getOverallScoreColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
}

function getStrokeColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '#059669'; // emerald-600
    if (percentage >= 60) return '#ca8a04'; // yellow-600
    if (percentage >= 40) return '#ea580c'; // orange-600
    return '#dc2626'; // red-600
}

export default function AnalysisResultComponent({ result, onNewAnalysis }: AnalysisResultProps) {
    const percentage = (result.overallScore / result.maxScore) * 100;

    return (
        <div className="space-y-12">
            {/* Header Section with Overall Score */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 pb-8 border-b border-gray-200">
                <div className="relative w-48 h-48 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90">
                        <circle
                            cx="96"
                            cy="96"
                            r="88"
                            fill="none"
                            stroke="#f3f4f6"
                            strokeWidth="12"
                        />
                        <circle
                            cx="96"
                            cy="96"
                            r="88"
                            fill="none"
                            stroke={getStrokeColor(result.overallScore, result.maxScore)}
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={`${percentage * 5.53} 553`}
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-6xl font-serif font-bold ${getOverallScoreColor(result.overallScore, result.maxScore)}`}>
                            {result.overallScore}
                        </span>
                        <span className="text-gray-400 text-sm font-medium">de {result.maxScore}</span>
                    </div>
                </div>

                <div className="text-center md:text-left space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Análise Completa</h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-xl">{result.summary}</p>

                    <button
                        onClick={onNewAnalysis}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Nova Análise
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Scores Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 font-serif">Detalhamento por Dimensão</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {result.scores.map((score, index) => (
                            <ScoreCard key={index} score={score} />
                        ))}
                    </div>
                </div>

                {/* Sidebar: Strengths & Weaknesses */}
                <div className="space-y-8">
                    {/* Priority Suggestions */}
                    {result.prioritySuggestions && result.prioritySuggestions.length > 0 && (
                        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-xl">🎯</span> Prioridades
                            </h3>
                            <ul className="space-y-4">
                                {result.prioritySuggestions.map((suggestion, index) => (
                                    <li key={index} className="flex gap-3 text-sm text-gray-700">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white text-orange-600 border border-orange-100 flex items-center justify-center font-bold text-xs shadow-sm">
                                            {index + 1}
                                        </span>
                                        <span>{suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Strengths */}
                    {result.strengths && result.strengths.length > 0 && (
                        <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-xl">💪</span> Pontos Fortes
                            </h3>
                            <ul className="space-y-3">
                                {result.strengths.map((strength, index) => (
                                    <li key={index} className="flex gap-3 text-sm text-gray-700">
                                        <span className="text-green-600 mt-0.5">✓</span>
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
