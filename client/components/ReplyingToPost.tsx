import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PublishIcon from '@mui/icons-material/Publish';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Details from './Details';
import { PostProps } from './Post';
import { replyToPost } from '../services/PostService';
import { useUser } from '../lib/auth';
import { getImages } from '../services/latexserver';
import type { Post, PostInput, PostWithId } from '../types/Post';
import RenderContent from './RenderContent';

interface ReplyingToPostProps extends PostProps {
  RenderedContent: JSX.Element;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  padding: '0px',
  top: 150,
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: 680,
  bgcolor: 'background.default',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const ReplyingToPost = React.forwardRef<HTMLDivElement, ReplyingToPostProps>(
  function ReplyingToPostImpl(
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
      RenderedContent,
      handleClose,
      ...cardProps
    }: ReplyingToPostProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    /* ===== 返信先投稿のロジック ===== */
    const user = useUser();
    const [rawPost, setRawPost] = useState<boolean>(false);
    const changeRawPost = () => setRawPost((rawPost) => !rawPost);
    // const changeRawCreate = () => setRaw((raw) => !raw);
    const changeRawCreate = () => {
      alert('PO');
    };

    /* ===== 返信のロジック ===== */

    const [rawReply, setRawReply] = useState<boolean>(false);
    const changeRawReply = () => setRawReply((rawReply) => !rawReply);
    const [replyInput, setReplyInput] = useState<PostInput>({
      user_id: '',
      display_name: '',
      profile_image: '',
      content: '',
      images: [],
    });
    const content_ref = useRef<HTMLTextAreaElement | null>(null);
    const sendReply = async () => {
      if (content_ref.current !== null) {
        const got_images = await getImages(content_ref.current.value);
        const replyData: PostInput = replyInput;
        replyData.content = content_ref.current.value;
        replyData.images = got_images;
        const reply_id = await replyToPost(post_id, replyData);
        console.log('replied with reply_id = ', reply_id);
      }
      handleClose();
    };

    const router = useRouter();
    const theme = useTheme();

    useEffect(() => {
      if (user) {
        setReplyInput({
          user_id: user.uid,
          display_name: user.displayName ?? '',
          profile_image: user.photoURL ?? '',
          content: replyInput.content,
          images: [],
        });
      } else {
        router.push('/login');
      }
    }, [user, router, replyInput]);

    const [replyPreview, setReplyPreview] = useState<JSX.Element>(<></>);

    const updateReplyPreview = async () => {
      if (content_ref.current !== null) {
        const got_images = await getImages(content_ref.current.value);
        setReplyPreview(<RenderContent content={content_ref.current.value} images={got_images} />);
      }
    };

    return (
      <Card sx={style} ref={ref} {...cardProps}>
        <CardHeader
          avatar={<Avatar src={profile_image as string} aria-label='icon' />}
          action={
            <Stack direction='row'>
              <IconButton onClick={changeRawPost}>
                {!rawPost ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
              </IconButton>
              {/* <Details postId={postId} /> */}
            </Stack>
          }
          title={display_name + '@' + user_id}
        />
        <CardContent>{!rawPost ? RenderedContent : <Typography>{content}</Typography>}</CardContent>
        <CardHeader
          avatar={<Avatar src={user?.photoURL ?? ''} aria-label='icon' />}
          action={
            <Stack direction='row'>
              <IconButton onClick={changeRawReply}>
                {!rawReply ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
              </IconButton>
              {/* <Details postId={postId} /> */}
            </Stack>
          }
          title={(user?.displayName ?? '') + '@' + (user?.uid ?? '')}
        />
        <CardContent>
          <TextareaAutosize
            aria-label='posttext'
            placeholder='返信を書き込んでください'
            minRows={3}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              border: 'none',
              resize: 'none',
              outline: 'none',
              backgroundColor: 'inherit',
              color: theme.palette.text.primary,
              fontSize: 18,
            }}
            ref={content_ref}
            onChange={updateReplyPreview}
            hidden={rawReply}
          />
          {rawReply && replyPreview}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add image' sx={{ display: 'none' }}>
            <AddPhotoAlternateOutlinedIcon />
          </IconButton>
          <IconButton aria-label='add poll' sx={{ display: 'none' }}>
            <PollOutlinedIcon />
          </IconButton>
          <Fab
            variant='extended'
            color='primary'
            onClick={sendReply}
            aria-label='send reply'
            sx={{ width: 'auto', marginRight: 0, marginLeft: 'auto' }}
          >
            <PublishIcon />
            返信
          </Fab>
        </CardActions>
      </Card>
    );
  }
);

export default ReplyingToPost;
