'use client';
import * as Yup from 'yup';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import Btn from '../ui/Btn';
import { Friends } from '@/types/friends';

type InitialValuesProps = {
  bill_value: number | string;
  your_bill: number | string;
  friends_bill: number | string;
  who_is_paying: string;
};

const initialValues: InitialValuesProps = {
  bill_value: '',
  your_bill: '',
  friends_bill: '',
  who_is_paying: '',
};

const validationSchema = Yup.object({
  bill_value: Yup.number()
    .min(200, 'Bill value must be greater than 200')
    .required('Bill value is required'),
  your_bill: Yup.number().required('Your bill is required'),
  friends_bill: Yup.number(),
  who_is_paying: Yup.string().required('Who is paying is required'),
});

type FormFunctions = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
};

type SplitBillFormProps = {
  selectedFriend: Friends;
  onSplitBill: (value: number | string) => void;
};

const SplitBillForm = ({ selectedFriend, onSplitBill }: SplitBillFormProps) => {
  const onSubmit = (
    values: InitialValuesProps,
    { setSubmitting, resetForm }: FormFunctions
  ) => {
    onSplitBill(
      values.who_is_paying === 'you'
        ? (values.bill_value as number) - (values.your_bill as number)
        : Number(-values.your_bill)
    );
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
        {({
          handleSubmit,
          errors,
          touched,
          values,
          handleChange,
          isSubmitting,
        }) => (
          <Form
            className=' flex flex-col  gap-6 md:gap-2 bg-rose-100 rounded-md p-6'
            onSubmit={handleSubmit}
          >
            <Heading className='py-4 text-sm md:text-2xl  uppercase'>
              {' '}
              SPLIT A BILL WITH {selectedFriend.name}
            </Heading>
            <FormControl isInvalid={!!errors.bill_value && touched.bill_value}>
              <div className='flex flex-col md:flex-row items-start'>
                <FormLabel
                  className='whitespace-nowrap flex-1'
                  htmlFor='bill_value'
                >
                  💰{`Bill value`}
                </FormLabel>
                <div className='flex-1'>
                  <Field
                    name='bill_value'
                    id='bill_value'
                    type='number'
                    as={Input}
                    placeholder={`What are your total bill`}
                    variant='filled'
                  />
                  <FormErrorMessage>{errors.bill_value}</FormErrorMessage>
                </div>
              </div>
            </FormControl>
            <FormControl isInvalid={!!errors.your_bill && touched.your_bill}>
              <div className='flex flex-col md:flex-row items-start'>
                <FormLabel
                  className='flex-1 whitespace-nowrap'
                  htmlFor='your_bill'
                >
                  🕴️{`Your expense`}
                </FormLabel>
                <div className='flex-1'>
                  <Field
                    name='your_bill'
                    id='your_bill'
                    type='number'
                    as={Input}
                    placeholder={`How much are you paying?`}
                    variant='filled'
                  />
                  <FormErrorMessage>{errors.your_bill}</FormErrorMessage>
                </div>
              </div>
            </FormControl>
            <FormControl>
              <div className='flex flex-col md:flex-row items-start'>
                <FormLabel
                  className='flex-1 whitespace-nowrap'
                  htmlFor='friends_bill'
                >
                  🧑‍🤝‍🧑{`${selectedFriend.name}'s expense`}
                </FormLabel>
                <div className='flex-1'>
                  <Field
                    value={
                      Number(values.your_bill) > Number(values.bill_value)
                        ? Number(values.bill_value)
                        : Number(values.bill_value) - Number(values.your_bill)
                    }
                    onChange={handleChange}
                    disabled
                    name='friends_bill'
                    id='friends_bill'
                    type='number'
                    as={Input}
                    variant='filled'
                  />
                </div>
              </div>
            </FormControl>
            <FormControl
              isInvalid={!!errors.who_is_paying && touched.who_is_paying}
            >
              <div className='flex flex-col md:flex-row items-start'>
                <FormLabel
                  className='flex-1 whitespace-nowrap'
                  htmlFor='who_is_paying'
                >
                  🤑{`Who is paying the bill?`}
                </FormLabel>
                <div className='flex-1'>
                  <Field
                    className='p-2 w-full bg-gray-100 rounded'
                    name='who_is_paying'
                    id='who_is_paying'
                    as='select'
                    variant='filled'
                  >
                    <option value='' disabled>
                      Select
                    </option>
                    <option value='you'>You</option>
                    <option value='you_friend'>{selectedFriend.name}</option>
                  </Field>
                  <FormErrorMessage>{errors.who_is_paying}</FormErrorMessage>
                </div>
              </div>
            </FormControl>
            <Btn className='ml-auto' type='submit'>
              Split bill
            </Btn>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SplitBillForm;
