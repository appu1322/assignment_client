import { Navigate, createBrowserRouter } from "react-router-dom";
import PageNotFound from "../components/page-not-found";
import Home from "../screens/Home";
import ManageContact from "../screens/Home/manage";


export default createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [{
            path: "new",
            element: <ManageContact />,
            errorElement: <PageNotFound />
        }],
        errorElement: <PageNotFound />
    },
    {
        path: "*",
        element: <Navigate to="/" />,
        errorElement: <PageNotFound />
    },
]);  
