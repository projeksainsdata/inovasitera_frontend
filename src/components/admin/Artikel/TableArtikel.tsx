import React from "react";
import { Button, Box, Flex } from "@chakra-ui/react";
import { del } from "@/hooks/useSubmit";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useDataFetch from "@/hooks/useFetchData";
import { ResponseApi } from "@/lib/types/api.type";
import { BLOG_PREFIX } from "@/lib/constants/api.contants";
import OverlaySpinner from "@/components/Loading/OverlayLoading";
import Table from "@/components/Table";
import SearchQuery from "@/components/Form/GenericSearch";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom";
import { BlogType } from "@/hooks/useBlogsData";

const columns = [
  { key: "thumbnail", label: "Gambar", type: "image" },
  { key: "title", label: "Judul" },
  { key: "category.name", label: "Kategori" },
  { key: "user.fullname", label: "Penulis" },
  { key: "createdAt", label: "Tanggal", type: "date" },
  { key: "slug", label: "Detail", type: "blog" },
  { key: "status", label: "Status", type: "status" },
];

const searchFields = [
  { key: "q", label: "Judul / Deskripsi", type: "text" as const },
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
    ],
  },
];

const TableSemuaBlog: React.FC = () => {
  const { data, loading, updateParams, refetch, params } = useDataFetch<
    ResponseApi<BlogType>
  >(`${BLOG_PREFIX.INDEX}`, { page: 1, perPage: 10 });

  const navigate = useNavigate();

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
      await del<BlogType>(`${BLOG_PREFIX.DELETE}/${id}`);
      refetch();
      toast.success(`Blog ${id} berhasil dihapus`);
    } catch (ErrorCatch) {
      if (ErrorCatch instanceof AxiosError) {
        toast.error(
          ErrorCatch.response?.data.message || "Gagal menghapus blog"
        );
        return;
      }
      toast.error("Gagal menghapus blog");
    }
  };

  const handleEdit = (row: BlogType) => {
    navigate(`/admin/edit-blog/${row.slug}`);
  };

  if (loading) return <OverlaySpinner show={loading} />;

  return (
    <>
      <Flex justify="space-between" align="center" mb={4}>
        <Box fontWeight="bold" fontSize="xl">Manajemen Blog</Box>
        <Button colorScheme="blue" onClick={() => navigate("/admin/tambah-blog")}>
          Tambah Blog
        </Button>
      </Flex>

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
    </>
  );
};

export default TableSemuaBlog;
