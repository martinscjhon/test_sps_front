import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Users from "./pages/Users";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
]);

export default router;
