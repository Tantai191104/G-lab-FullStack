import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export function useAuthGuard() {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuthStore();
  const { reset } = useQueryErrorResetBoundary();

  useEffect(() => {
    const handleApiError = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (
        (customEvent.detail as { isSessionExpired?: boolean })?.isSessionExpired
      ) {
        logout();
        reset(); // reset react-query cache để clear data
        navigate("/auth/login"); // điều hướng về login
      }
    };

    window.addEventListener("session-expired", handleApiError);
    return () => {
      window.removeEventListener("session-expired", handleApiError);
    };
  }, [logout, navigate, reset]);

  return { isAuthenticated: !!accessToken };
}
