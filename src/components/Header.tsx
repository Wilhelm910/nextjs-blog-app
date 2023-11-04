import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import Link from '@mui/material/Link';
import HeaderMenu from './HeaderMenu';
import UserMenu from './UserMenu';


const Header = () => {
    return (
        <>
            <AppBar 
            position='sticky'>
                <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                    marginRight: "120px",
                    marginLeft: "120px"
                }} >
                    <Box>
                        <HeaderMenu />
                    </Box>
                    <Box>
                        <Typography 
                        variant='h2' 
                        fontWeight={500}>
                            <Link
                                underline="none"
                                color="inherit"
                                href="/">Blogs</Link>
                        </Typography>
                    </Box>
                    <Box>
                        <UserMenu />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header