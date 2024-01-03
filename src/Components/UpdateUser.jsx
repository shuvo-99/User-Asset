import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './UpdateUser.css'
import axios from "axios";
import { useLoaderData } from 'react-router-dom';

const UpdateUser = () => {

    const loadData = useLoaderData()
    console.log(loadData)
    // console.log(loadData._value.userName)

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const dob = event.target.dob.value;
        const img = event.target.image.value;
        const pass = event.target.password.value
        console.log(name);
        console.log(dob)
        console.log(img)
        event.target.reset();

        const updateUser = {
            userName: name,
            dobdateOfBirth: dob,
            profileImage: img,
            password:pass,

        };

        console.log(updateUser)
    }

    return (
        <div className='update_form'>
            <Box
                component="form"
                onSubmit={handleSubmit}  // Move onSubmit to the form element
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <h3 style={{ textAlign: 'center' }}>Update User Profile</h3>
                <div>
                    <TextField
                        required
                        name='name'
                        // id="standard-helperText"
                        label="User Name"
                        defaultValue={loadData._value.userName}
                        variant="filled"
                    />
                </div>
                <div>
                    <TextField
                        required
                        name='dob'
                        // id="filled-required"
                        label="Date of Birth"
                        type='date'
                        variant="filled"
                        defaultValue={loadData._value?.dateOfBirth}
                    />
                </div>
                <div>
                    <TextField
                        required
                        name='image'
                        // id="filled-required"
                        label="Image Link"
                        variant="filled"
                        defaultValue={loadData._value?.profileImage}
                    />
                </div>
                <div>
                    <TextField
                        required
                        name='password'
                        // id="filled-required"
                        label="Password"
                        variant="filled"
                        type='password'
                    />
                </div>
                <div className='form-btn'>
                    <Button type="submit" variant="outlined">Update</Button>
                </div>
            </Box>
        </div>
    );
};

export default UpdateUser;