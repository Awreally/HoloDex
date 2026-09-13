import { useState } from "react";
import { Outlet, useLoaderData, ScrollRestoration } from "react-router";
import Footer from "./Footer";
import TopNavBar from "./navigation/TopNavBar";
import { MobileTopBar } from "./navigation/MobileTopBar";
import { SideNavbar } from "./navigation/SideNavBar";
import { AuthProvider } from "../../context/AuthContext";
import { authLoader } from "../../features/auth/loaders/auth.loaders";

export default function RootLayout() {
  const { user } = useLoaderData<typeof authLoader>();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <AuthProvider user={user}>
      <div className="flex min-h-dvh flex-col">
        <TopNavBar />
        <MobileTopBar onOpenMenu={() => setMobileNavOpen(true)} />

        <div className="flex">
          <SideNavbar
            open={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          />

          <main className="flex-1 p-2 sm:p-4 md:p-20">
            <Outlet />
          </main>
        </div>

        <Footer />
        <ScrollRestoration />
      </div>
    </AuthProvider>
  );
}
