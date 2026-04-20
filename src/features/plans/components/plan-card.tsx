import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/components/ui/card';
import CreatePlanButton from './create-plan-button';
import { TPlanCard } from '../types/plan.types';

type TPlanCardProps = {
  plan: TPlanCard;
};

export const PlanCard = ({ plan }: TPlanCardProps) => {
  const { id, name, description, oldPrice, price, features } = plan;
  return (
    <Card className="mt-4 max-w-[400] min-w-[400] p-4">
      <CardHeader className="w-full">
        <h3 className="text-2xl font-semibold text-gray-700">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </CardHeader>

      <CardContent className="space-y-2">
        <ul className="gap-2">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div>
          <p className="text-xl text-gray-500 line-through">{oldPrice}</p>
          <p className="text-xl font-bold text-gray-700">{price}</p>
        </div>
      </CardContent>

      <CardFooter>
        <CreatePlanButton type={id} />
      </CardFooter>
    </Card>
  );
};
