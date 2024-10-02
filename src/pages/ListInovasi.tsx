import React, { useState } from "react";
import Navbar from "../components/navbar";
import HeroPage from "../components/HeroPage";
import Footer from "../components/Footer";
import FilterPanel, { FilterGroup } from "../components/FilterPanel";
import InnovationCard from "../components/InovationCard";
import { Box, Spinner } from "@chakra-ui/react";
import Pagination from "@/components/Pagination";
import SearchQuery, { SearchField } from "@/components/Form/SearchQuery";
import useDataFetch from "@/hooks/useFetchData";
import { INNOVATION_PREFIX } from "@/lib/constants/api.contants";
import { InovationResponse } from "@/lib/types/inovation.type";
import useCategories from "@/hooks/useCategories";

const SearchFields: SearchField[] = [
  {
    label: "Search innovations...",
    key: "q",
  },
];



const InnovationPage: React.FC = () => {
  const [filterMobile, setFilterMobile] = useState(false);
  const { data, loading, error, updateParams, params } = useDataFetch<InovationResponse>(`${INNOVATION_PREFIX.INDEX}`, {
    page: 1,
    perPage: 6,
    sort: 'createdAt',
    order: 'desc',
  });

  const { data: categories } = useCategories();


  const filterGroups: FilterGroup[] = [
    {
      id: 'category.name',
      label: 'Categories',
      type: 'checkbox',
      options: categories?.map((category) => ({
        id: category.name,
        label: category.name,
      })) || [],
    },
    {
      id: 'sort',
      label: 'Sort By',
      type: 'radio',
      options: [
        { id: 'rating_desc', label: 'Highest Rating' },
        { id: 'rating_asc', label: 'Lowest Rating' },
        { id: 'title_asc', label: 'A-Z' },
        { id: 'title_desc', label: 'Z-A' },
        { id: 'createdAt_desc', label: 'Newest' },
        { id: 'createdAt_asc', label: 'Oldest' },
      ],
    },
  ];

  const handleSearch = (criteria: Record<string, string>) => {
    updateParams({ ...criteria, page: 1 });

  };

  const handleFilter = (selections: Record<string, string | string[]>) => {
    const [sortColumn, sortDirection] = (selections.sort as string).split('_');
    const categories = selections['category.name'] as string[];
    updateParams({
      ...params,
      'category.name': categories.join(','),
      sort: sortColumn,
      order: sortDirection,
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({ ...params, page });
  };
  return (
    <>
      <Navbar />
      <HeroPage />
      <div className="relative z-20">
        <div className="py-8 text-center md:mt-[-300px] mt-[-200px] px-8">
          <h1 className="md:text-4xl text-2xl font-bold text-red-500">
            Semua Inovasi PII ITERA
          </h1>
          <SearchQuery
            fields={SearchFields}
            initialValues={params}
            onSearch={handleSearch}
            onClear={() => updateParams({ page: 1, perPage: 6 })}
          />
        </div>

        <div className="container mx-auto mt-8 px-4 flex flex-col gap-6 md:flex-row mb-20 md:mt-[200px]">
          <FilterPanel
            filterGroups={filterGroups}
            defaultSelections={{
              sort: 'createdAt_desc',
            }}
            onApply={handleFilter}
            className="md:w-1/4 h-fit overflow-y-auto sticky top-[100px] hidden md:block"
          />

          <main className="w-full md:w-3/4">
            <div className="flex justify-between my-8">
              <h2 className="text-xl font-bold">
                {!!params.q && `Hasil Untuk ${params?.q || ''} (${data?.pagination?.total || 0})`}
              </h2>
              <button onClick={() => setFilterMobile(!filterMobile)} className="block md:hidden">Filters</button>
            </div>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Spinner size="xl" />
              </Box>
            ) : error ? (
              <Box textAlign="center" color="red.500">Error: {error.message}</Box>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.data.map((innovation) => (
                  <InnovationCard key={innovation._id} inovasi={innovation} />
                ))}
              </div>
            )}

            <Box mt={8} display="flex" justifyContent="center">
              <Pagination
                currentPage={data?.pagination?.page || 1}
                totalPages={
                  Math.ceil((data?.pagination?.total ?? 1) / (data?.pagination?.perPage ?? 1)) ||
                  1
                }
                onPageChange={handlePageChange}
              />
            </Box>
          </main>
        </div>
      </div>
      <Footer />

      {filterMobile && (
        <Box className="fixed inset-0 z-50 bg-white p-4 overflow-y-auto md:hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Filters</h2>
            <button onClick={() => setFilterMobile(false)}>Close</button>
          </div>
          <FilterPanel
            filterGroups={filterGroups}
            defaultSelections={{
              "category.name": ['all'],
              sort: 'createdAt_desc',
            }}
            onApply={(selections) => {
              handleFilter(selections);
              setFilterMobile(false);
            }}
          />
        </Box>
      )}
    </>
  );
};

export default InnovationPage;