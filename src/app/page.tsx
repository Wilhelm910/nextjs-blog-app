"use client"

import { Box } from "@mui/material";
import { useEffect } from "react";
import { useAuthContext } from "./utils/AuthContextProvider";



export default function Home() {

  const { user, setUser } = useAuthContext()

  return (
    <>
      <Box ml={20} mr={20} mt={2}>
        {user?.displayName}
      </Box>
    </>

  )
}
