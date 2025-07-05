import useDataFetch from "@/hooks/useFetchData";
import type { ResponseApi } from "@/lib/types/api.type";

export interface BlogType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: {
    _id: string;
    name: string;
  };
  user: {
    _id: string;
    fullName: string;
  };
  createdAt: string;
  status: string;
}

interface BlogListResponse extends ResponseApi<BlogType[]> {}

function useBlogsData(initialParams = {}) {
  return useDataFetch<BlogListResponse>("/blogs", initialParams);
}

export default useBlogsData;
