import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import type { Role } from "../../features/auth/types/auth.types";

interface Props {
  role: Role;
  children: React.ReactElement;
}

export function RequireRole({ role, children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#260101] text-[#DCDEF2]">
        Sitzung wird geladen...
      </div>
    );
  }

  if (!user || !user.roles.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
