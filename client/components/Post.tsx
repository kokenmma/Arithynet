import React, { useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
/** @ts-ignore **/
import ReactHtmlParser from 'react-html-parser';
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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Details from './Details';
import ReplyingToPost from './ReplyingToPost';
import { CardProps } from '@mui/material';
import type { Post as PostType, PostInput } from '../types/Post';
import RenderContent from './RenderContent';

export type PostProps = CardProps & PostType;

const Post = React.forwardRef<HTMLDivElement, PostProps>(function PostImpl(
  {
    user_id,
    display_name,
    profile_image,
    content,
    images,
    created_at,
    like_count,
    repost_count,
    reply_count,
    reposted_by,
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

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [raw, setRaw] = useState<boolean>(false);
  const theme = useTheme();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const changeRaw = () => setRaw((raw) => !raw);

  const Action = () => (
    <Stack direction='row'>
      <IconButton onClick={changeRaw}>
        {!raw ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
      </IconButton>
      {/* <Details postId={postId} /> */}
    </Stack>
  );

  const RenderedContent: JSX.Element = useMemo(
    () => <RenderContent content={content} images={images} />,
    [content, images]
  );

  return (
    <Card sx={{ width: 600 }} ref={ref} {...cardProps}>
      <CardHeader
        avatar={<Avatar src={profile_image} aria-label='icon' />}
        action={<Action />}
        title={display_name + '@' + user_id}
        subheader={created_at.toDateString()}
      />
      <CardContent>{!raw ? RenderedContent : <Typography>{content}</Typography>}</CardContent>
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
            user_id={user_id}
            display_name={display_name}
            profile_image={profile_image}
            content={content}
            images={images}
            created_at={created_at}
            like_count={like_count}
            repost_count={repost_count}
            reply_count={reply_count}
            reposted_by={reposted_by}
            RenderedContent={RenderedContent}
            handleClose={handleClose}
          />
        </Modal>
        <Typography variant='body2'>{reply_count}</Typography>
        <IconButton aria-label='repost'>
          {/* Repost の処理の呼び出しを行う */}
          <RepeatIcon />
        </IconButton>
        <Typography variant='body2'>{repost_count}</Typography>
        <IconButton aria-label='favorite'>
          {/* Favorite の処理の呼び出しを行う */}
          <FavoriteIcon />
        </IconButton>
        <Typography variant='body2'>{like_count}</Typography>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
});

export default Post;
