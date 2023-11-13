"use client"

import { Label } from '@mui/icons-material'
import { Box, Button, FormControlLabel, FormLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TagsInput } from 'react-tag-input-component'
import { VisuallyHiddenInput } from './common/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from "../firebaseConfig"
import { useAuthContext } from '@/app/utils/AuthContextProvider'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import CheckIcon from '@mui/icons-material/Check';

const BlogFormContent = {
    title: "",
    tags: [],
    trending: "no",
    category: "",
    description: "",
    comments: [],
    likes: [],
    userId: "",
    author: ""
}

const categoryOptions = [
    "Fashion",
    "Technology",
    "Food",
    "Politics",
    "Sports",
    "Business"
]


const BlogForm = ({ id }: any) => {

    const [file, setFile] = useState<File>()
    const [formData, setFormData] = useState(BlogFormContent)
    const { user, setUser } = useAuthContext()
    const [progress, setProgress] = useState<number>()
    const router = useRouter()


    const { title, tags, trending, category, description, author, userId } = formData

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleTags = (tags: any) => {
        setFormData({
            ...formData,
            tags
        })
    }

    const handleTrending = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            trending: e.target.value
        })
    }

    const handleCategory = (e: SelectChangeEvent<string>) => {
        setFormData({
            ...formData,
            category: e.target.value
        })
    }

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setFile(selectedFiles?.[0]);
        console.log(selectedFiles[0])
        console.log(file)
    };

    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, file?.name)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log("Upload is" + progress + "% done")
                console.log(snapshot)
                setProgress(progress)

                switch (snapshot.state) {
                    case "paused":
                        console.log("upload is paused")
                    case "running":
                        console.log("Upload is running")
                        break;
                    default:
                        break
                }

            }, (error) => {
                console.log(error)
            },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        setFormData((prev) => ({
                            ...prev,
                            imgUrl: downloadUrl
                        }))
                    })
                })
        }

        file && uploadFile()
    }, [file])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (category && tags && title && trending && description) {
            console.log("submitted")
            if (!id) {
                console.log("create")
                try {
                    await addDoc(collection(db, "blogs"), {
                        ...formData,
                        timestamp: serverTimestamp(),
                        author: user.displayName,
                        userId: user.uid
                    })
                    router.push("/")
                }
                catch (error) {
                    console.log(error)
                }
            } else {
                console.log("update")
                try {
                    await updateDoc(doc(db, "blogs", id), {
                        ...formData,
                        timestamp: serverTimestamp(),
                        author: user.displayName,
                        userId: user.uid
                    })
                    router.push("/")
                }
                catch (error) {
                    console.log(error)
                }
            }
        } else {
            console.log("not submittted")
        }
    }

    useEffect(() => {
        id && getBlog()
    }, [id])

    const getBlog = async () => {
        try {
            const blogRef = doc(db, "blogs", id)
            const blogDetails = await getDoc(blogRef)
            setFormData({ ...blogDetails.data() })
        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <Stack spacing={4} sx={{
            display: "flex",
            alignItems: "center"
        }}>
            <form onSubmit={handleSubmit}>
                <Stack mb={3} width="500px">
                    <TextField
                        required
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        name='title'
                        value={title}
                        onChange={handleChange}
                    />
                </Stack>
                <Stack mb={3} width="500px">
                    <TagsInput
                        name="Tags"
                        placeHolder='Tags'
                        value={tags}
                        onChange={handleTags}
                    />
                </Stack>
                <Stack mb={3} width="500px">
                    <FormLabel id="demo-row-radio-buttons-group-label">Trending?</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <Typography
                            sx={{ opacity: "0.5" }}>Yes</Typography>
                        <Radio
                            onChange={handleTrending}
                            checked={trending === 'yes'}
                            value="yes"
                        />
                        <Typography
                            sx={{ opacity: "0.5" }}>No</Typography>
                        <Radio
                            onChange={handleTrending}
                            checked={trending === 'no'}
                            value="no"
                        />
                    </RadioGroup>
                </Stack>
                <Stack mb={3} width="500px">
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={(e) => handleCategory(e)}
                    >
                        {categoryOptions.map((element, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    value={element || ""}
                                >{element}</MenuItem>
                            )
                        })}
                    </Select>
                </Stack>
                <Stack mb={3} width="500px">
                    <TextField
                        required
                        id="outlined-static"
                        label="Description"
                        variant="outlined"
                        name='description'
                        value={description}
                        onChange={handleChange}
                        minRows={5}
                        multiline
                    />
                </Stack>
                <Stack mb={3} width="auto">
                    {progress != 100 ? (
                        <Button
                            onChange={handleFile}
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    ) : (
                        <Paper elevation={4} sx={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", justifyContent: "center", padding: 1 }}>
                            <CheckIcon />
                            <Typography sx={{ textAlign: "center" }} ml={1}>Image upload completed</Typography>
                        </Paper>
                    )}
                </Stack>
                <Button variant="contained" type='submit'>
                    {id ? ("Update Blog") : ("Create Blog")}
                </Button>
            </form>
        </Stack>
    )
}

export default BlogForm