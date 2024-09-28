import React, { useState } from "react";

import type {
  Categories,
  CategoriesCreate,
  CategoriesUpdate,
} from "@/types/models.type";

import { post, del, put } from "@/hooks/useSubmit";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
// import useDataFetch from '@/hooks/useFetchData';
// import { ResponseApi } from '@/lib/types/api.type';
import { CATEGORY_PREFIX } from "@/lib/constants/api.contants";
import OverlaySpinner from "@/components/Loading/OverlayLoading";
import Table from "@/components/Table";
import SearchQuery from "@/components/Form/SearchQuery";
import Pagination from "@/components/Pagination";

const columns = [
  {
    key: "image",
    label: "Gambar",
  },
  { 
    key: "name",
    label: "Judul Inovasi"
  },
  { 
    key: "rating",
    label: "Rating Inovasi"
  },
  { 
    key: "link",
    label: "Kunjungi Inovasi"
  },
];

const searchFields = [{ key: "name", label: "Wishlist" }];

const TableWishlist: React.FC = () => {
  const [initialValues, setInitialValues] = useState<CategoriesUpdate | null>(null);

  // const { data, loading, error, updateParams, refetch, params } = useDataFetch<
  //   ResponseApi<Categories>
  // >(`${CATEGORY_PREFIX.INDEX}`, { page: 1, perPage: 10 });
  const data = {
    requestId: "string",
    requestTime: "string",
    data: [
        {
            id: 1,
            image: "https://images.pexels.com/photos/586415/pexels-photo-586415.jpeg",
            name: "Fabrikasi dan Hilirisasi Rompi Anti Peluru Berbahan Biomass Sawit",
            link: `/inovasi/0`,
            rating: 4,
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

  const handleSort = (column: string, direction: "asc" | "desc") => {
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
          ErrorCatch.response?.data.message || "Failed to create Categories"
        );
        return;
      }
      toast.error("Failed to create Categories");
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
          ErrorCatch.response?.data.message || "Failed to delete Categories"
        );
        return;
      }
      toast.error("Failed to delete Categories");
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
    </>
  );
};

export default TableWishlist;
