'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Dispatch } from 'react';
import { Controller } from 'react-hook-form';
import { TServiceSchema, useServiceForm } from './service.form';
import { Label } from '@/components/ui/label';
import { convertRealToCents } from '@/utils/convertCurrency';
import { createService } from '../_actions/create-service';
import { toast } from 'sonner';

type ServiceDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

const ServiceDialog = ({ isOpen, setIsOpen }: ServiceDialogProps) => {
  const form = useServiceForm();

  const onSubmit = async (values: TServiceSchema) => {
    const price = convertRealToCents(values.price);
    const hours = Number(values.hours) || 0;
    const minutes = Number(values.minutes) || 0;

    const response = await createService({
      name: values.name,
      price: price,
      duration: hours * 60 + minutes,
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    form.reset();
    setIsOpen(false);
  };

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, '');

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace('.', ',');
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    event.target.value = value;
    form.setValue('price', value);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* <DialogTrigger asChild>
          <Button size={'lg'}>
            <Plus /> Adicionar
          </Button>
        </DialogTrigger> */}
        <DialogContent
          style={{
            padding: '2rem',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '700px',
            width: '100%',
          }}
          className="sm:max-w-sm"
        >
          <DialogHeader>
            <DialogTitle>Cadastro de Serviço</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para cadastrar um novo serviço
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
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
                    placeholder="Digite o nome do serviço"
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
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="font-semibold" htmlFor="price">
                    Preço
                  </FieldLabel>
                  <Input
                    {...field}
                    id="price"
                    onChange={changeCurrency}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div>
            <Label style={{ paddingBottom: '0.5rem' }}>
              Duração do serviço
            </Label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <FieldGroup>
                <Controller
                  name="hours"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="font-semibold" htmlFor="hours">
                        Horas
                      </FieldLabel>
                      <Input
                        {...field}
                        id="hours"
                        aria-invalid={fieldState.invalid}
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
                  name="minutes"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="font-semibold" htmlFor="minutes">
                        Minutos
                      </FieldLabel>
                      <Input
                        {...field}
                        id="minutes"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
          </div>

          <DialogFooter className="flex">
            <DialogClose asChild>
              <Button className="flex-1" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              className="flex-1"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Adicionando' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ServiceDialog;
