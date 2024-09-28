import { Button } from "@chakra-ui/react";
import React from "react";


const CategorySidebar: React.FC = () => {
  return (
    <div className="md:w-1/4 bg-white border rounded-lg p-4 shadow-md mb-6 md:mb-0 h-fit overflow-y-auto sticky md:top-[100px] md:mt-[0] mt-[-80px]">
      <h2 className="font-bold text-lg mb-4">Kategori</h2>
      <ul>
          <li className="mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">
                Semua (100)
              </span>
            </label>
          </li>
          <li className="mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">
                Pangan (29)
              </span>
            </label>
          </li>
          <li className="mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">
                kesehatan (19)
              </span>
            </label>
          </li>
      </ul>
      <h2 className="font-bold text-lg mb-4 mt-10">Filter</h2>
      <ul>
          <li className="mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">
                  Rating Terbesar
                </span>
            </label>
          </li>
          <li className="mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">
                  A-Z
                </span>
            </label>
          </li>
          <li className="mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">
                  Rating terkecil
                </span>
            </label>
          </li>
      </ul>
      <Button colorScheme="blue" size="sm" className='w-full mt-4 bottom-0'>Terapkan</Button>
    </div>
  );
};

export default CategorySidebar;
