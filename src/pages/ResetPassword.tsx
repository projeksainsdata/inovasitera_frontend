import React, { useState, useEffect } from "react";
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
    VStack,
    Progress,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Logo from "../assets/Logo1.png";
import AuthApiService from "@/services/apiServices/auth.api.service";
import { ResetPasswordSpecification } from "@/lib/specification/auth.spefication";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { isAxiosError } from "axios";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

const ResetPassword: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, "Password minimal 8 karakter")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
            "Password harus mengandung huruf besar, huruf kecil, angka")
            .required("Password diperlukan"),
        password2: Yup.string().oneOf([Yup.ref("password"), undefined], "Password tidak cocok")
    });

    useEffect(() => {
        const verifyToken = async () => {
            setIsLoading(true);
            const urlParams = new URLSearchParams(location.search);
            const token = urlParams.get("token");
            if (!token) {
                toast({
                    title: 'Error',
                    description: 'Token tidak ditemukan',
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
                navigate('/forgot-password');
                return;

            }
            setIsLoading(false);
        };

        verifyToken();
    }, [location, navigate, toast]);



    if (isLoading) {
        return (
            <Flex h="100vh" align="center" justify="center">
                <VStack spacing={4}>
                    <Text>Memverifikasi token...</Text>
                    <Progress size="xs" isIndeterminate w={200} />
                </VStack>
            </Flex>
        );
    }



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
                    Reset Password
                </Text>
                <Text color="gray.500" mb={6} textAlign="center">
                    Masukan Password Baru Anda disini !
                </Text>

                <Formik
                    initialValues={{
                        password: "",
                        password2: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values: ResetPasswordSpecification, { setSubmitting }) => {
                        setSubmitting(true);
                        try {
                            const urlParams = new URLSearchParams(window.location.search);
                            const token = urlParams.get("token");
                            if (!token) throw new Error('Token tidak ditemukan');

                            const response = await AuthApiService.resetPassword(token, values);

                            if (response) {
                                toast({
                                    title: 'Success',
                                    description: 'Password berhasil direset. Silakan login dengan password baru Anda.',
                                    status: 'success',
                                    duration: 5000,
                                    isClosable: true
                                });
                                navigate('/login');
                            }
                        } catch (error) {
                            if (isAxiosError(error)) {
                                toast({
                                    title: 'Error',
                                    description: error.response?.data.message || 'Gagal mereset password',
                                    status: 'error',
                                    duration: 5000,
                                    isClosable: true
                                });
                            } else {
                                toast({
                                    title: 'Error',
                                    description: 'Gagal mereset password',
                                    status: 'error',
                                    duration: 5000,
                                    isClosable: true
                                });
                            }
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form style={{ width: "100%" }}>
                            <FormControl isInvalid={!!(errors.password && touched.password)} mb={4}>
                                <FormLabel>Password Baru</FormLabel>
                                <InputGroup>
                                    <Field
                                        as={Input}
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="password baru ...."
                                        focusBorderColor="yellow.400"
                                        _focus={{
                                            borderColor: "yellow.400",
                                            boxShadow: "0 0 0 2px #ECC94B",
                                        }}

                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <IconEye /> : <IconEyeClosed />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!(errors.password2 && touched.password2)} mb={4}>
                                <FormLabel>Konfirmasi Password</FormLabel>
                                <InputGroup>
                                    <Field
                                        as={Input}
                                        name="password2"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="konfirmasi password ...."
                                        focusBorderColor="yellow.400"
                                        _focus={{
                                            borderColor: "yellow.400",
                                            boxShadow: "0 0 0 2px #ECC94B",
                                        }}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <IconEye /> : <IconEyeClosed />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.password2}</FormErrorMessage>
                            </FormControl>

                            <Button
                                colorScheme="yellow"
                                width="full"
                                type="submit"
                                fontWeight="bold"
                                py={2}
                                isLoading={isSubmitting}
                                loadingText="Menyimpan..."
                            >
                                Reset Password
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

export default ResetPassword;