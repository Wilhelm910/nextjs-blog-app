"use client"

import { auth } from '@/firebaseConfig'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Box, Button, Card, CardActions, CardContent, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'


const initializeUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Auth = () => {

    const [alertMessage, setAlertMessage] = useState("")
    const [userData, setUserData] = useState(initializeUser)
    const { firstName, lastName, email, password, confirmPassword } = userData
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setAlertMessage("Passwords dont match")
        }
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user, { displayName: `${firstName} ${lastName}` })
    }

    return (
        <Stack sx={{
            display: "flex",
            alignItems: "center",
        }}>
            <Card sx={{
                padding: "20px",
                backgroundColor: "#f4eeee"
            }}>
                <CardContent>
                    <Typography variant='h4'>Sign in</Typography>
                </CardContent>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Stack mb={2} width="300px">
                            <TextField
                                required
                                id="outlined-basic"
                                label="First Name"
                                variant="outlined"
                                name='firstName'
                                value={firstName}
                                onChange={handleChange}
                            />
                        </Stack>
                        <Stack mb={2} width="300px">
                            <TextField
                                required
                                id="outlined-basic"
                                label="Last Name"
                                variant="outlined"
                                name='lastName'
                                value={lastName}
                                onChange={handleChange}
                            />
                        </Stack>
                        <Stack mb={2} width="300px">
                            <TextField
                                required
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                name='email'
                                value={email}
                                onChange={handleChange}
                            />
                        </Stack>
                        <Stack mb={2} width="300px">
                            <TextField
                                required
                                type='password'
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                name='password'
                                value={password}
                                onChange={handleChange}
                            />
                        </Stack>
                        <Stack mb={2} width="300px">
                            <TextField
                                required
                                type='password'
                                id="filled-basic"
                                label="Confirm Password"
                                variant="outlined"
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleChange}
                            />
                        </Stack>
                        <Stack>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </Stack>
                        {alertMessage && <Alert severity="error">{alertMessage}</Alert>
                        }
                    </CardContent>
                    <CardActions>
                        <Button color="secondary" variant="contained" type="submit">Create account</Button>
                    </CardActions>
                </form>

            </Card>
        </Stack>

    )
}

export default Auth