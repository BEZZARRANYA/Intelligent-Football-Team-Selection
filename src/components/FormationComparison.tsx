import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3 } from 'lucide-react';
import type { FormationType, TacticalMode } from '@/types';

interface FormationComparisonProps {
  lineups: Record<FormationType, Record<TacticalMode, {
    teamScore: number;
    averageScore: number;
    outOfPosition: number;
  }>>;
  currentFormation: FormationType;
  currentMode: TacticalMode;
}

export function FormationComparison({ lineups, currentFormation, currentMode }: FormationComparisonProps) {
  const formations: FormationType[] = ['4-3-3', '4-2-3-1', '4-4-2'];
  const modes: TacticalMode[] = ['balanced', 'attacking', 'defensive'];

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-emerald-500';
    if (score >= 700) return 'text-blue-500';
    if (score >= 650) return 'text-amber-500';
    return 'text-red-500';
  };

  const getBgColor = (formation: FormationType, mode: TacticalMode) => {
    if (formation === currentFormation && mode === currentMode) {
      return 'bg-blue-50';
    }
    return '';
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Formation Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Formation</TableHead>
              <TableHead className="text-center">Balanced</TableHead>
              <TableHead className="text-center">Attacking</TableHead>
              <TableHead className="text-center">Defensive</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formations.map((formation) => (
              <TableRow key={formation}>
                <TableCell className="font-medium">
                  <Badge variant="outline">{formation}</Badge>
                </TableCell>
                {modes.map((mode) => {
                  const data = lineups[formation]?.[mode];
                  const isCurrent = formation === currentFormation && mode === currentMode;
                  
                  return (
                    <TableCell 
                      key={`${formation}-${mode}`} 
                      className={`text-center ${getBgColor(formation, mode)}`}
                    >
                      {data ? (
                        <div className="flex flex-col items-center">
                          <span className={`text-lg font-bold ${getScoreColor(data.teamScore)}`}>
                            {data.teamScore.toFixed(0)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Avg: {data.averageScore.toFixed(1)}
                          </span>
                          {data.outOfPosition > 0 && (
                            <span className="text-xs text-amber-600">
                              ⚠ {data.outOfPosition}
                            </span>
                          )}
                          {isCurrent && (
                            <Badge className="mt-1 text-[10px]" variant="default">Current</Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Team Score = Sum of all 11 player scores</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1 ml-6">
            Higher is better. ⚠ indicates players out of natural position.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
