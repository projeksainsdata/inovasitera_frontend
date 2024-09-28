import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Image,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ImageLogin from '../assets/ImageLogin.png';
import Logo from '../assets/Logo1.png';

const LoginPage: React.FC = () => {
  // Define the validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Format email salah').required('Email diperlukan'),
    password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password diperlukan'),
  });

  return (
    <Flex h="100vh" align="center" justify="center" bg="gray.50">
      <Flex w="full" h="full" shadow="lg" direction={{ base: 'column', md: 'row' }}>
        
        {/* Left Section - Image */}
        <Box flex={1} display={{ base: 'none', md: 'block' }}>
          <Image
            src={ImageLogin}
            alt="Scientist working with a microscope"
            objectFit="cover"
            objectPosition="bottom"
            height="100%"
            width="100%"
          />
        </Box>

        {/* Right Section - Form */}
        <Flex flex={1} direction="column" justify="center" p={{ base: 6, md: 10 }} bg="white" roundedTop={{ base: '30px', md: 'none' }}>
          
          {/* Logo */}
          <Box mb={6} mt={10}>
            <Image src={Logo} alt="Logo" width={70} />
          </Box>

          <Text fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
            Masuk Kedalam Sistem
          </Text>
          <Text color="gray.500" mb={6}>
            Untuk menggunakan sistem
          </Text>

          {/* Formik form */}
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values); // Handle form submission
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Email */}
                <FormControl isInvalid={errors.email && touched.email} mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    focusBorderColor="yellow.400"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                {/* Password */}
                <FormControl isInvalid={errors.password && touched.password} mb={4}>
                  <FormLabel>Password</FormLabel>
                  <Field
                    as={Input}
                    name="password"
                    type="password"
                    placeholder="Password"
                    focusBorderColor="yellow.400"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                  <Box textAlign="right" mt={1}>
                    <ChakraLink href="/forgot-password" fontSize="sm" fontWeight="bold" color="yellow.500" _hover={{ textDecoration: 'underline' }}>
                      Lupa Password?
                    </ChakraLink>
                  </Box>
                </FormControl>

                <Button
                  colorScheme="yellow"
                  width="full"
                  type="submit"
                >
                  Masuk
                </Button>
              </Form>
            )}
          </Formik>

          <Box textAlign="center" mt={4}>
              <Link to="/register" className='text-orange-800 font-bold'>Belum Punya Akun? Daftar</Link>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
