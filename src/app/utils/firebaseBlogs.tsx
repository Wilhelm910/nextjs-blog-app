"use client"

import { db } from "@/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import { useState } from "react"


export const getBlogs = async () => {

    const [blogs, setBlogs] = useState()

    try {
        const blogRef = collection(db, "blogs")
        const docSnaphsot = await getDocs(blogRef)
        let listOfBlogs: any = []
        docSnaphsot.forEach(element => {
            listOfBlogs.push({
                id: element.id,
                ...element.data()
            })
        });
        //setBlogs(listOfBlogs)
        return listOfBlogs
    }
    catch (error) {
        console.log(error)
    }
}