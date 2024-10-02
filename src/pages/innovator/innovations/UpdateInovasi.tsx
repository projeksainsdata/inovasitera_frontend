import { useState } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
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
  Heading,
  HStack,
  FormErrorMessage,
  ButtonGroup,
} from "@chakra-ui/react";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { Dropzone, FileMosaic } from "@files-ui/react";
import Layout from "@/components/innovator/layoutInnovator/LayoutInnovator";
import * as Yup from "yup";

// Updated validation schema using Yup
const validationSchema = Yup.object({
  namaInovasi: Yup.string().required("Nama Inovasi is required"),
  kategori: Yup.string().required("Kategori is required"),
  deskripsi: Yup.string().required("Deskripsi is required"),
  innovators: Yup.array().of(
    Yup.string().required("Name of Innovator is required")
  ),
  statusPaten: Yup.string().required("Status Paten is required"),
  tahapPengembangan: Yup.string().required("Tahap Pengembangan is required"),
  nilaiTKT: Yup.number()
    .required("Nilai TKT is required")
    .min(1, "Nilai TKT must be at least 1")
    .max(9, "Nilai TKT must be less than or equal to 9"),
  kolaborasi: Yup.string().required("Kolaborasi Yang Diinginkan is required"),
  inovasiPertanyaan: Yup.object({
    apa: Yup.string().required("This field is required"),
    mengapa: Yup.string().required("This field is required"),
    kapan: Yup.string().required("This field is required"),
    dimana: Yup.string().required("This field is required"),
    siapa: Yup.string().required("This field is required"),
    bagaimana: Yup.string().required("This field is required"),
  }),
});

