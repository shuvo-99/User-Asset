import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import CreateUser from './CreateUser';
import UserList from './UserList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList></UserList>,
  },
  {
    path:"/createUser",
    element: <CreateUser></CreateUser>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);