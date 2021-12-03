import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import type {AppProps} from 'next/app';
import {Layout as getDefaultLayout, Sidebar} from '../layout';
import theme from '../theme';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import {ReactComponentLike} from 'prop-types';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, sidebar: ReactElement) => ReactNode,
  sidebarComponent?: ReactComponentLike
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const __DEV__ = process.env.NODE_ENV === 'development';
if (__DEV__) {
  const {worker} = require('./mocks/browser');
  worker.start({onUnhandledRequest: 'bypass'});
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getDefaultLayout;
  const SidebarComponent = Component.sidebarComponent ?? Sidebar;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />, <SidebarComponent />)}
    </ThemeProvider>
  );
}

export default MyApp;
