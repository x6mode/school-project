import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { RegisterData } from '@/app/types/api';

import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/app/store/store';

import { Button } from '@/components/shared/button';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/shared/input-group';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/shared/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/shared/field';

import { Mail, KeySquare, User } from 'lucide-react';

import MarketApiInstance from '@/service/api.service';

import { AppRoutes } from '@/constant';

const registerSchema = z.object({
  login: z
    .string()
    .min(3, 'Никнейм должен содержать минимум 3 символа')
    .max(20, 'Никнейм не может превышать 20 символов'),
  mail: z.string().email('Введите корректный email адрес'),
  password: z
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(50, 'Пароль не может превышать 50 символов'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = (): ReactNode => {
  const navigate = useNavigate();
  const userData = useUserStore();

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: RegisterData) => MarketApiInstance.register(data),
    onSuccess: async () => {
      const profile = await MarketApiInstance.getProfile();
      userData.setData(profile);

      navigate(AppRoutes.Main);
    },
    onError: (error) => console.log(error),
  });

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  return (
    <div className='page h-full grid place-items-center max-lg:px-4'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader>
            <CardTitle>Зарегистрируйте свой аккаунт</CardTitle>
            <CardDescription>
              Введите свою почту ниже для регистрации аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Никнейм</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type='text'
                    id='nickname'
                    placeholder='Никнейм...'
                    required
                    autoComplete='off'
                    {...register('login')}
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
                {errors.login && (
                  <FieldDescription className='text-red-500'>
                    {errors.login.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel>Почта</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type='email'
                    placeholder='m@example.com'
                    required
                    autoComplete='off'
                    {...register('mail')}
                  />
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>
                {errors.mail && (
                  <FieldDescription className='text-red-500'>
                    {errors.mail.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel>Пароль</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type='password'
                    placeholder='Введите пароль...'
                    required
                    autoComplete='off'
                    {...register('password')}
                  />
                  <InputGroupAddon>
                    <KeySquare />
                  </InputGroupAddon>
                </InputGroup>
                {errors.password && (
                  <FieldDescription className='text-red-500'>
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <Button
                  type='submit'
                  disabled={!isValid || isSubmitting || mutation.isPending}
                  onClick={() => mutation.mutate(getValues())}
                >
                  {isSubmitting || mutation.isPending
                    ? 'Регистрация...'
                    : 'Зарегистрироваться'}
                </Button>

                {mutation.isError && (
                  <FieldDescription className='text-red-500 text-center'>
                    {mutation.isError
                      ? mutation.error.message
                      : 'Ошибка регистрации. Попробуйте позже.'}
                  </FieldDescription>
                )}

                <FieldDescription className='text-center'>
                  Уже есть аккаунт? <Link to={AppRoutes.Login}>Войдите</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
