import type { BenchPlayer } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, ArrowRight } from 'lucide-react';

interface BenchSuggestionsProps {
  bench: Record<string, BenchPlayer[]>;
}

export function BenchSuggestions({ bench }: BenchSuggestionsProps) {
  const getPositionColor = (position: string) => {
    if (position.includes('GK')) return 'bg-orange-500';
    if (position.includes('B')) return 'bg-blue-500';
    if (position.includes('M')) return 'bg-emerald-500';
    if (position.includes('W') || position.includes('ST')) return 'bg-red-500';
    return 'bg-gray-500';
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="w-5 h-5" />
          Bench Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(bench).map(([position, alternatives]) => (
            <div key={position} className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className={`${getPositionColor(position)} text-white`}>
                  {position}
                </Badge>
                <span className="text-sm text-muted-foreground">Alternatives</span>
              </div>
              <div className="space-y-1 pl-2">
                {alternatives.map((player, index) => (
                  <div 
                    key={player.playerId}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-4">
                        {index + 1}.
                      </span>
                      <span className="text-sm font-medium">{player.playerName}</span>
                      <Badge variant="outline" className="text-xs">
                        {player.naturalPosition}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-blue-600">
                        {player.score.toFixed(1)}
                      </span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
