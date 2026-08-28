import { createBrowserRouter } from "react-router";
import { RouteErrorBoundary, RouteLoading } from "./RouteFeedBack";
import RootLayout from "../components/layout/RootLayout";
import SetsPage from "../features/sets/pages/SetsPage";
import { OpenPackPage } from "../features/packs/page/OpenPackPage";
import { DashBoardPage } from "../pages/DashBoardPage";
import { TradePage } from "../pages/TradePage";
import Authpage from "../features/auth/pages/AuthPage";
import CollectionPage from "../features/collection/pages/CollectionPage";
import { PackLayout } from "../features/packs/page/PackLayout";
import { packsLoader, openPackAction } from "../features/packs/loaders/packs.loader";
import { collectionLoader } from "../features/collection/loaders/collection.loaders";
import { setsLoader } from "../features/sets/loader/sets.loader";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    hydrateFallbackElement: <RouteLoading />,
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
            path: ":setId",
            action: openPackAction,
            element: <OpenPackPage />,
          },
        ],
      },
    
      {
        path: "collection",
        loader: collectionLoader,
        element: <CollectionPage />,
      },
      {
        path: "sets",
        loader: setsLoader,
        element: <SetsPage />,
      },
      {
        path: "trade",
        element: <TradePage />,
      },
    ],
  },
]);
