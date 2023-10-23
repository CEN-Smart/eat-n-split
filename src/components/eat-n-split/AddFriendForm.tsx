'use client';
import * as Yup from 'yup';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { Friends } from '@/types/friends';
import Btn from '../ui/Btn';

const initialValues: Friends = {
  id: '',
  name: '',
  image: 'https://i.pravatar.cc/48',
  balance: 0,
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  image: Yup.string()
    .url('Invalid image URL')
    .required('Image URL is required'),
  balance: Yup.number().required('Balance is required'),
});

type FormFunctions = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
};

type OnAddFriend = (friend: Friends) => void;

const AddFriendForm = ({ onAddFriend }: { onAddFriend: OnAddFriend }) => {
  const onSubmit = (
    values: Friends,
    { setSubmitting, resetForm }: FormFunctions
  ) => {
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name: values.name,
      image: `${values.image}?id=${id}`,
      balance: values.balance,
    };
    onAddFriend(newFriend);
    setSubmitting(false);
    resetForm();
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, errors, touched, isSubmitting }) => (
          <Form
            className=' flex flex-col gap-4 bg-rose-100 rounded-md p-4'
            onSubmit={handleSubmit}
          >
            <FormControl isInvalid={!!errors.name && touched.name}>
              <div className='flex items-start'>
                <FormLabel className='whitespace-nowrap' htmlFor='name'>
                  🧑‍🤝‍🧑{`Friend's name`}
                </FormLabel>
                <div className='flex-1'>
                  <Field
                    name='name'
                    id='name'
                    type='text'
                    as={Input}
                    placeholder={`What is your friend's name`}
                    variant='filled'
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </div>
              </div>
            </FormControl>
            <FormControl isInvalid={!!errors.image && touched.image}>
              <div className='flex items-start'>
                <FormLabel className='' htmlFor='image'>
                  🖼️{`Image URL`}
                </FormLabel>
                <div className='flex-1'>
                  <Field
                    name='image'
                    id='image'
                    type='url'
                    as={Input}
                    placeholder={`https://i.pravatar.cc/48`}
                    variant='filled'
                  />
                  <FormErrorMessage>{errors.image}</FormErrorMessage>
                </div>
              </div>
            </FormControl>
            <Btn className='ml-auto' type='submit'>
              Add
            </Btn>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddFriendForm;
function onAddFriend(newFriend: {
  id: string;
  name: string;
  image: string;
  balance: number | undefined;
}) {
  throw new Error('Function not implemented.');
}
