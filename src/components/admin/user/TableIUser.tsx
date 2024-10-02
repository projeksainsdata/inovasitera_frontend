/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { USER, UserCreate, UserUpdate } from '@/lib/types/user.type';

import { post, del, put } from '@/hooks/useSubmit';
import toast from 'react-hot-toast';
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

const columns = [
  { key: 'email', label: 'email ' },
  { key: 'fullname', label: 'fullname' },
  { key: 'role', label: 'Role' },
  { key: 'email', label: 'Email' },
  { key: "provider", label: "Provider user" },
  {key:"inovator.fakultas", label:"Fakultas"},
  {key:"inovator.prodi", label:"prodi"},

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
];

const TableUser: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<UserUpdate | null>(
    null,
  );

  const { data, loading, error, updateParams, refetch, params } = useDataFetch<
    ResponseApi<USER>
  >(`${USER_PREFIX.INDEX}`, { page: 1, perPage: 10 });


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
      if (initialValues) {
        // delete email
        const result = await put<USER, UserUpdate>({
          url: `${USER_PREFIX.EDIT}/${initialValues._id}`,
          data: values as UserUpdate,
        });
        refetch();
        toast.success(`USER ${result?.data.title} updated successfully`);
        setIsModalOpen(false);
      } else {
        const result = await post<USER, UserCreate>({
          url: `${USER_PREFIX.CREATE}`,
          data: values as UserCreate,
        });

        refetch();
        toast.success(`USER ${result?.data.username} created successfully`);
        setIsModalOpen(false);
      }
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || 'Failed to create USER',
        );
        return;
      }
      toast.error('Failed to create USER');
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await del<USER>(`${USER_PREFIX.DELETE}/${id}`);
      refetch();
      toast.success(`USER ${id} deleted successfully`);
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || 'Failed to delete USER',
        );
        return;
      }
      toast.error('Failed to delete USER');
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleEdit = (row: any) => {
    setInitialValues(row);
    setIsModalOpen(true);
  };



  if (loading) return <OverlaySpinner show={loading} />;
  if (error) toast.error(error.message);

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
        <FormUser
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </Modal>
    </>
  );
};

export default TableUser;
