import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CreateUser from "./Components/CreateUser";
import UserList from "./Components_Wakil/UserList";
import ViewUser from "./ViewUser";
import UpdateUser from "./Components/UpdateUser";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";

// import App from './App.jsx';
import Profile from "./Components/Profile";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
      {
        path: "/",
        element: <UserList />,
      },
      {
        path: "/createUser",
        element: <CreateUser></CreateUser>,
      },
      {
        path: "/updateUser/:id",
        element: <UpdateUser></UpdateUser>,
        loader: ({ params }) =>
          fetch(
            `http://192.168.22.131:3003/api/v1/administration/getUserProfile/${params.id}`
          ),
      },
    ],
  },

  {
    path: "/viewUser",
    element: <ViewUser></ViewUser>,
  },

  {
    path: "/profile/:id",
    element: <Profile />,
    loader: ({ params }) =>
      fetch(
        `http://192.168.22.131:3003/api/v1/administration/getUserProfile/${params.id}`
      ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
