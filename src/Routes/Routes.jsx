import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import BookService from "../pages/BookService/BookService";
import Pagenotfound from "../pages/Pagenotfound/Pagenotfound";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "*",
                element: <Pagenotfound />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            },
            {
                path: 'book/:id',
                element: <PrivateRoute><BookService /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://server-car-doctor-sanad-bhowmik.vercel.app/services/${params.id}`)
            },
            {
                path: '/bookings',
                element: <PrivateRoute><Bookings /></PrivateRoute>
            }
        ]
    },
]);
export default router;