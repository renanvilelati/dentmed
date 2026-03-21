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
import { Controller } from 'react-hook-form';
import { TServiceSchema, useServiceForm } from './service.form';
import { Label } from '@/components/ui/label';
import { convertRealToCents } from '@/utils/convertCurrency';
import { createService } from '../_actions/create-service';
import { toast } from 'sonner';
import { updateService } from '../_actions/update-service';

type ServiceDialogProps = {
  isOpen: boolean;
  handleCloseDialog: () => void;
  serviceId?: string;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
};

const ServiceDialog = ({
  isOpen,
  handleCloseDialog,
  serviceId,
  initialValues,
}: ServiceDialogProps) => {
  const form = useServiceForm({ initialValues: initialValues });

  const onSubmit = async (values: TServiceSchema) => {
    const price = convertRealToCents(values.price);
    const hours = Number(values.hours) || 0;
    const minutes = Number(values.minutes) || 0;

    const serviceData = {
      name: values.name,
      price: price,
      duration: hours * 60 + minutes,
    };

    try {
      const response = serviceId
        ? await updateService({
            ...serviceData,
            serviceId,
          })
        : await createService(serviceData);

      if (response.error) {
        toast.error(response.error);
        return;
      }
      toast.success(response.message);

      form.reset();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro no submit do serviço:', error);
      toast.error('Falha ao salvar serviço');
    }
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
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
              {form.formState.isSubmitting
                ? 'Adicionando'
                : initialValues
                  ? 'Atualizar'
                  : 'Adicionar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ServiceDialog;
