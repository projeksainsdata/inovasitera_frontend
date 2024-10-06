import React from "react";

import type {
  WhiteList
} from "@/types/whitelist.type";

import { del } from "@/hooks/useSubmit";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useDataFetch from '@/hooks/useFetchData';
import { ResponseApi } from '@/lib/types/api.type';
import { WHITELIST_PREFIX } from "@/lib/constants/api.contants";
import OverlaySpinner from "@/components/Loading/OverlayLoading";
import Table from "@/components/Table";
import SearchQuery from "@/components/Form/GenericSearch";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    key: "thumbnail",
    label: "thumbnail inovasi",
    type: "image"
  },
  {
    key: "title",
    label: "Judul Inovasi"
  },
  {
    key: "rating",
    label: "Rating Inovasi",
    type: "rating"
  },

];

const searchFields = [{ key: "q", label: "Wishlist" }];

const TableWishlist: React.FC = () => {
  const navigate = useNavigate();

  const { data, loading, updateParams, refetch, params } = useDataFetch<
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
      toast.success("Berhasil menghapus Wishlist");
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || "Failed to delete whitelist"
        );
        return;
      }
      toast.error("Failed to delete whitelist");
    }
  };


  const handleEdit = (row: any) => {
    navigate(`/inovasi/${row._id}`);
  };


  if (loading) return <OverlaySpinner show={loading} />;

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
