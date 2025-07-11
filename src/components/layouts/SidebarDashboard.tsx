"use client";

import { FilePlus, Home, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Drawer } from "@/components/ui/drawer";
import AddBookForm from "@/pages/BookListe/AddForm";

const SidebarDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <>
      <aside
        className={cn(
          "h-screen bg-white dark:bg-gray-900 border-r px-3 py-6 flex flex-col transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
     
        <div className="mb-8">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-3 text-muted-foreground hover:text-accent-foreground"
          >
            <Menu className="h-5 w-5" />
            {!isCollapsed && (
              <span className="text-lg font-semibold text-sky-400">
                Dashboard
              </span>
            )}
          </button>
        </div>

    
        <nav className="flex flex-col gap-4">
          <SidebarItem
            icon={<Home className="w-5 h-5" />}
            to="/ListBook"
            isCollapsed={isCollapsed}
          >
            List Book
          </SidebarItem>

         
         
          <SidebarItem
            icon={<FilePlus className="w-5 h-5" />}
            to="#"
            isCollapsed={isCollapsed}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true); 
            }}
          >
            Add Book
          </SidebarItem>
        </nav>
      </aside>

     
       
      <Drawer open={isOpen} onOpenChange={setIsOpen} title="Ajouter un Livre" position="bottom">
        <AddBookForm /> 
      </Drawer>
    </>
    
  );
};

const SidebarItem = ({
  icon,
  to,
  children,
  isCollapsed,
  onClick,
}: {
  icon: React.ReactNode;
  to: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
    >
      {icon}
      {!isCollapsed && <span>{children}</span>}
    </Link>
  );
};

export default SidebarDashboard;
