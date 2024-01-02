import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './CreateUser.css'

const CreateUser = () => {

    // const [users, setUsers] = useState([]);
    const [idCounter, setIdCounter] = useState(4);

    // useEffect(() => {
    //     fetch('/fakedata.json')
    //         .then(res => res.json())
    //         .then(data => setUsers(data))
    //     console.log(users)
    
    // }, []);

    // const updateJsonFile = async (newData) => {
    //     // Update the static JSON file with the new data
    //     try {
    //         await fetch('/fakedata.json', {
    //             method: 'PUT', // Use the correct method for your use case
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(newData),
    //         });
    //     } catch (error) {
    //         console.error('Error updating data:', error);
    //     }
    //     console.log(users)
    // };

    fetch("http://localhost:5000/users")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const dob = event.target.dob.value;
        const img = event.target.image.value;
        console.log(name);
        console.log(dob)
        console.log(img)
        event.target.reset();

        const newUser = {
            _id: idCounter,
            name: name,
            dob: dob,
            image: img,
        };

        console.log(newUser)

        // setUsers([...users, newUser]);
        setIdCounter(idCounter + 1);

        // updateJsonFile([...users, newUser]);

        fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.insertedID) {
            console.log("yes, inserted");
            
            }
        });
        
    };

    return (
        <div className='form'>
            <Box
                component="form"
                onSubmit={handleSubmit}  // Move onSubmit to the form element
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <h3 style={{ textAlign: 'center' }}>Create User Profile</h3>
                <div>
                    <TextField
                        required
                        name='name'
                        id="filled-required"
                        label="User Name"
                        variant="filled"
                    />
                </div>
                <div>
                    <TextField
                        required
                        name='dob'
                        id="filled-required"
                        label="Date of Birth"
                        type='date'
                        variant="filled"
                    />
                </div>
                <div>
                    <TextField
                        required
                        name='image'
                        id="filled-required"
                        label="Image Link"
                        variant="filled"
                    />
                </div>
                <div className='form-btn'>
                    <Button type="submit" variant="outlined">Submit</Button>
                </div>
            </Box>
        </div>
    );
};

export default CreateUser;
