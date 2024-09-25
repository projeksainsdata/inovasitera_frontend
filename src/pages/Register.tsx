import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ImageLogin from "../assets/ImageLogin.png";
import Logo from "../assets/Logo1.png";

const RegisterPage: React.FC = () => {
  // States to manage form values
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noHP, setNoHP] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [daftarSebagai, setDaftarSebagai] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [prodi, setProdi] = useState("");

  // State for managing the current step
  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handlePrevStep = () => setStep((prevStep) => prevStep - 1);

  // step title
  const steps = [
    { title: "Informasi Awal", description: "Pengguna" },
    { title: "Data Pribadi", description: "Informasi Lengkap" },
    { title: "Password", description: "Atur Kredensial" },
  ];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      namaLengkap,
      email,
      password,
      confirmPassword,
      noHP,
      tanggalLahir,
      jenisKelamin,
      daftarSebagai,
      fakultas,
      prodi,
    });
  };

  return (
    <Flex alignItems="center" justifyContent="center" bg="gray.50">
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
        <Box flex={1} p={{ base: 6, md: 10 }}>
          {/* Logo */}
          <Box mb={6} mt={10}>
            <Image src={Logo} alt="Logo" width={70} />
          </Box>

          <Text fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
            Daftar Akun Sistem PII ITERA
          </Text>
          <Text color="gray.500" mb={6}>
            Untuk menggunakan sistem harap membuat akun terlebih dahulu
          </Text>

          {/* Multi-step form */}
          <VStack as="form" spacing={4} onSubmit={handleSubmit}>
            <Stepper index={step} w="100%" size="sm">
              {steps.map((step, index) => (
                <Step key={index} onClick={()=>setStep(index+1)}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            {step === 1 && (
              <>
                {/* Step 1: Personal Information */}
                <FormControl>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <Input
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    placeholder="Nama Lengkap"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Nomor Handphone</FormLabel>
                  <Input
                    value={noHP}
                    onChange={(e) => setNoHP(e.target.value)}
                    placeholder="No Handphone"
                  />
                </FormControl>
              </>
            )}

            {step === 3 && (
              <>
                {/* Step 2: Account Information */}
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Konfirmasi Password"
                  />
                </FormControl>
              </>
            )}

            {step === 2 && (
              <>
                {/* Step 3: Additional Information */}
                <FormControl>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Input
                    type="date"
                    value={tanggalLahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <RadioGroup value={jenisKelamin} onChange={setJenisKelamin}>
                    <Stack direction="row">
                      <Radio value="Laki-Laki">Laki-Laki</Radio>
                      <Radio value="Perempuan">Perempuan</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Daftar Sebagai</FormLabel>
                  <RadioGroup value={daftarSebagai} onChange={setDaftarSebagai}>
                    <Stack direction="row">
                      <Radio value="Mahasiswa">Innovator</Radio>
                      <Radio value="Dosen">User Biasa</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Fakultas</FormLabel>
                  <Select
                    placeholder="Pilih Fakultas"
                    value={fakultas}
                    onChange={(e) => setFakultas(e.target.value)}
                  >
                    <option value="Fakultas Teknik">Fakultas Teknik</option>
                    <option value="Fakultas Sains">Fakultas Sains</option>
                    <option value="Fakultas Ilmu Sosial">
                      Fakultas Ilmu Sosial
                    </option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Program Studi</FormLabel>
                  <Select
                    placeholder="Pilih Program Studi"
                    value={prodi}
                    onChange={(e) => setProdi(e.target.value)}
                  >
                    <option value="Teknik Informatika">
                      Teknik Informatika
                    </option>
                    <option value="Fisika">Fisika</option>
                    <option value="Manajemen">Manajemen</option>
                  </Select>
                </FormControl>
              </>
            )}

            {/* Navigation Buttons */}
            <HStack width="100%" justifyContent="space-between">
              {step > 1 && (
                <Button variant="outline" onClick={handlePrevStep}>
                  Kembali
                </Button>
              )}
              {step < 3 ? (
                <Button colorScheme="yellow" onClick={handleNextStep}>
                  Lanjut
                </Button>
              ) : (
                <Button colorScheme="yellow" type="submit">
                  Daftar Akun
                </Button>
              )}
            </HStack>
          </VStack>

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
