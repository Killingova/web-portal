import { Outlet } from "react-router-dom";
import { Header } from "../../../shared/ui/Header";
import { Footer } from "../../../shared/ui/Footer";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f2eeff] flex flex-col">
      <Header />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
