import React from "react"
import type { Inovator } from "@/types/inovator.type";
import { del } from "@/hooks/useSubmit";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useDataFetch from '@/hooks/useFetchData';
import { ResponseApi } from '@/lib/types/api.type';
import { INNOVATION_PREFIX } from "@/lib/constants/api.contants";
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
    key: "tanggal",
    label: "Tanggal Pembuatan"
  },
  {
    key: "average_rating",
    label: "Rating Inovasi"
  },
  {
    key: "status",
    label: "Status Inovasi"
  },
];

const searchFields = [{ key: "name", label: "Nama Inovator" }];

const TableSemuaInovasi: React.FC = () => {
  const { data, loading, error, updateParams, refetch, params } = useDataFetch<
    ResponseApi<Inovator>
  >(`${INNOVATION_PREFIX.USER}`, { page: 1, perPage: 10 });


  console.log(data)

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
      await del<Inovator>(`${INNOVATION_PREFIX.DELETE}/${id}`);
      refetch();
      toast.success(`Inovator ${id} deleted successfully`);
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || "Failed to delete Inovator"
        );
        return;
      }
      toast.error("Failed to delete Inovator");
    }
  };

  const handleEdit = (row: any) => {
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

export default TableSemuaInovasi;
