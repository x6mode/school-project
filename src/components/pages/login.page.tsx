import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/app/store/store';

import { Button } from '@/components/shared/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/shared/input-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shared/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/shared/field';

import { KeySquare, User } from 'lucide-react';

import { AppRoutes } from '@/constant';

import MarketApiInstance from '@/service/api.service';

import { LoginData } from '@/app/types/api';

const loginSchema = z.object({
  login: z
    .string()
    .min(3, 'Никнейм должен содержать минимум 3 символа')
    .max(20, 'Никнейм не может превышать 20 символов'),
  password: z
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(50, 'Пароль не может превышать 50 символов'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = (): ReactNode => {
  const navigate = useNavigate();
  const userData = useUserStore();

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginData) => MarketApiInstance.login(data),
    onSuccess: async () => {
      const profile = await MarketApiInstance.getProfile();
      userData.setData(profile);

      navigate(AppRoutes.Main);
    },
    onError: (error) => console.log(error),
  });

  const {
    register,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  return (
    <div className='page h-full grid place-items-center max-lg:px-4'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader>
            <CardTitle>Войдите в свой аккаунт</CardTitle>
            <CardDescription>Введите свою почту ниже для входа в аккаунт</CardDescription>
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
                <FieldLabel>Пароль</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type='password'
                    placeholder='Введите пароль...'
                    required
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
                  {isSubmitting || mutation.isPending ? 'Вход...' : 'Войти'}
                </Button>

                {mutation.isError && (
                  <FieldDescription className='text-red-500 text-center'>
                    {mutation.error ? mutation.error.message : 'Ошибка входа'}
                  </FieldDescription>
                )}

                <FieldDescription className='text-center'>
                  Нет аккаунта? <Link to={AppRoutes.Register}>Создайте</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
