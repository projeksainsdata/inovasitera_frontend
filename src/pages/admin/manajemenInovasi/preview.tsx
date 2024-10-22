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
  Flex,
  Link,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  IconStarFilled,
  IconZoomQuestion,
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
      <Box as="main" margin="auto">
        <Box className="space-y-3">
          <Flex className="w-full justify-between">
            <Link href="/admin/manajemen-inovasi">
              <Button colorScheme="orange">Kembali</Button>
            </Link>
          </Flex>
          <h1 className="text-xl font-bold">Preview Inovasi</h1>
        </Box>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={6}
          className="items-center justify-center"
        >
          <Box className="h-auto w-[30em]">
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
            <Flex gap={4}>
              <Flex alignItems="center" gap={4}>
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
                  ({avgRating})
                </Text>
              </Flex>
            </Flex>
            <Box bg="gray.100" p={3} borderRadius="md">
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
              <Text ml={2} className="font-semibold">
                Deskripsi
              </Text>
            </Tab>
            <Tab>
              <IconZoomQuestion size={16} />
              <Text ml={2} className="font-semibold">
                Pertanyaan
              </Text>
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
