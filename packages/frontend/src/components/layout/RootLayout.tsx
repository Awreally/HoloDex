import { Outlet } from "react-router";
import Footer from "./Footer";
import TopNavBar from "./navigation/TopNavBar";
import { SideNavbar } from "./navigation/SideNavBar";

export default function RootLayout() {
  return (
    <div>
      <TopNavBar />

      <div className="flex">
        <SideNavbar />

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}