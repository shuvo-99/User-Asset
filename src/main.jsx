import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import UserList from "./Components_Wakil/UserList";
const router = createBrowserRouter([
  {
    path: "/yo",
    element: <div>Hello world Shuvo!</div>,
  },
  {
    path: "/userList",
    element: <UserList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
