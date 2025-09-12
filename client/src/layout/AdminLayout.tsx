// AdminLayout.jsx
import AdminSidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-white border-l border-gray-200">
        <Outlet />
      </main>
    </div>
  );
}
