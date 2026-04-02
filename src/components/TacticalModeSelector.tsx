import type { TacticalMode } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Shield, Swords, Scale } from 'lucide-react';

interface TacticalModeSelectorProps {
  selected: TacticalMode;
  onSelect: (mode: TacticalMode) => void;
}

const modes: { id: TacticalMode; label: string; description: string; icon: React.ReactNode; color: string }[] = [
  {
    id: 'balanced',
    label: 'Balanced',
    description: 'Standard approach',
    icon: <Scale className="w-4 h-4" />,
    color: 'bg-blue-500',
  },
  {
    id: 'attacking',
    label: 'Attacking',
    description: 'Focus on scoring',
    icon: <Swords className="w-4 h-4" />,
    color: 'bg-red-500',
  },
  {
    id: 'defensive',
    label: 'Defensive',
    description: 'Focus on defense',
    icon: <Shield className="w-4 h-4" />,
    color: 'bg-emerald-500',
  },
];

export function TacticalModeSelector({ selected, onSelect }: TacticalModeSelectorProps) {
  return (
    <div className="flex gap-2">
      {modes.map((mode) => {
        const isSelected = selected === mode.id;
        
        return (
          <Button
            key={mode.id}
            variant={isSelected ? 'default' : 'outline'}
            onClick={() => onSelect(mode.id)}
            className={cn(
              'flex items-center gap-2 flex-1',
              isSelected && mode.color
            )}
          >
            {mode.icon}
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{mode.label}</span>
              <span className="text-[10px] opacity-80 hidden sm:inline">{mode.description}</span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
