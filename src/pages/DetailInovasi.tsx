import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  IconMicroscope,
} from "@tabler/icons-react";
import "swiper/css";
import "swiper/css/pagination";

import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { get, post } from "@/hooks/useSubmit";
import {
  INNOVATION_PREFIX,
  RATINGS_PREFIX,
  WHITELIST_PREFIX,
} from "@/lib/constants/api.contants";
import { useAuth } from "@/hooks/useAuth";

import banner from "../assets/HeroPage.png";
import Rating from "@/components/Rating";
import { isAxiosError } from "axios";

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

const DetailInovasi: React.FC = () => {
  const [data, setData] = useState<any>({});
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await get(`${INNOVATION_PREFIX.INDEX}/${params.id}`);
        console.log(res);
        if (res?.data.status != "approved") {
          navigate("/404");
        } else {
          setData(res?.data);
        }
      } catch (err) {
        navigate("/404");
      }
    }

    fetchData();
  }, [params.id]);

  const avgRating = Math.floor(
    data?.rating?.reduce((acc: number, rating: any) => acc + rating.rating, 0) /
      (data?.rating?.length || 1)
  );

  const addWhitelist = async () => {
    try {
      await post({
        url: WHITELIST_PREFIX.CREATE,
        data: {
          inovation_id: data._id,
        },
      });
      toast({
        title: "Added to Wishlist",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error;
        if (response?.data?.message) {
          toast({
            title: response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          return;
        }
      }

      toast({
        title: "Error adding to Wishlist",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number().min(1).max(5).required("Rating is required"),
      comment: Yup.string().required("Comment is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await post({
          url: RATINGS_PREFIX.CREATE,
          data: {
            ...values,
            inovation_id: data._id,
          },
        });
        toast({
          title: "Rating submitted",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        resetForm();
        // Refresh data after submitting
        const res = await get(`${INNOVATION_PREFIX.INDEX}/${params.id}`);
        setData(res?.data);
      } catch (error) {
        if (isAxiosError) {
          const { response } = error;
          if (response?.data?.message) {
            toast({
              title: response.data.message,
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });
            return;
          }
        }
        toast({
          title: "Error submitting rating",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    },
  });

  return (
    <>
      <Navbar />
      <img
        src={banner}
        className="h-24 w-full object-cover"
        alt="Hero Banner"
      />
      <Box as="main" maxWidth="6xl" margin="auto" padding={6}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={6}
          className="items-center"
        >
          <Box className="h-auto w-full lg:w-6/12 border rounded">
            <Swiper
              modules={[Pagination]}
              spaceBetween={4}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="rounded-lg overflow-hidden"
            >
              {data?.thumbnail && (
                <SwiperSlide>
                  <Box height="400px">
                    <img
                      src={data.thumbnail}
                      alt="Product Thumbnail"
                      className="w-full h-full object-contain"
                    />
                  </Box>
                </SwiperSlide>
              )}
              {data?.images?.map((imageUrl: string, index: number) => (
                <SwiperSlide key={index}>
                  <Box height="400px">
                    <img
                      src={imageUrl}
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          <Box flex={1} className="space-y-4">
            <Text fontSize="sm" fontWeight="semibold" color="gray.600">
              Produk Inovasi ITERA
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {data?.title}
            </Text>

            <Flex alignItems="center" gap={4}>
              <Box
                bg="green.500"
                color="white"
                px={3}
                py={2}
                borderRadius="full"
              >
                <Text fontSize="sm" fontWeight="semibold">
                  {data?.category?.name}
                </Text>
              </Box>
              <Flex alignItems="center">
                <StarRating rating={avgRating} />
                <Text ml={2} color="gray.600">
                  ({data?.rating?.length})
                </Text>
              </Flex>
            </Flex>

            <Box bg="gray.100" p={4} borderRadius="md">
              <Text
                fontWeight="semibold"
                mb={2}
                className="flex items-center gap-3"
              >
                <IconMicroscope />
                Innovator
              </Text>
              <VStack align="stretch" spacing={1}>
                {data?.collaboration?.map(
                  (innovator: string, index: number) => (
                    <Text key={index}>
                      {index + 1}. {innovator}
                    </Text>
                  )
                )}
              </VStack>
            </Box>

            <Flex gap={4}>
              <Button
                onClick={auth.user ? addWhitelist : () => navigate("/login")}
                colorScheme="blue"
                variant="outline"
                flex={1}
              >
                Tambah ke Favorit
              </Button>
              <Button colorScheme="blue" flex={1}>
                Hubungi Inovator
              </Button>
            </Flex>
          </Box>
        </Flex>

        <Tabs variant="enclosed" mt={10}>
          <TabList>
            <Tab>
              <IconInfoCircle size={16} />
              <Text ml={2} className="font-bold">
                Deskripsi
              </Text>
            </Tab>
            <Tab>
              <IconMessageCircle size={16} />
              <Text ml={2} className="font-bold">
                Ulasan
              </Text>
            </Tab>
            <Tab>
              <IconZoomQuestion size={16} />
              <Text ml={2} className="font-bold">
                Pertanyaan
              </Text>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack align="stretch" spacing={6}>
                <Text className="leading-8">{data?.description}</Text>
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
              <Flex direction={{ base: "column", md: "row" }} gap={6}>
                {auth.user ? (
                  <Box flex={1}>
                    <form onSubmit={formik.handleSubmit}>
                      <VStack
                        spacing={4}
                        align="stretch"
                        className="border p-4 rounded-lg shadow"
                      >
                        <h1 className="text-lg font-bold">
                          Berikan Rating & Ulasan Anda
                        </h1>
                        <FormControl
                          isInvalid={
                            formik.touched.rating && !!formik.errors.rating
                          }
                        >
                          <FormLabel>Rating</FormLabel>
                          <Rating
                            value={formik.values.rating}
                            onChange={(value) =>
                              formik.setFieldValue("rating", value)
                            }
                          />
                        </FormControl>
                        <FormControl
                          isInvalid={
                            formik.touched.comment && !!formik.errors.comment
                          }
                        >
                          <FormLabel>Ulasan</FormLabel>
                          <Textarea
                            {...formik.getFieldProps("comment")}
                            placeholder="Write your comment here..."
                          />
                        </FormControl>
                        <Button type="submit" colorScheme="yellow">
                          Post Comment
                        </Button>
                      </VStack>
                    </form>
                  </Box>
                ) : (
                  <Box flex={1}>
                    <Text mb={4}>
                      Anda harus login terlebih dahulu untuk memberikan ulasan
                    </Text>
                    <Button
                      onClick={() => navigate("/login")}
                      colorScheme="blue"
                    >
                      Login
                    </Button>
                  </Box>
                )}

                <Box flex={1}>
                  <Text fontSize="lg" mb={4} fontWeight="bold">
                    Semua Ulasan ({data?.rating?.length})
                  </Text>
                  <VStack spacing={4} align="stretch">
                    {data?.rating?.map((rating: any, index: number) => (
                      <Box key={index} p={4} bg="gray.50" borderRadius="md">
                        <Flex gap={4}>
                          <Avatar
                            name={rating?.user_id?.fullname}
                            src={
                              rating?.user_id?.profile ||
                              "https://bit.ly/dan-abramov"
                            }
                          />
                          <Box>
                            <Text fontWeight="bold">
                              {rating?.user_id?.fullname}
                            </Text>
                            <StarRating rating={rating.rating} size={16} />
                            <Text mt={2}>{rating.comment}</Text>
                            <Text fontSize="sm" color="gray.500" mt={1}>
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </Flex>
            </TabPanel>

            <TabPanel>
              <Text fontSize="xl" fontWeight="semibold" mb={4}>
                Pertanyaan yang sering diajukan
              </Text>
              <Accordion allowToggle>
                {data?.faq?.map((item: any, index: number) => (
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
      </Box>
      <Footer />
    </>
  );
};

export default DetailInovasi;
