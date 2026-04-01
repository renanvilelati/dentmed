'use client';

import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { deleteReminder } from '../../actions/delete-reminder';
import { toast } from 'sonner';

type DeleteReminderButtonProps = {
  reminderId: string;
};

const DeleteReminderButton = ({ reminderId }: DeleteReminderButtonProps) => {
  const handleDeleteReminder = async () => {
    const response = await deleteReminder({ reminderId });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.message);
  };

  return (
    <Button
      className="shadow-none hover:bg-red-500"
      onClick={handleDeleteReminder}
    >
      <Trash />
    </Button>
  );
};

export default DeleteReminderButton;
