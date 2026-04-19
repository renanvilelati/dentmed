import { SignUpForm } from '@/features/authentication/components/sign-up-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LoginForm } from '@/features/authentication/components/login-form';
import { LoginButton } from '@/features/home/components/login-button';
import { useSession } from 'next-auth/react';

export const AuthenticationForm = () => {
  const { data: session } = useSession();

  return (
    <Tabs defaultValue="sign-up">
      <TabsList className="w-full">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="sign-up">Cadastrar</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUpForm />
      </TabsContent>
      <LoginButton session={session} />

    </Tabs>
  );
};
