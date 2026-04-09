import { getReminders } from '../../_data-access/get-reminders';
import ReminderList from './reminder-list';

const Reminders = async ({ userId }: { userId: string }) => {
  const reminders = await getReminders({ userId });

  return (
    <div>
      <ReminderList reminder={reminders} />
    </div>
  );
};

export default Reminders;
