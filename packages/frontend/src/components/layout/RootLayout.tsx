import { Outlet } from "react-router";
import Footer from "./Footer";
import TopNavBar from "./navigation/TopNavBar";
import { SideNavbar } from "./navigation/SideNavBar";

export default function RootLayout() {
  return (
    <div>
      <TopNavBar />
      <SideNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
