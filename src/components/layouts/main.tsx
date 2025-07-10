
import { Outlet } from "react-router-dom";
import SidebarDashboard from "./SidebarDashboard";
const Main: React.FC = () => {
  return (
    <>
  <div className="flex h-screen">
    <SidebarDashboard />
        <main className="flex-1 p-6 overflow-y-auto bg-muted/40">
        <Outlet />
      </main>
    </div>
</>
  );
};

export default Main;
