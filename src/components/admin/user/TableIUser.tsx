import React, { useState } from 'react';

import type {
  Categories,
  CategoriesCreate,
  CategoriesUpdate,
} from '@/types/models.type';

import { post, del, put } from '@/hooks/useSubmit';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
// import useDataFetch from '@/hooks/useFetchData';
// import { ResponseApi } from '@/lib/types/api.type';
import { CATEGORY_PREFIX } from '@/lib/constants/api.contants';
import OverlaySpinner from '@/components/Loading/OverlayLoading';
import Table from '@/components/Table';
import SearchQuery from '@/components/Form/SearchQuery';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import FormCategories from '@/components/admin/categories/FormCategories';

const columns = [
  { key: 'name', label: 'Nama User' },
  { key: 'role', label: 'Role' }, 
];

const searchFields = [{ key: 'name', label: 'Nama Inovasi' }];

const TableUser: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<CategoriesUpdate | null>(
    null,
  );

  // const { data, loading, error, updateParams, refetch, params } = useDataFetch<
  //   ResponseApi<Categories>
  // >(`${CATEGORY_PREFIX.INDEX}`, { page: 1, perPage: 10 });
  const data = {
    requestId: 'string',
    requestTime: 'string',
    data: [
      {
        id: 'string',
        name: 'string',
        description: 'string',
        type: 'string',
      },
    ],
    pagination: {
      total: 10,
      perPage: 10,
      page: 1,
    },
  };
  const loading = false;
  const error = null;
  const updateParams = (newparams) => {};
  const refetch = () => {};
  const params = {};

  const handleSearch = (criteria: Record<string, string>) => {
    updateParams({ ...criteria, page: 1 });
  };

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    updateParams({ ...params, sort: column, order: direction });
  };

  const handlePageChange = (page: number) => {
    updateParams({ ...params, page });
  };

  const handleSubmit = async (values: CategoriesCreate | CategoriesUpdate) => {
    try {
      if (initialValues) {
        // delete email
        const result = await put<Categories>({
          url: `${CATEGORY_PREFIX.EDIT}/${initialValues.id}`,
          data: values,
        });
        refetch();
        toast.success(`Categories ${result?.data.title} updated successfully`);
        setIsModalOpen(false);
      } else {
        const result = await post<Categories>({
          url: `${CATEGORY_PREFIX.CREATE}`,
          data: values,
        });

        refetch();
        toast.success(`Categories ${result?.data.title} created successfully`);
        setIsModalOpen(false);
      }
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || 'Failed to create Categories',
        );
        return;
      }
      toast.error('Failed to create Categories');
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await del<Categories>(`${CATEGORY_PREFIX.DELETE}/${id}`);
      refetch();
      toast.success(`Categories ${id} deleted successfully`);
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || 'Failed to delete Categories',
        );
        return;
      }
      toast.error('Failed to delete Categories');
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
            Math.ceil(data?.pagination?.total! / data?.pagination?.perPage!) ||
            1
          }
          onPageChange={handlePageChange}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Tambah Categories"
      >
        <FormCategories
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </Modal>
    </>
  );
};

export default TableUser;
