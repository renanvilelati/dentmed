import { getClinicTimes } from '../../_data-access/get-clinic-times';
import AppointmentList from './appointment-list';

const Appointments = async ({ userId }: { userId: string }) => {
  const user = await getClinicTimes({ userId });

  return (
    <div>
      <AppointmentList times={user.times} />
    </div>
  );
};

export default Appointments;
