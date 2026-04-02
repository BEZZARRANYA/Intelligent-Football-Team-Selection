import { useState, useEffect } from 'react';
import type {
  Player,
  Formation,
  LineupData,
  PlayerExplanation,
  TacticalMode,
  FormationType,
} from '@/types';

interface DataState {
  players: Player[];
  formations: Record<FormationType, Formation>;
  lineups: Record<FormationType, Record<TacticalMode, LineupData>>;
  explanations: Record<FormationType, Record<TacticalMode, PlayerExplanation[]>>;
  loading: boolean;
  error: string | null;
}

export function useData(): DataState {
  const [data, setData] = useState<DataState>({
    players: [],
    formations: {} as Record<FormationType, Formation>,
    lineups: {} as Record<FormationType, Record<TacticalMode, LineupData>>,
    explanations: {} as Record<FormationType, Record<TacticalMode, PlayerExplanation[]>>,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [playersRes, formationsRes, lineupsRes, explanationsRes] = await Promise.all([
          fetch('/data/players.json'),
          fetch('/data/formations.json'),
          fetch('/data/lineups.json'),
          fetch('/data/explanations.json'),
        ]);

        const responses = [playersRes, formationsRes, lineupsRes, explanationsRes];
        const failedResponse = responses.find((res) => !res.ok);

        if (failedResponse) {
          throw new Error(`Failed to load data: ${failedResponse.url}`);
        }

        const [players, formations, lineups, explanations] = await Promise.all([
          playersRes.json(),
          formationsRes.json(),
          lineupsRes.json(),
          explanationsRes.json(),
        ]);

        setData({
          players,
          formations,
          lineups,
          explanations,
          loading: false,
          error: null,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load data';

        setData({
          players: [],
          formations: {} as Record<FormationType, Formation>,
          lineups: {} as Record<FormationType, Record<TacticalMode, LineupData>>,
          explanations: {} as Record<FormationType, Record<TacticalMode, PlayerExplanation[]>>,
          loading: false,
          error: message,
        });
      }
    };

    loadData();
  }, []);

  return data;
}