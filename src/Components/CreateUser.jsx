import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./CreateUser.css";
import axios from "axios";

const CreateUser = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const dob = event.target.dob.value;
    const img = event.target.image.value;
    const pass = event.target.password.value;
    console.log(name);
    console.log(dob);
    console.log(img);
    event.target.reset();

    const newUser = {
      userName: name,
      dobdateOfBirth: dob,
      profileImage: img,
      password: pass,
    };

    console.log(newUser);

    axios
      .post(
        "http://192.168.22.239:3003/api/v1/administration/addUserWithProfile",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("User added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding user:", error.message);
      });
  };

  return (
    <div className="form">
      <Box
        component="form"
        onSubmit={handleSubmit} // Move onSubmit to the form element
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <h3 style={{ textAlign: "center" }}>Create User Profile</h3>
        <div>
          <TextField
            required
            name="name"
            id="filled-required"
            label="User Name"
            variant="filled"
          />
        </div>
        {/* <div>
                    <p>Date of Birth</p>
                </div> */}
        <div>
          <TextField
            required
            name="dob"
            id="filled-required"
            // label="Date of Birth"
            type="date"
            variant="filled"
          />
        </div>
        <div>
          <TextField
            required
            name="image"
            id="filled-required"
            label="Image Link"
            variant="filled"
          />
        </div>
        <div>
          <TextField
            required
            name="password"
            id="filled-required"
            label="Password"
            variant="filled"
            type="password"
          />
        </div>
        <div className="form-btn">
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default CreateUser;
