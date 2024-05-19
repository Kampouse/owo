'use client';

import { useState } from 'react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';  // Assuming you have a Textarea component
import { FormController } from '@/components/ui/FormController';

interface FormValues {
  title: string;
  description: string;
  imageDescription: string;
  tags: string;
  price: number;
  picture: string;
}

interface NewListingFormProps {
  onSubmit: (values: FormValues) => Promise<FormValues>;
  initialValues: FormValues;
  cancel: () => void;
}

const NewListingFormSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  imageDescription: Yup.string().required('Required'),
  tags: Yup.string().required('Required'),
  isFree: Yup.boolean(),
  price: Yup.number().required('Required').moreThan(-1, 'Price must be greater than -1'),
});

const NewListingForm: React.FC<NewListingFormProps> = ({ onSubmit, initialValues, cancel }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (values: FormValues) => {
   setIsLoading(true)
    await onSubmit(values);
    setIsLoading(false)
  }
  // TODO: when price is free show "Gratuit!" en vert par dessus le input

  return (
    <div className="mx-auto sm:w-[450px] w-full">
        <h1 className="text-center my-4">Publier une annonce</h1>
        <img
          alt="Uploaded Image"
          className="rounded-md object-cover mb-4"
          src={initialValues.picture}
        />

        <Formik
          initialValues={initialValues}
          validationSchema={NewListingFormSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="grid gap-4">

              <FormController>
                <Label htmlFor="title">Titre</Label>
                <Field
                  as={Input}
                  className={errors.title && touched.title ? 'bg-red-50' : ''}
                  id="title"
                  name="title"
                  placeholder="Titre"
                  type="text"
                />
                {errors.title && touched.title ? (
                  <Label htmlFor="title" className="text-red-600 text-sm">
                    {errors.title}
                  </Label>
                ) : null}
              </FormController>
              <FormController>
                <Label htmlFor="description">Description</Label>
                <Field
                  as={Textarea}
                  className={errors.description && touched.description ? 'bg-red-50' : ''}
                  id="description"
                  name="description"
                  placeholder="Description"
                />
                {errors.description && touched.description ? (
                  <Label htmlFor="description" className="text-red-600 text-sm">
                    {errors.description}
                  </Label>
                ) : null}
              </FormController>
              <FormController>
                <Label htmlFor="tags">Tags</Label>
                <Field
                  as={Input}
                  className={errors.tags && touched.tags ? 'bg-red-50' : ''}
                  id="tags"
                  name="tags"
                  placeholder="Tags"
                  type="text"
                />
                {errors.tags && touched.tags ? (
                  <Label htmlFor="tags" className="text-red-600 text-sm">
                    {errors.tags}
                  </Label>
                ) : null}
              </FormController>
              <FormController className="">
                <Label htmlFor="price">Prix</Label>
                  <div className="flex items-center">
                    <Field
                      as={Input}
                      className={errors.price && touched.price ? 'bg-red-50' : ''}
                      id="price"
                      name="price"
                      placeholder="Prix"
                      type="number"
                    />
                    <span className="ml-2">$</span>
                  </div>

                {errors.price ? (
                  <Label htmlFor="price" className="text-red-600 text-sm">
                    {errors.price}
                  </Label>
                ) : null}
              </FormController>

              <div className="flex space-x-4 justify-between">
              {!isLoading && <>
                <Button variant="outline" onClick={cancel}>Anuller</Button>
                <Button type="submit" disabled={isLoading}>Publier</Button>
              </>}

              {isLoading && <>TODO: Loading ⏳ </>}
              </div>
            </Form>
          )}
        </Formik>
    </div>
  );
};

export default NewListingForm;
