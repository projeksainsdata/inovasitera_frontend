import useDataFetch from "@/hooks/useFetchData";
import type { ResponseApi } from "@/lib/types/api.type";
import type { BlogType } from "@/types/blog.type";

/** Response paginated dari backend blog */
interface BlogListResponse extends ResponseApi<BlogType[]> {}

/**
 * Hook untuk mengambil data blog dari API
 * @param initialParams - optional params seperti { perPage, page, q }
 * @returns result dari useDataFetch<BlogListResponse>
 */
function useBlogsData(initialParams: Record<string, unknown> = {}) {
  return useDataFetch<BlogListResponse>("/api/v1/blogs", initialParams);
}

export default useBlogsData;
export type { BlogType };
