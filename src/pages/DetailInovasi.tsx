import { useEffect, useState } from "react";
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
import { get } from "@/hooks/useSubmit";
import { INNOVATION_PREFIX } from "@/lib/constants/api.contants";
import { useParams } from "react-router-dom";

const DetailInovasi: React.FC = () => {
  const params = useParams()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    async function fetchData() {
      const res = await get(`${INNOVATION_PREFIX.INDEX}/${params.id}`)
      console.log(res)
      setData(res.data.data)
    }
    if (params.id) fetchData()


  }, [params.id])
  
  console.log(data)
  return (
    <>
      <Navbar />
      <img src={banner} className="h-24 w-full object-cover" />

      <Box className="mt-10 flex flex-col lg:flex-row gap-6 justify-center lg:max-w-6xl px-3 lg:mx-auto w-full">
        <Box className="h-auto w-full lg:w-[40rem]">
          <Swiper
            modules={[Pagination]}
            spaceBetween={4}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="mySwiper">
            {data.images?.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imageUrl}
                  alt={`Product Image ${index + 1}`}
                  className="rounded-lg w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box className="h-auto flex flex-col justify-between">
          <Box className="space-y-5 flex-grow">
            <Text fontSize="sm" fontWeight="semibold">
              Produk Inovasi ITERA
            </Text>
            <Text className="text-xl md:text-3xl font-bold">
              {data?.title}
            </Text>

            <Box className="flex gap-6 items-center">
              <div className="bg-green-500 text-white text-sm font-semibold px-3 py-2 gap-3 rounded-full flex items-center">
                {data?.category}
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
                {data.collaboration?.map((innovator, index) => (
                  <li key={index}>{innovator}</li>
                ))}
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
              {data?.deskripsi}
            </Text>
            <TableContainer className="border mt-5">
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Status Paten</Td>
                    <Td>{data?.status_paten}</Td>
                  </Tr>
                  <Tr>
                    <Td>Tahap Pengembangan</Td>
                    <Td>{data?.development_stage}</Td>
                  </Tr>
                  <Tr>
                    <Td>Nilai TKT</Td>
                    <Td>{data?.score_tkt}</Td>
                  </Tr>
                  <Tr>
                    <Td>Kata kunci Teknologi</Td>
                    <Td>{data?.adventage}</Td>
                  </Tr>
                  <Tr>
                    <Td>Kolaborasi Yang Diinginkan</Td>
                    <Td>{data?.collaboration_details}</Td>
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
            {data.faq?.map((item, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {item?.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{item?.answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion> 
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Footer />
    </>
  );
};

export default DetailInovasi;
