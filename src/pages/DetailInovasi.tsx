import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { IconStarFilled } from "@tabler/icons-react";

const DetailInovasi: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-orange-100 p-3 mt-24">
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
      </div>
      <div className="flex flex-col md:flex-row gap-6 m-5 justify-center">
        <img src={"https://placehold.co/600x600"} className="rounded-lg" />
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">
            Obat Tradisional BioLuric Menjadi Obat Herbal Terstandar
            Antigout/Penurun Asam Urat
          </h1>
          <div className="flex gap-6">
            <span className="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-full mb-2">
              Pangan
            </span>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((x) => (
                <IconStarFilled className="text-yellow-400 text-xl" />
              ))}
              <span className="ml-2 text-xl text-gray-600">(10)</span>
            </div>
          </div>
          <div className="p-3 bg-gray-100 rounded space-y-2">
            <h1 className="font-semibold">Innovator</h1>
            <div>
              <p>Dr John Doe</p>
              <p>Dr John Doe</p>
              <p>Dr John Doe</p>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <Button colorScheme="blue" variant="outline">
              Favorit
            </Button>
            <Button colorScheme="blue">Hubungi Inovator</Button>
          </div>
        </div>
      </div>
      <Tabs variant="enclosed" className="m-5">
        <TabList>
          <Tab className="space-x-2">
            <IconStarFilled size={18}/>
            <span>Deskripsi</span>
          </Tab>
          <Tab>Ulasan</Tab>
          <Tab>Diskusi</Tab>
        </TabList>
        <TabPanels className="border">
          <TabPanel>
            <h3 className="font-semibold">Deskripsi</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              tempora harum, maiores deserunt blanditiis recusandae repudiandae,
              quaerat quisquam, nobis sapiente voluptatum iusto. Officia
              distinctio tempore nobis voluptatum et recusandae error.
            </p>
            <TableContainer className="border border-t-0 mt-5">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <h3 className="font-semibold">Ulasan</h3>
          </TabPanel>
          <TabPanel>
            <h3 className="font-semibold">FAQ</h3>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Footer />
    </>
  );
};

export default DetailInovasi;
