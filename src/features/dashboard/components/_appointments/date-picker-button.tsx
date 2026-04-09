'use client';

import { ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

const DatePickerButton = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const router = useRouter();

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);

    const url = new URL(window.location.href);

    url.searchParams.set('date', selectedDate);
    router.push(url.toString());
  };

  return (
    <input
      type="date"
      className="rounded-md border-2 px-2 py-1 text-sm md:text-base"
      value={selectedDate}
      onChange={handleChangeDate}
    />
  );
};

export default DatePickerButton;
