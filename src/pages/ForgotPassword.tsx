import React from "react";
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
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo1.png";

const ForgotPassword: React.FC = () => {
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
        {/* Logo */}
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

        {/* Formik form */}
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values); // Handle form submission
          }}
        >
          {({ errors, touched }) => (
            <Form style={{ width: "100%" }}>
              {/* Email */}
              <FormControl isInvalid={errors.email && touched.email} mb={4}>
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
              >
                Kirim Instruksi
              </Button>
            </Form>
          )}
        </Formik>

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
