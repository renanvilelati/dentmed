'use server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { stripe } from '@/shared/lib/stripe/stripe';
import { Plan } from '@root/prisma/src/generated/prisma/enums';

type TCreatePlan = {
  type: Plan;
};

export const createPlan = async ({ type }: TCreatePlan) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return {
        success: false,
        message: 'Usuário não encontrado',
      };
    }

    const findedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!findedUser) {
      return {
        success: false,
        message: 'Usuário não encontrado',
      };
    }

    let customerId = findedUser.stripe_customer_id;

    if (!customerId) {
      const striperCustomer = await stripe.customers.create({
        email: findedUser.email!,
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          stripe_customer_id: striperCustomer.id,
        },
      });

      customerId = striperCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price:
            type === 'BASIC'
              ? process.env.STRIPE_PLAN_BASIC_ID
              : process.env.STRIPE_PLAN_PROFESSIONAL_ID,
          quantity: 1,
        },
      ],
      metadata: { type: type },
      mode: 'subscription',
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return {
      success: true,
      sessionId: stripeCheckoutSession.id,
      url: stripeCheckoutSession.url,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Falha ao criar plano',
    };
  }
};
