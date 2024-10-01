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
>(`${INNOVATION_PREFIX.INDEX}`, { page: 1, perPage: 10 });
  // const data = {
  //   requestId: "string",
  //   requestTime: "string",
  //   data: [
  //     {
  //       id: "1",
  //       image: "https://images.pexels.com/photos/586415/pexels-photo-586415.jpeg",
  //       name: "Fabrikasi dan Hilirisasi Rompi Anti Peluru Berbahan Biomass Sawit",
  //       tanggal: "24/07/12",
  //       status: "ditolak",
  //       rating: 4,
  //     },
  //     {
  //       id: "2",
  //       image: "https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg",
  //       name: "Alien Sawit",
  //       tanggal: "22/07/2024",
  //       status: "diterima",
  //       rating: 5,
  //     },
  //     {
  //       id: "3",
  //       image: "https://images.pexels.com/photos/351286/pexels-photo-351286.jpeg",
  //       name: "Inovasi Proses Pengolahan Limbah Cair Pabrik Kelapa Sawit",
  //       tanggal: "15/08/2023",
  //       status: "pending",
  //       rating: 3,
  //     },
  //     {
  //       id: "4",
  //       image: "https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg",
  //       name: "Pengembangan Produk Pupuk Organik Berbasis Tandan Kosong Sawit",
  //       tanggal: "30/05/2021",
  //       status: "diterima",
  //       rating: 4,
  //     },
  //     {
  //       id: "5",
  //       image: "https://images.pexels.com/photos/1108314/pexels-photo-1108314.jpeg",
  //       name: "Teknologi Produksi Biofuel dari Biomassa Kelapa Sawit",
  //       tanggal: "12/04/2020",
  //       status: "ditolak",
  //       rating: 2,
  //     },
  //     {
  //       id: "6",
  //       image: "https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg",
  //       name: "Penggunaan Enzim dalam Pengolahan Minyak Kelapa Sawit",
  //       tanggal: "28/09/2022",
  //       status: "diterima",
  //       rating: 5,
  //     },
  //     {
  //       id: "7",
  //       image: "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg",
  //       name: "Pengolahan Sampah Kelapa Sawit Menjadi Material Bahan Bakar",
  //       tanggal: "10/11/2021",
  //       status: "pending",
  //       rating: 3,
  //     },
  //     {
  //       id: "8",
  //       image: "https://images.pexels.com/photos/1068941/pexels-photo-1068941.jpeg",
  //       name: "Pengembangan Produk Inovasi Minyak Goreng Sawit",
  //       tanggal: "25/12/2019",
  //       status: "ditolak",
  //       rating: 2,
  //     },
  //     {
  //       id: "9",
  //       image: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg",
  //       name: "Inovasi Bioplastik Berbasis Biomassa Sawit",
  //       tanggal: "05/06/2022",
  //       status: "diterima",
  //       rating: 4,
  //     },
  //     {
  //       id: "10",
  //       image: "https://images.pexels.com/photos/586413/pexels-photo-586413.jpeg",
  //       name: "Teknologi Produksi Sabun dari Minyak Kelapa Sawit",
  //       tanggal: "15/01/2020",
  //       status: "pending",
  //       rating: 3,
  //     },
  //   ],    
  //   pagination: {
  //     total: 10,
  //     perPage: 10,
  //     page: 1,
  //   },
  // };
  // const loading = false;
  // const error = null;
  // const updateParams = (newparams) => {};
  // const refetch = () => {};
  // const params = {};

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
