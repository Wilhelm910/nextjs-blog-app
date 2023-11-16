"use client"

import { useAuthContext } from '@/app/utils/AuthContextProvider'
import { db } from '@/firebaseConfig'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { Timestamp, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'


const Comment = ({ id, blog }: any) => {

    const [commentBody, setCommentBody] = useState("")
    const { user, setUser } = useAuthContext()

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     })
    //     console.log(formData)
    // }
    // console.log(id)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            blog.comments.push({
                createdAt: Timestamp.fromDate(new Date()),
                userId: user.uid,
                name: user.displayName,
                body: commentBody
            })
            await updateDoc(doc(db, "blogs", id), {
                ...blog,
                comments: blog.comments
            })
            setCommentBody("")
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
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                        />
                        <Button variant="contained" color='secondary' type='submit' disabled={!user || commentBody.length == 0}>Comment</Button>
                    </Stack>
                </form>
            </Box>
        </>
    )
}

export default Comment