import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Timeline from '../components/Timeline';
import LeftMenuBar from '../components/LeftMenuBar';

const Index = () => {
  return (
    <Container>
      <Stack direction='row' divider={<Divider orientation='vertical' flexItem />}>
        <LeftMenuBar />
        <Timeline />
      </Stack>
    </Container>
  );
};

export default Index;
