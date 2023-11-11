"use client"

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "./utils/AuthContextProvider";
import { getBlogs } from "./utils/firebaseBlogs";
import { QuerySnapshot, collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";



const Home = () => {

  const { user, setUser } = useAuthContext()
  const [blogs, setBlogs] = useState<any[]>([])

  useEffect(() => {
    try {
      const blogRef = query(collection(db, "blogs"))
      const unsubscribe = onSnapshot(blogRef, (QuerySnapshot) => {
        let itemsArr: any = []
        QuerySnapshot.forEach(element => {
          itemsArr.push({
            id: element.id,
            ...element.data()
          })
        });
        setBlogs(itemsArr)
      })
      return () => unsubscribe()
    }
    catch (error) {
      console.log(error)
    }

  }, [])

  console.log(blogs)

  return (
    <>
      <Box ml={20} mr={20} mt={2}>
        {user?.displayName}
        {blogs && blogs.map((blog, index) => {
          return (
            <>
              <Box key={index}>
                <Typography>{blog.title}
                </Typography>
              </Box>
            </>

          )
        })}
      </Box>
    </>

  )
}

export default Home