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
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { PostProps } from './Post';
import { Typography } from '@mui/material';

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

type PostWithMarkdownProps = PostProps & { postHTML: JSX.Element };

const PostWithMarkdown = React.forwardRef<HTMLDivElement, PostWithMarkdownProps>(
  function CreatingPostImpl(
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
      postHTML,
      ...cardProps
    }: PostWithMarkdownProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    const copyAllText = () => {
      // postText をすべてクリップボードにコピーする
    };

    const theme = useTheme();

    const PostHTMLforwardRef = React.forwardRef<HTMLDivElement>(function postHTMLforwardRefImpl(
      props: {},
      ref: React.ForwardedRef<HTMLDivElement>
    ) {
      return <div ref={ref}>{postHTML}</div>;
    });

    return (
      <Card sx={style} ref={ref} {...cardProps}>
        <CardHeader
          avatar={<Avatar src={getCookie('photoURL') as string} aria-label='icon' />}
          title={getCookie('userName') + '@' + getCookie('userId')}
        />
        <CardContent>
          <PostHTMLforwardRef />
        </CardContent>
        <CardContent>
          <Typography>{postText}</Typography>
        </CardContent>
        <CardContent></CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label='copy content'
            sx={{ width: 'auto', marginRight: 0, marginLeft: 'auto' }}
            onClick={copyAllText}
          >
            <ContentCopyOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
);

export default PostWithMarkdown;
