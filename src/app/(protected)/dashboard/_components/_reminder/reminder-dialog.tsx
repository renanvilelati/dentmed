'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TReminderSchema, useReminderForm } from './reminder-form';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { createReminder } from '../../actions/create-reminder';
import { toast } from 'sonner';

type TReminderFormProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
const ReminderDialog = ({ isOpen, setIsOpen }: TReminderFormProps) => {
  const form = useReminderForm();

  const onSubmit = async (values: TReminderSchema) => {
    const response = await createReminder({ description: values.description });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    setIsOpen(false);
    toast.success(response.message);
  };

  useEffect(() => {
    form.reset();
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-700">
              Cadastro de lembrete
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="font-semibold" htmlFor="description">
                    Descrição
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button
            className="bg-red-400 hover:bg-red-500"
            disabled={form.formState.isSubmitting || !form.watch('description')}
          >
            Salvar
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ReminderDialog;
