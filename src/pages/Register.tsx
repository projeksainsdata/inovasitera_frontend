/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Select,
  VStack,
  Stack,
  Flex,
  Image,
  Text,
  HStack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import ImageLogin from "../assets/ImageLogin.png";
import Logo from "../assets/Logo1.png";
import { FAKULTAS } from "@/lib/constants/fakultas.constans";
import { PRODI } from "@/lib/constants/prodi.constans";
import { RegisterSpecification } from "@/lib/specification/auth.spefication";

// Validation schemas for each step
const step1Schema = Yup.object().shape({
  fullname: Yup.string().required("Nama Lengkap is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phonenumber: Yup.string()
    .matches(/^[0-9]+$/, "Hanya angka yang diperbolehkan")
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .required("No Telepon is required"),
});

const step2Schema = Yup.object().shape({
  dateOfBirth: Yup.date()
    .max(new Date(), "Tanggal Lahir tidak boleh di masa depan")
    .required("Tanggal Lahir is required"),
  gender: Yup.string().required("Jenis Kelamin is required"),
  role: Yup.string().default("member"),
  "inovator.fakultas": Yup.string(),
  "inovator.prodi": Yup.string(),
});

const step3Schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "Password harus mengandung huruf besar, huruf kecil, angka"
    )
    .required("Password diperlukan"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Password tidak cocok"
  ),
});

// Combined schema for all steps
const registerSchema = Yup.object().shape({
  ...step1Schema.fields,
  ...step2Schema.fields,
  ...step3Schema.fields,
});
const initialValues: RegisterSpecification = {
  fullname: "",
  username: "",
  email: "",
  phonenumber: "",
  dateOfBirth: "",
  gender: "",
  role: "member",
  fakultas: "",
  prodi: "",
  password: "",
  confirmPassword: "",
};

import { FormikProps } from "formik";
import { AxiosError } from "axios";
import AuthApiService from "@/services/apiServices/auth.api.service";
import { useAuth } from "@/hooks/useAuth";

const FormField = ({
  formik,
  name,
  label,
  type = "text",
  passwordState,
  onClick,
  ...props
}: {
  formik: any;
  name: keyof typeof initialValues;
  label: string;
  type?: string;
  [key: string]: any;
  passwordState: boolean;
  onClick?: () => void;
}) => (
  <FormControl isInvalid={!!formik.errors[name] && !!formik.touched[name]}>
    <FormLabel>{label}</FormLabel>
    <InputGroup>
      <Input {...formik.getFieldProps(name)} type={type} {...props} />
      {label.includes("Password") && 
      <InputRightElement width="4.5rem" onClick={onClick}>
        <Button h="1.75rem" size="sm">
          {passwordState ? <IconEyeOff /> : <IconEye />}
        </Button>
      </InputRightElement>
      }
      </InputGroup>
      <FormErrorMessage>{formik.errors[name]}</FormErrorMessage>
  </FormControl>
);

const RadioField = ({
  formik,
  name,
  label,
  options,
}: {
  formik: any;
  name: string;
  label: string;
  options: { value: string; label: string }[];
}) => (
  <FormControl isInvalid={!!formik.errors[name] && !!formik.touched[name]}>
    <FormLabel>{label}</FormLabel>
    <RadioGroup
      {...formik.getFieldProps(name)}
      onChange={(value) => formik.setFieldValue(name, value)}
    >
      <Stack direction="row">
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
    <FormErrorMessage>{formik.errors[name]}</FormErrorMessage>
  </FormControl>
);

