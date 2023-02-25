import React, { useState } from 'react';
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
import { useUser } from '../lib/auth';

type ReplyingToPostProps = PostProps & { RenderedContent: JSX.Element; handleClose: () => void };

const style = {
  position: 'absolute' as 'absolute',
  padding: '0px',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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
    const user = useUser();
    const [raw, setRaw] = useState<boolean>(false);
    const changeRaw = () => setRaw((raw) => !raw);
    const sendReply = () => {
      // DB に対して返信の処理を行う
      handleClose();
    };

    const Action = () => (
      <Stack direction='row'>
        <IconButton onClick={changeRaw}>
          {!raw ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
        </IconButton>
        {/* <Details postId={postId} /> */}
      </Stack>
    );

    const theme = useTheme();
    return (
      <Card sx={style} ref={ref} {...cardProps}>
        <CardHeader
          avatar={<Avatar src={profile_image as string} aria-label='icon' />}
          action={<Action />}
          title={display_name + '@' + user_id}
        />
        <CardContent>{!raw ? RenderedContent : <Typography>{content}</Typography>}</CardContent>
        <CardHeader
          avatar={<Avatar src={user?.photoURL ?? ''} aria-label='icon' />}
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
            onClick={sendReply}
            aria-label='send reply'
            sx={{ width: 'auto', marginRight: 0, marginLeft: 'auto' }}
            disabled
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
