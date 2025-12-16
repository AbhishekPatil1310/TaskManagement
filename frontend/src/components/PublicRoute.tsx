import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import type { ReactNode } from "react";

export default function PublicRoute({
  children
}: {
  children: ReactNode;
}) {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
