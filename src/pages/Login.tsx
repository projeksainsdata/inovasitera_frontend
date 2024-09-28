import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
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
  useToast,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ImageLogin from '../assets/ImageLogin.png';
import Logo from '../assets/Logo1.png';
import { LoginSpecification } from '@/lib/specification/auth.spefication';
import { AxiosError } from 'axios';
import { useAuth } from '@/hooks/useAuth';
import AuthApiService from '@/services/apiServices/auth.api.service';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

const LoginPage: React.FC = () => {
  // Define the validation schema with Yup

  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().email('Format email salah').required('Email diperlukan'),
    password: Yup.string()
      .min(8, "Password minimal 8 karakter")
      .required("Password diperlukan"),
  });

  const toast = useToast();
  const auth = useAuth();
  // for redirecting to dashboard
  const navigate = useNavigate()
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
            onSubmit={async (values: LoginSpecification) => {
              try {
                const responseLogin = await AuthApiService.login(values);
                await auth?.login(responseLogin?.data?.data?.access);
                toast({
                  title: 'Login Berhasil',
                  description: 'Selamat datang di sistem',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });

                // Redirect to dashboard
                navigate('/');
              } catch (error) {
                if (error instanceof AxiosError) {
                  toast({
                    title: 'Login Gagal',
                    description: error.response?.data.message || 'Terjadi kesalahan',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                  });
                  return;
                }
                toast({
                  title: 'Login Gagal',
                  description: 'Email atau password salah',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
              }

            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Email */}
                <FormControl isInvalid={!!(errors.email && touched.email)} mb={4}>
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
                <FormControl isInvalid={!!(errors.password && touched.password)} mb={4}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password..."
                      focusBorderColor="yellow.400"
                      _focus={{
                        borderColor: "yellow.400",
                        boxShadow: "0 0 0 2px #ECC94B",
                      }}

                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <IconEye /> : <IconEyeClosed />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Box textAlign="right" mb={4}>
                  <Link to="/forgot-password" className='text-orange-800 font-bold'>Lupa Password?</Link>
                </Box>

                {/* Submit Button */}

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
    </Flex >
  );
};

export default LoginPage;
