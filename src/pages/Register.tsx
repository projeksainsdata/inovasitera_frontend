import React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Image,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AuthApiService from '@/services/apiServices/auth.api.service';

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Logo from '../assets/Logo1.png';
import MultiStepForm from '@/components/Form/MultiStepForm';

interface Step1Values {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Step2Values {
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
}

type RegisterValues = Step1Values & Step2Values;

const RegisterPage: React.FC = () => {
  const toast = useToast();

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const { data } = await AuthApiService.google({ credential: credentialResponse.credential });
      // Handle successful Google login
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in with Google.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const steps = [
    {
      component: ({ onSubmit, formikProps }: { onSubmit: (values: Step1Values) => void, formikProps?: FormikProps<Step1Values> }) => (
        <Formik<Step1Values>
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Required'),
          })}
          onSubmit={onSubmit}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form id="form-step-0">
              <VStack spacing={4}>
                <FormControl isInvalid={!!(errors.email && touched.email)}>
                  <FormLabel>Email</FormLabel>
                  <Input {...getFieldProps('email')} />
                  {errors.email && touched.email && <Box color="red.500">{errors.email}</Box>}
                </FormControl>
                <FormControl isInvalid={!!(errors.password && touched.password)}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...getFieldProps('password')} />
                  {errors.password && touched.password && <Box color="red.500">{errors.password}</Box>}
                </FormControl>
                <FormControl isInvalid={!!(errors.confirmPassword && touched.confirmPassword)}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input type="password" {...getFieldProps('confirmPassword')} />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Box color="red.500">{errors.confirmPassword}</Box>
                  )}
                </FormControl>
              </VStack>
            </Form>
          )}
        </Formik>
      ),
    },
    {
      component: ({ onSubmit, data }: { onSubmit: (values: RegisterValues) => void, data: Step1Values }) => (
        <Formik<Step2Values>
          initialValues={{
            fullName: '',
            phoneNumber: '',
            dateOfBirth: '',
            gender: '',
          }}
          validationSchema={Yup.object({
            fullName: Yup.string().required('Required'),
            phoneNumber: Yup.string().required('Required'),
            dateOfBirth: Yup.date().required('Required'),
            gender: Yup.string().required('Required'),
          })}
          onSubmit={(values) => onSubmit({ ...data, ...values })}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form id="form-step-1">
              <VStack spacing={4}>
                <FormControl isInvalid={!!(errors.fullName && touched.fullName)}>
                  <FormLabel>Full Name</FormLabel>
                  <Input {...getFieldProps('fullName')} />
                  {errors.fullName && touched.fullName && <Box color="red.500">{errors.fullName}</Box>}
                </FormControl>
                <FormControl isInvalid={!!(errors.phoneNumber && touched.phoneNumber)}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input {...getFieldProps('phoneNumber')} />
                  {errors.phoneNumber && touched.phoneNumber && <Box color="red.500">{errors.phoneNumber}</Box>}
                </FormControl>
                <FormControl isInvalid={!!(errors.dateOfBirth && touched.dateOfBirth)}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type="date" {...getFieldProps('dateOfBirth')} />
                  {errors.dateOfBirth && touched.dateOfBirth && <Box color="red.500">{errors.dateOfBirth}</Box>}
                </FormControl>
                <FormControl isInvalid={!!(errors.gender && touched.gender)}>
                  <FormLabel>Gender</FormLabel>
                  <Input {...getFieldProps('gender')} />
                  {errors.gender && touched.gender && <Box color="red.500">{errors.gender}</Box>}
                </FormControl>
              </VStack>
            </Form>
          )}
        </Formik>
      ),
    },
  ];

  const handleSubmit = async (values: RegisterValues) => {
    try {
      await AuthApiService.register(values);
      toast({
        title: 'Registration Successful',
        description: 'Please check your email to verify your account.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Box maxWidth="500px" margin="auto" padding={8}>
        <Image src={Logo} alt="Logo" width={70} marginBottom={6} />
        <Text fontSize="2xl" fontWeight="bold" marginBottom={4}>
          Register for PII ITERA System
        </Text>
        <MultiStepForm steps={steps} onSubmit={handleSubmit} />
        <Box marginTop={4}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        </Box>
        <Text marginTop={4}>
          Already have an account? <Link to="/login">Login here</Link>
        </Text>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default RegisterPage;