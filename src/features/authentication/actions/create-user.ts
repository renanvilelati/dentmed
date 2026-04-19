'use server';

import { signupSchema, TsignupSchema } from '../schemas/signup.schema';
import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcrypt';

export const createUser = async (formData: TsignupSchema) => {
  try {
    const parsed = signupSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0].message,
      };
    }

    const { password } = parsed.data;

    const encryptedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        ...parsed.data,
        password: encryptedPassword,
      },
    });

    return {
      success: true,
      message: 'Usuário criado com sucesso',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Erro ao criar usuário',
    };
  }
};
