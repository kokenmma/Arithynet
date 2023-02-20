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
import Details from './Details';

export interface PostProps {
  postId: number;
}

const Post = (props: PostProps) => {
  // services/get-post.ts を使って，postId から photoURL，username，postText などを読みだす．
  // postText を TikZ の部分で分割する．

  // Markdown + LaTeX(TikZ を除く) の部分は markdown-it-katex で HTML に変換し
  // TikZ は Go API で SVG 画像/コードに変換したあと
  // それらをくっつけて postHTML を作る

  // timestamp が返ってくるので，それから投稿日時の文字列 postTime を作る
  let photoURL = '';
  let userName = 'testuser';
  let userId = '123456abc';
  let postHTML: JSX.Element = <span>Welcome to UEC!</span>;
  let replyCount = 1;
  let repostCount = 2;
  let favCount = 3;
  let postTime = 'February 20, 2023';
  let isFavedByU = true;
  let isRepostedByU = true;
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardHeader
        avatar={<Avatar src={photoURL} aria-label='icon' />}
        action={<Details postId={props.postId} />}
        title={userName + '@' + userId}
        subheader={postTime}
      />
      <CardContent>{postHTML}</CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='reply'>
          <ReplyIcon />
        </IconButton>
        <Typography variant='body2'>{replyCount}</Typography>
        <IconButton aria-label='repost'>
          <RepeatIcon />
        </IconButton>
        <Typography variant='body2'>{repostCount}</Typography>
        <IconButton aria-label='favorite'>
          <FavoriteIcon />
        </IconButton>
        <Typography variant='body2'>{favCount}</Typography>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
