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

          {/* Form without Formik */}
          <VStack as="form" spacing={4} onSubmit={handleSubmit}>
            {/* Nama Lengkap */}
            <FormControl>
              <FormLabel>Nama Lengkap</FormLabel>
              <Input
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                placeholder="Nama Lengkap"
              />
            </FormControl>

            {/* Email */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </FormControl>

            {/* Konfirmasi Password */}
            <FormControl>
              <FormLabel>Konfirmasi Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirmasi Password"
              />
            </FormControl>

            {/* No HP */}
            <FormControl>
              <FormLabel>No HP</FormLabel>
              <Input
                value={noHP}
                onChange={(e) => setNoHP(e.target.value)}
                placeholder="No HP"
              />
            </FormControl>

            {/* Tanggal Lahir */}
            <FormControl>
              <FormLabel>Tanggal Lahir</FormLabel>
              <Input
                type="date"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
              />
            </FormControl>

            {/* Jenis Kelamin (Radio) */}
            <FormControl>
              <FormLabel>Jenis Kelamin</FormLabel>
              <RadioGroup
                value={jenisKelamin}
                onChange={setJenisKelamin}
              >
                <Stack direction="row">
                  <Radio value="Laki-Laki">Laki-Laki</Radio>
                  <Radio value="Perempuan">Perempuan</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* Daftar Sebagai (Radio) */}
            <FormControl>
              <FormLabel>Daftar Sebagai</FormLabel>
              <RadioGroup
                value={daftarSebagai}
                onChange={setDaftarSebagai}
              >
                <Stack direction="row">
                  <Radio value="Mahasiswa">Innovator</Radio>
                  <Radio value="Dosen">User Biasa</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* Fakultas (Dropdown) */}
            <FormControl>
              <FormLabel>Fakultas</FormLabel>
              <Select
                placeholder="Pilih Fakultas"
                value={fakultas}
                onChange={(e) => setFakultas(e.target.value)}
              >
                <option value="Fakultas Teknik">Fakultas Teknik</option>
                <option value="Fakultas Sains">Fakultas Sains</option>
                <option value="Fakultas Ilmu Sosial">Fakultas Ilmu Sosial</option>
              </Select>
            </FormControl>

            {/* Prodi (Dropdown) */}
            <FormControl>
              <FormLabel>Program Studi</FormLabel>
              <Select
                placeholder="Pilih Program Studi"
                value={prodi}
                onChange={(e) => setProdi(e.target.value)}
              >
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Fisika">Fisika</option>
                <option value="Manajemen">Manajemen</option>
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button colorScheme="yellow" width="full" type="submit">
              Daftar Akun
            </Button>
          </VStack>

          <Box textAlign="center" mt={4}>
              <Link to="/login" className='text-orange-800 font-bold'>Sudah Punya Akun? Login</Link>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
