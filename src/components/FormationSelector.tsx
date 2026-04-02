import type { FormationType } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormationSelectorProps {
  formations: FormationType[];
  selected: FormationType;
  onSelect: (formation: FormationType) => void;
}

const formationInfo: Record<FormationType, { name: string; description: string; style: string }> = {
  '4-3-3': {
    name: '4-3-3',
    description: 'Balanced attack with wingers',
    style: 'bg-blue-500',
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    description: 'Solid defense with attacking midfield',
    style: 'bg-emerald-500',
  },
  '4-4-2': {
    name: '4-4-2',
    description: 'Classic two-striker formation',
    style: 'bg-purple-500',
  },
};

export function FormationSelector({ formations, selected, onSelect }: FormationSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {formations.map((formation) => {
        const info = formationInfo[formation];
        const isSelected = selected === formation;
        
        return (
          <Button
            key={formation}
            variant={isSelected ? 'default' : 'outline'}
            onClick={() => onSelect(formation)}
            className={cn(
              'flex flex-col items-start h-auto py-3 px-4 min-w-[120px]',
              isSelected && info.style
            )}
          >
            <span className="text-lg font-bold">{info.name}</span>
            <span className="text-xs opacity-80">{info.description}</span>
          </Button>
        );
      })}
    </div>
  );
}
