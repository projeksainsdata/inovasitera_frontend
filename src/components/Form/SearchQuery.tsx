/* eslint-disable @typescript-eslint/no-explicit-any */
// components/SearchQuery.tsx
import React, { useState, useCallback } from 'react';
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
              className="px-4 py-2 border rounded-full w-full max-w-md md:w-1/2"
              placeholderText={`Select ${field.label}`}
              onKeyDown={handleKeyDown}
            />
          );
        case 'select':
          return (
            <select
              value={searchCriteria[field.key] || ''}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className="px-4 py-2 border rounded-full w-full max-w-md md:w-1/2"
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
              className="px-4 py-2 border rounded-full w-full max-w-md md:w-1/2"
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
    >
      {fields.map((field) => (
        <>
          {/* center div  */}

          <div className="flex items-center justify-center my-5">
            {renderInput(field)}
          </div>
        </>
      ))}

    </motion.div>
  );
};

export default SearchQuery;
