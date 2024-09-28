import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@chakra-ui/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= 1) {
      return [1];
    }

    const middlePages = [];

    if (currentPage <= 3) {
      middlePages.push(2, 3, 4, 5, 6);
    } else if (currentPage >= totalPages - 2) {
      middlePages.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
      );
    } else {
      middlePages.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      );
    }

    return [
      1,
      ...middlePages.filter((page) => page > 1 && page < totalPages),
      totalPages,
    ];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-10 flex items-center justify-center"
    >
      <Button
        onClick={handlePrevPage}
        colorScheme="red"
        className={`rounded-l-md px-6 py-2 ${currentPage === 1
          ? 'cursor-not-allowed bg-gray-300 text-gray-500'
          : 'bg-gray-200 text-gray-700 hover:bg-primary-100'
          }`}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={page}>
          {totalPages > 1 &&
            index > 0 &&
            page !== getPageNumbers()[index - 1]! + 1 && (
              <span className="px-4 py-2 text-gray-500">...</span>
            )}
          <Button
            onClick={() => handlePageClick(page)}
            colorScheme="red"
            className={`px-4 py-2 ${page === currentPage
              ? 'bg-red text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-primary-100'
              }`}
          >
            {page}
          </Button>
        </React.Fragment>
      ))}

      <Button
        onClick={handleNextPage}
        colorScheme="red"
        className={`rounded-r-md px-4 py-2 ${currentPage === totalPages
          ? 'cursor-not-allowed bg-gray-300 text-gray-500'
          : 'bg-gray-200 text-gray-700 hover:bg-primary-100'
          }`}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </motion.div>
  );
};

export default Pagination;
