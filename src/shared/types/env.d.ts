declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    AUTH_SECRET: string;

    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;

    NEXT_PUBLIC_URL: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;

    STRIPE_SECRET_KEY: string;
    STRIPE_SECRET_WEBHOOK_KEY: string;

    STRIPE_PLAN_BASIC_ID: string;
    STRIPE_PLAN_PROFESSIONAL_ID: string;

    STRIPE_SUCCESS_URL: string;
    STRIPE_CANCEL_URL: string;
  }
}
