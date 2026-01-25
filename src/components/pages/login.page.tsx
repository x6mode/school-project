import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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

import { KeySquare, Mail } from 'lucide-react';

import { AppRoutes } from '@/constant';

const LoginPage = (): ReactNode => {
  return (
    <div className='page h-full grid place-items-center max-lg:px-4'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader>
            <CardTitle>Войдите в свой аккаунт</CardTitle>
            <CardDescription>Введите свою почту ниже для входа в аккаунт</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel>Почта</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      type='email'
                      placeholder='m@example.com'
                      required
                    />
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Пароль</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      type='password'
                      placeholder='Введите пароль...'
                      required
                    />
                    <InputGroupAddon>
                      <KeySquare />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field>
                  <Button type='submit'>Войти</Button>
                  <FieldDescription className='text-center'>
                    Нет аккаунта? <Link to={AppRoutes.Register}>Создайте</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
