"use client"

import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const BlogLikeButton = ({ id, likes, userId }: any) => {

    const [blog, setBlog] = useState<Array>([])

    const handleLike = async () => {
        if (likes.includes(userId)) {
            likes.splice(likes.indexOf(userId), 1)
        } else {
            likes.push(userId)
        }
        const blogRef = doc(db, "blogs", id)
        const blogDetails = await getDoc(blogRef)
        setBlog(blogDetails.data())
        await updateDoc(doc(db, "blogs", id), {
            ...blog,
            likes,
            timestamp: serverTimestamp()
        })
    }

    return (
        <>
            <IconButton aria-label="add to favorites" disabled={!userId} onClick={handleLike}>
                {likes.includes(userId) ? (
                    <>
                        <FavoriteIcon color='primary' />
                        {likes.length}
                    </>
                ) : (
                    <>
                        <FavoriteIcon />
                        {likes.length}
                    </>
                )}

            </IconButton>
        </>
    )
}

export default BlogLikeButton