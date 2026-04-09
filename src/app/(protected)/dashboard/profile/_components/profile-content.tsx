'use client';
import { Controller, useForm } from 'react-hook-form';
import { profileSchema, TProfileFormData } from '../_schemas/profile-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import Image from 'next/image';
import imgTest from '../../../../../../public/default_user.svg';
import TimesDialog from './times-dialog';
import { User } from '@root/prisma/src/generated/prisma/client';
import { updateProfile } from '../_actions/update-profile';
import { toast } from 'sonner';
import { extractPhoneNumber, formatPhone } from '@/shared/utils/phoneFormat';
import { timeZones } from '@/shared/constants/timezones';
import PageTitle from '@/shared/layout/page-title';
import { User as UserIcon } from 'lucide-react';
import PageContainer from '@/shared/layout/page-container';

type ProfileContentProps = {
  user: User;
};

const ProfileContent = ({ user }: ProfileContentProps) => {
  const form = useForm<TProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || '',
      phone: user.phone || '',
      address: user.address || '',
      status: user.status ? true : false,
      timeZone: user.timeZone || 'America/Sao_Paulo',
      times: user.times || [],
    },
  });

  const onSubmit = async (data: TProfileFormData) => {
    const extractNumber = extractPhoneNumber(data.phone || '');

    const response = await updateProfile({ ...data, phone: extractNumber });

    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success(response.message);
  };

  return (
    <PageContainer>
      <Card className="w-full">
        <CardHeader>
          <PageTitle>
            <div className="flex items-center gap-2">
              <UserIcon className="h-8 w-8" />
              Meu perfil
            </div>
          </PageTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div
              style={{ width: 160, height: 160 }}
              className="relative overflow-hidden rounded-full bg-gray-200"
            >
              <Image
                src={user?.image || imgTest}
                alt="Imagem do médico"
                className="object-cover"
                fill={true}
              />
            </div>
          </div>
          <form
            id="form-rhf-demo"
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="font-semibold" htmlFor="name">
                      Nome completo
                    </FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu nome"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="font-semibold" htmlFor="address">
                      Endereço
                    </FieldLabel>
                    <Input
                      {...field}
                      id="address"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu endereço"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="font-semibold" htmlFor="phone">
                      Telefone
                    </FieldLabel>
                    <Input
                      {...field}
                      id="phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="(00) 00000-0000"
                      onChange={(e) => {
                        const formattedValue = formatPhone(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="font-semibold" htmlFor="status">
                      Status da clínica
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value === true ? 'active' : 'inactive'}
                      onValueChange={field.onChange}
                      defaultValue={field.value ? 'active' : 'inactive'}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className="w-full"
                      >
                        <SelectValue placeholder="Selecione o status da clínica" />
                      </SelectTrigger>
                      <SelectContent
                        className="bg-white"
                        position="item-aligned"
                      >
                        <SelectItem value="active">
                          ATIVO (Clínica aberta)
                        </SelectItem>
                        <SelectItem value="inactive">
                          INATIVO (Clínica fechada)
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="timeZone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="font-semibold" htmlFor="timeZone">
                      Fuso horário
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value ? 'active' : 'inactive'}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className="w-full"
                      >
                        <SelectValue placeholder="Selecione o seu timeZone" />
                      </SelectTrigger>
                      <SelectContent
                        className="bg-white"
                        position="item-aligned"
                      >
                        {timeZones.map((zone) => (
                          <SelectItem key={zone} value={zone}>
                            {zone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Controller
              name="times"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <TimesDialog
                    selectedHours={field.value || []}
                    onChange={field.onChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Field>
            <Button
              type="submit"
              form="form-rhf-demo"
              className="bg-red-400 hover:bg-red-500"
            >
              Salvar alterações
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </PageContainer>
  );
};

export default ProfileContent;
