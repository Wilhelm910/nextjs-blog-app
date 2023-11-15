"use client"

import { useAuthContext } from '@/app/utils/AuthContextProvider'
import { db } from '@/firebaseConfig'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'


const commentData = {
    body: "",
    author: "",
    createdAt: "",
    userId: ""
}

const Comment = ({ id }: any) => {

    const [formData, setFormData] = useState(commentData)
    const { user, setUser } = useAuthContext()
    const { body, author, createdAt, userId } = formData

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        console.log(formData)
    }
    console.log(id)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            let userComment = []
            userComment.push({
                createdAt: Timestamp.fromDate(new Date()),
                userId,
                name: user?.displayName,
                body: userComment
            })
            await updateDoc(doc(db, "blogs", id), {
                ...formData,
                createdAt: serverTimestamp(),
                author: user.displayName,
                userId: user.uid
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <Stack mb={2}>
                    <Typography variant='h5'>Write a comment</Typography>
                </Stack>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>
                        <TextField
                            sx={{ width: "100%", marginBottom: "10px" }}
                            id="outlined-multiline-static"
                            label="Comment"
                            multiline
                            rows={4}
                            name='body'
                            value={body}
                            onChange={handleChange}
                        />
                        <Button variant="contained" color='secondary' type='submit' disabled={!user || body.length == 0}>Comment</Button>
                    </Stack>
                </form>
            </Box>
        </>
    )
}

export default Comment