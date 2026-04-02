import type { LineupData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Users,
  Target,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface TeamStatsProps {
  lineup: LineupData;
  formation: string;
  tacticalMode: string;
}

export function TeamStats({ lineup, formation, tacticalMode }: TeamStatsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Team Analysis
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">
              Formation
            </div>
            <div className="text-2xl font-bold text-blue-800 mt-1">{formation}</div>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <div className="text-xs text-purple-600 font-medium uppercase tracking-wide">
              Tactical Mode
            </div>
            <div className="text-2xl font-bold text-purple-800 mt-1 capitalize">
              {tacticalMode}
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Team Score</p>
              <p className="text-xs text-muted-foreground">
                Combined strength of the selected starting XI
              </p>
            </div>

            <div className={`text-4xl font-bold ${getScoreColor(lineup.averageScore)}`}>
              {lineup.teamScore.toFixed(0)}
            </div>
          </div>

          <Progress value={lineup.averageScore} className="h-3" />

          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Average: {lineup.averageScore.toFixed(1)}</span>
            <span>Scale: 0–100 per player</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Users className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Players</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{lineup.lineup.length}</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Target className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Out of Position</span>
            </div>
            <div
              className={`text-2xl font-bold ${
                lineup.outOfPosition > 0 ? 'text-amber-500' : 'text-emerald-600'
              }`}
            >
              {lineup.outOfPosition}
            </div>
          </div>
        </div>

        {lineup.outOfPosition > 0 ? (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-medium text-amber-800">Position Warning</span>
              <p className="text-amber-700 mt-1">
                {lineup.outOfPosition} player(s) are outside their natural role. This may reduce
                tactical balance and team chemistry.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-medium text-emerald-800">Optimal Setup</span>
              <p className="text-emerald-700 mt-1">
                All selected players are in their natural positions. Maximum chemistry is expected.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}