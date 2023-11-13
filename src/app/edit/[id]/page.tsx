import BlogForm from '@/components/BlogForm'
import { Box, Typography } from '@mui/material'

const page = ({ params }: { params: { id: string } }) => {

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography variant='h2' textAlign="center">
                    Edit Blog
                </Typography>
                <BlogForm id={params.id} />
            </Box>
        </>
    )
}

export default page