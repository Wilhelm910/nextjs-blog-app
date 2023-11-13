import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea } from '@mui/material';
import Link from 'next/link';


type BlogProps = {
    title: string;
    tags: string[];
    trending: string;
    category: string;
    description: string;
    comments: object[];
    likes: string[];
    author: string[];
    imgUrl: string;
    timestamp: Date;
    userId: string;
    id: string;
}

const BlogCard = (props: BlogProps) => {

    const { title, tags, trending, category, description, comments, likes, author, imgUrl, timestamp, userId, id } = props

    return (
        <Card sx={{ maxWidth: 545, height: 545, textDecoration: "none" }} >
            <Link href={`blogs/${id}`}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title}
                    subheader={timestamp.toDate().toDateString()}
                />
                <CardMedia
                    component="img"
                    height="280"
                    image={imgUrl}
                    alt={title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" >
                        {description.slice(0, 120) + "..."}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Link>
        </Card>
    )
}

export default BlogCard