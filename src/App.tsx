import { useState } from 'react';
import { useData } from '@/hooks/useData';
import { FormationSelector } from '@/components/FormationSelector';
import { TacticalModeSelector } from '@/components/TacticalModeSelector';
import { PitchVisualization } from '@/components/PitchVisualization';
import { PlayerDetailCard } from '@/components/PlayerDetailCard';
import { BenchSuggestions } from '@/components/BenchSuggestions';
import { TeamStats } from '@/components/TeamStats';
import { FormationComparison } from '@/components/FormationComparison';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  RefreshCw,
  Users,
  BarChart3,
  HelpCircle,
  Trophy,
  Activity
} from 'lucide-react';
import type { FormationType, TacticalMode, LineupPlayer } from '@/types';

function App() {
  const { players, formations, lineups, explanations, loading, error } = useData();
  const [selectedFormation, setSelectedFormation] = useState<FormationType>('4-3-3');
  const [selectedMode, setSelectedMode] = useState<TacticalMode>('balanced');
  const [selectedPlayer, setSelectedPlayer] = useState<LineupPlayer | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          <p className="text-muted-foreground">Loading team data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-6">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  const currentLineup = lineups[selectedFormation]?.[selectedMode];
  const currentExplanations = explanations[selectedFormation]?.[selectedMode];
  const currentFormation = formations[selectedFormation];

  if (!currentLineup || !currentFormation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const selectedPlayerExplanation = selectedPlayer
    ? currentExplanations?.find((e) => e.playerId === selectedPlayer.playerId)
    : null;

  const selectedPlayerData = selectedPlayer
    ? players.find((p) => p.id === selectedPlayer.playerId)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/95 backdrop-blur border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Intelligent Lineup Recommender
                </h1>
                <p className="text-sm text-muted-foreground">
                  Data-driven football team selection with tactical optimization
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4" />
              <span>{players.length} Players Analyzed</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-2 block">Formation</label>
                <FormationSelector
                  formations={Object.keys(formations) as FormationType[]}
                  selected={selectedFormation}
                  onSelect={setSelectedFormation}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tactical Mode</label>
                <TacticalModeSelector
                  selected={selectedMode}
                  onSelect={setSelectedMode}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Current Formation</p>
              <p className="text-2xl font-bold mt-1">{selectedFormation}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Tactical Mode</p>
              <p className="text-2xl font-bold mt-1 capitalize">{selectedMode}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Players Evaluated</p>
              <p className="text-2xl font-bold mt-1">{players.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="pitch" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pitch">
                  <Users className="w-4 h-4 mr-2" />
                  Pitch View
                </TabsTrigger>
                <TabsTrigger value="list">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  List View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pitch" className="mt-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-5">
                    <div className="rounded-xl overflow-hidden border shadow-md bg-white">
                      <PitchVisualization
                        lineup={currentLineup.lineup}
                        formation={currentFormation}
                        selectedPlayer={selectedPlayer}
                        onSelectPlayer={setSelectedPlayer}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="list" className="mt-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-5">
                    <div className="space-y-2">
                      {currentLineup.lineup.map((player, index) => (
                        <button
                          key={player.playerId}
                          onClick={() => setSelectedPlayer(player)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border ${
                            selectedPlayer?.playerId === player.playerId
                              ? 'bg-blue-50 border-blue-200 shadow-sm'
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground w-6">
                              {index + 1}
                            </span>

                            <div className="text-left">
                              <div className="font-medium">{player.playerName}</div>
                              <div className="text-xs text-muted-foreground">
                                {player.position}
                                {!player.isNaturalPosition && (
                                  <span className="text-amber-600 ml-1">
                                    (Natural: {player.naturalPosition})
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-blue-600">
                              {player.score.toFixed(1)}
                            </div>
                            <div className="text-xs text-muted-foreground">Score</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <TeamStats
              lineup={currentLineup}
              formation={selectedFormation}
              tacticalMode={selectedMode}
            />

            {selectedPlayerExplanation && selectedPlayerData && (
              <PlayerDetailCard
                explanation={selectedPlayerExplanation}
                player={selectedPlayerData}
              />
            )}

            {!selectedPlayer && (
              <Card className="p-6 text-center border-0 shadow-sm">
                <HelpCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm leading-6">
                  Click a player on the pitch or in the list to view selection reasoning,
                  performance indicators, and comparison details.
                </p>
              </Card>
            )}

            <BenchSuggestions bench={currentLineup.bench} />
          </div>
        </div>

        <div className="mt-6">
          <FormationComparison
            lineups={lineups}
            currentFormation={selectedFormation}
            currentMode={selectedMode}
          />
        </div>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Intelligent Football Lineup Recommendation System
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Data-driven player selection</span>
              <span>•</span>
              <span>Position-aware scoring</span>
              <span>•</span>
              <span>Tactical optimization</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;