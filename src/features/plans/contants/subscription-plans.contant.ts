import { PLANS, TPlanCard } from '../types/plan.types';

export const subscriptionPlans: TPlanCard[] = [
  {
    id: 'BASIC',
    name: 'Basic',
    description: 'Perfeito para clinicas menores',
    oldPrice: 'R$ 97,90',
    price: 'R$ 27,90',
    features: [
      `Até ${PLANS['BASIC'].maxServices} serviços`,
      'Agendamentos ilimitados',
      'Suporte',
      'Relatórios',
    ],
  },
  {
    id: 'PROFESSIONAL',
    name: 'Profissional',
    description: 'Ideal para clinicas grandes',
    oldPrice: 'R$ 197,90',
    price: 'R$ 97,90',
    features: [
      `Até ${PLANS['PROFESSIONAL'].maxServices} serviços`,
      'Agendamentos ilimitados',
      'Suporte prioritário',
      'Relatórios avançados',
    ],
  },
];
