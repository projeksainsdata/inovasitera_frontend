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
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { IconPhotoPlus } from "@tabler/icons-react";
import * as Yup from "yup";
import AuthApiService from "@/services/apiServices/auth.api.service";
import Layout from "@/components/innovator/layoutInnovator/LayoutInnovator";
import { FAKULTAS } from "@/lib/constants/fakultas.constans";
import { PRODI } from "@/lib/constants/prodi.constans";
import { put } from "@/hooks/useSubmit";

const validationSchema = Yup.object({
  fullname: Yup.string().required("Nama is required"),
  phonenumber: Yup.string()
    .matches(/^[0-9]+$/, "Hanya angka yang diperbolehkan")
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Tanggal Lahir tidak boleh di masa depan"),
  gender: Yup.string(),
  fakultas: Yup.string(),
  prodi: Yup.string(),
});

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [tempProfileData, setTempProfileData] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const toast = useToast();

  const getProfile = async () => {
    try {
      const response = await AuthApiService.me();
      setProfileData(response.data.data);
      setProfilePic(response.data.data.profile);

      setTempProfileData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullname: profileData?.fullname || "",
      email: profileData?.email || "",
      phonenumber: profileData?.phonenumber || "",
      dateOfBirth: profileData?.dateOfBirth || "",
      gender: profileData?.gender || "1",
      fakultas: profileData?.inovator.fakultas || "",
      prodi: profileData?.inovator.prodi || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let constructForm = {
          ...values,
          "inovator.fakultas": values.fakultas,
          "inovator.prodi": values.prodi
        };
        // delete constructForm.fakultas;
        // delete constructForm.prodi;

        await put({
          url: `/api/v1/users/${profileData?._id}`,
          data: constructForm,
        });
        toast({
          title: "Profil diperbarui.",
          description: "Informasi profil Anda telah diperbarui.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
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

                  <Box className="p-5 border flex flex-col justify-center items-center gap-4">
                    <h1 className="text-lg font-bold">
                      Ingin mengubah password?
                    </h1>
                    <Link href="/forgot-password">
                      <Button colorScheme="blue">Ubah Password</Button>
                    </Link>
                  </Box>
                </VStack>
              </FormControl>
            </GridItem>

            {/* Column 2: Form Fields */}
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Box className="w-full">
                  {profileData.inovator.status === "pending" && (
                    <Box className="rounded p-3 bg-orange-600 text-white font-medium space-y-2">
                      <Badge colorScheme="orange" fontSize={"sm"}>
                        Pending
                      </Badge>
                      <p className="font-medium">Menunggu Konfirmasi Admin</p>
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
                {/* Nama */}
                <FormControl
                  isInvalid={formik.touched.fullname && formik.errors.fullname}
                >
                  <FormLabel>Nama</FormLabel>
                  <Input
                    {...formik.getFieldProps("fullname")}
                    placeholder="Masukkan Nama"
                  />
                  <FormErrorMessage>{formik.errors.fullname}</FormErrorMessage>
                </FormControl>

                {/* Daftar Sebagai */}
                <FormControl>
                  <FormLabel>Terdaftar Sebagai</FormLabel>
                  <Input
                    disabled={true}
                    value={profileData.role.toUpperCase()}
                  />
                </FormControl>

                {/* Email */}
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...formik.getFieldProps("email")}
                    type="email"
                    disabled
                  />
                </FormControl>

                {/* No Telepon */}
                <FormControl
                  isInvalid={
                    formik.touched.phonenumber && formik.errors.phonenumber
                  }
                >
                  <FormLabel>No Telepon</FormLabel>
                  <Input
                    {...formik.getFieldProps("phonenumber")}
                    placeholder="Masukkan No Telepon"
                  />
                  <FormErrorMessage>
                    {formik.errors.phonenumber}
                  </FormErrorMessage>
                </FormControl>

                {/* Tanggal Lahir */}
                <FormControl
                  isInvalid={
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  }
                >
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Input {...formik.getFieldProps("dateOfBirth")} type="date" />
                  <FormErrorMessage>
                    {formik.errors.dateOfBirth}
                  </FormErrorMessage>
                </FormControl>

                {/* Jenis Kelamin */}
                <FormControl
                  as="fieldset"
                  isInvalid={formik.touched.gender && formik.errors.gender}
                >
                  <FormLabel as="legend">Jenis Kelamin</FormLabel>
                  <RadioGroup
                    {...formik.getFieldProps("gender")}
                    onChange={(val) => formik.setFieldValue("gender", val)}
                    value={formik.values.gender}
                  >
                    <VStack spacing="8px" align={"left"}>
                      <Radio value="Laki-Laki">Laki-Laki</Radio>
                      <Radio value="Perempuan">Perempuan</Radio>
                    </VStack>
                  </RadioGroup>
                  <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
                </FormControl>

                {/* Fakultas */}
                {profileData.role == "innovator" && (
                  <>
                    <FormControl
                      isInvalid={
                        formik.touched.fakultas && formik.errors.fakultas
                      }
                    >
                      <FormLabel>Fakultas</FormLabel>
                      <Select
                        {...formik.getFieldProps("fakultas")}
                        onChange={(e) => {
                          setTempProfileData((prev) => ({
                            ...prev,
                            inovator: {
                              ...prev.inovator,
                              fakultas: e.target.value,
                            },
                          }));
                          formik.handleChange(e);
                        }}
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
                      <FormErrorMessage>
                        {formik.errors.fakultas}
                      </FormErrorMessage>
                    </FormControl>

                    {/* Program Studi */}
                    <FormControl
                      isInvalid={formik.touched.prodi && formik.errors.prodi}
                    >
                      <FormLabel>Program Studi</FormLabel>
                      <Select
                        {...formik.getFieldProps("prodi")}
                        placeholder="Pilih Program Studi"
                      >
                        {tempProfileData.inovator.fakultas ===
                          "Fakultas Teknologi Industri" &&
                          Object.keys(PRODI[FAKULTAS.FTI]).map((prodi, key) => (
                            <option key={key} value={prodi}>
                              {PRODI[FAKULTAS.FTI][prodi]}
                            </option>
                          ))}
                        {tempProfileData.inovator.fakultas ===
                          "Fakultas Teknologi Infrastruktur & Kewilayahan" &&
                          Object.keys(PRODI[FAKULTAS.FTIK]).map(
                            (prodi, key) => (
                              <option key={key} value={prodi.nama}>
                                {PRODI[FAKULTAS.FTIK][prodi]}
                              </option>
                            )
                          )}
                        {tempProfileData.inovator.fakultas ===
                          "Fakultas Sains" &&
                          Object.keys(PRODI[FAKULTAS.FS]).map((prodi, key) => (
                            <option key={key} value={prodi.nama}>
                              {PRODI[FAKULTAS.FS][prodi]}
                            </option>
                          ))}
                      </Select>
                      <FormErrorMessage>{formik.errors.prodi}</FormErrorMessage>
                    </FormControl>
                  </>
                )}

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
