// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthGuard();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />; // render children route
};
