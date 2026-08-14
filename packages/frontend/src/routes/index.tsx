import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import { SetsPage } from "../pages/SetsPage";
import { OpenPackPage } from "../pages/OpenPackPage";
import { DashBoardPage } from "../pages/DashBoardPage";
import CollectionPage from "../pages/CollectionPage";

export const router = createBrowserRouter([
{
    path: '/',
    element: <RootLayout />,
    children:
    [ 
        {
            index: true,
            element: <DashBoardPage />
        },
        {
            path: "packs",
            element: <OpenPackPage />
        },
        {
            path: "sets",
            element: <SetsPage />
        },
        {
            path: "collection",
            element: <CollectionPage />
        }

    ]
}
])