import type { ReactElement } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTenant } from "../../../app/providers/TenantProvider";
import { Header } from "../../../shared/ui/Header";
import { Footer } from "../../../shared/ui/Footer";

function AppNavItem({ to, label }: { to: string; label: string }): ReactElement {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200",
          isActive
            ? "bg-[#6f52cc]/55 text-white shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
            : "text-[#ddd2f5] hover:text-white hover:bg-[#6f52cc]/35",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export function AppShellPage(): ReactElement {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { tenantId, clearTenantId } = useTenant();

  function handleLogout(): void {
    clearTenantId();
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f2eeff] flex flex-col">
      <Header>
        <div className="text-right hidden lg:block">
          <p className="text-xs text-[#9b7fe8] leading-tight">{user?.email || "unbekannt"}</p>
          <p className="text-[10px] text-[#b9adcf]/60">Tenant: {tenantId || "nicht gesetzt"}</p>
        </div>

        <AppNavItem to="/app/onboarding" label="Erste Schritte" />
        <AppNavItem to="/app/profile" label="Profil" />
        <AppNavItem to="/app/settings" label="Einstellungen" />

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold border border-white/20 bg-white/5 backdrop-blur-sm text-[#ddd2f5] hover:bg-white/15 transition-all duration-200"
        >
          Abmelden
        </button>
      </Header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 pb-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
