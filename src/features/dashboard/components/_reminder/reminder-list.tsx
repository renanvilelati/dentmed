'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Reminder } from '@root/prisma/src/generated/prisma/client';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import DeleteReminderButton from './delete-reminder-button';
import ReminderDialog from './reminder-dialog';
import { useState } from 'react';
import AddPlusButton from '../add-plus-button';

type ReminderListProps = {
  reminder: Reminder[];
};

const ReminderList = ({ reminder }: ReminderListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between space-y-0">
          <CardTitle className="text-xl text-gray-700 md:text-2xl">
            Lembretes
          </CardTitle>
          <AddPlusButton onCLick={() => setIsOpen(true)} />
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-340 w-full flex-1 pr-0 lg:max-h-[calc(100vh-15rem)]">
            {reminder.length > 0 ? (
              reminder.map((item) => (
                <article
                  key={item.id}
                  className="mb-2 flex flex-wrap items-center justify-between rounded-md bg-red-100/50 px-2 py-2"
                >
                  <p>{item.description}</p>
                  <DeleteReminderButton reminderId={item.id} />
                </article>
              ))
            ) : (
              <p>Nenhum lembrete cadastrado!</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <ReminderDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ReminderList;
