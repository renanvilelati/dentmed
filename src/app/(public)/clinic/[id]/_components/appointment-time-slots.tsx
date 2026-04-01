import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  isSlotInThePast,
  isSlotSequenceAvailable,
  isToday,
} from '../utils/slots-utils';

export type TTimeSlot = {
  time: string;
  available: boolean;
};

type AppointmentTimeSlotsProps = {
  selectedTime: string;
  selectedDate: Date;
  availableTimeSlots: TTimeSlot[];
  blockedTimes: string[];
  clinicTimes: string[];
  requiredSlots: number;
  onSelectTime: (time: string) => void;
};

const AppointmentTimeSlots = ({
  selectedTime,
  availableTimeSlots,
  blockedTimes,
  requiredSlots,
  clinicTimes,
  selectedDate,
  onSelectTime,
}: AppointmentTimeSlotsProps) => {
  const dateIsToday = isToday(selectedDate);

  return (
    <div className="grid grid-cols-3 gap-2 p-4 md:grid-cols-5">
      {availableTimeSlots.map((slot) => {
        const sequenceOK = isSlotSequenceAvailable(
          slot.time,
          requiredSlots,
          clinicTimes,
          blockedTimes,
        );

        const slotIsPast = dateIsToday && isSlotInThePast(slot.time);

        const slotEnabled = slot.available && sequenceOK && !slotIsPast;

        return (
          <Button
            onClick={() => slotEnabled && onSelectTime(slot.time)}
            type="button"
            variant="outline"
            key={slot.time}
            className={cn(
              'h-10 select-none',
              selectedTime === slot.time && 'border-2 bg-red-400 text-white',
              !slotEnabled && 'cursor-not-allowed opacity-50',
            )}
            disabled={!slotEnabled}
          >
            {slot.time}
          </Button>
        );
      })}
    </div>
  );
};

export default AppointmentTimeSlots;
