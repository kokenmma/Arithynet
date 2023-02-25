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
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import CreatingPost from './CreatingPost';

export const LeftMenuBarWidthWhenGreaterThanMd = 240;
export const LeftMenuBarWidthWhenLessThanMd = 70;

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
      <Stack divider={<Divider flexItem />} spacing={2}>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              {matches && <ListItemText primary='Home' primaryTypographyProps={{ fontSize: 20 }} />}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Badge badgeContent={notificationCount} color='secondary'>
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </ListItemIcon>
              {matches && (
                <ListItemText primary='Notification' primaryTypographyProps={{ fontSize: 20 }} />
              )}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <BookmarkBorderOutlinedIcon />
              </ListItemIcon>
              {matches && (
                <ListItemText primary='Bookmarks' primaryTypographyProps={{ fontSize: 20 }} />
              )}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              {matches && (
                <ListItemText primary='Settings' primaryTypographyProps={{ fontSize: 20 }} />
              )}
            </ListItemButton>
          </ListItem>
        </List>
        <Fab
          variant='extended'
          color='primary'
          onClick={handleOpen}
          area-label='create post'
          sx={{
            width: matches
              ? 0.7 * LeftMenuBarWidthWhenGreaterThanMd
              : LeftMenuBarWidthWhenLessThanMd,
            margin: '0 auto',
          }}
        >
          <CreateIcon />
          {matches && '投稿'}
        </Fab>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            top: '15%',
          }}
        >
          <CreatingPost handleClose={handleClose} />
        </Modal>
      </Stack>
    </Box>
  );
};

export default LeftMenuBar;
