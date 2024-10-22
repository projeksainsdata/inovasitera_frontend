import { useCallback, useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { IconMinus } from "@tabler/icons-react";
import { Dropzone, FileMosaic } from "@files-ui/react";
import Layout from "@/components/admin/layoutAdmin/LayoutAdmin";
import * as Yup from "yup";
import useCategories from "@/hooks/useCategories";
import OverlaySpinner from "@/components/Loading/OverlayLoading";
import { get, post, put, UploadImage, UploadImageBatch } from "@/hooks/useSubmit";
import { INNOVATION_PREFIX } from "@/lib/constants/api.contants";
import { useNavigate, useParams } from "react-router-dom";
import { urlsToFiles, urlToFile } from "@/utils/UrlFile";

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
    faq: Yup.array().of(
        Yup.object().shape({
            question: Yup.string().required(),
            answer: Yup.string()
        })
    ).optional(),
});


const initialFormValues = {
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
        { question: "Kapan inovasi ini mulai dikembangkan dan kapan akan diluncurkan?", answer: "" },
        { question: "Di mana inovasi ini akan digunakan?", answer: "" },
        { question: "Siapa target pasar atau pengguna?", answer: "" },
        { question: "Bagaimana produk ini diakses atau digunakan?", answer: "" }
    ]
};


