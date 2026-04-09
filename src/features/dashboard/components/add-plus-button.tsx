'use client';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';

type AddPlusButtonProps = {
  onCLick: () => void;
};

const AddPlusButton = ({ onCLick }: AddPlusButtonProps) => {
  return (
    <Button
      variant={'ghost'}
      className="bg-gray-300 hover:bg-gray-400"
      onClick={onCLick}
    >
      <Plus className="h-4 w-4" />
    </Button>
  );
};

export default AddPlusButton;
