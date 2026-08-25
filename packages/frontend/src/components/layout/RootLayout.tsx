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

        <main className="flex-1 flex-row p-20">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
