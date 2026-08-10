import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import { SetsPage } from "../pages/SetsPage";

export const router = createBrowserRouter([
{
    path: '/',
    element: <RootLayout />,
    children:
    [ 
        {
            index: true,
            element: <SetsPage />
        }
    ]
}
])