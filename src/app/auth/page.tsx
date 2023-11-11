"use client"

import { auth } from '@/firebaseConfig'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Button, Card, CardActions, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useRouter } from 'next/navigation'
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
    const [showPassword, setShowPassword] = useState(false);
    const [signUp, setSignUp] = useState(false)
    const router = useRouter()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        console.log(userData)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!signUp) {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            router.push("/")
        } else {
            if (password != confirmPassword) {
                setAlertMessage("Passwords don't match")
            }
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(user, { displayName: `${firstName} ${lastName}` })
            router.push("/")
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setSignUp(prevCheck => !prevCheck);
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
                    <Typography variant='h4'>{!signUp ? "Sign in" : "Sign up"}</Typography>
                </CardContent>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        {signUp && (
                            <>
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
                            </>
                        )}
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
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
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
                            </FormControl>
                        </Stack>
                        {signUp && (
                            <Stack mb={2} width="300px">
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        name='confirmPassword'
                                        value={confirmPassword}
                                        onChange={handleChange}
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
                                </FormControl>
                            </Stack>
                        )}
                        {alertMessage && <Alert severity="error">{alertMessage}</Alert>
                        }
                    </CardContent>
                    <CardActions>
                        <Button color="secondary" variant="contained" type="submit">{signUp ? "Create account" : "Login"}</Button>
                    </CardActions>
                </form>
                <Stack mt={4} sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    {!signUp ? (
                        <>
                            <Typography>Dont have an account?</Typography>
                            <Button onClick={(e) => handleClick(e)}>Create an account</Button>
                        </>
                    ) : (
                        <>
                            <Typography>Already have an account?</Typography>
                            <Button onClick={(e) => handleClick(e)}>Login to your personal space</Button>
                        </>
                    )}
                </Stack>
            </Card>
        </Stack>

    )
}

export default Auth