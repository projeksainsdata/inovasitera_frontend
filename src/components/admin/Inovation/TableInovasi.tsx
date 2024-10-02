/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import type {
  InovationSchema,
  InovationCreateSchema,
  InovationUpdateSchema
} from '@/types/inovation.type';

import { post, del, put, UploadImage } from '@/hooks/useSubmit';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import useDataFetch from '@/hooks/useFetchData';
import { ResponseApi } from '@/lib/types/api.type';
import { INNOVATION_PREFIX } from '@/lib/constants/api.contants';
import OverlaySpinner from '@/components/Loading/OverlayLoading';
import Table from '@/components/Table';
import SearchQuery from '@/components/Form/SearchQuery';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import FormInovation from '@/components/admin/Inovation/FormInovation';

const columns = [
  { key: 'title', label: 'Nama Produk Inovasi' },
  { key: 'image', label: 'Image' },
  { key: 'status', label: 'Status' },
  { key: 'description', label: 'Deskripsi' },
  { key: 'average_rating', label: 'Rating' },
];

const searchFields = [{ key: 'name', label: 'Nama Inovasi' }];

const TableInovasi: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<InovationCreateSchema | null>(
    null,
  );

  const { data, loading, error, updateParams, refetch, params } = useDataFetch<
    ResponseApi<InovationSchema>
  >(`${INNOVATION_PREFIX.INDEX}`, { page: 1, perPage: 10 });

  const handleSearch = (criteria: Record<string, string>) => {
    updateParams({ ...criteria, page: 1 });
  };

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    updateParams({ ...params, sort: column, order: direction });
  };

  const handlePageChange = (page: number) => {
    updateParams({ ...params, page });
  };

  const handleSubmit = async (values: InovationCreateSchema | InovationUpdateSchema) => {
    try {

      if (values.Image && values.Image instanceof File) {
        try {
          const responseImage = await UploadImage(values.Image);
          values.Image = responseImage.data.fileUrl
        } catch (error) {
          toast.error('Error saat mengupload image');
          return;
        }
      }
      if (initialValues) {
        // delete email
        const result = await put<InovationSchema, InovationUpdateSchema>({
          url: `${INNOVATION_PREFIX.EDIT}/${initialValues._id}`,
          data: values as InovationUpdateSchema,
        });
        refetch();
        toast.success(`InovationSchema ${result?.data.title} updated successfully`);
        setIsModalOpen(false);
      } else {
        const result = await post<InovationSchema, InovationCreateSchema>({
          url: `${INNOVATION_PREFIX.CREATE}`,
          data: values as InovationCreateSchema,
        });

        refetch();
        toast.success(`InovationSchema ${result?.data.title} created successfully`);
        setIsModalOpen(false);
      }
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || 'Failed to create InovationSchema',
        );
        return;
      }
      toast.error('Failed to create InovationSchema');
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await del<InovationSchema>(`${INNOVATION_PREFIX.DELETE}/${id}`);
      refetch();
      toast.success(`InovationSchema ${id} deleted successfully`);
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || 'Failed to delete InovationSchema',
        );
        return;
      }
      toast.error('Failed to delete InovationSchema');
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleEdit = (row: any) => {
    setInitialValues(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setInitialValues(null);
    setIsModalOpen(true);
  };

  if (loading) return <OverlaySpinner show={loading} />;
  if (error) toast.error(error.message);

  return (
    <>
      <div>
        <h1 className="mb-4 text-2xl font-semibold">Inovasi Management</h1>
        <div className="mb-4">
          <button
            onClick={handleAdd}
            className="w-52 shrink rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Tambah Inovasi
          </button>
        </div>
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
        title="Tambah InovationSchema"
      >
        <FormInovation
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </Modal>
    </>
  );
};

export default TableInovasi;
