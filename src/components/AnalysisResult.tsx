import type { AnalysisResult } from '@/types';
import ScoreCard from './ScoreCard';

interface AnalysisResultProps {
    result: AnalysisResult;
    onNewAnalysis: () => void;
}

function getOverallScoreColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'from-green-400 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-400 to-orange-500';
    if (percentage >= 40) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-red-600';
}

export default function AnalysisResultComponent({ result, onNewAnalysis }: AnalysisResultProps) {
    const percentage = (result.overallScore / result.maxScore) * 100;

    return (
        <div className="space-y-8">
            {/* Overall Score */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-white/5 border border-white/20 mb-6 relative">
                    {/* Circular progress background */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                        />
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="url(#scoreGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${percentage * 4.4} 440`}
                            className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="text-center z-10">
                        <span className={`text-5xl font-bold bg-gradient-to-r ${getOverallScoreColor(result.overallScore, result.maxScore)} bg-clip-text text-transparent`}>
                            {result.overallScore}
                        </span>
                        <span className="text-gray-400 text-lg block">/ {result.maxScore}</span>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Sua Pontuação</h2>
                <p className="text-gray-400 max-w-md mx-auto">{result.summary}</p>
            </div>

            {/* Priority Suggestions */}
            {result.prioritySuggestions && result.prioritySuggestions.length > 0 && (
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <span>🎯</span> Melhorias Prioritárias
                    </h3>
                    <ul className="space-y-3">
                        {result.prioritySuggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-medium">
                                    {index + 1}
                                </span>
                                <span className="text-gray-200">{suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Strengths */}
            {result.strengths && result.strengths.length > 0 && (
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-6 border border-green-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <span>💪</span> Pontos Fortes
                    </h3>
                    <ul className="space-y-2">
                        {result.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="text-green-400">✓</span>
                                <span className="text-gray-200">{strength}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Score Cards Grid */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">Análise Detalhada</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {result.scores.map((score, index) => (
                        <ScoreCard key={index} score={score} />
                    ))}
                </div>
            </div>

            {/* New Analysis Button */}
            <div className="text-center pt-4">
                <button
                    onClick={onNewAnalysis}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Nova Análise
                </button>
            </div>
        </div>
    );
}
