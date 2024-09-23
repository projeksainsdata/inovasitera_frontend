import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Rating from "../components/rating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { IconStarFilled,IconZoomQuestion,IconMessageCircle,IconInfoCircle } from "@tabler/icons-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DetailInovasi: React.FC = () => {
  const [rating, setRating] = useState(0); // State to keep track of the rating
  return (
    <>
      <Navbar />

      <Box className="bg-orange-100 p-3 mt-24">
        <Breadcrumb spacing="8px">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Beranda</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Pangan</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Produk</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box className="flex flex-col md:flex-row gap-6 justify-center m-5 md:max-w-6xl md:my-5 md:mx-auto">
        <Box className="h-auto w-full">
          <img
            src={"https://placehold.co/600x600"}
            alt="Product Image"
            className="rounded-lg w-full h-full object-cover"
          />
        </Box>

        <Box className="h-auto flex flex-col justify-between">
          <Box className="space-y-5 flex-grow">
            <Text fontSize="lg" fontWeight="semibold">
              Produk Inovasi ITERA
            </Text>
            <Text className="text-xl md:text-3xl font-bold">
              Obat Tradisional BioLuric Menjadi Obat Herbal Terstandar
              Antigout/Penurun Asam Urat
            </Text>

            <Box className="flex gap-6 items-center">
              <span className="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-full mb-2">
                Pangan
              </span>
              <Box className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((x) => (
                  <IconStarFilled key={x} className="text-yellow-400 text-xl" />
                ))}
                <Text className="ml-2 text-xl text-gray-600">(10)</Text>
              </Box>
            </Box>

            <Box className="p-3 bg-gray-100 rounded space-y-2">
              <Text className="font-semibold">Innovator</Text>
              <ul>
                <li>Dr. Sarah Ahmed</li>
                <li>Dr. Michael Tanaka</li>
                <li>Dr. Priya Kapoor</li>
                <li>Dr. James O'Connor</li>
                <li>Dr. Maria Gonzalez</li>
                <li>Dr. Chen Wei</li>
                <li>Dr. Aisha Yusuf</li>
                <li>Dr. David Stein</li>
                <li>Dr. Amira Haddad</li>
                <li>Dr. Hugo Martins</li>
              </ul>
            </Box>
          </Box>

          <Box className="flex flex-col space-y-2 mt-5">
            <Button colorScheme="blue" variant="outline" size="md">
              Tambah ke Favorit
            </Button>
            <Button colorScheme="blue" size="md">
              Hubungi Inovator
            </Button>
          </Box>
        </Box>
      </Box>

      <Tabs variant="enclosed" className="m-3 md:max-w-6xl md:mx-auto md:mb-5">
        <TabList>
          <Tab className="space-x-2 font-bold"><IconInfoCircle size={18}/><span>Deskripsi</span></Tab>
          <Tab className="space-x-2 font-bold"><IconMessageCircle size={18}/><span>Ulasan</span></Tab>
          <Tab className="space-x-2 font-bold"><IconZoomQuestion size={18}/><span>Pertanyaan</span></Tab>
        </TabList>

        <TabPanels className="border">
          <TabPanel>
            <Text className="font-semibold">Deskripsi</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              tempora harum, maiores deserunt blanditiis recusandae repudiandae,
              quaerat quisquam, nobis sapiente voluptatum iusto. Officia
              distinctio tempore nobis voluptatum et recusandae error.
            </Text>
            <TableContainer className="border mt-5">
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Status Paten</Td>
                    <Td>Dalam Proses Permohonan Paten</Td>
                  </Tr>
                  <Tr>
                    <Td>Tahap Pengembangan</Td>
                    <Td>Lainnya</Td>
                  </Tr>
                  <Tr>
                    <Td>Nilai TKT</Td>
                    <Td>6</Td>
                  </Tr>
                  <Tr>
                    <Td>Kata kunci Teknologi</Td>
                    <Td>..</Td>
                  </Tr>
                  <Tr>
                    <Td>Kolaborasi Yang Diinginkan</Td>
                    <Td>..</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel>
            <Text className="font-semibold">
              Berikan ulasan untuk Inovasi ini
            </Text>
            <Box className="flex gap-2">
              <Box p={4}>
                <Rating
                  maxRating={5}
                  onChange={(value): int => setRating(value)}
                />
              </Box>
            </Box>
          </TabPanel>

          <TabPanel className="space-y-4">
            <Text className="font-semibold">
              Pertanyaan yang sering diajukan
            </Text>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Section 1 Title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Section 2 Title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Section 3 Title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Footer />
    </>
  );
};

export default DetailInovasi;
