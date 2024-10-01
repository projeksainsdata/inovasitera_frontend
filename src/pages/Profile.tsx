import React, { useState, useEffect } from "react";
import {
  Box,
  Badge,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  RadioGroup,
  Radio,
  Select,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { IconPhotoPlus } from "@tabler/icons-react";
import * as Yup from "yup";
import AuthApiService from "@/services/apiServices/auth.api.service";
import Layout from "@/components/innovator/layoutInnovator/LayoutInnovator";
import { FAKULTAS } from "@/lib/constants/fakultas.constans";
import { PRODI } from '@/lib/constants/prodi.constans'

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Nama is required"),
  email: Yup.string()
    .email("Alamat email tidak valid")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Hanya angka yang diperbolehkan")
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .required("No Telepon is required"),
  dob: Yup.date()
    .max(new Date(), "Tanggal Lahir tidak boleh di masa depan")
    .required("Tanggal Lahir is required"),
  gender: Yup.string().required("Jenis Kelamin is required"),
  fakultas: Yup.string().required("Fakultas is required"),
  prodi: Yup.string().required("Program Studi is required"),
});
const EditProfile = () => {
  console.log(PRODI,PRODI[FAKULTAS.FS])
  const [profileData, setProfileData] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const toast = useToast();

  const getProfile = async () => {
    try {
      const response = await AuthApiService.me();
      console.log(response.data.data);
      setProfileData(response.data.data);
      setProfilePic(response.data.data.profile);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: profileData?.fullname || "",
      email: profileData?.email || "",
      phone: profileData?.phonenumber || "",
      dob: profileData?.dateOfBirth || "",
      gender: profileData?.gender || "1",
      fakultas: profileData?.inovator.fakultas || "",
      prodi: profileData?.inovator.prodi || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("dob", values.dob);
        formData.append("gender", values.gender);
        formData.append("fakultas", values.fakultas);
        formData.append("prodi", values.prodi);
        if (profilePic) {
          const response = await fetch(profilePic);
          const blob = await response.blob();
          formData.append("profilePic", blob, "profilePic.jpg");
        }

        console.log(values);
        // await AuthApiService.updateProfile(formData);
        toast({
          title: "Profil diperbarui.",
          description: "Informasi profil Anda telah diperbarui.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
      } catch (error) {
        console.error("Failed to update profile:", error);
        toast({
          title: "Error",
          description: "Gagal memperbarui profil.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

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

  return (
    <Layout>
      {profileData && (
        <form onSubmit={formik.handleSubmit}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
            {/* Column 1: Profile Picture */}
            <GridItem>
              <FormControl>
                <VStack spacing={4}>
                  <img
                    src={profilePic}
                    className="rounded-lg w-fit h-[350px] object-cover object-top"
                    alt="Profile"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    display="none"
                    id="profile-pic"
                  />
                  <Button
                    as="label"
                    htmlFor="profile-pic"
                    leftIcon={<IconPhotoPlus />}
                    colorScheme="blue"
                    aria-label="Upload profile picture"
                  >
                    Ganti Foto Profil
                  </Button>
                  <Box className="p-5">
                    <p className="font-medium">
                      Anda Mendaftar Sebagai{" "}
                      <Badge fontSize={"lg"} colorScheme="green">
                        {profileData.role.toUpperCase()}
                      </Badge>
                    </p>
                  </Box>
                </VStack>
              </FormControl>
            </GridItem>

            {/* Column 2: Form Fields */}
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Box>
                  {profileData.inovator.status === "pending" && (
                    <Box className="rounded p-3 bg-orange-600 text-white font-medium space-y-2">
                      <Badge colorScheme="orange" fontSize={"sm"}>
                        Pending
                      </Badge>
                      <p className="font-medium">
                        Menunggu Konfirmasi Admin
                      </p>
                    </Box>
                  )}
                  {profileData.inovator.status === "approved" && (
                    <Badge colorScheme="green" fontSize={"lg"}>
                      Status Terverifikasi
                    </Badge>
                  )}
                  {profileData.inovator.status === "rejected" && (
                    <Box className="rounded p-3 bg-red-600 text-white font-medium space-y-2">
                      <Badge colorScheme="red" fontSize={"sm"}>
                        Ditolak
                      </Badge>
                      <p className="font-medium">
                        Status Pendaftaran Anda Ditolak
                      </p>
                    </Box>
                  )}
                </Box>

                {/* Form fields */}
                <FormControl>
                  <FormLabel>Nama</FormLabel>
                  <Input
                    {...formik.getFieldProps('name')}
                    placeholder="Masukkan Nama"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...formik.getFieldProps('email')}
                    type="email"
                    placeholder="Masukkan Email"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>No Telepon</FormLabel>
                  <Input
                    {...formik.getFieldProps('phone')}
                    placeholder="Masukkan No Telepon"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Input
                    {...formik.getFieldProps('dob')}
                    type="date"
                  />
                </FormControl>

                <FormControl as="fieldset">
                  <FormLabel as="legend">Jenis Kelamin</FormLabel>
                  <RadioGroup
                    {...formik.getFieldProps('gender')}
                    onChange={(val) => formik.setFieldValue('gender', val)}
                    value={formik.values.gender}
                  >
                    <VStack spacing="8px" align={"left"}>
                      <Radio value="Laki-Laki">Laki-Laki</Radio>
                      <Radio value="Perempuan">Perempuan</Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Fakultas</FormLabel>
                  <Select
                    {...formik.getFieldProps('fakultas')}
                    placeholder="Pilih Fakultas"
                  >
                    <option value="Fakultas Sains">Fakultas Sains</option>
                    <option value="Fakultas Teknologi Infrastruktur & Kewilayahan">
                      Fakultas Teknologi Infrastruktur & Kewilayahan
                    </option>
                    <option value="Fakultas Teknologi Industri">
                      Fakultas Teknologi Industri
                    </option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Program Studi</FormLabel>
                  <Select
                    {...formik.getFieldProps('prodi')}
                    placeholder="Pilih Program Studi"
                  >
                    {profileData.inovator.fakultas === "Fakultas Teknologi Industri" &&
                      Object.keys(PRODI[FAKULTAS.FTI]).map((prodi) => (
                        <option key={prodi.nama} value={prodi}>{PRODI[FAKULTAS.FTI][prodi]}</option>
                      ))}
                    {profileData.inovator.fakultas === "Fakultas Teknologi Infrastruktur & Kewilayahan" &&
                      Object.keys(PRODI[FAKULTAS.FTIK]).map((prodi) => (
                        <option key={prodi.nama} value={prodi.nama}>{PRODI[FAKULTAS.FTIK][prodi]}</option>
                      ))}
                    {profileData.inovator.fakultas === "Fakultas Sains" &&
                      Object.keys(PRODI[FAKULTAS.FS]).map((prodi) => (
                        <option key={prodi.nama} value={prodi.nama}>{PRODI[FAKULTAS.FS][prodi]}</option>
                      ))}
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="md"
                  width="full"
                  isLoading={formik.isSubmitting}
                  isDisabled={!formik.isValid}
                >
                  Update Profil
                </Button>
              </VStack>
            </GridItem>
          </Grid>
        </form>
      )}
    </Layout>
  );
};

export default EditProfile;