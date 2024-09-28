import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  VStack,
  HStack,
  IconButton,
  useToast,
  RadioGroup,
  Radio,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { IconPhotoPlus, IconCheck } from "@tabler/icons-react";
import * as Yup from "yup";
import LayoutAdmin from "@/components/admin/layoutAdmin/LayoutAdmin";

// Updated Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Nama is required"),
  email: Yup.string()
    .email("Alamat email tidak valid")
    .required("Email is required"),
  phone: Yup.string().matches(/^[0-9]+$/, "Hanya angka yang diperbolehkan"),
  dob: Yup.date().required("Tanggal Lahir is required"),
  gender: Yup.string().required("Jenis Kelamin is required"),
  fakultas: Yup.string().required("Fakultas is required"),
  prodi: Yup.string().required("Program Studi is required"),
});

const EditProfile = () => {
  const [profilePic, setProfilePic] = useState("");
  const toast = useToast();

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    toast({
      title: "Profil diperbarui.",
      description: "Informasi profil Anda telah diperbarui.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <LayoutAdmin>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          dob: "",
          gender: "",
          fakultas: "",
          prodi: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
              {/* Column 1: Profile Picture */}
              <GridItem>
                <FormControl>
                  <VStack spacing={4}>
                    <Avatar size="2xl" src={profilePic} />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      display="none"
                      id="profile-pic"
                    />
                    <IconButton
                      as="label"
                      htmlFor="profile-pic"
                      icon={<IconPhotoPlus />}
                      colorScheme="blue"
                      aria-label="Upload profile picture"
                    />
                  </VStack>
                </FormControl>
              </GridItem>

              {/* Column 2: Form Fields */}
              <GridItem>
                <VStack spacing={4} align="stretch">
                  {/* Name */}
                  <FormControl isInvalid={errors.name && touched.name}>
                    <FormLabel>Nama</FormLabel>
                    <Field name="name" as={Input} placeholder="Masukkan Nama" />
                    {errors.name && touched.name && (
                      <p style={{ color: "red" }}>{errors.name}</p>
                    )}
                  </FormControl>

                  {/* Email */}
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Field
                      name="email"
                      as={Input}
                      type="email"
                      placeholder="Masukkan Email"
                    />
                    {errors.email && touched.email && (
                      <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                  </FormControl>

                  {/* Phone Number */}
                  <FormControl>
                    <FormLabel>No Telepon</FormLabel>
                    <Field
                      name="phone"
                      as={Input}
                      placeholder="Masukkan No Telepon"
                    />
                    {errors.phone && touched.phone && (
                      <p style={{ color: "red" }}>{errors.phone}</p>
                    )}
                  </FormControl>

                  {/* Date of Birth */}
                  <FormControl isInvalid={errors.dob && touched.dob}>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <Field name="dob" as={Input} type="date" />
                    {errors.dob && touched.dob && (
                      <p style={{ color: "red" }}>{errors.dob}</p>
                    )}
                  </FormControl>

                  {/* Gender */}
                  <FormControl as="fieldset" isInvalid={errors.gender && touched.gender}>
                    <FormLabel as="legend">Jenis Kelamin</FormLabel>
                    <Field name="gender">
                      {({ field }) => (
                        <RadioGroup {...field}>
                          <VStack spacing="8px" align={"left"}>
                            <Radio value="male">Laki-Laki</Radio>
                            <Radio value="female">Perempuan</Radio>
                          </VStack>
                        </RadioGroup>
                      )}
                    </Field>
                    {errors.gender && touched.gender && (
                      <p style={{ color: "red" }}>{errors.gender}</p>
                    )}
                  </FormControl>

                  {/* Fakultas */}
                  <FormControl isInvalid={errors.fakultas && touched.fakultas}>
                    <FormLabel>Fakultas</FormLabel>
                    <Field name="fakultas" as={Select} placeholder="Pilih Fakultas">
                      <option value="fs">Fakultas Sains</option>
                      <option value="ftik">
                        Fakultas Teknologi Infrastruktur & Kewilayahan
                      </option>
                      <option value="fti">Fakultas Teknologi Industri</option>
                    </Field>
                    {errors.fakultas && touched.fakultas && (
                      <p style={{ color: "red" }}>{errors.fakultas}</p>
                    )}
                  </FormControl>
                  
                  {/* Program Studi */}
                  <FormControl isInvalid={errors.prodi && touched.prodi}>
                    <FormLabel>Program Studi</FormLabel>
                    <Field name="prodi" as={Select} placeholder="Pilih Program Studi">
                      <option value="arsitektur">Arsitektur</option>
                      <option value="elektro">Teknik Elektro</option>
                      <option value="sd">Sains Data</option>
                    </Field>
                    {errors.prodi && touched.prodi && (
                      <p style={{ color: "red" }}>{errors.prodi}</p>
                    )}
                  </FormControl>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="md"
                    width="full"
                    isLoading={isSubmitting}
                  >
                    Simpan Profil
                  </Button>
                </VStack>
              </GridItem>
            </Grid>
          </Form>
        )}
      </Formik>
    </LayoutAdmin>
  );
};

export default EditProfile;
