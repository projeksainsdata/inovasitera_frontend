/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import { post, del, put, UploadImage } from '@/hooks/useSubmit';
import { AxiosError } from 'axios';
import { CATEGORY_PREFIX } from '@/lib/constants/api.contants';
import OverlaySpinner from '@/components/Loading/OverlayLoading';
import Table from '@/components/Table';
import SearchQuery from '@/components/Form/GenericSearch';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import FormCategories from '@/components/admin/categories/FormCategories'
import useDataFetch from '@/hooks/useFetchData';
import { ResponseApi } from '@/lib/types/api.type';
import { Categories, CategoriesCreate, CategoriesUpdate } from '@/lib/types/categories.type';
import { useToast } from '@chakra-ui/react';

import ProgressBar from '@/components/ProgressBar';

const columns = [
  { key: 'name', label: 'Nama Categories' },
  { key: 'image', label: 'image Categories', type: 'image' },
  { key: 'description', label: 'Deskripsi Categories' },
];

const searchFields = [{ key: 'name', label: 'Nama Categories' }];

const TableCategories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<CategoriesUpdate | null>(
    null,
  );
  const [uploadProgress, setUploadProgress] = useState(0);

  const toast = useToast();

  const { data, loading, updateParams, refetch, params } = useDataFetch<
    ResponseApi<Categories>
  >(`${CATEGORY_PREFIX.INDEX}`, { page: 1, perPage: 10 });


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
      if (values.image && values.image instanceof File) {
        setUploadProgress(0);
        const uploadResult = await UploadImage({
          file: values.image,
          onProgress: (progress) => {
            setUploadProgress(progress);
          }
        });

        if (!uploadResult.success) {
          toast({
            title: 'Error during image upload',
            description: uploadResult.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        values.image = uploadResult.url || '';
      }
      if (initialValues) {
        // delete email
        const result = await put<Categories, CategoriesUpdate>({
          url: `${CATEGORY_PREFIX.EDIT}/${initialValues._id}`,
          data: values as CategoriesUpdate,
        });
        refetch();
        toast({
          title: 'Success',
          description: `Data ${result?.data.name} berhasil diubah`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        setIsModalOpen(false);
      } else {
        const result = await post<Categories, CategoriesCreate>({
          url: `${CATEGORY_PREFIX.CREATE}`,
          data: values,
        });
        toast({
          title: 'Success',
          description: `Data ${result?.data.name} berhasil ditambahkan`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        refetch();
        setIsModalOpen(false);
      }
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast({
          title: 'Error saat menyimpan data',
          description: ErrorCatch.response?.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

        return;
      }
      toast({
        title: 'Error saat menyimpan data',
        description: 'Terjadi kesalahan saat menyimpan data',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      setIsModalOpen(false);
    } finally {
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await del<Categories>(`${CATEGORY_PREFIX.DELETE}/${id}`);
      toast({
        title: 'Success',
        description: 'Data berhasil dihapus',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refetch();
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast({
          title: 'Error saat menghapus data',
          description: ErrorCatch.response?.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: 'Error saat menghapus data',
        description: 'Terjadi kesalahan saat menghapus data',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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

  return (
    <>
      <div>
        <h1 className="mb-4 text-2xl font-semibold">Kategori Management</h1>
        <div className="mb-4">
          <button
            onClick={handleAdd}
            className="w-52 shrink rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Tambah Kategori
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
        title="Tambah Inovation"
      >
        <FormCategories
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
        {uploadProgress > 0 && (
          <div className="mt-4">
            <ProgressBar
              progress={uploadProgress}
              color="blue"
              size="md"
              showPercentage
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default TableCategories;
