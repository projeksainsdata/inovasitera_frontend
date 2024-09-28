import React from 'react';


import LayoutAdmin from '@/components/admin/layoutAdmin/LayoutAdmin';
import TableSemuaInovasi from '@/components/innovator/inovasi/TableSemuaInovasi';

const ListInovasi = () => {
  return (
    <LayoutAdmin>
      <TableSemuaInovasi />
    </LayoutAdmin>
  );
};

export default ListInovasi;
