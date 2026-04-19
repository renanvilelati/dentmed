import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema, TsignupSchema } from '../schemas/signup.schema';

export const useSignUpForm = () => {
  return useForm<TsignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
};
