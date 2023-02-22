import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
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
import Modal from '@mui/material/Modal';
import Details from './Details';
import ReplyingToPost from './ReplyingToPost';
import { CardProps } from '@mui/material';

export type PostProps = CardProps & {
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
};

const Post = React.forwardRef<HTMLDivElement, PostProps>(function PostImpl(
  {
    postId,
    photoURL,
    userName,
    userId,
    postText,
    replyCount,
    repostCount,
    favCount,
    postTime,
    isFavedByU,
    isRepostedByU,
    ...cardProps
  }: PostProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  // render() の実装は以下の通りにする

  // services/get-post.ts を使って，postId から photoURL，username，postText などを読みだす．
  // postText を TikZ の部分で分割する．

  // Markdown + LaTeX(TikZ を除く) の部分は markdown-it-katex で HTML に変換し
  // TikZ は Go API で SVG 画像/コードに変換したあと
  // それらをくっつけて postHTML を作る

  // timestamp が返ってくるので，それから投稿日時の文字列 postTime を作る

  // let postHTML: JSX.Element = useMemo(() => render(postText), [postText])
  let postHTML: JSX.Element = <span>Welcome to UEC!</span>;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useTheme();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Card sx={{ width: 600 }} ref={ref} {...cardProps}>
      <CardHeader
        avatar={<Avatar src={photoURL} aria-label='icon' />}
        action={<Details postId={postId} />}
        title={userName + '@' + userId}
        subheader={postTime}
      />
      <CardContent>{postHTML}</CardContent>
      <CardActions disableSpacing>
        <ReplyIcon onClick={handleOpen} />
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          sx={{ '& .MuiPaper-root-MuiCard-root': { padding: 0 } }}
        >
          <ReplyingToPost
            postId={postId}
            photoURL={photoURL}
            userName={userName}
            userId={userId}
            postText={postText}
            replyCount={replyCount}
            repostCount={repostCount}
            favCount={favCount}
            postTime={postTime}
            isFavedByU={isFavedByU}
            isRepostedByU={isRepostedByU}
            postHTML={postHTML}
            handleClose={handleClose}
          />
        </Modal>
        <Typography variant='body2'>{replyCount}</Typography>
        <IconButton aria-label='repost'>
          {/* Repost の処理の呼び出しを行う */}
          <RepeatIcon />
        </IconButton>
        <Typography variant='body2'>{repostCount}</Typography>
        <IconButton aria-label='favorite'>
          {/* Favorite の処理の呼び出しを行う */}
          <FavoriteIcon />
        </IconButton>
        <Typography variant='body2'>{favCount}</Typography>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
});

export default Post;
