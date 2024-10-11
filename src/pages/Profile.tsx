/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { IconPhotoPlus } from "@tabler/icons-react";
import * as Yup from "yup";
import AuthApiService from "@/services/apiServices/auth.api.service";
import Layout from "@/components/innovator/layoutInnovator/LayoutInnovator";
import { FAKULTAS } from "@/lib/constants/fakultas.constans";
import { PRODI } from "@/lib/constants/prodi.constans";
import { put, UploadImage } from "@/hooks/useSubmit";
import { ErrorApiToast } from "@/helpers/ErrorApiToast";
import { ResponseUpdateUser, USER } from "@/lib/types/user.type";
import { USER_PREFIX } from "@/lib/constants/api.contants";
import ROLE from "@/lib/constants/role.contants";
import { useAuth } from "@/hooks/useAuth";

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


const passwordChangeSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "Password harus mengandung huruf besar, huruf kecil, angka")
    .required("Password diperlukan"),
  confirmNewPassword: Yup.string().oneOf([Yup.ref("newPassword"), undefined], "Password tidak cocok")
    .required('Confirm new password is required'),
});


const EditProfile = () => {
  const [profileData, setProfileData] = useState<USER | null>(null);
  const [profilePic, setProfilePic] = useState("");
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState(false);
  const toast = useToast();
  const auth = useAuth()

  const getProfile = async () => {
    try {
      const response = await AuthApiService.me();
      setProfileData(response.data.data);
      setProfilePic(response.data.data.profile);

    } catch (error: any) {
      ErrorApiToast({ error });

    };
  }
  useEffect(() => {
    getProfile();
  }, []);
  const passwordChangeFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: passwordChangeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Add API call to change password here
        const responseUser = await put<ResponseUpdateUser>({
          url: `${USER_PREFIX.INDEX}/${profileData?._id}`,
          data: values,
        });

        auth.login(responseUser?.data?.tokens.access);

        toast({
          title: "Password changed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsPasswordChangeModalOpen(false);
        resetForm();
      } catch (error) {
        toast({
          title: "Error changing password",
          description: "Please try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  })

  const formik = useFormik({
    initialValues: {
      fullname: profileData?.fullname || "",
      email: profileData?.email || "",
      phonenumber: profileData?.phonenumber || "",
      dateOfBirth: profileData?.dateOfBirth || "",
      gender: profileData?.gender || "1",
      inovator: {
        fakultas: profileData?.inovator?.fakultas || "",
        prodi: profileData?.inovator?.prodi || "",
      },
      profile: profileData?.profile || "",

    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {

        if (values.profile && values.profile instanceof File) {
          const uploadResult = await UploadImage({
            file: values.profile,

          });

          if (!uploadResult.success) {
            toast({
              title: 'Error during image upload',
              description: uploadResult.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            return;
          }

          values.profile = uploadResult.url || '';
        }
        const responseUser = await put<ResponseUpdateUser>({
          url: `${USER_PREFIX.INDEX}/${profileData?._id}`,
          data: values,
        });

        setProfilePic(responseUser?.data?.user.profile);
        setProfileData(responseUser?.data?.user);
        auth.login(responseUser?.data?.tokens.access);

        toast({
          title: "Profil diperbarui.",
          description: "Informasi profil Anda telah diperbarui.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } catch (error) {
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
  const fakultasOptions = useMemo(() =>
    Object.entries(FAKULTAS).map(([, value]) => ({ value: value, label: value })),
    []
  );

  const prodiOptions = useMemo(() => {
    const selectedFakultas = formik.values.inovator.fakultas;
    if (!selectedFakultas) return [];
    return selectedFakultas && PRODI[selectedFakultas]
      ? Object.entries(PRODI[selectedFakultas]).map(([, value]) => ({ value: value, label: value }))
      : [];
  }, [formik.values.inovator.fakultas]);

  const handleProfilePicChange = (e: any) => {
    const file = e.target.files[0];
    // set temp profile pic for preview
    setProfilePic(URL.createObjectURL(file));

    formik.setFieldValue("profile", file);
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
                    <Button
                      colorScheme="blue"
                      onClick={() => setIsPasswordChangeModalOpen(true)}
                    >
                      Ubah Password
                    </Button>
                  </Box>
                </VStack>
              </FormControl>
            </GridItem>

            {/* Column 2: Form Fields */}
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Box className="w-full">
                  {(profileData.inovator.status === "pending") && (
                    <Box className="rounded p-3 bg-orange-600 text-white font-medium space-y-2">
                      <Badge colorScheme="orange" fontSize={"sm"}>
                        Pending
                      </Badge>
                      <p className="font-medium">Menunggu Konfirmasi Admin</p>
                    </Box>
                  )}
                  {profileData.inovator.status === "active" && (
                    <Box className="rounded p-3 bg-green-600 text-white font-medium space-y-2">
                      <Badge colorScheme="" fontSize={"lg"}>
                        Status Terverifikasi
                      </Badge>
                    </Box>
                  )}
                  {profileData.inovator.status === "inactive" && (
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
                  isInvalid={formik.touched?.fullname && formik.errors?.fullname}
                >
                  <FormLabel>Nama Lengkap</FormLabel>
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
                  <FormControl>
                    <FormLabel>Fakultas</FormLabel>
                    <Select
                      {...formik.getFieldProps("inovator.fakultas")}
                      placeholder="Pilih Fakultas"
                    >
                      {fakultasOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {/* Prodi */}
                {profileData.role == "innovator" && (
                  <FormControl>
                    <FormLabel>Prodi</FormLabel>
                    <Select
                      {...formik.getFieldProps("inovator.prodi")}
                      placeholder="Pilih Prodi"
                    >
                      {prodiOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

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
      <Modal isOpen={isPasswordChangeModalOpen} onClose={() => setIsPasswordChangeModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={passwordChangeFormik.handleSubmit}>
            <ModalHeader>Change Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={passwordChangeFormik.touched.currentPassword && passwordChangeFormik.errors.currentPassword}>
                  <FormLabel>Current Password</FormLabel>
                  <Input
                    type="password"
                    {...passwordChangeFormik.getFieldProps('currentPassword')}
                  />
                  <FormErrorMessage>{passwordChangeFormik.errors.currentPassword}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={passwordChangeFormik.touched.newPassword && passwordChangeFormik.errors.newPassword}>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    {...passwordChangeFormik.getFieldProps('newPassword')}
                  />
                  <FormErrorMessage>{passwordChangeFormik.errors.newPassword}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={passwordChangeFormik.touched.confirmNewPassword && passwordChangeFormik.errors.confirmNewPassword}>
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input
                    type="password"
                    {...passwordChangeFormik.getFieldProps('confirmNewPassword')}

                  />
                  <FormErrorMessage>{passwordChangeFormik.errors.confirmNewPassword}</FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" isLoading={passwordChangeFormik.isSubmitting}>
                Change Password
              </Button>
              <Button variant="ghost" onClick={() => setIsPasswordChangeModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Layout>
  );
};
export default EditProfile;
