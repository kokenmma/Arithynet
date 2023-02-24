import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Timeline from '../components/Timeline';
import LeftMenuBar from '../components/LeftMenuBar';
import { useUser, login, logout } from '../lib/auth';
import { useEffect } from 'react';
import { router } from 'next/client';

const Index = () => {
  const user = useUser();
  useEffect(() => {
    if (!user) window.location.href = '/login';
  }, []);
  return (
    <Container>
      {user?.displayName}
      <Stack direction='row' divider={<Divider orientation='vertical' flexItem />}>
        <LeftMenuBar />
        <Timeline />
      </Stack>
    </Container>
  );
};

export default Index;
