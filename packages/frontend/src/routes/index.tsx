import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import { SetsPage } from "../pages/SetsPage";
import { OpenPackPage } from "../features/packs/pages/OpenPackPage";
import { DashBoardPage } from "../pages/DashBoardPage";
import Authpage from "../features/auth/pages/AuthPage";
import CollectionPage from "../pages/CollectionPage";

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
        element: <OpenPackPage />,
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
