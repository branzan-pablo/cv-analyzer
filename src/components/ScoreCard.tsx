import type { AnalysisScore } from '@/types';

interface ScoreCardProps {
    score: AnalysisScore;
}

function getScoreColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'from-green-500 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-500 to-orange-500';
    if (percentage >= 40) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-red-700';
}

function getScoreBgColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500/10 border-green-500/30';
    if (percentage >= 60) return 'bg-yellow-500/10 border-yellow-500/30';
    if (percentage >= 40) return 'bg-orange-500/10 border-orange-500/30';
    return 'bg-red-500/10 border-red-500/30';
}

export default function ScoreCard({ score }: ScoreCardProps) {
    const percentage = (score.score / score.maxScore) * 100;

    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{score.icon}</span>
                <h3 className="text-lg font-semibold text-white">{score.dimension}</h3>
            </div>

            {/* Score */}
            <div className="flex items-end gap-2 mb-4">
                <span className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor(score.score, score.maxScore)} bg-clip-text text-transparent`}>
                    {score.score}
                </span>
                <span className="text-gray-400 mb-1">/ {score.maxScore}</span>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                    className={`h-full bg-gradient-to-r ${getScoreColor(score.score, score.maxScore)} transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Feedback */}
            <p className="text-gray-300 text-sm mb-4">{score.feedback}</p>

            {/* Suggestions */}
            {score.suggestions && score.suggestions.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Sugestões</p>
                    <ul className="space-y-2">
                        {score.suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className={`text-sm p-2 rounded-lg border ${getScoreBgColor(score.score, score.maxScore)}`}
                            >
                                <span className="text-gray-200">{suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
