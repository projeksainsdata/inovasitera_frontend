/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import type {
  InovationSchema,
  InovationUpdateSchema,
} from '@/types/inovation.type';

import { del, put } from '@/hooks/useSubmit';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import useDataFetch from '@/hooks/useFetchData';
import { ResponseApi } from '@/lib/types/api.type';
import { INNOVATION_PREFIX } from '@/lib/constants/api.contants';
import OverlaySpinner from '@/components/Loading/OverlayLoading';
import Table from '@/components/Table';
import SearchQuery from '@/components/Form/GenericSearch';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import FormInnovation from '@/components/admin/ManajemenProduk/FormManajemenProduk';
import useCategories from '@/hooks/useCategories';

const columns = [
  { key: 'thumbnail', label: 'Gambar', type: 'image' },
  { key: 'title', label: 'Judul Inovasi' },
  { key: 'createdAt', label: 'Tanggal Publikasi', type: "date" },
  { key: 'preview', label: 'Deskripsi', type: 'link' },
  { key: 'status', label: 'Status', type: 'status' },
];


const ManajemenInovasi: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<InovationUpdateSchema | null>(
    null,
  );

  const { data, loading, updateParams, refetch, params } = useDataFetch<
    ResponseApi<InovationSchema>
  >(`${INNOVATION_PREFIX.ADMIN}`, { page: 1, perPage: 10 });
  const { data: categories } = useCategories();
  const searchFields = [
    { key: 'q', label: 'Nama Inovasi' },
    {
      key: 'status', label: 'Status Inovasi', type: 'select', options: [
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
      ]
    },
    {
      key: 'category', label: 'Kategori', type: 'select', options: categories?.map((category) => ({
        value: category.name,
        label: category.name,

      })) || [],
    }];



  const handleSearch = (criteria: Record<string, string>) => {
    updateParams({ ...criteria, page: 1 });
  };

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
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
          ErrorCatch.response?.data.message || 'Failed to create Innovation',
        );
        return;
      }
      toast.error('Failed to create Innovation');
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await del<InovationSchema>(`${INNOVATION_PREFIX.DELETE}/${id}`);
      refetch();
      toast.success(`Innovation ${id} deleted successfully`);
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || 'Failed to delete Innovation',
        );
        return;
      }
      toast.error('Failed to delete Innovation');
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleEdit = (row: any) => {
    setInitialValues(row);
    setIsModalOpen(true);
  };


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
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={data?.pagination?.page || 1}
          totalPages={
            Math.ceil((data?.pagination?.total ?? 0) / (data?.pagination?.perPage ?? 1)) ||
            1
          }
          onPageChange={handlePageChange}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Edit Inovasi"
      >
        <FormInnovation
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </Modal>
    </>
  );
};

export default ManajemenInovasi;