const AdminDetailInovasi = () => {
    const [files, setFiles] = useState<any[]>([]);
    const { data: categories, loading: categoriesLoading } = useCategories();
    const [loadingData, setLoadingData] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useToast();


    const fetchInnovationData = useCallback(async () => {
        if (!id) return;
        setLoadingData(true);
        try {
            const res = await get(`${INNOVATION_PREFIX.INDEX}/${id}`);
            const { _id, user_id, rating, createdAt, updatedAt, __v, ...innovationData } = res?.data;

            const fileObjects = await urlsToFiles(innovationData.images);
            setFiles(fileObjects);

            if (innovationData.thumbnail) {
                const thumbnailFile = await urlToFile(innovationData.thumbnail);
                setFiles(prev => [...prev, thumbnailFile]);
            }

            return {
                ...innovationData,
                category: innovationData.category._id,
            };
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch innovation data',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"top-right"
            });
        } finally {
            setLoadingData(false);
        }
    }, [id, toast]);

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const updatedValues = { ...values };

                if (Array.isArray(values.images)) {
                    const imagesToUpload = values.images.filter(image => image instanceof File);
                    if (imagesToUpload.length > 0) {
                        const uploadedImages = await handleImageUpload(imagesToUpload);
                        updatedValues.images = [
                            ...values.images.filter(image => typeof image === 'string'),
                            ...uploadedImages
                        ];
                    }
                }

                if (values.thumbnail instanceof File) {
                    updatedValues.thumbnail = await handleThumbnailUpload(values.thumbnail);
                }

                const result = id
                    ? await put({ url: `${INNOVATION_PREFIX.INDEX}/${id}`, data: updatedValues })
                    : await post({ url: `${INNOVATION_PREFIX.CREATE}`, data: updatedValues });

                toast({
                    title: 'Success',
                    description: `Innovation ${result?.data.name} has been ${id ? 'updated' : 'created'} successfully`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position:"top-right"
                });

                navigate(`/inovasi/${result?.data._id}`);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: error.message || "An error occurred",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position:"top-right"
                });
            }
        },
    });

    useEffect(() => {
        fetchInnovationData().then(data => {
            if (data) formik.setValues(data);
        });
    }, [fetchInnovationData]);


    const handleImageUpload = async (images: File[]) => {
        try {
            const response = await UploadImageBatch({ files: images });
            return response.map(res => res.url || "");
        } catch (error) {
            throw error;
        }
    };

    const handleThumbnailUpload = async (thumbnail: File) => {
        try {
            const response = await UploadImage({ file: thumbnail });
            return response.url || "";
        } catch (error) {
            throw error;
        }
    };

    const updateFiles = (incomingFiles: any[]) => {
        const newFiles = [...files, ...incomingFiles];
        setFiles(newFiles);
        formik.setFieldValue("images", newFiles.map(file => file.file || file.url));
        if (!formik.values.thumbnail) {
            formik.setFieldValue("thumbnail", incomingFiles[0]?.file || incomingFiles[0]?.url || "");
        }
    };

    const removeFile = (id: string) => {
        const updatedFiles = files.filter((x: any) => x.id !== id);
        setFiles(updatedFiles);
        formik.setFieldValue("images", updatedFiles.map(file => file.file || file.url));
        if (formik.values.thumbnail && files.find(f => f.id === id)?.file === formik.values.thumbnail) {
            formik.setFieldValue("thumbnail", updatedFiles[0]?.file || updatedFiles[0]?.url || "");
        }
    };

    if (loadingData || categoriesLoading) {
        return <OverlaySpinner show />;
    }


    return (
        <Layout>
            <Box className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h1>{id ? 'Update' : 'Create'} Innovation</h1>
                <ButtonGroup className="z-40">
                    <Button colorScheme="red" variant="outline" size="md" onClick={formik.resetForm}>
                        Reset Form
                    </Button>
                    <Button colorScheme="blue" size="md" onClick={formik.handleSubmit} isLoading={formik.isSubmitting}>
                        {id ? 'Update' : 'Submit'} Innovation
                    </Button>
                </ButtonGroup>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <Box className="space-y-6">
                    <Flex gap={6} direction={{ base: "column", md: "row" }}>
                        <Box className="w-full md:w-6/12 space-y-6" order={{ base: 1, md: 2 }}>
                            <h1 className="text-xl font-black mb-3">Upload Gambar Inovasi</h1>
                            <Dropzone
                                onChange={updateFiles}
                                value={files}
                                maxFiles={10}
                                accept="image/*"
                            >
                                {files.map((file) => (
                                    <FileMosaic
                                        key={file.id}
                                        {...file}
                                        onDelete={removeFile}
                                        info
                                        preview

                                    />
                                ))}
                            </Dropzone>
                        </Box>
                        <Box className="w-full h-fit md:w-6/12 p-4 border rounded" order={{ base: 2, md: 1 }}>
                            <h1 className="text-xl font-black mb-3">Deskripsi Inovasi</h1>

                            {/* Title Field */}
                            <FormControl
                                isInvalid={formik.touched.title && !!formik.errors.title}
                                mb={4}
                            >
                                <FormLabel>Nama Inovasi</FormLabel>
                                <Input
                                    {...formik.getFieldProps("title")}
                                    placeholder="Masukkan nama inovasi"
                                />
                                <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                            </FormControl>

                            {/* Category Field */}
                            <FormControl
                                isInvalid={formik.touched.category && !!formik.errors.category}
                                mb={4}
                            >
                                <FormLabel>Kategori</FormLabel>
                                <Select {...formik.getFieldProps("category")} placeholder="Pilih kategori" >
                                    {categories?.map((category: any) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
                            </FormControl>

                            {/* Description Field */}
                            <FormControl
                                isInvalid={formik.touched.description && !!formik.errors.description}
                                mb={4}
                            >
                                <FormLabel>Deskripsi</FormLabel>
                                <Textarea
                                    {...formik.getFieldProps("description")}
                                    placeholder="Masukkan deskripsi inovasi"
                                />
                                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                            </FormControl>

                            {/* Adventage Field */}
                            <FormControl
                                isInvalid={formik.touched.adventage && !!formik.errors.adventage}
                                mb={4}
                            >
                                <FormLabel>Kelebihan Inovasi</FormLabel>
                                <Textarea
                                    {...formik.getFieldProps("adventage")}
                                    placeholder="Jelaskan kelebihan inovasi"
                                />
                                <FormErrorMessage>{formik.errors.adventage}</FormErrorMessage>
                            </FormControl>

                            {/* Innovators (Dynamic Input Fields) */}
                            <Box mb={4}>
                                <HStack justify="between">
                                    <FormLabel>Daftar Innovator</FormLabel>
                                    <Button
                                        colorScheme="blue"
                                        onClick={() => formik.setFieldValue("collaboration", [...formik.values.collaboration, ""])}
                                        size="sm"
                                    >
                                        Tambah Innovator
                                    </Button>
                                </HStack>
                                {formik.values.collaboration.map((_, index) => (
                                    <HStack key={index} mb={2} mt={2}>
                                        <FormControl
                                            isInvalid={
                                                formik.touched.collaboration?.[index] &&
                                                !!formik.errors.collaboration?.[index]
                                            }
                                        >
                                            <Input
                                                {...formik.getFieldProps(`collaboration[${index}]`)}
                                                placeholder="Masukkan nama innovator"
                                            />
                                            <FormErrorMessage>
                                                {(formik.errors.collaboration?.[index] as string)}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <IconButton
                                            size="xs"
                                            colorScheme="red"
                                            icon={<IconMinus />}
                                            onClick={() => {
                                                const newCollaboration = [...formik.values.collaboration];
                                                newCollaboration.splice(index, 1);
                                                formik.setFieldValue("collaboration", newCollaboration);
                                            }}
                                            isDisabled={formik.values.collaboration.length === 1}
                                            aria-label="Remove Innovator"
                                        />
                                    </HStack>
                                ))}
                            </Box>
                        </Box>
                    </Flex>

                    {/* Additional Sections */}
                    <Flex gap={6} direction={{ base: "column", md: "row" }}>
                        <Box className="w-full h-fit md:w-6/12 p-4 border rounded">
                            <h1 className="text-xl font-black mb-3">Informasi Penting</h1>

                            {/* Status Paten */}
                            <FormControl
                                isInvalid={formik.touched.status_paten && !!formik.errors.status_paten}
                                mb={4}
                            >
                                <FormLabel>Status Paten</FormLabel>
                                <Select {...formik.getFieldProps("status_paten")} placeholder="Pilih Status Paten">
                                    <option value="terdaftar">Terdaftar</option>
                                    <option value="tidakTerdaftar">Tidak Terdaftar</option>
                                </Select>
                                <FormErrorMessage>{formik.errors.status_paten}</FormErrorMessage>
                            </FormControl>

                            {/* Development Stage */}
                            <FormControl
                                isInvalid={formik.touched.development_stage && !!formik.errors.development_stage}
                                mb={4}
                            >
                                <FormLabel>Tahap Pengembangan</FormLabel>
                                <Select {...formik.getFieldProps("development_stage")} placeholder="Pilih Tahap Pengembangan">
                                    <option value="penelitian">Penelitian</option>
                                    <option value="prototipe">Prototipe</option>
                                    <option value="produksi">Produksi</option>
                                </Select>
                                <FormErrorMessage>{formik.errors.development_stage}</FormErrorMessage>
                            </FormControl>

                            {/* Score TKT */}
                            <FormControl
                                isInvalid={formik.touched.score_tkt && !!formik.errors.score_tkt}
                                mb={4}
                            >
                                <FormLabel>Nilai TKT</FormLabel>
                                <Input
                                    {...formik.getFieldProps("score_tkt")}
                                    placeholder="Masukkan Nilai TKT (1-9)"
                                    type="text  "
                                />
                                <FormErrorMessage>{formik.errors.score_tkt}</FormErrorMessage>
                            </FormControl>

                            {/* Collaboration Details */}
                            <FormControl
                                isInvalid={formik.touched.collaboration_details && !!formik.errors.collaboration_details}
                                mb={4}
                            >
                                <FormLabel>Kolaborasi Yang Diinginkan</FormLabel>
                                <Textarea
                                    {...formik.getFieldProps("collaboration_details")}
                                    placeholder="Masukkan jenis kolaborasi yang diinginkan"
                                />
                                <FormErrorMessage>{formik.errors.collaboration_details}</FormErrorMessage>
                            </FormControl>
                        </Box>

                        {/* FAQ */}
                        <Box className="w-full md:w-6/12 p-4 border rounded">
                            <h1 className="text-xl font-black mb-3">Pertanyaan Terkait Inovasi</h1>

                            {formik.values.faq.map((_, index) => (
                                <FormControl
                                    key={index}
                                    isInvalid={formik.touched.faq?.[index]?.answer && !!formik.errors.faq?.[index]?.answer}
                                    mb={4}
                                >
                                    <Input
                                        {...formik.getFieldProps(`faq[${index}].question`)}
                                        placeholder="Pertanyaan"
                                        isReadOnly={index < 6} // Make the first 6 questions read-only
                                    />

                                    <Textarea
                                        {...formik.getFieldProps(`faq[${index}].answer`)}
                                        placeholder="Jawaban"
                                        mt={2}
                                    />
                                    <FormErrorMessage>{(formik.errors.faq?.[index] as any)?.answer}</FormErrorMessage>
                                </FormControl>
                            ))}

                            <Button
                                mt={4}
                                colorScheme="blue"
                                onClick={() => formik.setFieldValue("faq", [...formik.values.faq, { question: "", answer: "" }])}
                            >
                                Tambah Pertanyaan
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            </form>
        </Layout>
    );
};

export default AdminDetailInovasi;