"use client"

import { Label } from '@mui/icons-material'
import { Button, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { TagsInput } from 'react-tag-input-component'
import { VisuallyHiddenInput } from './common/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from "../firebaseConfig"


const BlogFormContent = {
    title: "",
    tags: [],
    trending: "no",
    category: "",
    description: "",
    comments: [],
    likes: []
}

const categoryOptions = [
    "Fashion",
    "Technology",
    "Food",
    "Politics",
    "Sports",
    "Business"
]


const BlogForm = () => {

    const [file, setFile] = useState<File>()
    const [formData, setFormData] = useState(BlogFormContent)

    const { title, tags, trending, category, description } = formData

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        if (category && tags && title && trending && description && file) {
            try {
                await addDoc(collection(db, "blogs"), {
                    ...formData,
                    timestamp: serverTimestamp(),
                    author: user.displayName,
                    userId: user.id
                })
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const handleTEST = (e: any) => {
        setFile(e.target.files[0])
        console.log(file)
    }

    return (
        <Stack spacing={4} sx={{
            display: "flex",
            alignItems: "center"
        }}>
            <Typography variant='h3'>Create a new Blog</Typography>
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
                <Stack mb={3} width="200px">
                    <Button
                        onChange={handleFile}
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </Stack>
                <Stack mb={3} width="200px">
                    <Button
                        onChange={handleTEST}
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </Stack>
                <Button variant="contained" type='submit'>Create Blog</Button>
            </form>
        </Stack>
    )
}

export default BlogForm