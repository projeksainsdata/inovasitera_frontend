import React, { useState } from "react";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo1.png";
import AuthApiService from "@/services/apiServices/auth.api.service";
import { ForgotPasswordSpecification } from "@/lib/specification/auth.spefication";
import { useToast } from "@chakra-ui/react";
import { isAxiosError } from "axios";

const ForgotPassword: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Format email salah")
      .required("Email diperlukan"),
  });

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      bgImage="url('/src/assets/fullbatik.png')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Flex
        w="full"
        h="full"
        shadow="lg"
        direction="column"
        align="center"
        justify="center"
        p={{ base: 6, md: 10 }}
        maxW="400px"
        rounded="lg"
        bg="white"
      >
        <Box mb={6}>
          <Image src={Logo} alt="Logo" width={70} />
        </Box>

        <Text fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
          Lupa Password
        </Text>
        <Text color="gray.500" mb={6} textAlign="center">
          Masukkan email Anda, dan kami akan mengirimkan instruksi untuk mereset
          password Anda.
        </Text>

        {isSubmitted ? (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Email Terkirim!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Instruksi untuk mereset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam Anda.
            </AlertDescription>
          </Alert>
        ) : (
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values: ForgotPasswordSpecification, { setSubmitting }) => {
              setSubmitting(true);
              try {
                const response = await AuthApiService.forgotPassword({
                  email: values.email,
                });
                setIsSubmitted(true);
                toast({
                  title: "Email Terkirim",
                  description: "Instruksi reset password telah dikirim ke email Anda.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              } catch (error) {
                if (isAxiosError(error)) {
                  toast({
                    title: "Error",
                    description: error.response?.data.message || "Gagal mengirim email reset password. Silakan coba lagi.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                  return
                }

                toast({
                  title: "Error",
                  description: "Gagal mengirim email reset password. Silakan coba lagi.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form style={{ width: "100%" }}>
                <FormControl isInvalid={!!(errors.email && touched.email)} mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    focusBorderColor="yellow.400"
                    _focus={{
                      borderColor: "yellow.400",
                      boxShadow: "0 0 0 2px #ECC94B",
                    }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <Button
                  colorScheme="yellow"
                  width="full"
                  type="submit"
                  fontWeight="bold"
                  py={2}
                  isLoading={isSubmitting}
                  loadingText="Mengirim..."
                >
                  Kirim Instruksi
                </Button>
              </Form>
            )}
          </Formik>
        )}

        <Box textAlign="center" mt={4}>
          <Text>
            Sudah punya akun?{" "}
            <Link to="/login" style={{ color: "#ECC94B", fontWeight: "bold" }}>
              Masuk
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;