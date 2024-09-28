import React from 'react';


import LayoutAdmin from '@/components/admin/layoutAdmin/LayoutAdmin';
import TableUser from '@/components/admin/user/TableIUser';

const UserAdmin = () => {
  return (
    <LayoutAdmin>
      <TableUser />
    </LayoutAdmin>
  );
};

export default UserAdmin;
