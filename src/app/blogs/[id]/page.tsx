"use client"

import { db } from '@/firebaseConfig'
import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import { collection, doc, getDoc, query } from 'firebase/firestore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import BlogModal from '@/components/BlogModal'

const BlogDetailPage = ({ params }: { params: { id: string } }) => {

  const [blog, setBlog] = useState<Array>([])
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);


  console.log(blog)

  useEffect(() => {
    try {
      getBlogDetails()
    }
    catch (error) {
      console.log(error)
    }
  }, [params.id])


  const getBlogDetails = async () => {
    const blogRef = doc(db, "blogs", params.id)
    const blogDetails = await getDoc(blogRef)
    setBlog(blogDetails.data())
  }

  const { author, title, description, imgUrl, timestamp } = blog


  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Card sx={{ width: "80%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={handleOpen} >
                <MoreVertIcon />
              </IconButton>
            }
            title={author}
            subheader={timestamp?.toDate().toDateString()}
          />
          <CardMedia
            component="img"
            height="500"
            image={imgUrl}
            alt="medival drawing"
            sx={{ objectFit: "contain" }}

          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <BlogModal open={open} setOpen={setOpen} id={params.id}/>
    </>
  )
}

export default BlogDetailPage