import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Typography, Avatar, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

import axios from "axios";
// import { faker } from "@faker-js/faker";

import { DataGrid } from "@mui/x-data-grid";

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { lightGreen } from "@mui/material/colors";

// // **************************************

// function createData(avatarComponent, name, dateOfBirth) {
//   return { img: avatarComponent, name, dateOfBirth };
// }

// const rows = [
//   createData(
//     <img src={image1} alt="Girl in a jacket" width="100" height="100" />,
//     "Pochaa",
//     "Dec 09, 2002"
//   ),
//   createData(
//     <img src={image2} alt="Girl in a jacket" width="100" height="100" />,
//     "Ice cream sandwich",
//     "Dec 11, 2002"
//   ),
//   createData(
//     <img src={image2} alt="Girl in a jacket" width="100" height="100" />,
//     "Eclair",
//     "Dec 12, 2002"
//   ),
//   createData(
//     <img src={image1} alt="Girl in a jacket" width="100" height="100" />,
//     "Cupcake",
//     "Dec 13, 2002"
//   ),
//   createData(
//     // <ImageAvatar img="/assets/image1.jpg" />,
//     <img src={image1} alt="Girl in a jacket" width="100" height="100" />,
//     "Gingerbread",
//     "Dec 14, 2002"
//   ),
// ];
// //-----------------------------------

//-----------------------------------

const UserList = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = (user) => {
    // You can perform the deletion action using the assetId parameter
    const userId = user.id;
    // console.log(userId);
    axios
      .get(
        `http://192.168.22.239:3003/api/v1/administration/deleteUser/${userId}`
      )
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        // After deletion, you might want to update the user list by fetching it again
        axios
          .get(`http://192.168.22.239:3003/api/v1/administration/getUserList`)
          .then((res) => {
            const userDataFromAPI = res.data._value;
            setUsers(userDataFromAPI); // Set asset data in state after deletion
            console.log("Asset Data after deletion:", userDataFromAPI); // Log the asset data
          })
          .catch((error) => {
            console.error("Error fetching asset data:", error.message);
            // Handle errors here
          });
      })
      .catch((error) => {
        console.error("Error deleting asset:", error.message);
        // Handle errors here
      });
  };
  useEffect(() => {
    axios
      .get(`http://192.168.22.239:3003/api/v1/administration/getUserList`)
      .then((res) => {
        // console.log(res);
        setUsers(res.data._value);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error.message);
        // Handle errors here
      });
  }, []);
  // console.log(users);
  return (
    <TableContainer component={Paper}>
      <Typography variant="h3" component="div" align="center">
        User List
      </Typography>
      <Table align="center" sx={{ width: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "30px" }}>Image</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Date Of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.id}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {
                  <img
                    src={row.profileImage}
                    alt="No Image"
                    width="100"
                    height="100"
                  />
                }
              </TableCell>
              <TableCell align="right">{row.userName}</TableCell>
              <TableCell align="right">{row.dateOfBirth}</TableCell>
              <TableCell align="right">
                <Link to="/profile">
                  <Button>Profile</Button>
                </Link>
              </TableCell>
              <TableCell align="right">
                <Link to={`/updateUser/${row.id}`}>
                  <Button>Edit</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(row)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
// **************************************

export default UserList;
