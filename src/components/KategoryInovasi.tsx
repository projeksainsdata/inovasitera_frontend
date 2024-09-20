import React from "react";

interface CategorySidebarProps {
  categories: { name: string; count: number }[];
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories }) => {
  return (
    <div className="md:w-1/4 bg-white sticky-sidebar rounded-lg p-4 shadow-md mb-6 md:mb-0 max-h-[300px] overflow-y-auto sticky top-4">
      <h2 className="font-bold text-lg mb-4">Kategori</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">
                {category.name} ({category.count})
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
