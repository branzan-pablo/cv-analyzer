import type { AnalysisScore } from '@/types';

interface ScoreCardProps {
    score: AnalysisScore;
}

function getScoreColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
}

function getProgressBarColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
}

export default function ScoreCard({ score }: ScoreCardProps) {
    const percentage = (score.score / score.maxScore) * 100;

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{score.icon}</span>
                <h3 className="text-lg font-bold text-gray-900">{score.dimension}</h3>
            </div>

            {/* Score */}
            <div className="flex items-end gap-2 mb-4">
                <span className={`text-4xl font-bold ${getScoreColor(score.score, score.maxScore)}`}>
                    {score.score}
                </span>
                <span className="text-gray-400 mb-1 font-medium">/ {score.maxScore}</span>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                    className={`h-full ${getProgressBarColor(score.score, score.maxScore)} transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Feedback */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{score.feedback}</p>

            {/* Suggestions */}
            {score.suggestions && score.suggestions.length > 0 && (
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Sugestões</p>
                    <ul className="space-y-2">
                        {score.suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="text-sm p-3 rounded-lg bg-gray-50 border border-gray-100 text-gray-700"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
