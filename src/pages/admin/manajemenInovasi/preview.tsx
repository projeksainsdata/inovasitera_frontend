import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { INNOVATION_PREFIX } from "@/lib/constants/api.contants";
import { InovationResponse } from "@/lib/types/inovation.type";
import LayoutAdmin from "@/components/admin/layoutAdmin/LayoutAdmin";
import useDataFetch from "@/hooks/useFetchData";
import {
  Box,
  Text,
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
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  IconStarFilled,
  IconZoomQuestion,
  IconMessageCircle,
  IconInfoCircle,
} from "@tabler/icons-react";
import "swiper/css";
import "swiper/css/pagination";
import { get, post } from "@/hooks/useSubmit";

const StarRating: React.FC<{ rating: number; size?: number }> = ({
  rating,
  size = 24,
}) => {
  return (
    <Flex>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconStarFilled
          key={star}
          size={size}
          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </Flex>
  );
};

const ManajemenInovasiAdmin = () => {
  const [data, setData] = useState({});
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const res = await get(`${INNOVATION_PREFIX.INDEX}/${params.id}`);
      setData(res?.data);
    }

    fetchData();
  }, [params.id]);

  const avgRating = Math.floor(
    data?.rating?.reduce((acc: number, rating: any) => acc + rating.rating, 0) /
      (data?.rating?.length || 1)
  );

  return (
    <LayoutAdmin>
      <Box as="main" margin="auto" padding={6}>
        <Flex direction={{ base: "column", lg: "row" }} gap={6}>
          <Box className="h-auto w-full lg:w-[15rem]">
            <Swiper
              modules={[Pagination]}
              spaceBetween={4}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="rounded-lg overflow-hidden"
            >
              {data?.thumbnail && (
                <SwiperSlide>
                  <Box>
                    <img
                      src={data.thumbnail}
                      alt="Product Thumbnail"
                      className="w-fit h-full object-contain"
                    />
                  </Box>
                </SwiperSlide>
              )}
              {data?.images?.map((imageUrl: string, index: number) => (
                <SwiperSlide key={index}>
                  <Box>
                    <img
                      src={imageUrl}
                      alt={`Product Image ${index + 1}`}
                      className="w-fit h-full object-contain"
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          <Box flex={1} className="space-y-3">
            <Text fontSize="sm" fontWeight="semibold" color="gray.600">
              Nama Inovasi
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {data?.title}
            </Text>

            <Flex alignItems="center" gap={4}>
              <h1>Kategori</h1>
              <Box
                bg="green.500"
                color="white"
                px={4}
                py={1}
                borderRadius="full"
              >
                <Text fontSize="sm" fontWeight="semibold">
                  {data?.category?.name}
                </Text>
              </Box>
            </Flex>
            <Flex alignItems="center">
              <StarRating rating={avgRating} />
              <Text ml={2} color="gray.600">
                ({data?.rating?.length} Ulasan)
              </Text>
            </Flex>
            <Box bg="gray.100" p={4} borderRadius="md">
              <Text fontWeight="semibold" mb={2}>
                Daftar Innovator
              </Text>
              <VStack align="stretch" spacing={1}>
                {data?.collaboration?.map(
                  (innovator: string, index: number) => (
                    <Text key={index}>{innovator}</Text>
                  )
                )}
              </VStack>
            </Box>
          </Box>
        </Flex>

        <Tabs variant="enclosed" mt={10}>
          <TabList>
            <Tab>
              <IconInfoCircle size={16} />
              <Text ml={2}>Deskripsi</Text>
            </Tab>
            <Tab>
              <IconZoomQuestion size={16} />
              <Text ml={2}>Pertanyaan</Text>
            </Tab>
          </TabList>

          <TabPanels className="border">
            <TabPanel>
              <VStack align="stretch" spacing={6}>
                <Text>{data?.description}</Text>
                <TableContainer>
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td fontWeight="semibold">Status Paten</Td>
                        <Td>{data?.status_paten}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="semibold">Tahap Pengembangan</Td>
                        <Td>{data?.development_stage}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="semibold">Nilai TKT</Td>
                        <Td>{data?.score_tkt}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="semibold">Kelebihan Teknologi</Td>
                        <Td>{data?.adventage}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="semibold">
                          Kolaborasi Yang Diinginkan
                        </Td>
                        <Td>{data?.collaboration_details}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </VStack>
            </TabPanel>

            <TabPanel>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Pertanyaan yang sering diajukan
              </Text>
              <Accordion allowToggle>
                {data?.faq?.map((item: any, index: number) => (
                  <AccordionItem key={index}>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" p={2}>
                          {item?.question}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    <AccordionPanel p={2}>{item?.answer}</AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </LayoutAdmin>
  );
};

export default ManajemenInovasiAdmin;
