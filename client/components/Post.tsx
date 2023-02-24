import React, { useState, useMemo } from 'react';
import { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
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
import type { PostWithId } from '../types/Post';
import RenderContent from './RenderContent';
import { upLikeCount, upreplyCount } from '../services/PostService';

export type PostProps = CardProps & PostWithId;

const Post: NextPage<PostProps> = React.forwardRef<HTMLDivElement, PostProps>(function PostImpl(
  {
    post_id,
    user_id,
    display_name,
    profile_image,
    content,
    images = [],
    created_at,
    like_count,
    repost_count,
    reply_count,
    reposted_by,
    ...card_props
  }: PostProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [raw, setRaw] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isReposted, setIsReposted] = useState<boolean>(false);
  const theme = useTheme();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const changeRaw = () => setRaw((raw) => !raw);

  const handleRepost = async () => setIsReposted((isReposted) => !isReposted);
  const handleLike = async () => setIsLiked((isLiked) => !isLiked);

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
    <Card sx={{ width: 600 }} ref={ref} {...card_props}>
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
            post_id={post_id}
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
          <RepeatIcon sx={isReposted ? { color: 'green' } : {}} />
        </IconButton>
        <Typography variant='body2'>{repost_count}</Typography>
        <IconButton aria-label='favorite'>
          {/* Favorite の処理の呼び出しを行う */}
          <FavoriteIcon sx={isLiked ? { color: 'green' } : {}} />
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
