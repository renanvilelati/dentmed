'use client';

import { Button } from '@/components/ui/button';
import { LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

const ButtonCopy = ({ userId }: { userId: string }) => {
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/clinic/${userId}`,
    );

    toast.success('Link da clínica copiado');
  };

  return (
    <Button
      className="bg-gray-300 text-black hover:bg-gray-200"
      onClick={handleCopyLink}
    >
      <LinkIcon className="h-5 w-5" />
    </Button>
  );
};

export default ButtonCopy;
