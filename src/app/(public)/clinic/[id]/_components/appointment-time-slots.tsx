export type TTimeSlot = {
  time: string;
  available: boolean;
};

type AppointmentTimeSlotsProps = {
  selectedTime: string;
  availableTimeSlots: TTimeSlot[];
  loadingSlots: boolean;
  blockedTimes: string[];
};

const AppointmentTimeSlots = ({
  selectedTime,
  availableTimeSlots,
  loadingSlots,
}: AppointmentTimeSlotsProps) => {
  return <div>AppointmentTimeSlots</div>;
};

export default AppointmentTimeSlots;
