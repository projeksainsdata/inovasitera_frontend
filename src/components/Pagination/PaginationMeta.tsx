import Head from 'next/head';

type PaginationMetaProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

const PaginationMeta = ({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationMetaProps) => {
  return (
    <Head>
      {currentPage > 1 && (
        <link rel="prev" href={`${baseUrl}?page=${currentPage - 1}`} />
      )}
      {currentPage < totalPages && (
        <link rel="next" href={`${baseUrl}?page=${currentPage + 1}`} />
      )}
      <link
        rel="canonical"
        href={currentPage === 1 ? baseUrl : `${baseUrl}?page=${currentPage}`}
      />
    </Head>
  );
};

export default PaginationMeta;
