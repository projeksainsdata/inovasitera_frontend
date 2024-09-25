import React from 'react';


import LayoutAdmin from '@/components/admin/layoutAdmin/LayoutAdmin';
import TableCategories from '@/components/admin/categories/TableCategories';

const KategoriesAdmin = () => {
  return (
    <LayoutAdmin>
      <TableCategories />
    </LayoutAdmin>
  );
};

export default KategoriesAdmin;
