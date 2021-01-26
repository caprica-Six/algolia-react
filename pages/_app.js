import React from 'react';

import Head from '../components/head';
import '../styles/global.scss';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          key="viewport"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
