import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  RadioGroup,
  Radio,
  Select,
  VStack,
  Stack,
  Flex,
  Image,
  Text
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import ImageLogin from "../assets/ImageLogin.png";
import Logo from "../assets/Logo1.png";

const RegisterPage: React.FC = () => {
  const validationSchema = Yup.object({
    namaLengkap: Yup.string().required("Nama Lengkap diperlukan"),
    email: Yup.string()
      .email("Format email salah")
      .required("Email diperlukan"),
    password: Yup.string()
      .min(6, "Password minimal 6 karakter")
      .required("Password diperlukan"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password tidak cocok")
      .required("Konfirmasi Password diperlukan"),
    noHP: Yup.string().required("No HP diperlukan"),
    tanggalLahir: Yup.date().required("Tanggal Lahir diperlukan"),
    jenisKelamin: Yup.string().required("Jenis Kelamin diperlukan"),
    daftarSebagai: Yup.string().required("Pilih Daftar Sebagai"),
    fakultas: Yup.string().required("Fakultas diperlukan"),
    prodi: Yup.string().required("Program Studi diperlukan"),
  });
  return (
    <Flex
      
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box w="full" h="full" shadow="lg" display={{ md: "flex" }}>
        {/* Left Section - Image */}
        <Box flex={1} display={{ base: "none", md: "block" }}>
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
        <Box
          flex={1}
          p={{ base: 6, md: 10 }}
        >
          {/* Logo */}
          <Box mb={6} mt={10}>
            <Image src={Logo} alt="Logo" width={70} />
          </Box>

          <Text fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
            Daftar Sistem
          </Text>
          <Text color="gray.500" mb={6}>
            Untuk menggunakan sistem
          </Text>

          {/* Login Form */}
          <VStack spacing={4} as="form">
            <Formik
              initialValues={{
                namaLengkap: "",
                email: "",
                password: "",
                confirmPassword: "",
                noHP: "",
                tanggalLahir: "",
                jenisKelamin: "",
                daftarSebagai: "",
                fakultas: "",
                prodi: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched, values, handleChange }) => (
                <Form>
                  <VStack spacing={4}>
                    {/* Nama Lengkap */}
                    <FormControl
                      isInvalid={errors.namaLengkap && touched.namaLengkap}
                    >
                      <FormLabel>Nama Lengkap</FormLabel>
                      <Field
                        as={Input}
                        name="namaLengkap"
                        placeholder="Nama Lengkap"
                      />
                      <FormErrorMessage>{errors.namaLengkap}</FormErrorMessage>
                    </FormControl>

                    {/* Email */}
                    <FormControl isInvalid={errors.email && touched.email}>
                      <FormLabel>Email</FormLabel>
                      <Field
                        as={Input}
                        name="email"
                        type="email"
                        placeholder="Email"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    {/* Password */}
                    <FormControl
                      isInvalid={errors.password && touched.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <Field
                        as={Input}
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    {/* Konfirmasi Password */}
                    <FormControl
                      isInvalid={
                        errors.confirmPassword && touched.confirmPassword
                      }
                    >
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <Field
                        as={Input}
                        name="confirmPassword"
                        type="password"
                        placeholder="Konfirmasi Password"
                      />
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>

                    {/* No HP */}
                    <FormControl isInvalid={errors.noHP && touched.noHP}>
                      <FormLabel>No HP</FormLabel>
                      <Field as={Input} name="noHP" placeholder="No HP" />
                      <FormErrorMessage>{errors.noHP}</FormErrorMessage>
                    </FormControl>

                    {/* Tanggal Lahir */}
                    <FormControl
                      isInvalid={errors.tanggalLahir && touched.tanggalLahir}
                    >
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <Field as={Input} name="tanggalLahir" type="date" />
                      <FormErrorMessage>{errors.tanggalLahir}</FormErrorMessage>
                    </FormControl>

                    {/* Jenis Kelamin (Radio) */}
                    <FormControl
                      isInvalid={errors.jenisKelamin && touched.jenisKelamin}
                    >
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <RadioGroup
                        name="jenisKelamin"
                        onChange={handleChange}
                        value={values.jenisKelamin}
                      >
                        <Stack direction="row">
                          <Field
                            as={Radio}
                            name="jenisKelamin"
                            value="Laki-Laki"
                          >
                            Laki-Laki
                          </Field>
                          <Field
                            as={Radio}
                            name="jenisKelamin"
                            value="Perempuan"
                          >
                            Perempuan
                          </Field>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>{errors.jenisKelamin}</FormErrorMessage>
                    </FormControl>

                    {/* Daftar Sebagai (Radio) */}
                    <FormControl
                      isInvalid={errors.daftarSebagai && touched.daftarSebagai}
                    >
                      <FormLabel>Daftar Sebagai</FormLabel>
                      <RadioGroup
                        name="daftarSebagai"
                        onChange={handleChange}
                        value={values.daftarSebagai}
                      >
                        <Stack direction="row">
                          <Field
                            as={Radio}
                            name="daftarSebagai"
                            value="Mahasiswa"
                          >
                            Innovator
                          </Field>
                          <Field as={Radio} name="daftarSebagai" value="Dosen">
                            User Biasa
                          </Field>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>
                        {errors.daftarSebagai}
                      </FormErrorMessage>
                    </FormControl>

                    {/* Fakultas (Dropdown) */}
                    <FormControl
                      isInvalid={errors.fakultas && touched.fakultas}
                    >
                      <FormLabel>Fakultas</FormLabel>
                      <Field
                        as={Select}
                        name="fakultas"
                        placeholder="Pilih Fakultas"
                      >
                        <option value="Fakultas Teknik">Fakultas Teknik</option>
                        <option value="Fakultas Sains">Fakultas Sains</option>
                        <option value="Fakultas Ilmu Sosial">
                          Fakultas Ilmu Sosial
                        </option>
                      </Field>
                      <FormErrorMessage>{errors.fakultas}</FormErrorMessage>
                    </FormControl>

                    {/* Prodi (Dropdown) */}
                    <FormControl isInvalid={errors.prodi && touched.prodi}>
                      <FormLabel>Program Studi</FormLabel>
                      <Field
                        as={Select}
                        name="prodi"
                        placeholder="Pilih Program Studi"
                      >
                        <option value="Teknik Informatika">
                          Teknik Informatika
                        </option>
                        <option value="Fisika">Fisika</option>
                        <option value="Manajemen">Manajemen</option>
                      </Field>
                      <FormErrorMessage>{errors.prodi}</FormErrorMessage>
                    </FormControl>

                    {/* Submit Button */}
                    <Button colorScheme="yellow" width="full" type="submit">
                        Daftar Akun
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
          </VStack>

          <Box textAlign="center" mt={4}>
            <Button variant="outline" colorScheme="yellow" width="full">
              <RouterLink to="/register">Login Sistem</RouterLink>
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
