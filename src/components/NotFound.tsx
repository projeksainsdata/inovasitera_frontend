import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import backgroundImage from "@/assets/HeroPage.png";

const NotFoundPage = () => {
  return (
    <VStack
      spacing={4}
      justify="center"
      align="center"
      height="100vh"
      bg="gray.100"
      backgroundImage={`url(${backgroundImage})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      color="black"
    >
      <Heading>404 Error!</Heading>
      <Text>Halaman yang Anda cari tidak ditemukan.</Text>
      <Button colorScheme="yellow" as={Link} to="/">
        Kembali ke Halaman Awal
      </Button>
    </VStack>
  );
};

export default NotFoundPage;