const SelectField = ({
  formik,
  name,
  label,
  options,
  ...props
}: {
  formik: FormikProps<typeof initialValues>;
  name: keyof typeof initialValues;
  label: string;
  options: { value: string; label: string }[];
  [key: string]: any;
}) => (
  <FormControl isInvalid={!!(formik.errors[name] && formik.touched[name])}>
    <FormLabel>{label}</FormLabel>
    <Select
      {...formik.getFieldProps(name)}
      placeholder={`Pilih ${label}`}
      {...props}
    >
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
    <FormErrorMessage>{formik.errors[name]}</FormErrorMessage>
  </FormControl>
);

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const auth = useAuth();
  const steps = [
    { title: "Informasi Awal", description: "Pengguna" },
    { title: "Data Pribadi", description: "Informasi Lengkap" },
    { title: "Password", description: "Atur Kredensial" },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values: RegisterSpecification) => {
      try {
        // convert format fakultas and prodi to inovator.fakultas and inovator.prodi
        if (values.role === "innovator") {
          values["inovator.fakultas"] = values.fakultas;
          values["inovator.prodi"] = values.prodi;
        }
        delete values.fakultas;
        delete values.prodi;

        const response = await AuthApiService.register(values);

        // toast success
        toast({
          title: `Akun ${response?.data?.data?.email} berhasil dibuat`,
          description: "Silahkan login untuk mengakses sistem",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        // reset form
        formik.resetForm();

        // login
        const responseLogin = await AuthApiService.login({
          email: values.email,
          password: values.password,
        });

        await auth?.login(responseLogin?.data?.data?.access);

        toast({
          title: "Login berhasil",
          description: "Selamat datang di sistem",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        // redirect to dashboard
        navigate("/", { replace: true, state: { from: "/register" } });
      } catch (error) {
        //
        if (error instanceof AxiosError) {
          toast({
            title: "Gagal membuat akun",
            description: error.response?.data.message || "Silahkan coba lagi",
            status: "error",
            duration: 9000,
            isClosable: true,
          });

          return;
        }
        // toast error
        toast({
          title: "Gagal membuat akun",
          description: "Silahkan coba lagi",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  const fakultasOptions = useMemo(
    () =>
      Object.entries(FAKULTAS).map(([, value]) => ({
        value: value,
        label: value,
      })),
    []
  );

  const prodiOptions = useMemo(() => {
    const selectedFakultas = formik.values.fakultas;
    if (!selectedFakultas) return [];
    return selectedFakultas && PRODI[selectedFakultas]
      ? Object.entries(PRODI[selectedFakultas]).map(([, value]) => ({
          value: value,
          label: value,
        }))
      : [];
  }, [formik.values.fakultas]);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <>
            <FormField formik={formik} name="fullname" label="Nama Lengkap" />
            <FormField formik={formik} name="username" label="Username Anda" />
            <FormField
              formik={formik}
              name="email"
              label="Email"
              type="email"
            />
            <FormField
              formik={formik}
              name="phonenumber"
              label="Nomor Handphone"
            />
          </>
        );
      case 2:
        return (
          <>
            <FormField
              formik={formik}
              name="dateOfBirth"
              label="Tanggal Lahir"
              type="date"
            />
            <RadioField
              formik={formik}
              name="gender"
              label="Jenis Kelamin"
              options={[
                { value: "Laki-Laki", label: "Laki-Laki" },
                { value: "Perempuan", label: "Perempuan" },
              ]}
            />
            <RadioField
              formik={formik}
              name="role"
              label="Daftar Sebagai"
              options={[
                { value: "innovator", label: "Innovator" },
                { value: "member", label: "Member" },
              ]}
            />
            {formik.values.role === "innovator" && (
              <>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Informasi Inovator
                </Text>

                <SelectField
                  formik={formik}
                  name="fakultas"
                  label="Fakultas"
                  options={fakultasOptions}
                  onChange={(e: any) => {
                    formik.setFieldValue("fakultas", e.target.value);
                    formik.setFieldValue("prodi", "");
                  }}
                />
                <SelectField
                  formik={formik}
                  name="prodi"
                  label="Program Studi"
                  options={prodiOptions}
                  isDisabled={!formik.values.fakultas}
                />
              </>
            )}
          </>
        );
      case 3:
        return (
          <>
            <FormField
              formik={formik}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              onClick={() => setShowPassword(!showPassword)}
              passwordState={showPassword}
            />
            <FormField
              formik={formik}
              name="confirmPassword"
              label="Konfirmasi Password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              passwordState={showConfirmPassword}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box w="full" h="full" shadow="lg" display={{ md: "flex" }}>
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

        <Box flex={1} p={{ base: 6, md: 10 }}>
          <Box mb={6} mt={10}>
            <Image src={Logo} alt="Logo" width={70} />
          </Box>

          <Text fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
            Daftar Akun Sistem PII ITERA
          </Text>
          <Text color="gray.500" mb={6}>
            Untuk menggunakan sistem harap membuat akun terlebih dahulu
          </Text>

          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <Stepper index={step - 1} w="100%" size="sm">
                {steps.map((stepInfo, index) => (
                  <Step key={index} onClick={() => setStep(index + 1)}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>
                    <Box flexShrink="0">
                      <StepTitle>{stepInfo.title}</StepTitle>
                      <StepDescription>{stepInfo.description}</StepDescription>
                    </Box>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>

              {renderStepContent(step)}

              <HStack width="100%" justifyContent="space-between">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Kembali
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    colorScheme="yellow"
                    onClick={() => setStep(step + 1)}
                  >
                    Lanjut
                  </Button>
                ) : (
                  <Button
                    colorScheme="yellow"
                    type="submit"
                    isDisabled={!formik.isValid || !formik.dirty}
                  >
                    Daftar Akun
                  </Button>
                )}
              </HStack>
            </VStack>
          </form>

          <Box textAlign="center" mt={4}>
            <Link to="/login" className="text-orange-800 font-bold">
              Sudah Punya Akun? Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
