import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import { SetsPage } from "../pages/SetsPage";
import { OpenPackPage } from "../features/packs/page/OpenPackPage";
import { DashBoardPage } from "../pages/DashBoardPage";
import { TradePage } from "../pages/TradePage";
import Authpage from "../features/auth/pages/AuthPage";
import CollectionPage from "../features/collection/pages/CollectionPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { PackLayout } from "../features/packs/page/PackLayout";
import { packsLoader } from "../features/packs/loaders/packs.loader";
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
        path: "packs",
        id: "packs",
        loader: packsLoader,
        element: <PackLayout />,
        children: [
          {
            index: true,
            element: <OpenPackPage />,
          },
          {
            path: "setId",
            element: <OpenPackPage />,
          },
        ],
      },
      {
        path: "packs/:setId",
        element: (
          <ProtectedRoute>
            <OpenPackPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "openpacks",
        element: <OpenPackPage />,
      },
      {
        path: "collection",
        element: <CollectionPage />,
      },
      {
        path: "sets",
        element: <SetsPage />,
      },
      {
        path: "trade",
        element: <TradePage />,
      },
    ],
  },
]);
