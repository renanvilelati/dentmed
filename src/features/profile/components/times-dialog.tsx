'use client';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useState } from 'react';

type TimesDialogProps = {
  selectedHours: string[];
  onChange: (hours: string[]) => void;
};

const TimesDialog = ({ selectedHours, onChange }: TimesDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const generateTimeSlots = () => {
    const hours: string[] = [];

    for (let i = 8; i <= 21; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, '0');
        const minutes = (j * 30).toString().padStart(2, '0');
        hours.push(`${hour}:${minutes}`);
      }
    }

    return hours;
  };

  const hours = generateTimeSlots();
  hours.pop();

  const handleSelectHours = (hour: string) => {
    const updatedHours = selectedHours.includes(hour)
      ? selectedHours.filter((h) => h !== hour)
      : [...selectedHours, hour].sort();

    onChange(updatedHours);
  };

  const handleToggleAllHours = () => {
    onChange(selectedHours.length === 0 ? hours : []);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant={'secondary'} className="w-full">
          Configurar horários
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-sm md:text-base">
            Horários da clínica
          </DialogTitle>
          <DialogDescription>
            Selecione os horários de funcionamento da clínica
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-2">
          {hours.map((hour) => (
            <Button
              variant={'outline'}
              type="button"
              className={cn(
                'border-2',
                selectedHours.includes(hour) && 'bg-primary text-white',
              )}
              key={hour}
              onClick={() => handleSelectHours(hour)}
            >
              {hour}
            </Button>
          ))}
        </div>
        <DialogFooter className="flex">
          <Button
            type="button"
            variant={'secondary'}
            className="flex-1"
            onClick={handleToggleAllHours}
          >
            {selectedHours.length === 0 ? 'Selecionar todos' : 'Limpar todos'}
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={() => setIsOpen(false)}
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimesDialog;
