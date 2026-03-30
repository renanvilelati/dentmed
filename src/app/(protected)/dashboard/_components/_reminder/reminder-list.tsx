'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Reminder } from '../../../../../../prisma/src/generated/prisma/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeleteReminderButton from './delete-reminder-button';
import ReminderDialog from './reminder-dialog';
import { useState } from 'react';

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
          <Button
            variant={'ghost'}
            className="w-9 p-0"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-340 w-full flex-1 pr-0 lg:max-h-[calc(100vh-15rem)]">
            {reminder.length > 0 ? (
              reminder.map((item) => (
                <article
                  key={item.id}
                  className="mb-2 flex flex-wrap items-center justify-between rounded-md bg-orange-100/70 px-2 py-2"
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
