import { login, logout, useUser } from '../lib/auth';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LogoutPage = () => {
  const user = useUser();
  const handleLogin = (): void => {
    login().catch((error) => console.error(error));
  };

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (user) {
        logout()
          .catch((error) => console.error(error))
          .then(async () => router.push('/'));
      }
    })();
  }, [user, router]);
  return (
    <Grid container alignItems='center' justifyContent='center' direction='column'>
      <span>Loading...</span>
    </Grid>
  );
};

export default LogoutPage;
