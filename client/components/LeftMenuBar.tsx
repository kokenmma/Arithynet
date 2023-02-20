import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CreateIcon from '@mui/icons-material/Create';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';

const LeftMenuBar = () => {
  // DB から通知数を取得
  let notificationCount = 1;
  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Badge badgeContent={notificationCount} color='secondary'>
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary='Drafts' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BookmarkBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Drafts' />
          </ListItemButton>
        </ListItem>
      </List>
      <Fab color='primary' area-label='create post'>
        <CreateIcon />
        Post
      </Fab>
    </>
  );
};

export default LeftMenuBar;
