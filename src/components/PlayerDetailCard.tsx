import type { PlayerExplanation, Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Activity,
  Target,
  Shield,
  Zap,
  CheckCircle2,
  AlertCircle,
  User
} from 'lucide-react';

interface PlayerDetailCardProps {
  explanation: PlayerExplanation;
  player: Player;
}

export function PlayerDetailCard({ explanation, player }: PlayerDetailCardProps) {
  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'goals':
      case 'shots_on_target':
        return <Target className="w-4 h-4" />;
      case 'assists':
      case 'key_passes':
        return <TrendingUp className="w-4 h-4" />;
      case 'tackles':
      case 'interceptions':
      case 'clearances':
        return <Shield className="w-4 h-4" />;
      case 'dribbles':
        return <Zap className="w-4 h-4" />;
      case 'recent_form_score':
        return <Activity className="w-4 h-4" />;
      default:
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow">
              {player.name.charAt(0)}
            </div>

            <div>
              <CardTitle className="text-lg leading-tight">{explanation.playerName}</CardTitle>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="secondary">{explanation.position}</Badge>
                <span className="text-sm text-muted-foreground">
                  {player.age} years • {player.nationality}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {explanation.positionDescription}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(explanation.overallScore)}`}>
              {explanation.overallScore.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">Overall Score</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm font-medium text-blue-900">Why selected</p>
          <p className="text-sm text-blue-800 mt-1">
            {explanation.selectionSentence}
          </p>
        </div>

        {explanation.backupComparison && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm font-medium text-slate-900">Compared to alternative</p>
            <p className="text-sm text-slate-700 mt-1">
              {explanation.backupComparison}
            </p>
          </div>
        )}

        {!explanation.isNaturalPosition && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <span className="font-medium text-amber-800">Out of Position</span>
              <p className="text-amber-700">
                Natural position: {explanation.naturalPosition}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-gray-50 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Activity className="w-4 h-4" />
              <span className="text-xs">Form</span>
            </div>
            <div className={`text-xl font-bold ${getScoreColor(explanation.recentForm)}`}>
              {explanation.recentForm.toFixed(0)}
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs">Fitness</span>
            </div>
            <div className={`text-xl font-bold ${getScoreColor(explanation.fitness)}`}>
              {explanation.fitness.toFixed(0)}
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <User className="w-4 h-4" />
              <span className="text-xs">Minutes</span>
            </div>
            <div className="text-xl font-bold text-gray-700">
              {player.minutes}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Top Strengths</h4>
          <div className="space-y-3">
            {explanation.selectionReasons.map((reason) => (
              <div key={reason.stat} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {getStatIcon(reason.stat)}
                    <span>{reason.description}</span>
                  </div>
                  <span className="font-medium">{reason.value.toFixed(1)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Progress value={reason.normalized} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {reason.normalized.toFixed(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t">
          <h4 className="text-sm font-semibold mb-2">Season Stats</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Matches Played</span>
              <span className="font-medium">{player.matchesPlayed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Starts</span>
              <span className="font-medium">{player.starts}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}