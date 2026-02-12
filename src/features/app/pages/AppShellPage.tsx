import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTenant } from "../../../app/providers/TenantProvider";

function NavItem({ to, label }: { to: string; label: string }): React.ReactElement {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded text-sm transition",
          isActive ? "bg-[#8C5A67] text-white" : "text-[#DCDEF2]/85 hover:bg-[#1d0000]",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export function AppShellPage(): React.ReactElement {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { tenantId, clearTenantId } = useTenant();

  function handleLogout(): void {
    clearTenantId();
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#260101] text-[#DCDEF2]">
      <header className="border-b border-[#8C5A67]/50 bg-[#1d0000]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <Link to="/app" className="text-lg font-semibold">Pfad des Paradoxons</Link>
            <p className="text-xs text-[#DCDEF2]/70">
              {user?.email || "unbekannt"} · Tenant: {tenantId || "nicht gesetzt"}
            </p>
          </div>

          <nav className="flex items-center gap-2">
            <NavItem to="/app/onboarding" label="Onboarding" />
            <NavItem to="/app/profile" label="Profil" />
            <NavItem to="/app/settings" label="Settings" />
            <NavItem to="/app/sessions" label="Sessions" />
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-2 rounded border border-[#A67C7C] text-sm hover:bg-[#260101]"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
