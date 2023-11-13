"use client"

import { IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';

const BlogLikeButton = ({ id, likes, userId }: any) => {

    const handleLike = (e: any) => {
        e.stopPropagation()
        console.log(id)
        console.log(likes)
        console.log(userId)
    }


    return (
        <>
            <IconButton aria-label="add to favorites" disabled={likes.includes(userId)} onClick={handleLike}>
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