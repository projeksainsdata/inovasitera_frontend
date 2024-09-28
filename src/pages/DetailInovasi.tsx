import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import Rating from "@/components/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  Avatar, AvatarBadge, AvatarGroup,
  Icon,
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
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import {
  IconStarFilled,
  IconZoomQuestion,
  IconMessageCircle,
  IconInfoCircle,
} from "@tabler/icons-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner from "../assets/HeroPage.png";
import PANGAN from "../assets/PANGAN.svg";

const DetailInovasi: React.FC = () => {
  const [rating, setRating] = useState(0); // State to keep track of the rating
  return (
    <>
      <Navbar />
      <img src={banner} className="h-24 w-full object-cover" />
      <Box className="bg-orange-100 p-3 mb-5 ">
        <Breadcrumb spacing="8px">
          <BreadcrumbItem>
            <BreadcrumbLink href="/inovasi">Beranda</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Produk</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box className="flex flex-col lg:flex-row gap-6  justify-center lg:max-w-6xl px-3 lg:mx-auto w-full">
        <Box className="h-auto w-full lg:w-[40rem]">
          <Swiper
            modules={[Pagination]}
            spaceBetween={4}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {/* First Image */}
            <SwiperSlide>
              <img
                src={"https://placehold.co/600x600"}
                alt="Product Image 1"
                className="rounded-lg w-full h-full object-cover"
              />
            </SwiperSlide>

            {/* Second Image */}
            <SwiperSlide>
              <img
                src={"https://placehold.co/600x600"}
                alt="Product Image 2"
                className="rounded-lg w-full h-full object-cover"
              />
            </SwiperSlide>

            {/* Third Image */}
            <SwiperSlide>
              <img
                src={"https://placehold.co/600x600"}
                alt="Product Image 3"
                className="rounded-lg w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </Box>

        <Box className="h-auto flex flex-col justify-between">
          <Box className="space-y-5 flex-grow">
            <Text fontSize="sm" fontWeight="semibold">
              Produk Inovasi ITERA
            </Text>
            <Text className="text-xl md:text-3xl font-bold">
              Ini Adalah Contoh Produk Inovasi ITERA
            </Text>

            <Box className="flex gap-6 items-center">
              <div className="bg-green-500 text-white text-sm font-semibold px-3 py-2 gap-3 rounded-full flex items-center">
                Pangan
              </div>
              <Box className="flex items-center">
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
          <Tab className="space-x-1 font-bold">
            <IconInfoCircle size={16} />
            <span>Deskripsi</span>
          </Tab>
          <Tab className="space-x-1 font-bold">
            <IconMessageCircle size={16} />
            <span>Ulasan</span>
          </Tab>
          <Tab className="space-x-2">
            <IconZoomQuestion size={16} />
            <span>Pertanyaan</span>
          </Tab>
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

            {/* Two-column layout */}
            <Flex direction={{ base: "column", md: "row" }} gap={6}>
              {/* Left Column: Form to Post Comment */}
              <Box flex={1}>
                <VStack spacing={4} align="stretch">
                  <Box>
                    {/* Rating Component */}
                    <Rating
                      maxRating={5}
                      onChange={(value) => setRating(value)}
                    />
                  </Box>

                  {/* Textarea for Comment */}
                  <FormControl>
                    <FormLabel>Ulasan</FormLabel>
                    <Textarea
                      placeholder="Write your comment here..."
                      size="md"
                      // value={comment}
                      // onChange={(e) => setComment(e.target.value)}
                    />
                  </FormControl>

                  {/* Submit Button */}
                  <Button colorScheme="yellow">Post Comment</Button>
                </VStack>
              </Box>

              {/* Right Column: Comments from Other Members */}
              <Box flex={1}>
                <Text fontSize="lg" mb={4} fontWeight="bold">
                  Semua Ulasan (90)
                </Text>

                {/* List of Comments */}
                <VStack spacing={4} align="stretch">
                {[1, 2, 3, 4, 5].map((x) => (
                  <Box p={3} bg="gray.50" className="space-y-2">
                    <Box className="flex gap-5">
                      <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                      <Box>
                        <Text fontWeight="bold">John Doe</Text>
                        <Text>This is a great innovation! Keep it up!</Text>
                      </Box>
                    </Box>
                    <Box className="flex items-center">
                      {[1, 2, 3, 4, 5].map((x) => (
                        <IconStarFilled
                          key={x}
                          className="text-yellow-400 text-xl"
                        />
                      ))}
                    </Box>
                    <Text className="text-sm">24-09-2024</Text>
                  </Box>
                ))}
                </VStack>
              </Box>
            </Flex>
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
