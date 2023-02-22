import React from 'react';
import { getCookie } from 'cookies-next';
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

const style = {
  position: 'absolute' as 'absolute',
  padding: '0px',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 680,
  bgcolor: 'background.default',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.MuiPaper-root-MuiCard-root':
    {
      padding: 0,
    },
};

type CreatingPostProps = CardProps & { handleClose: () => void };

const CreatingPost = React.forwardRef<HTMLDivElement, CreatingPostProps>(function CreatingPostImpl(
  { handleClose, ...cardProps }: CreatingPostProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const sendPost = () => {
    // DB に投稿を送信する
    handleClose();
  };

  const theme = useTheme();

  return (
    <Card sx={style} ref={ref} {...cardProps}>
      <CardHeader
        avatar={<Avatar src={getCookie('photoURL') as string} aria-label='icon' />}
        title={getCookie('userName') + '@' + getCookie('userId')}
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
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add image'>
          <AddPhotoAlternateOutlinedIcon />
        </IconButton>
        <IconButton aria-label='add poll'>
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
