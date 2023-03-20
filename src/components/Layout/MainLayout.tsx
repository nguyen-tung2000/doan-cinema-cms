import React from "react";

import SidebarWithHeader from "../Navbar/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <SidebarWithHeader>{children}</SidebarWithHeader>;
};
