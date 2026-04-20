'use client';
import { Button } from '@/shared/components/ui/button';
import { Plan } from '@root/prisma/src/generated/prisma/enums';
import { createPlan } from '../actions/create-plan';
import { toast } from 'sonner';
import { getStripeJs } from '@/shared/lib/stripe/stripe-js';

type TCreatePlanButtonProps = {
  type: Plan;
};

const CreatePlanButton = ({ type }: TCreatePlanButtonProps) => {
  const handleCreatePlan = async () => {
    const { success, message, url } = await createPlan({ type });

    if (!success) {
      toast.error(message);
      return;
    }

    const stripe = await getStripeJs();

    if (stripe && url) {
      window.location.href = url;
    }
  };

  return (
    <Button
      size={'lg'}
      className={`w-full ${type === 'PROFESSIONAL' && 'bg-emerald-500 hover:bg-emerald-400'}`}
      onClick={handleCreatePlan}
    >
      Assinar
    </Button>
  );
};

export default CreatePlanButton;
