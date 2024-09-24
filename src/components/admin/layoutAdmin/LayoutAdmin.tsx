import React, { ReactNode } from 'react';
import Sidebar from './SideBar';
import Header from './Header';
import Footer from './Footer';
interface LayoutAdminProps {
  children: ReactNode;
}

const LayoutAdmin: React.FC<LayoutAdminProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const userAccess = 'admin';
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className="flex h-screen bg-white">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          userAccess={userAccess}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-white p-6">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LayoutAdmin;
