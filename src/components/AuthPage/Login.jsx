'use client';

import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import useAuthentication from '@/contexts/authentication/useAuthentication';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { FormController } from '@/components/ui/FormController';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Courriel invalide').required('Requis'),
  password: Yup.string().required('Requis'),
});

const Login = ({ onSignUp }) => {
  const router = useRouter();
  const { error, login } = useAuthentication();

  const onSubmit = async ({ email, password }) => {
    await login({ email, password }, () => router.push('/listings'));
  }

  return (
    <div className="mx-auto sm:w-[450px] w-full">
      <CardHeader className="text-center">
        <h1>Connexion</h1>
        <p className="text-sm text-muted-foreground">Vous n'avez pas de compte? <Button variant="link" onClick={onSignUp}>Créez un compte</Button>.</p>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="grid gap-4">
              <FormController>
                <Label htmlFor="email">Courriel</Label>
                <Field
                  as={Input}
                  className={errors.email && touched.email && 'bg-red-50'}
                  id="email"
                  name="email"
                  placeholder="nom@example.com"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <Label htmlFor="email" className="text-red-600 text-sm">
                    {errors.email}
                  </Label>
                ) : null}
              </FormController>
              <FormController>
                <Label htmlFor="password">Mot de passe</Label>
                <Field
                  as={Input}
                  className={errors.password && touched.password && 'bg-red-50'}
                  id="password"
                  name="password"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <Label htmlFor="password" className="text-red-600 text-sm">{errors.password}</Label>
                ) : null}
              </FormController>
              {error && <div className="text-red-600">{error}</div>}
              <Button type="submit">Connexion</Button>
            </Form>
          )}
        </Formik>
      </CardContent>

      <CardFooter className="text-center text-sm text-muted-foreground grid">
        <Button variant="link" onClick={onSignUp} className="w-full">
          Vous n'avez pas de compte? Créez un compte.
        </Button>
      </CardFooter>
    </div>
  );
};

export default Login;
