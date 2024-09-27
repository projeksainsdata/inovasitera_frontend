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
import LayoutAdmin from "@/components/admin/layoutAdmin/LayoutAdmin";
import * as Yup from "yup";

// Form validation schema using Yup
const validationSchema = Yup.object({
  namaInovasi: Yup.string().required("Nama Inovasi is required"),
  kategori: Yup.string().required("Kategori is required"),
  deskripsi: Yup.string().required("Deskripsi is required"),
  innovators: Yup.array().of(
    Yup.string().required("Name of Innovator is required")
  ),
});

const TambahInovasi = () => {
  const [files, setFiles] = useState([]);
  const updateFiles = (incomingFiles) => {
    setFiles(incomingFiles);
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  return (
    <LayoutAdmin className="m-4">
      <Box className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h1>Sistem Inovasi ITERA</h1>
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
            <Box className="w-full md:w-6/12 space-y-6">
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
              <Box className="w-full h-fit md:w-6/12 p-4 border rounded">
                <Form>
                  <h1 className="text-xl font-black mb-3">Deskripsi Inovasi</h1>
                  {/* Nama Inovasi Field */}
                  <Field name="judul">
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
            <Flex gap={6} direction={{ base: "column", md: "row" }}>
              <Box className="w-full h-fit md:w-6/12 p-4 border rounded">
                <h1 className="text-xl font-black mb-3">Informasi Penting</h1>

                {/* Kategori Field */}
                <Field name="statuspaten">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.kategori && form.touched.kategori}
                      mb={4}
                    >
                      <FormLabel>Status Paten</FormLabel>
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
                {/* Kategori Tahap Pengembangan */}
                <Field name="statuspaten">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.kategori && form.touched.kategori}
                      mb={4}
                    >
                      <FormLabel>Tahap Pengembangan</FormLabel>
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

                <Field name="nilaiTKT">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.namaInovasi && form.touched.namaInovasi
                      }
                      mb={4}
                    >
                      <FormLabel>Nilai TKT</FormLabel>
                      <Input
                        {...field}
                        placeholder="Masukkan nama inovasi"
                        type="number"
                      />
                      <FormErrorMessage>
                        {form.errors.namaInovasi}
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
                      <FormLabel>Kolaborasi Yang Diinginkan</FormLabel>
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
              </Box>
              <Box className="w-full md:w-6/12 p-4 border rounded">
                <h1 className="text-xl font-black mb-3">
                  Pertanyaan Terkait Inovasi
                </h1>

                <Field name="nilaiTKT">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.namaInovasi && form.touched.namaInovasi
                      }
                      mb={4}
                    >
                      <FormLabel>Apa produk inovasi yang sedang dikembangkan?</FormLabel>
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
                <Field name="nilaiTKT">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.namaInovasi && form.touched.namaInovasi
                      }
                      mb={4}
                    >
                      <FormLabel>Mengapa produk inovasi ini diperlukan?</FormLabel>
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
                <Field name="nilaiTKT">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.namaInovasi && form.touched.namaInovasi
                      }
                      mb={4}
                    >
                      <FormLabel>Kapan produk inovasi ini mulai dikembangkan dan kapan akan diluncurkan?</FormLabel>
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
                <Field name="nilaiTKT">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.namaInovasi && form.touched.namaInovasi
                      }
                      mb={4}
                    >
                      <FormLabel>Di mana produk inovasi ini akan diterapkan atau digunakan?</FormLabel>
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
                <Field name="nilaiTKT">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.namaInovasi && form.touched.namaInovasi
                      }
                      mb={4}
                    >
                      <FormLabel>Siapa yang menjadi target pasar atau pengguna produk inovasi ini?</FormLabel>
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
                {/* Deskripsi Field */}
                <Field name="deskripsi">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.deskripsi && form.touched.deskripsi
                      }
                      mb={4}
                    >
                      <FormLabel>Bagaimana cara kerja produk inovasi ini dan bagaimana produk ini dapat diakses atau digunakan?</FormLabel>
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
              </Box>
            </Flex>
          </Box>
        )}
      </Formik>
    </LayoutAdmin>
  );
};

export default TambahInovasi;
