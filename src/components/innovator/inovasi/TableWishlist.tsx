import React from "react";

import type { WhiteList } from "@/types/whitelist.type";

import { del } from "@/hooks/useSubmit";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useDataFetch from '@/hooks/useFetchData';
import { ResponseApi } from '@/lib/types/api.type';
import { WHITELIST_PREFIX } from "@/lib/constants/api.contants";
import OverlaySpinner from "@/components/Loading/OverlayLoading";
import Table from "@/components/Table";
import SearchQuery from "@/components/Form/SearchQuery";
import Pagination from "@/components/Pagination";

const columns = [
  { key: "image", label: "Gambar" },
  { key: "name", label: "Judul Inovasi" },
  { key: "rating", label: "Rating Inovasi" },
];

const searchFields = [{ key: "name", label: "Wishlist" }];

const TableWishlist: React.FC = () => {
  const { data, loading, error, updateParams, refetch, params } = useDataFetch<
    ResponseApi<WhiteList>
  >(`${WHITELIST_PREFIX.INDEX}`, { page: 1, perPage: 10 });

  const handleSearch = (criteria: Record<string, string>) => {
    updateParams({ ...criteria, page: 1 });
  };

  const handleSort = (column: string, direction: "asc" | "desc") => {
    updateParams({ ...params, sort: column, order: direction });
  };

  const handlePageChange = (page: number) => {
    updateParams({ ...params, page });
  };

  const handleDelete = async (id: string | number) => {
    try {
      await del<WhiteList>(`${WHITELIST_PREFIX.DELETE}/${id}`);
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

  const handleEdit = (row: any) => {
    setInitialValues(row);
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
            Math.ceil(data?.pagination?.total! / data?.pagination?.perPage!) || 1
          }
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TableWishlist;
