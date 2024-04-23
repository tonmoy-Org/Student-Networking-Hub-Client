import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../component/ErrorPage/ErrorPage";
import Search from "../Pages/Search/Search";
import Profile from "../Pages/Profile/Profile";
import MyPostActivity from "../Pages/MyPostActivity/MyPostActivity";
import UserDetails from "../Pages/UserDetails/UserDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>
            },
            {
                path: 'search',
                element: <Search></Search>
            },
            {
                path: 'myProfile',
                element: <Profile></Profile>
            },
            {
                path: 'PostActivity/all',
                element: <MyPostActivity></MyPostActivity>
            },
            {
                path: 'userDetails/:id',
                element: <UserDetails></UserDetails>,
                loader: ({ params }) => fetch(`https://student-networking-server.vercel.app/users-details/${params.id}`)
            }
]
    }
]);

export default router;
