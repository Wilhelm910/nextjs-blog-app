import BlogForm from '@/components/BlogForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Generated by create next app',
}

const Create = () => {

  return (
    <>
      <BlogForm />
    </>
  )
}

export default Create