import { Outlet, useLoaderData } from "react-router";
import Footer from "./Footer";
import TopNavBar from "./navigation/TopNavBar";
import { SideNavbar } from "./navigation/SideNavBar";
import { AuthProvider } from "../../context/AuthContext";
import { authLoader } from "../../features/auth/loaders/auth.loaders";

export default function RootLayout() {
  const { user } = useLoaderData<typeof authLoader>();

  return (
    <AuthProvider user={user}>
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
    </AuthProvider>
  );
}
