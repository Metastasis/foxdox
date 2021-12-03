import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import type {AppProps} from 'next/app';
import {Layout as getDefaultLayout, Sidebar} from '../layout';
import theme from '../theme';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import {ReactComponentLike} from 'prop-types';
import Head from 'next/head';
import '../mocks/browser';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, sidebar: ReactElement) => ReactNode,
  sidebarComponent?: ReactComponentLike
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getDefaultLayout;
  const SidebarComponent = Component.sidebarComponent ?? Sidebar;
  return (
    <>
      <Head>
        <title>Foxdox</title>
        <meta name="description" content="Храни все анализы в одном месте, просто и удобно" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />, <SidebarComponent />)}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
