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

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string(),
  address: Yup.string(),
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
    // Here, you can add functionality to save the profile changes
    console.log(values);
    toast({
      title: "Profile updated.",
      description: "Your profile information has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <LayoutAdmin>
      <Formik
        initialValues={{ name: "", email: "", phone: "", address: "" }}
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
                    <FormLabel>Name</FormLabel>
                    <Field name="name" as={Input} placeholder="Enter your name" />
                  </FormControl>

                  {/* Email */}
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Field
                      name="email"
                      as={Input}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>

                  {/* Phone Number */}
                  <FormControl>
                    <FormLabel>No Telepon</FormLabel>
                    <Field
                      name="phone"
                      as={Input}
                      placeholder="Enter your phone number"
                    />
                  </FormControl>

                  {/* Address */}
                  <FormControl>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <Field name="dob" as={Input} type="date" />
                  </FormControl>

                  {/* Gender */}
                  <FormControl as="fieldset">
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
                  </FormControl>

                  {/* Country */}
                  <FormControl>
                    <FormLabel>Fakultas</FormLabel>
                    <Field name="fakultas" as={Select} placeholder="Pilih Fakultas">
                      <option value="fs">Fakultas Sains</option>
                      <option value="ftik">Fakultas Teknologi Infrastruktur & Kewilayahan</option>
                      <option value="fti">Fakultas Teknologi Industri</option>
                    </Field>
                  </FormControl>
                  
                  {/* Prodi */}
                  <FormControl>
                    <FormLabel>Program Studi</FormLabel>
                    <Field name="prodi" as={Select} placeholder="Pilih Program Studi">
                      <option value="arsitektur">Arsitektur</option>
                      <option value="elektro">Teknik Elektro</option>
                      <option value="sd">Sains Data</option>
                    </Field>
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
