import { PlanCard } from '@/features/plans/components/plan-card';
import { subscriptionPlans } from '@/features/plans/contants/subscription-plans.contant';
import PageTitle from '@/shared/components/protected/page-title';
import PageContainer from '@/shared/layout/protected/page-container';
import { auth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';

const PlansPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/');
  }

  return (
    <PageContainer>
      <PageTitle>Planos</PageTitle>

      <div className="flex flex-col gap-4 md:flex-row">
        {subscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </PageContainer>
  );
};

export default PlansPage;
