import type { LineupPlayer, Formation } from '@/types';
import { Shield, User } from 'lucide-react';

interface PitchVisualizationProps {
  lineup: LineupPlayer[];
  formation: Formation;
  selectedPlayer: LineupPlayer | null;
  onSelectPlayer: (player: LineupPlayer) => void;
}

export function PitchVisualization({
  lineup,
  formation,
  selectedPlayer,
  onSelectPlayer
}: PitchVisualizationProps) {
  const getPositionCoords = (position: string, index: number): { x: number; y: number } => {
    const display = formation.positionsDisplay[position];
    if (!display) return { x: 50, y: 50 };

    if (Array.isArray(display)) {
      const samePositionPlayers = lineup.filter((p) => p.position === position);
      const playerIndex = samePositionPlayers.findIndex(
        (p) => lineup.indexOf(p) === index
      );
      return display[playerIndex] || display[0];
    }

    return display as { x: number; y: number };
  };

  return (
    <div className="relative w-full aspect-[3/4] max-w-2xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-700 to-emerald-800 rounded-2xl overflow-hidden shadow-2xl border border-emerald-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 56px,
              rgba(255,255,255,0.08) 56px,
              rgba(255,255,255,0.08) 112px
            )`
          }}
        />

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 133.33">
          <rect x="5" y="5" width="90" height="123.33" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />
          <line x1="5" y1="66.67" x2="95" y2="66.67" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />
          <circle cx="50" cy="66.67" r="10" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />
          <circle cx="50" cy="66.67" r="0.5" fill="white" fillOpacity="0.85" />

          <rect x="25" y="5" width="50" height="16.67" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />
          <rect x="37.5" y="5" width="25" height="8.33" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />

          <rect x="25" y="111.66" width="50" height="16.67" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />
          <rect x="37.5" y="120" width="25" height="8.33" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />

          <path d="M 5 15 Q 10 15 10 10" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />
          <path d="M 95 15 Q 90 15 90 10" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />
          <path d="M 5 118.33 Q 10 118.33 10 123.33" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />
          <path d="M 95 118.33 Q 90 118.33 90 123.33" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.85" />
        </svg>
      </div>

      {lineup.map((player, index) => {
        const coords = getPositionCoords(player.position, index);
        const isSelected = selectedPlayer?.playerId === player.playerId;
        const isOutOfPosition = !player.isNaturalPosition;

        return (
          <button
            key={`${player.position}-${index}`}
            onClick={() => onSelectPlayer(player)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
              isSelected 
                ? 'scale-110 z-10 ring-4 ring-blue-400/50' 
                : 'hover:scale-105'
            }`}
            style={{
              left: `${coords.x}%`,
              top: `${coords.y}%`,
            }}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`
                  w-11 h-11 rounded-full flex items-center justify-center text-white
                  border-2 border-white shadow-lg
                  ${isOutOfPosition ? 'bg-amber-500' : 'bg-blue-600'}
                  ${isSelected ? 'ring-4 ring-white/80 shadow-2xl' : ''}
                `}
              >
                {isOutOfPosition ? (
                  <Shield className="w-5 h-5" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>

              <div
                className={`
                  px-2 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap shadow
                  ${isSelected ? 'bg-white text-slate-900' : 'bg-black/70 text-white'}
                `}
              >
                {player.playerName.split(' ').pop()}
              </div>

              <div
                className={`
                  px-2 py-0.5 rounded text-[10px] font-bold shadow-sm
                  ${isOutOfPosition ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white'}
                `}
              >
                {player.position}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}