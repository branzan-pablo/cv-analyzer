import type { AnalysisResult } from '@/types';
import ScoreCard from './ScoreCard';
import { Button } from '@/components/ui/button';

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
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 pb-10 border-b border-gray-200/50">
                <div className="relative w-56 h-56 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90">
                        <circle
                            cx="112"
                            cy="112"
                            r="100"
                            fill="none"
                            stroke="#262626"
                            strokeWidth="16"
                        />
                        <circle
                            cx="112"
                            cy="112"
                            r="100"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="16"
                            strokeLinecap="round"
                            strokeDasharray={`${percentage * 6.28} 628`}
                            className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
                            {result.overallScore}
                        </span>
                        <span className="text-gray-400 text-base font-medium mt-1">de {result.maxScore}</span>
                    </div>
                </div>

                <div className="text-center md:text-left space-y-5">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Análise Completa</h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-xl">{result.summary}</p>

                    <Button
                        onClick={onNewAnalysis}
                        size="lg"
                    >
                        Nova Análise
                    </Button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Scores Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Detalhamento por Dimensão</h3>
                    <div className="grid gap-5 sm:grid-cols-2">
                        {result.scores.map((score, index) => (
                            <ScoreCard key={index} score={score} />
                        ))}
                    </div>
                </div>

                {/* Sidebar: Strengths & Weaknesses */}
                <div className="space-y-6">
                    {/* Priority Suggestions */}
                    {result.prioritySuggestions && result.prioritySuggestions.length > 0 && (
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200/50 shadow-lg shadow-orange-500/10">
                            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center shadow-md">
                                    <span className="text-lg">🎯</span>
                                </div>
                                Prioridades
                            </h3>
                            <ul className="space-y-4">
                                {result.prioritySuggestions.map((suggestion, index) => (
                                    <li key={index} className="flex gap-3 text-sm text-gray-700">
                                        <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-gray-50 text-orange-600 border border-orange-200 flex items-center justify-center font-bold text-xs shadow-sm">
                                            {index + 1}
                                        </span>
                                        <span className="leading-relaxed">{suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Strengths */}
                    {result.strengths && result.strengths.length > 0 && (
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 shadow-lg shadow-green-500/10">
                            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center shadow-md">
                                    <span className="text-lg">💪</span>
                                </div>
                                Pontos Fortes
                            </h3>
                            <ul className="space-y-3">
                                {result.strengths.map((strength, index) => (
                                    <li key={index} className="flex gap-3 text-sm text-gray-700">
                                        <span className="text-green-600 mt-0.5 font-bold">✓</span>
                                        <span className="leading-relaxed">{strength}</span>
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