const UpdateInovasi = () => {
  const [files, setFiles] = useState([]);
  const updateFiles = (incomingFiles) => {
    setFiles(incomingFiles);
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  return (
    <Layout>
      <Box className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h1>Update Inovasi ITERA</h1>
        <ButtonGroup className="z-40">
          <Button colorScheme="red" variant={"outline"} size={"md"}>Reset Formulir</Button>
          <Button colorScheme="blue" size={"md"}>Kirim Inovasi</Button>
        </ButtonGroup>
      </Box>
      <Formik
        initialValues={{
          namaInovasi: "",
          kategori: "",
          deskripsi: "",
          innovators: [""],
          statusPaten: "",
          tahapPengembangan: "",
          nilaiTKT: "",
          kolaborasi: "",
          inovasiPertanyaan: {
            apa: "",
            mengapa: "",
            kapan: "",
            dimana: "",
            siapa: "",
            bagaimana: "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {({ values, errors, touched }) => (
          <Box className="space-y-6">
            <Flex gap={6} direction={{ base: "column", md: "row" }}>
              <Box className="w-full md:w-6/12 space-y-6" order={{base:1,md:2}}>
                <h1 className="text-xl font-black mb-3">
                  Upload Gambar Inovasi
                </h1>
                <Dropzone
                  onChange={updateFiles}
                  value={files}
                  maxFiles={10}
                  accept={"image/*"}
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
              <Box className="w-full h-fit md:w-6/12 p-4 border rounded" order={{base:2,md:1}}>
                <Form>
                  <h1 className="text-xl font-black mb-3">Deskripsi Inovasi</h1>
                  {/* Nama Inovasi Field */}
                  <Field name="namaInovasi">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.namaInovasi && form.touched.namaInovasi
                        }
                        mb={4}
                      >
                        <FormLabel>Nama Inovasi</FormLabel>
                        <Input {...field} placeholder="Masukkan nama inovasi" />
                        <FormErrorMessage>
                          {form.errors.namaInovasi}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Kategori Field */}
                  <Field name="kategori">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.kategori && form.touched.kategori
                        }
                        mb={4}
                      >
                        <FormLabel>Kategori</FormLabel>
                        <Select {...field} placeholder="Pilih kategori">
                          <option value="teknologi">Teknologi</option>
                          <option value="kesehatan">Kesehatan</option>
                          <option value="pendidikan">Pendidikan</option>
                          <option value="lainnya">Lainnya</option>
                        </Select>
                        <FormErrorMessage>
                          {form.errors.kategori}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Deskripsi Field */}
                  <Field name="deskripsi">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.deskripsi && form.touched.deskripsi
                        }
                        mb={4}
                      >
                        <FormLabel>Deskripsi</FormLabel>
                        <Textarea
                          {...field}
                          placeholder="Masukkan deskripsi inovasi"
                        />
                        <FormErrorMessage>
                          {form.errors.deskripsi}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Innovators (Dynamic Input Fields) */}
                  <FieldArray name="innovators">
                    {({ insert, remove, push }) => (
                      <Box mb={4}>
                        <HStack justify={"between"}>
                          <FormLabel>Daftar Innovator</FormLabel>
                          <Button
                            colorScheme="blue"
                            onClick={() => push("")}
                            size={"sm"}
                          >
                            Tambah Innovator
                          </Button>
                        </HStack>
                        {values.innovators.length > 0 &&
                          values.innovators.map((innovator, index) => (
                            <HStack key={index} mb={2} mt={2}>
                              <Field name={`innovators.${index}`}>
                                {({ field, form }) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.innovators?.[index] &&
                                      form.touched.innovators?.[index]
                                    }
                                  >
                                    <Input
                                      {...field}
                                      placeholder="Masukkan nama innovator"
                                    />
                                    <FormErrorMessage>
                                      {form.errors.innovators?.[index]}
                                    </FormErrorMessage>
                                  </FormControl>
                                )}
                              </Field>
                              <IconButton
                                size={"xs"}
                                colorScheme="red"
                                icon={<IconMinus />}
                                onClick={() => remove(index)}
                                isDisabled={values.innovators.length === 1} // Disable removal if there's only one field
                              />
                            </HStack>
                          ))}
                      </Box>
                    )}
                  </FieldArray>
                </Form>
              </Box>
            </Flex>

            {/* Additional Sections */}
            <Flex gap={6} direction={{ base: "column", md: "row" }}>
              <Box className="w-full h-fit md:w-6/12 p-4 border rounded">
                <h1 className="text-xl font-black mb-3">Informasi Penting</h1>

                {/* Status Paten */}
                <Field name="statusPaten">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.statusPaten && form.touched.statusPaten}
                      mb={4}
                    >
                      <FormLabel>Status Paten</FormLabel>
                      <Select {...field} placeholder="Pilih Status Paten">
                        <option value="terdaftar">Terdaftar</option>
                        <option value="tidakTerdaftar">Tidak Terdaftar</option>
                      </Select>
                      <FormErrorMessage>
                        {form.errors.statusPaten}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Tahap Pengembangan */}
                <Field name="tahapPengembangan">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.tahapPengembangan && form.touched.tahapPengembangan}
                      mb={4}
                    >
                      <FormLabel>Tahap Pengembangan</FormLabel>
                      <Select {...field} placeholder="Pilih Tahap Pengembangan">
                        <option value="penelitian">Penelitian</option>
                        <option value="prototipe">Prototipe</option>
                        <option value="produksi">Produksi</option>
                      </Select>
                      <FormErrorMessage>
                        {form.errors.tahapPengembangan}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Nilai TKT */}
                <Field name="nilaiTKT">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.nilaiTKT && form.touched.nilaiTKT}
                      mb={4}
                    >
                      <FormLabel>Nilai TKT</FormLabel>
                      <Input
                        {...field}
                        placeholder="Masukkan Nilai TKT (1-9)"
                        type="number"
                      />
                      <FormErrorMessage>
                        {form.errors.nilaiTKT}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Kolaborasi Field */}
                <Field name="kolaborasi">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.kolaborasi && form.touched.kolaborasi}
                      mb={4}
                    >
                      <FormLabel>Kolaborasi Yang Diinginkan</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Masukkan jenis kolaborasi yang diinginkan"
                      />
                      <FormErrorMessage>
                        {form.errors.kolaborasi}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>

              {/* Pertanyaan terkait inovasi */}
              <Box className="w-full md:w-6/12 p-4 border rounded">
                <h1 className="text-xl font-black mb-3">Pertanyaan Terkait Inovasi</h1>

                <Field name="inovasiPertanyaan.apa">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.inovasiPertanyaan?.apa && form.touched.inovasiPertanyaan?.apa}
                      mb={4}
                    >
                      <FormLabel>Apa produk inovasi yang sedang dikembangkan?</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Jelaskan produk inovasi"
                      />
                      <FormErrorMessage>
                        {form.errors.inovasiPertanyaan?.apa}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="inovasiPertanyaan.mengapa">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.inovasiPertanyaan?.mengapa && form.touched.inovasiPertanyaan?.mengapa}
                      mb={4}
                    >
                      <FormLabel>Mengapa produk inovasi ini diperlukan?</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Jelaskan alasan inovasi"
                      />
                      <FormErrorMessage>
                        {form.errors.inovasiPertanyaan?.mengapa}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="inovasiPertanyaan.kapan">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.inovasiPertanyaan?.kapan && form.touched.inovasiPertanyaan?.kapan}
                      mb={4}
                    >
                      <FormLabel>Kapan inovasi ini mulai dikembangkan dan kapan akan diluncurkan?</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Jelaskan timeline inovasi"
                      />
                      <FormErrorMessage>
                        {form.errors.inovasiPertanyaan?.kapan}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="inovasiPertanyaan.dimana">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.inovasiPertanyaan?.dimana && form.touched.inovasiPertanyaan?.dimana}
                      mb={4}
                    >
                      <FormLabel>Di mana inovasi ini akan digunakan?</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Jelaskan area penerapan inovasi"
                      />
                      <FormErrorMessage>
                        {form.errors.inovasiPertanyaan?.dimana}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="inovasiPertanyaan.siapa">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.inovasiPertanyaan?.siapa && form.touched.inovasiPertanyaan?.siapa}
                      mb={4}
                    >
                      <FormLabel>Siapa target pasar atau pengguna?</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Jelaskan target pasar"
                      />
                      <FormErrorMessage>
                        {form.errors.inovasiPertanyaan?.siapa}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="inovasiPertanyaan.bagaimana">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.inovasiPertanyaan?.bagaimana && form.touched.inovasiPertanyaan?.bagaimana}
                      mb={4}
                    >
                      <FormLabel>Bagaimana produk ini diakses atau digunakan?</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Jelaskan cara kerja inovasi"
                      />
                      <FormErrorMessage>
                        {form.errors.inovasiPertanyaan?.bagaimana}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>
          </Box>
        )}
      </Formik>
    </Layout>
  );
};

export default UpdateInovasi;
