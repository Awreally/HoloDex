import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import { SetsPage } from "../pages/SetsPage";
import { OpenPackPage } from "../features/packs/pages/OpenPackPage";
import { DashBoardPage } from "../pages/DashBoardPage";
import Authpage from "../features/auth/pages/AuthPage";
import CollectionPage from "../features/collection/pages/CollectionPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashBoardPage />,
      },
      {
        path: "login",
        element: <Authpage />,
      },
      {
        path: "packs/:setId",
        element: <ProtectedRoute><OpenPackPage /></ProtectedRoute>,
      },
      {
        path: "sets",
        element: <SetsPage />,
      },
      {
        path: "collection",
        element: <CollectionPage />,
      },
    ],
  },
]);
