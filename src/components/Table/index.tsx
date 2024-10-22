import React, { useEffect, useState } from "react";
import {
  IconTrash,
  IconEdit,
  IconChevronDown,
  IconChevronUp,
  IconExternalLink,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { IconStarFilled } from "@tabler/icons-react";
interface Column {
  key: string;
  label: string;
  type?: "image" | "status" | "rating" | "date" | "link" | any;
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
  isDelete?: boolean;
  isEdit?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  params,
  onSort,
  onEdit,
  onDelete,
  isDelete = true,
  isEdit = true,
}) => {
  //inject role agar tablenya beda
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(data?.role || "");
  }, []);

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

  // Render based on column type
  const renderImage = (value: string) => (
    <img src={value} className="w-32 h-22 object-cover rounded" alt="Image" />
  );

  const renderStatus = (value: string) => {
    const status = value === "N/A" ? "active" : value.toLowerCase();
    const statusClasses =
      status === "active" || status === "approved"
        ? "bg-green-300/50 text-green-500"
        : status === "pending"
        ? "bg-yellow-300/50 text-yellow-500"
        : "bg-red-300/50 text-red-500";

    return (
      <div
        className={`px-5 py-2 rounded-full text-center uppercase ${statusClasses}`}
      >
        {status.toUpperCase()}
      </div>
    );
  };

  const renderRating = (value: string) => (
    <span className="flex gap-3 items-center">
      <IconStarFilled className="text-yellow-300" />
      <h1 className="text-lg">{value}</h1>
    </span>
  );

  const renderDate = (value: string) => (
    <span>{new Date(value).toLocaleDateString()}</span>
  );

  const renderText = (value: string) => (
    <span>{truncateContent(value, 4)}</span>
  );

  const renderLink = (data: any) => {
    let href = "";
    let linkText = "Lihat Inovasi";
    
    if (data.status === "approved") {
      href = `/inovasi/${data._id}`;
    } else if (role === "admin") {
      href = `/admin/manajemen-inovasi/preview/${data._id}`;
      linkText = "Lihat Preview";
    } else {
      href = `/inovasi/${data._id}`;
    }
  
    return (
      <a href={href} target="_blank" className="flex gap-2 items-center">
        {linkText} <IconExternalLink size={16} />
      </a>
    );
  };
  
  return (
    <div
      className="overflow-x-auto rounded bg-white shadow-md"
      style={{
        WebkitOverflowScrolling: "touch",
        display: "block",
        // minHeight: "45vh",
        maxHeight: "100vh",
      }}
    >
      <table className="min-w-full divide-y divide-gray-200 bg-white border">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="text-black-900 cursor-pointer p-4 text-left text-sm uppercase tracking-wider text-black"
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
            {(isDelete || isEdit) && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm uppercase tracking-wider text-black"
              >
                Aksi
              </th>
            )}
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
                  className="whitespace-nowrap px-4 py-3 text-base font-normal text-black"
                >
                  {column?.type === "image"
                    ? renderImage(getNestedValue(row, column?.key).toString())
                    : column?.type === "status"
                    ? renderStatus(getNestedValue(row, column?.key).toString())
                    : column?.type === "rating"
                    ? renderRating(getNestedValue(row, column?.key).toString())
                    : column?.type === "date"
                    ? renderDate(getNestedValue(row, column?.key).toString())
                    : column?.type === "link"
                    ? renderLink(row)
                    : renderText(getNestedValue(row, column?.key).toString())}
                </td>
              ))}
              {(isDelete || isEdit) && (
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {isEdit && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => onEdit({ ...row })}
                      className="mr-2 text-green-600 hover:text-green-900"
                    >
                      <IconEdit />
                    </motion.button>
                  )}
                  {isDelete && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => onDelete(row._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <IconTrash />
                    </motion.button>
                  )}
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
