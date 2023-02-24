import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Fab from '@mui/material/Fab';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PublishIcon from '@mui/icons-material/Publish';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { CardProps } from '@mui/material';
import { PostInput } from '../types/Post';
import { getImages } from '../services/latexserver';
import { addPost } from '../services/PostService';
import { useUser } from '../lib/auth';

const style = {
  position: 'absolute' as 'absolute',
  padding: 0,
  top: 180,
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 680,
  bgcolor: 'background.default',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  '& .MuiPaper-root-MuiCard-root': {
    padding: 0,
  },
};

type CreatingPostProps = CardProps & { handleClose: () => void };

const CreatingPost = React.forwardRef<HTMLDivElement, CreatingPostProps>(function CreatingPostImpl(
  { handleClose, ...cardProps }: CreatingPostProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const user = useUser();
  const router = useRouter();
  const [postInput, setPostInput] = useState<PostInput>({
    user_id: '',
    display_name: '',
    profile_image: '',
    content: '',
    images: [],
  });
  const content_ref = useRef<HTMLTextAreaElement | null>(null);
  const sendPost = async () => {
    if (content_ref.current !== null) {
      const got_images = await getImages(content_ref.current.value);
      console.log("got_images", got_images)
      const postData : PostInput = postInput;
      postData.content = content_ref.current.value;
      postData.images = got_images;
      await addPost(postData);
    }
    handleClose();
  };

  const theme = useTheme();

  useEffect(() => {
    if (user) {
      setPostInput({
        user_id: user.uid,
        display_name: user.displayName ?? '',
        profile_image: user.photoURL ?? '',
        content: postInput.content,
        images: [],
      });
    } else {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <Card sx={style} ref={ref} {...cardProps}>
      <CardHeader
        avatar={<Avatar src={postInput.profile_image} aria-label='icon' />}
        title={postInput.display_name + '@' + postInput.user_id}
      />
      <CardContent>
        <TextareaAutosize
          aria-label='posttext'
          placeholder='投稿を書き込んでください'
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
        />
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
          onClick={sendPost}
          aria-label='send post'
          sx={{ width: 'auto', marginRight: 0, marginLeft: 'auto' }}
        >
          <PublishIcon />
          投稿
        </Fab>
      </CardActions>
    </Card>
  );
});

export default CreatingPost;
