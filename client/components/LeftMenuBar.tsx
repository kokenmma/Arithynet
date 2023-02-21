import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
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
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import CreatingPost from './CreatingPost';

export const LeftMenuBarWidthWhenGreaterThanMd = 240;
export const LeftMenuBarWidthWhenLessThanMd = 50;

const LeftMenuBar = () => {
  // DB から通知数を取得
  let notificationCount = 1;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useTheme();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        width: matches ? LeftMenuBarWidthWhenGreaterThanMd : LeftMenuBarWidthWhenLessThanMd,
        flexShrink: { md: 0 },
      }}
    >
      <Stack divider={<Divider flexItem />}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              {matches && <ListItemText primary='Home' />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Badge badgeContent={notificationCount} color='secondary'>
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </ListItemIcon>
              {matches && <ListItemText primary='Notification' />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookmarkBorderOutlinedIcon />
              </ListItemIcon>
              {matches && <ListItemText primary='Bookmarks' />}
            </ListItemButton>
          </ListItem>
        </List>
        <Fab variant='extended' color='primary' onClick={handleOpen} area-label='create post'>
          <CreateIcon />
          {matches && 'Post'}
        </Fab>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <CreatingPost />
        </Modal>
      </Stack>
    </Box>
  );
};

export default LeftMenuBar;
