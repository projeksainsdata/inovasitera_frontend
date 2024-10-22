/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, ButtonGroup, useToast } from "@chakra-ui/react";
import type {
  InovationSchema,
  InovationUpdateSchema,
} from "@/types/inovation.type";

import { del, put } from "@/hooks/useSubmit";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useDataFetch from "@/hooks/useFetchData";
import { ResponseApi } from "@/lib/types/api.type";
import { INNOVATION_PREFIX } from "@/lib/constants/api.contants";
import OverlaySpinner from "@/components/Loading/OverlayLoading";
import Table from "@/components/Table";
import SearchQuery from "@/components/Form/GenericSearch";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import FormInnovation from "@/components/admin/ManajemenProduk/FormManajemenProduk";
import useCategories from "@/hooks/useCategories";

const columns = [
  { key: "fullname", label: "Nama", type: "text" },
  { key: "thumbnail", label: "Gambar", type: "image" },
  { key: "title", label: "Judul Inovasi" },
  { key: "createdAt", label: "Tanggal Publikasi", type: "date" },
  { key: "average_rating", label: "Rating", type: "rating" },
  { key: "preview", label: "Preview", type: "link" },
  { key: "status", label: "Status", type: "status" },
];

const ManajemenInovasi: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [IDInnovationdelete, setIDInnovationdelete] = useState("");
  const [initialValues, setInitialValues] =
    useState<InovationUpdateSchema | null>(null);

  const { data, loading, updateParams, refetch, params } = useDataFetch<
    ResponseApi<InovationSchema>
  >(`${INNOVATION_PREFIX.ADMIN}`, { page: 1, perPage: 10 });
  const { data: categories } = useCategories();

  //inject role into it
  if(data.data){
    data.data.role="admin"
  }
  const searchFields = [
    { key: "q", label: "Nama Inovasi" },
    {
      key: "status",
      label: "Status Inovasi",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
      ],
    },
    {
      key: "category",
      label: "Kategori",
      type: "select",
      options:
        categories?.map((category) => ({
          value: category.name,
          label: category.name,
        })) || [],
    },
  ];

  const handleSearch = (criteria: Record<string, string>) => {
    updateParams({ ...criteria, page: 1 });
  };

  const handleSort = (column: string, direction: "asc" | "desc") => {
    updateParams({ ...params, sort: column, order: direction });
  };

  const handlePageChange = (page: number) => {
    updateParams({ ...params, page });
  };

  const handleSubmit = async (values: InovationUpdateSchema) => {
    try {
      if (initialValues) {
        // delete email
        const result = await put<InovationSchema, InovationUpdateSchema>({
          url: `${INNOVATION_PREFIX.EDIT}/${initialValues._id}`,
          data: values,
        });
        refetch();
        toast.success(`Innovation ${result?.data.title} updated successfully`);
        setIsModalOpen(false);
      }
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || "Failed to create Innovation"
        );
        return;
      }
      toast.error("Failed to create Innovation");
      setIsModalOpen(false);
    }
  };

  const deleteInnovation = async (id: string | number) => {
    try {
      await del<InovationSchema>(`${INNOVATION_PREFIX.DELETE}/${id}`);
      refetch();
      toast.success(`Innovation ${id} deleted successfully`);
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || "Failed to delete Innovation"
        );
        return;
      }
      toast.error("Failed to delete Innovation");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (row: any) => {
    setInitialValues(row);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    deleteInnovation(IDInnovationdelete)
    closeModal()
  }
  if (loading) return <OverlaySpinner show={loading} />;

  return (
    <>
      <div>
        <h1 className="mb-4 text-2xl font-semibold">Manajemen Inovasi</h1>
        <SearchQuery
          fields={searchFields}
          initialValues={params}
          onSearch={handleSearch}
          onClear={() => updateParams({ page: 1, perPage: 10 })}
        />
        <Table
          columns={columns}
          params={params || {}}
          data={data?.data}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={(id: any)=>{
            setIsDeleteModalOpen(true)
            setIDInnovationdelete(id);
          }}
        />

        <Pagination
          currentPage={data?.pagination?.page || 1}
          totalPages={
            Math.ceil(
              (data?.pagination?.total ?? 0) / (data?.pagination?.perPage ?? 1)
            ) || 1
          }
          onPageChange={handlePageChange}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Inovasi">
        <FormInnovation
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        title="Hapus Inovasi"
      >
        <h1 className="mb-5">Ingin menghapus inovasi?</h1>
        <ButtonGroup>
          <Button colorScheme="red" variant="outline" onClick={handleDelete}>
            Hapus
          </Button>
          <Button colorScheme="blue" onClick={() => closeModal()}>
            Batal
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
};

export default ManajemenInovasi;
