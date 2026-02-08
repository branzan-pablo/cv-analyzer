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
        <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:scale-[1.02]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/20">
                    <span className="text-xl">{score.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{score.dimension}</h3>
            </div>

            {/* Score */}
            <div className="flex items-end gap-2 mb-4">
                <span className={`text-5xl font-bold ${getScoreColor(score.score, score.maxScore)}`}>
                    {score.score}
                </span>
                <span className="text-gray-400 mb-2 font-medium text-lg">/ {score.maxScore}</span>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-5">
                <div
                    className={`h-full ${getProgressBarColor(score.score, score.maxScore)} transition-all duration-500 ease-out rounded-full`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Feedback */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{score.feedback}</p>

            {/* Suggestions */}
            {score.suggestions && score.suggestions.length > 0 && (
                <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sugestões</p>
                    <ul className="space-y-2">
                        {score.suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="text-sm p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
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
