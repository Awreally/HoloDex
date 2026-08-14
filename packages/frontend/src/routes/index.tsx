import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import { SetsPage } from "../pages/SetsPage";
import { OpenPackPage } from "../pages/OpenPackPage";

export const router = createBrowserRouter([
{
    path: '/',
    element: <RootLayout />,
    children:
    [ 
        {
            index: true,
            element: <SetsPage />
        },
        {
            path: "packs",
            element: <OpenPackPage />
        }
    ]
}
])