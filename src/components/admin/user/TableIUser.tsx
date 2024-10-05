/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { USER, UserCreate, UserUpdate } from '@/lib/types/user.type';

import { post, del, put, UploadImage } from '@/hooks/useSubmit';
import { AxiosError } from 'axios';
import useDataFetch from '@/hooks/useFetchData';
import { ResponseApi } from '@/lib/types/api.type';
import { USER_PREFIX } from '@/lib/constants/api.contants';
import OverlaySpinner from '@/components/Loading/OverlayLoading';
import Table from '@/components/Table';
import SearchQuery, { SearchField } from '@/components/Form/GenericSearch';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import FormUser from '@/components/admin/user/FormUser';
import { useToast } from '@chakra-ui/react';
import ProgressBar from '@/components/ProgressBar';
import { transformAndCleanObject } from '@/utils/transformAndCleanObject';

const columns = [
  { key: 'email', label: 'email ' },
  { key: 'fullname', label: 'fullname' },
  { key: 'role', label: 'Role' },
  { key: 'email', label: 'Email' },
  { key: "provider", label: "Provider user" },
  { key: "inovator.status", label: "Status user", type: "status" },
  { key: "inovator.fakultas", label: "Fakultas" },
  { key: "inovator.prodi", label: "prodi" },

];

const searchFields: SearchField[] = [
  { key: 'q', label: 'Search user', type: 'text' },
  {
    key: "role", label: "Role", type: "select", options: [
      { value: "admin", label: "Admin" },
      { value: "member", label: "member" },
      { value: "inovator", label: "Innovator" },
    ]
  },
  {
    key: "status", label: "status", type: "select", options: [
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
    ]
  },
];

const TableUser: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<UserUpdate | null>(
    null,
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const { data, loading, updateParams, refetch, params } = useDataFetch<
    ResponseApi<USER>
  >(`${USER_PREFIX.INDEX}`, { page: 1, perPage: 10 });

  const toast = useToast()
  const handleSearch = (criteria: Record<string, string>) => {
    updateParams({ ...criteria, page: 1 });
  };

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    updateParams({ ...params, sort: column, order: direction });
  };

  const handlePageChange = (page: number) => {
    updateParams({ ...params, page });
  };

  const handleSubmit = async (values: UserCreate | UserUpdate) => {
    try {
      if (values?.profile instanceof File) {
        setUploadProgress(0);
        const uploadResult = await UploadImage({
          file: values.profile,
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

        values.profile = uploadResult.url || '';
      }


      const transformValues = transformAndCleanObject(values);
      if (initialValues) {
        // delete email
        const result = await put<USER, UserUpdate>({
          url: `${USER_PREFIX.EDIT}/${initialValues._id}`,
          data: transformValues as any,
        });
        refetch();
        toast({
          title: 'Success',
          description: `USER ${result?.data.username} updated successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setIsModalOpen(false);
      } else {
        const result = await post<USER, UserCreate>({
          url: `${USER_PREFIX.CREATE}`,
          data: transformValues as any,
        });

        refetch();
        toast({
          title: 'Success',
          description: `USER ${result?.data.username} created successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setIsModalOpen(false);
      }
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast({
          title: 'Error',
          description: ErrorCatch.response?.data.message || 'Failed to create USER',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: 'Error',
        description: 'Failed to create USER',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await del<USER>(`${USER_PREFIX.DELETE}/${id}`);
      refetch();
      toast({
        title: 'Success',
        description: `USER deleted successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast({
          title: 'Error',
          description: ErrorCatch.response?.data.message || 'Failed to delete USER',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: 'Error',
        description: 'Failed to delete USER',
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



  if (loading) return <OverlaySpinner show={loading} />;

  return (
    <>
      <div>
        <h1 className="mb-4 text-2xl font-semibold">USER Management</h1>

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
        title="Tambah USER"
      >
        <ProgressBar progress={uploadProgress} showPercentage={uploadProgress !== 0} />
        <FormUser
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </Modal>
    </>
  );
};

export default TableUser;
