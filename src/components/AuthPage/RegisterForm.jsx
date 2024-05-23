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

const postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
const RegisterFormSchema = Yup.object().shape({
  firstname: Yup.string().required('Entrez votre prénom'),
  name: Yup.string().required('Entrez votre nom de famille'),
  postalcode: Yup.string().matches(postalCodePattern, 'Entrez un code postal valide').required('Entrez votre code postal'),
  username: Yup.string().required('Choisissez un nom d\'utilisateur'),
  email: Yup.string().email('Format d\'email invalide').required('Entrez votre courriel'),
  password: Yup.string().required('Créez un mot de passe'),
  password2: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas').required('Confirmez votre mot de passe'),
  tos: Yup.boolean().oneOf([true], 'Vous devez accepter les conditions d\'utilisation'),
});

const RegisterForm = ({ onSignIn }) => {
  const router = useRouter();
  const { error, register: registerUser } = useAuthentication();

  async function signUp({ email, password, username, name, firstname, tos, postalcode }) {
    await registerUser({ email, password, username, name, firstname, tos, postalcode }, () => router.push('/listings'));
  }

  return (
    <div className="mx-auto sm:w-[450px] w-full">
      <CardHeader className="text-center">
        <h1>Créer un compte</h1>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Formik
          initialValues={{
            firstname: '',
            name: '',
            postalcode: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            tos: false,
          }}
          validationSchema={RegisterFormSchema}
          onSubmit={signUp}
        >
          {({ errors, touched }) => (
            <Form className="grid gap-4">
              <FormController>
                <Label htmlFor="firstname">Prénom</Label>
                <Field
                  as={Input}
                  className={errors.firstname && 'bg-red-50'}
                  id="firstname"
                  name="firstname"
                  type="text"
                />
                {errors.firstname && touched.firstname ? (
                  <Label className="text-red-600 text-sm" htmlFor="firstname">{errors.firstname}</Label>
                ) : null}
              </FormController>

              <FormController>
                <Label htmlFor="name">Nom</Label>
                <Field
                  as={Input}
                  className={errors.name && 'bg-red-50'}
                  id="name"
                  name="name"
                  type="text"
                />
                {errors.name && touched.name ? (
                  <Label className="text-red-600 text-sm" htmlFor="name">{errors.name}</Label>
                ) : null}
              </FormController>

              <FormController>
                <Label htmlFor="postalcode">Code postal</Label>
                <Field
                  as={Input}
                  className={errors.postalcode && 'bg-red-50'}
                  id="postalcode"
                  name="postalcode"
                  type="text"
                />
                {errors.postalcode && touched.postalcode ? (
                  <Label className="text-red-600 text-sm" htmlFor="postalcode">{errors.postalcode}</Label>
                ) : null}
              </FormController>

              <FormController>
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Field
                  as={Input}
                  className={errors.username && 'bg-red-50'}
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Votre nom public"
                />
                {errors.username && touched.username ? (
                  <Label className="text-red-600 text-sm" htmlFor="username">{errors.username}</Label>
                ) : null}
              </FormController>

              <FormController>
                <Label htmlFor="email">Courriel</Label>
                <Field
                  as={Input}
                  className={errors.email && 'bg-red-50'}
                  id="email"
                  name="email"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <Label className="text-red-600 text-sm" htmlFor="email">{errors.email}</Label>
                ) : null}
              </FormController>

              <FormController>
                <Label htmlFor="password">Mot de passe</Label>
                <Field
                  as={Input}
                  className={errors.password && 'bg-red-50'}
                  id="password"
                  name="password"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <Label className="text-red-600 text-sm" htmlFor="password">{errors.password}</Label>
                ) : null}
              </FormController>

              <FormController>
                <Label htmlFor="password2">Confirmation du mot de passe</Label>
                <Field
                  as={Input}
                  className={errors.password2 && 'bg-red-50'}
                  id="password2"
                  name="password2"
                  type="password"
                />
                {errors.password2 && touched.password2 ? (
                  <Label className="text-red-600 text-sm" htmlFor="password2">{errors.password2}</Label>
                ) : null}
              </FormController>

              <FormController>
                <div className="flex items-center space-x-2">
                  <Field
                    className={errors.tos && 'bg-red-50'}
                    id="tos"
                    name="tos"
                    type="checkbox"
                  />
                  <Label htmlFor="tos">J'ai lu et accepté les termes et conditions</Label>
                  <a href="https://owo.quebec/legal/tos" target="_blank">🔗 Voir les détails </a>
                </div>
                {errors.tos && touched.tos ? (
                  <Label className="text-red-600 text-sm" htmlFor="tos">{errors.tos}</Label>
                ) : null}
              </FormController>

              {error && <div className="text-red-600">{error}</div>}
              <Button type="submit">Créer un compte</Button>
            </Form>
          )}
        </Formik>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground grid">
        Vous avez déjà un compte?
        <Button variant="link" onClick={onSignIn} className="w-full">
           Connectez-vous.
        </Button>
      </CardFooter>
    </div>
  );
};

export default RegisterForm;
