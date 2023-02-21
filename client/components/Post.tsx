import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ReplyIcon from '@mui/icons-material/Reply';
import RepeatIcon from '@mui/icons-material/Repeat';
import Details from './Details';

export interface PostProps {
  postId: number;
  photoURL: string;
  userName: string;
  userId: string;
  postText: string;
  replyCount: number;
  repostCount: number;
  favCount: number;
  postTime: string;
  isFavedByU: boolean;
  isRepostedByU: boolean;
}

const Post = (props: PostProps) => {
  // render() の実装は以下の通りにする

  // services/get-post.ts を使って，postId から photoURL，username，postText などを読みだす．
  // postText を TikZ の部分で分割する．

  // Markdown + LaTeX(TikZ を除く) の部分は markdown-it-katex で HTML に変換し
  // TikZ は Go API で SVG 画像/コードに変換したあと
  // それらをくっつけて postHTML を作る

  // timestamp が返ってくるので，それから投稿日時の文字列 postTime を作る

  // let postHTML: JSX.Element = useMemo(() => render(postText), [postText])
  let postHTML: JSX.Element = <span>Welcome to UEC!</span>;

  return (
    <Card sx={{ width: 600 }}>
      <CardHeader
        avatar={<Avatar src={props.photoURL} aria-label='icon' />}
        action={<Details postId={props.postId} />}
        title={props.userName + '@' + props.userId}
        subheader={props.postTime}
      />
      <CardContent>{postHTML}</CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='reply'>
          <ReplyIcon />
        </IconButton>
        <Typography variant='body2'>{props.replyCount}</Typography>
        <IconButton aria-label='repost'>
          <RepeatIcon />
        </IconButton>
        <Typography variant='body2'>{props.repostCount}</Typography>
        <IconButton aria-label='favorite'>
          <FavoriteIcon />
        </IconButton>
        <Typography variant='body2'>{props.favCount}</Typography>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
