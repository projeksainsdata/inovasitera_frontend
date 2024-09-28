/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from "react";
// import { IconChevronUp, FaSortDown, FaEdit, FaTrash } from "react-icons/fa";
import {IconTrash,IconEdit,IconChevronDown,IconChevronUp} from "@tabler/icons-react"
import { motion } from "framer-motion";
import { IconStarFilled } from "@tabler/icons-react";
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
  onSort: (column: string, direction: "asc" | "desc") => void;
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
    params.sort || null
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    params.order || "asc"
  );

  const handleSort = (column: string) => {
    const newSortDirection =
      sortColumn === column
        ? sortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc";
    setSortDirection(newSortDirection);
    setSortColumn(column);
    onSort(column, newSortDirection);
  };

  const getNestedValue = (obj: any, path: string): any => {
    return path
      .split(".")
      .reduce((acc, part) => (acc && acc[part] ? acc[part] : "N/A"), obj);
  };

  const truncateContent = (content: string, wordLimit: number = 3): string => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };

  return (
    <div
      className="overflow-x-auto rounded bg-white shadow-md"
      style={{
        WebkitOverflowScrolling: "touch",
        display: "block",
        minHeight: "45vh",
        maxHeight: "100vh",
      }}
    >
      <table className="min-w-full divide-y divide-gray-800 bg-white">
        <thead className="bg-orange-300/80">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="text-black-900 cursor-pointer p-4 text-left text-sm font-bold uppercase tracking-wider text-black"
                onClick={() => handleSort(column.key)}
              >
                {column.label}
                {sortColumn === column.key &&
                  (sortDirection === "asc" ? (
                    <IconChevronUp className="ml-2 inline-block" />
                  ) : (
                    <IconChevronDown className="ml-2 inline-block" />
                  ))}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black"
            >
              Aksi
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
                  className="whitespace-nowrap px-4 py-3 text-base text-black font-semibold"
                >
                  {column?.key == "image" ? (
                    <img
                      src={getNestedValue(row, column?.key).toString()}
                      className="w-48 h-22 object-cover rounded"
                    />
                  ) : column?.key == "status" ? (
                    <div
                      className={`px-3 py-2 rounded-full text-white text-center font-bold uppercase ${
                        getNestedValue(row, column?.key).toString() ==
                        "diterima"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {getNestedValue(row, column?.key).toString()}
                    </div>
                  ) : column?.key == "rating" ? (
                    <span className="flex gap-3 items-center">
                      <IconStarFilled className="text-yellow-300" />
                      <h1 className="font-bold text-lg">{getNestedValue(row, column?.key).toString()}</h1>
                    </span>
                  ) : (
                    truncateContent(
                      getNestedValue(row, column?.key).toString(),
                      4
                    )
                  )}
                </td>
              ))}
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => onEdit({ ...row })}
                  className="mr-2 text-green-600 hover:text-green-900"
                >
                  <IconEdit />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => onDelete(row.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <IconTrash />
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
