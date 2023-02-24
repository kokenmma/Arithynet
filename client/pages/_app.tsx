import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RecoilRoot } from 'recoil';
import { useAuth, useUser } from '../lib/auth';
import { useEffect } from 'react';
import { router } from 'next/client';
import { useRouter } from 'next/router';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontSize: 16,
  },
});

type Props = {
  children: JSX.Element;
};

const Auth = ({ children }: Props): JSX.Element => {
  const isLoading = useAuth();
  return isLoading ? <p>Loading...</p> : children;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Auth>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Auth>
    </RecoilRoot>
  );
};

export default App;
