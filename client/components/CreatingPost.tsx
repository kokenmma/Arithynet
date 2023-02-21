import { getCookie } from 'cookies-next';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const style = {
  position: 'absolute' as 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.default',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '5%',
};

const CreatingPost = () => {
  const theme = useTheme();
  return (
    <Box sx={style}>
      <Card>
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
              borderRadius: '5%',
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
        </CardActions>
      </Card>
    </Box>
  );
};

export default CreatingPost;
