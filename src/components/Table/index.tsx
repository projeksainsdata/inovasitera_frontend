/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from 'react';
import { FaSortUp, FaSortDown, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link

interface Column {
  key: string;
  label: string;
}
interface DataItem {
  id: string | number;
  [key: string]: any;
}

interface TableProps {
  columns: Column[];
  data: DataItem[];
  params: Record<string, any>;
  onSort: (column: string, direction: 'asc' | 'desc') => void;
  onEdit: (row: any) => void;
  onDelete: (id: string | number) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  params,
  onSort,
  onEdit,
  onDelete,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(
    params.sort || null,
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    params.order || 'asc',
  );

  const handleSort = (column: string) => {
    const newSortDirection =
      sortColumn === column
        ? sortDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';
    setSortDirection(newSortDirection);
    setSortColumn(column);
    onSort(column, newSortDirection);
  };

  const getNestedValue = (obj: any, path: string): any => {
    return path
      .split('.')
      .reduce((acc, part) => (acc && acc[part] ? acc[part] : 'N/A'), obj);
  };

  const truncateContent = (content: string, wordLimit: number = 3): string => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

  return (
    <div
      className="overflow-x-auto rounded-lg bg-grey-200 shadow-md"
      style={{
        WebkitOverflowScrolling: 'touch',
        display: 'block',
        minHeight: '45vh',
        maxHeight: '45vh',
      }}
    >
      <table className="min-w-full divide-y divide-gray-800 bg-orange-600">
        <thead className="bg-orange">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="text-black-900 cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                onClick={() => handleSort(column.key)}
              >
                {column.label}
                {sortColumn === column.key &&
                  (sortDirection === 'asc' ? (
                    <FaSortUp className="ml-2 inline-block" />
                  ) : (
                    <FaSortDown className="ml-2 inline-block" />
                  ))}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data?.map((row, index) => (
            <motion.tr
              key={row?.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {columns.map((column) => (
                <td
                  key={column?.key}
                  className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                >
                  {truncateContent(
                    getNestedValue(row, column?.key).toString(),
                    4,
                  )}
                </td>
              ))}
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                <Link to={`/admin/detailinovasi`}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="mr-2 text-green-600 hover:text-green-900"
                  >
                    Detail
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => onDelete(row.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FaTrash />
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
