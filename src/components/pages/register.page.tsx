import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/shared/button';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/shared/input-group';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/shared/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/shared/field';

import { Mail, KeySquare, User } from 'lucide-react';

import { AppRoutes } from '@/constant';

const RegisterPage = (): ReactNode => {
  return (
    <div className='page h-full grid place-items-center max-lg:px-4'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader>
            <CardTitle>Зарегистрируйте свой аккаунт</CardTitle>
            <CardDescription>Введите свою почту ниже для регистрации аккаунта</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel>Никнейм</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      type='text'
                      id='nickname'
                      placeholder='Никнейм...'
                      required
                    />
                    <InputGroupAddon>
                      <User />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
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
                  <Button type='submit'>Зарегистрироваться</Button>
                  <FieldDescription className='text-center'>
                    Уже есть аккаунт? <Link to={AppRoutes.Login}>Войдите</Link>
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

export default RegisterPage;
