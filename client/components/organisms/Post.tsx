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
import ReplyIcon from '@mui/icons-material/Reply';
import RepeatIcon from '@mui/icons-material/Repeat';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Details from '../atoms/Details'

export interface PostProps {
    photoURL: string,
    userName: string,
    userId: string,
    postHTML: JSX.Element,
    postTime: string,
    replyCount: number,
    repostCount: number,
    favCount: number,
    isFavedByU: boolean,
    isRepostedByU: boolean
}

const Post = (props: PostProps) => {
    return (
        <Card sx={{ maxWidth: 600 }}>
            <CardHeader
                avatar={
                    <Avatar src={props.photoURL} aria-label="icon" />
                }
                action={
                    <Details {...props}/>
                }
                title={props.userName + '@' + props.userId}
                subheader={props.postTime}
            />
            <CardContent>{props.postHTML}</CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="reply">
                    <ReplyIcon />
                </IconButton>
                <Typography variant="body2">{props.replyCount}</Typography>
                <IconButton aria-label="repost">
                    <RepeatIcon />
                </IconButton>
                <Typography variant="body2">{props.repostCount}</Typography>
                <IconButton aria-label="favorite">
                    <FavoriteIcon />
                </IconButton>
                <Typography variant="body2">{props.favCount}</Typography>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Post