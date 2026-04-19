'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/shared/components/ui/field';
import { Controller } from 'react-hook-form';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useLoginForm } from '../hooks/use-login-form';
import { TloginSchema } from '../schemas/login.schema';
import { signIn } from 'next-auth/react';

export const LoginForm = () => {
  const form = useLoginForm();

  const onSubmit = async (formData: TloginSchema) => {
    await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirectTo: '/dashboard',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulário de login</CardTitle>
        <CardDescription>Preencha os dados para continuar</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-2">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="font-semibold" htmlFor="email">
                    E-mail
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="font-semibold" htmlFor="password">
                    Senha
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit">Entrar</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
