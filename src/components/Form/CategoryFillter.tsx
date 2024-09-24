/* eslint-disable tailwindcss/no-custom-classname */
// components/CategoryFilter.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[] | number[];
  selectedCategory: string | number;
  onCategoryChange: (category: any) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-8 flex items-center justify-center"
    >
      <div className="inline-flex flex-wrap justify-center gap-3 rounded-lg px-4 py-2 shadow-sm">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`rounded-md px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
              selectedCategory === category
                ? 'bg-orange font-bold text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryFilter;
