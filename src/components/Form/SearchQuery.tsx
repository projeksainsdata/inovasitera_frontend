/* eslint-disable tailwindcss/no-custom-classname */
// components/SearchQuery.tsx
import React, { useState, useCallback } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface SearchField {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'select';
  options?: { value: string; label: string }[];
}

interface SearchProps {
  fields: SearchField[];
  onSearch: (criteria: Record<string, any>) => void;
  onClear: () => void;
  initialValues?: Record<string, any>;
}

const SearchQuery: React.FC<SearchProps> = ({
  fields,
  onSearch,
  onClear,
  initialValues = {},
}) => {
  const [searchCriteria, setSearchCriteria] =
    useState<Record<string, any>>(initialValues);

  const handleInputChange = useCallback((field: string, value: any) => {
    setSearchCriteria((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSearch = useCallback(() => {
    onSearch(searchCriteria);
  }, [onSearch, searchCriteria]);

  const handleClear = useCallback(() => {
    setSearchCriteria({});
    onClear();
  }, [onClear]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch],
  );

  const renderInput = useCallback(
    (field: SearchField) => {
      switch (field.type) {
        case 'date':
          return (
            <DatePicker
              selected={searchCriteria[field.key]}
              onChange={(date) => handleInputChange(field.key, date)}
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              placeholderText={`Select ${field.label}`}
              onKeyDown={handleKeyDown}
            />
          );
        case 'select':
          return (
            <select
              value={searchCriteria[field.key] || ''}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        default:
          return (
            <input
              type="text"
              value={searchCriteria[field.key] || ''}
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              placeholder={`Search ${field.label}`}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
            />
          );
      }
    },
    [searchCriteria, handleInputChange, handleKeyDown],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4 flex flex-wrap gap-4"
    >
      {fields.map((field) => (
        <div key={field.key} className="relative grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="size-5 text-gray-400" aria-hidden="true" />
          </div>
          {renderInput(field)}
        </div>
      ))}
      <div className="flex gap-2">
        <button
          type="button"
          className="hover:bg-black-dark rounded-md bg-orange px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          type="button"
          className="rounded-md bg-orange px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={handleClear}
        >
          <FaTimes className="size-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default SearchQuery;
