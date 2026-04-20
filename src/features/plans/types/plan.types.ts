import { Plan } from '@root/prisma/src/generated/prisma/enums';

export type PlanDetailsProps = {
  maxServices: number;
};

export type PlansProps = {
  BASIC: PlanDetailsProps;
  PROFESSIONAL: PlanDetailsProps;
};

export const PLANS: PlansProps = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
};

export type TPlanCard = {
  id: Plan;
  name: string;
  description: string;
  oldPrice: string;
  price: string;
  features: string[];
};
