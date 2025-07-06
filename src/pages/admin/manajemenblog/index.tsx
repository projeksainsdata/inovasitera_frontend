import React from 'react';

import LayoutAdmin from '@/components/admin/layoutAdmin/LayoutAdmin';
import TableSemuaBlog from '@/components/admin/Artikel/TableArtikel';

const BlogAdmin = () => {
  return (
    <LayoutAdmin>
      <TableSemuaBlog />
    </LayoutAdmin>
  );
};

export default BlogAdmin;
