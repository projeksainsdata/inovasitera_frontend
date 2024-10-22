import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  IconButton,
  Select,
  HStack,
  FormErrorMessage,
  ButtonGroup,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IconMinus } from "@tabler/icons-react";
import { Dropzone, FileMosaic } from "@files-ui/react";
import Layout from "@/components/innovator/layoutInnovator/LayoutInnovator";
import TambahInovasii from '@/components/admin/ManajemenProduk/TambahInovasi';
import * as Yup from "yup";
import useCategories from "@/hooks/useCategories";
import OverlaySpinner from "@/components/Loading/OverlayLoading";
import { post, UploadImage, UploadImageBatch } from "@/hooks/useSubmit";
import { INNOVATION_PREFIX } from "@/lib/constants/api.contants";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";

// Validation schema remains the same
const validationSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  category: Yup.string().required(),
  collaboration: Yup.array().optional(),
  adventage: Yup.string().optional(),
  images: Yup.array().optional(),
  thumbnail: Yup.string().required(),
  development_stage: Yup.string().optional(),
  status_paten: Yup.string().optional(),
  score_tkt: Yup.string().optional(),
  collaboration_details: Yup.string().optional(),
  faq: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required(),
        answer: Yup.string(),
      })
    )
    .optional(),
});

const TambahInovasi = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState<any[]>([]);
  const { data, loading } = useCategories();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user?.status === "pending") {
      onOpen();
    }
  }, [user, onOpen]);

  const handleImageUpload = async (images: File[] | FileList) => {
    try {
      const response = await UploadImageBatch({
        files: images,
      });
      return response.map((res) => res.url || "");
    } catch (error) {
      throw error;
    }
  };

  const handleThumbnailUpload = async (thumbnail: File) => {
    try {
      const response = await UploadImage({
        file: thumbnail,
      });
      return response.url || "";
    } catch (error) {
      throw error;
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      collaboration: [""],
      adventage: "",
      images: [],
      thumbnail: "",
      development_stage: "",
      status_paten: "",
      score_tkt: "",
      collaboration_details: "",
      faq: [
        { question: "Apa produk inovasi yang sedang dikembangkan?", answer: "" },
        { question: "Mengapa produk inovasi ini diperlukan?", answer: "" },
        {
          question: "Kapan inovasi ini mulai dikembangkan dan kapan akan diluncurkan?",
          answer: "",
        },
        { question: "Di mana inovasi ini akan digunakan?", answer: "" },
        { question: "Siapa target pasar atau pengguna?", answer: "" },
        { question: "Bagaimana produk ini diakses atau digunakan?", answer: "" },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const updatedValues = { ...values };


        if (values.images instanceof FileList || Array.isArray(values.images)) {
          updatedValues.images = await handleImageUpload(values.images);
        }

        // check if updatedValues.images  is an array get the first image as thumbnail and delete it from images
        if (Array.isArray(updatedValues.images) && updatedValues.images.length > 0) {
          updatedValues.thumbnail = updatedValues.images[0];
          updatedValues.images.shift();
        }
        const result = await post({
          url: `${INNOVATION_PREFIX.CREATE}`,
          data: updatedValues,
        });

        toast({
          title: "Success",
          description: `Data ${result?.data.name} berhasil ditambahkan`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position:"top-right"
        });

        navigate(`/inovasi/${result?.data._id}`);
      } catch (error: any) {
        const errorMessage = isAxiosError(error)
          ? error.response?.data.message || "Failed to upload image"
          : error.message || "An error occurred";

        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
          position:"top-right"
        });
      }
    },
  });

  const updateFiles = (incomingFiles: any[]) => {
    setFiles(incomingFiles);
    formik.setFieldValue(
      "images",
      incomingFiles.map((file) => file.file)
    );

  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((x: any) => x.id !== id);
    setFiles(updatedFiles);
    formik.setFieldValue(
      "images",
      updatedFiles.map((file) => file.file)
    );

  };

  const resetForm = () => {
    formik.resetForm();
    setFiles([]);
  };

  if (loading) {
    return <OverlaySpinner show />;
  }

  if (user?.status != "active") {
    return (
      <Layout>
        <Modal isOpen={true} onClose={() => navigate("/")}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Akun {user?.status}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Akun Anda dalam status {user?.status}. Anda tidak dapat mengunggah inovasi saat ini.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => navigate("/")}>
                Kembali ke Beranda
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    );
  }

  return (
    <Layout>
      <TambahInovasii />
    </Layout>
  );
};

export default TambahInovasi;
