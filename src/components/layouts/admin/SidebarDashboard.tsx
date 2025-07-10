"use client";

import {FilePlus , Home, PencilLine  } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";



const SidebarDashboard = () => {
  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-900 border-r px-4 py-6 flex flex-col justify-between">
      <div>
        <Link to="/" className="flex items-center gap-3 mb-8 ">
          <span className="text-lg font-semibold decoration-regal-blue text-sky-400">Dashboard</span>
        </Link>
        <nav className="flex flex-col gap-4">
          <SidebarItem icon={<Home className="w-5 h-5" />} to="/">List Book</SidebarItem>
          <SidebarItem icon={<FilePlus className="w-5 h-5" />} to="/addbook">Add Book</SidebarItem>
          <SidebarItem icon={<PencilLine  className="w-5 h-5" />} to="/editbook">Edit Book</SidebarItem>
          <SidebarItem icon={<FilePlus  className="w-5 h-5" />} to="/addbook">Add Book</SidebarItem>
        </nav>
      </div>

    </aside>
  );
};

const SidebarItem = ({
  icon,
  to,
  children,
}: {
  icon: React.ReactNode;
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
    >
      {icon}
      {children}
    </Link>
  );
};

export default SidebarDashboard;
