'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import { useSignUpForm } from '../hooks/use-signup-form';
import { TsignupSchema } from '../schemas/signup.schema';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/shared/components/ui/field';
import { Controller } from 'react-hook-form';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { createUser } from '../actions/create-user';
import { toast } from 'sonner';

export const SignUpForm = () => {
  const form = useSignUpForm();

  const onSubmit = async (formData: TsignupSchema) => {
    const res = await createUser(formData)

    if(!res.success) {
        toast.error(res.message)
        return
    }

    toast.success(res.message)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulário de cadastro</CardTitle>
        <CardDescription>Preencha os dados para se cadastrar</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="font-semibold" htmlFor="name">
                    Nome
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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

            <Button type="submit">Cadastrar</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
