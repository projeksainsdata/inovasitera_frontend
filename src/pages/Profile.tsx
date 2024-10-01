import React, { useState, useEffect } from "react";
import {
  Box,
  Badge,
  Button,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  VStack,
  IconButton,
  useToast,
  RadioGroup,
  Radio,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { IconPhotoPlus } from "@tabler/icons-react";
import * as Yup from "yup";
import AuthApiService from "@/services/apiServices/auth.api.service";
import Layout from "@/components/innovator/layoutInnovator/LayoutInnovator";

const ProgramStudi = {
  ftik: [
    { nama: "Teknik Geomatika" },
    { nama: "Perencanaan Wilayah dan Kota" },
    { nama: "Teknik Sipil" },
    { nama: "Arsitektur" },
    { nama: "Teknik Lingkungan" },
    { nama: "Teknik Kelautan" },
    { nama: "Desain Komunikasi Visual" },
    { nama: "Arsitektur Lanskap" },
    { nama: "Teknik Perkeretaapian" },
    { nama: "Rekayasa Tata Kelola Air Terpadu" },
  ],
  fs: [
    { nama: "Fisika" },
    { nama: "Matematika" },
    { nama: "Biologi" },
    { nama: "Kimia" },
    { nama: "Farmasi" },
    { nama: "Sains Atmosfer dan Keplanetan" },
    { nama: "Sains Aktuaria" },
    { nama: "Sains Lingkungan Kelautan" },
    { nama: "Sains Data" },
    { nama: "Magister Fisika" },
  ],
  fti: [
    { nama: "Teknik Elektro" },
    { nama: "Teknik Geofisika" },
    { nama: "Teknik Informatika" },
    { nama: "Teknik Geologi" },
    { nama: "Teknik Mesin" },
    { nama: "Teknik Industri" },
    { nama: "Teknik Kimia" },
    { nama: "Teknik Fisika" },
    { nama: "Teknik Biosistem" },
    { nama: "Teknologi Industri Pertanian" },
    { nama: "Teknologi Pangan" },
    { nama: "Teknik Sistem Energi" },
    { nama: "Teknik Pertambangan" },
    { nama: "Teknik Material" },
    { nama: "Teknik Telekomunikasi" },
    { nama: "Rekayasa Kehutanan" },
    { nama: "Teknik Biomedik" },
    { nama: "Rekayasa Kosmetik" },
    { nama: "Rekayasa Minyak dan Gas" },
    { nama: "Rekayasa Instrumentasi dan Automasi" },
  ],
};
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
  profilePic: Yup.mixed()
    .nullable()
    .required("Profile picture is required")
    .test(
      "FILE_SIZE",
      "Ukuran gambar terlalu besar",
      (value) => !value || (value && (value as File).size <= 2000000) // 2MB
    )
    .test(
      "FILE_FORMAT",
      "Format gambar tidak didukung",
      (value) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/*"].includes((value as File).type))
    ),
});

const EditProfile = () => {
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

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("TRIGGER");
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
        position:"top-right"
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
  };
  return (
    <Layout>
      {profileData && (
        <>
        <Formik
          initialValues={{
            name: profileData?.fullname || "",
            email: profileData?.email || "",
            phone: profileData?.phonenumber || "",
            dob: profileData?.dateOfBirth || "",
            gender: profileData?.gender || "1",
            fakultas: profileData?.inovator.fakultas || "",
            prodi: profileData?.inovator.prodi || "",
          }}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isValid, isSubmitting, validateForm, setValues }) => (
            <Form>
              <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
                {/* Column 1: Profile Picture */}
                <GridItem>
                  <FormControl>
                    <VStack spacing={4}>
                      {/* <Avatar size="3xl" src={profilePic} /> */}
                      <img
                        src={profilePic}
                        className="rounded-lg w-fit h-[350px] object-cover object-top"
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
                        {profileData.inovator.status == "pending" && (
                          <Box className="rounded p-3 bg-orange-600 text-white font-medium space-y-2">
                            <Badge colorScheme="orange" fontSize={"sm"}>
                              Pending
                            </Badge>
                            <p className="font-medium">
                              Menunggu Konfirmasi Admin
                            </p>
                            <p>Form is {isValid ? "valid" : "invalid"}</p>
                          </Box>
                        )}
                        {profileData.inovator.status == "approved" && (
                          <Badge colorScheme="green" fontSize={"lg"}>
                            Status Terverifikasi
                          </Badge>
                        )}
                        {profileData.inovator.status == "rejected" && (
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
                    {/* Name */}
                    <FormControl>
                      <FormLabel>Nama</FormLabel>
                      <Field
                        name="name"
                        as={Input}
                        placeholder="Masukkan Nama"
                      />
                    </FormControl>

                    {/* Email */}
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Field
                        name="email"
                        as={Input}
                        type="email"
                        placeholder="Masukkan Email"
                      />
                    </FormControl>

                    {/* Phone Number */}
                    <FormControl>
                      <FormLabel>No Telepon</FormLabel>
                      <Field
                        name="phone"
                        as={Input}
                        placeholder="Masukkan No Telepon"
                      />
                    </FormControl>

                    {/* Date of Birth */}
                    <FormControl>
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <Field name="dob" as={Input} type="date" />
                    </FormControl>

                    {/* Gender */}
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Jenis Kelamin</FormLabel>
                      <Field name="gender">
                        {({ field, form }) => (
                          <RadioGroup
                            {...field}
                            onChange={(val) =>
                              form.setFieldValue(field.name, val)
                            }
                            value={form.values.gender}
                          >
                            <VStack spacing="8px" align={"left"}>
                              <Radio value="Laki-Laki">Laki-Laki</Radio>
                              <Radio value="Perempuan">Perempuan</Radio>
                            </VStack>
                          </RadioGroup>
                        )}
                      </Field>
                    </FormControl>

                    {/* Fakultas */}
                    <FormControl>
                      <FormLabel>Fakultas</FormLabel>
                      <Field
                        name="fakultas"
                        as={Select}
                        placeholder="Pilih Fakultas"
                      >
                        <option value="Fakultas Sains">Fakultas Sains</option>
                        <option value="Fakultas Teknologi Infrastruktur & Kewilayahan">
                          Fakultas Teknologi Infrastruktur & Kewilayahan
                        </option>
                        <option value="Fakultas Teknologi Industri">
                          Fakultas Teknologi Industri
                        </option>
                      </Field>
                    </FormControl>

                    {/* Program Studi */}
                    <FormControl>
                      <FormLabel>Program Studi</FormLabel>
                      <Field
                        name="prodi"
                        as={Select}
                        placeholder="Pilih Program Studi"
                      >
                        {profileData.inovator.fakultas ==
                          "Fakultas Teknologi Industri" &&
                          ProgramStudi.fti.map((prodi) => (
                            <option value={prodi.nama}>{prodi.nama}</option>
                          ))}

                        {profileData.inovator.fakultas ==
                          "Fakultas Teknologi Industri" &&
                          ProgramStudi.ftik.map((prodi) => (
                            <option value={prodi.nama}>{prodi.nama}</option>
                          ))}

                        {profileData.inovator.fakultas == "Fakultas Sains" &&
                          ProgramStudi.fs.map((prodi) => (
                            <option value={prodi.nama}>{prodi.nama}</option>
                          ))}
                      </Field>
                    </FormControl>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="md"
                      width="full"
                      isLoading={isSubmitting}
                      isDisabled={!isValid}
                    >
                      Update Profil
                    </Button>
                  </VStack>
                </GridItem>
              </Grid>
            </Form>
          )}
        </Formik>
        </>
      )}
    </Layout>
  );
};

export default EditProfile;
