import { login, useUser } from '../lib/auth';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginPage = () => {
  const router = useRouter();
  const user = useUser();
  const handleLogin = (): void => {
    login()
      .catch((error) => console.error(error))
      .then(async () => {
        await router.push('/');
      });
  };

  useEffect(() => {
    (async () => {
      if (user) await router.push('/');
    })();
  }, [user, router]);

  return (
    <Grid container alignItems='center' justifyContent='center' direction='column'>
      <h1>Arithynet</h1>
      <p>SNS for math lovers!</p>
      <Button variant='contained' onClick={handleLogin}>
        Login with Google
      </Button>
    </Grid>
  );
};

export default LoginPage;
