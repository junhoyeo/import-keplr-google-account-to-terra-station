import Head from 'next/head';
import React from 'react';

import '@/styles/tailwind.css';

const opengraph = {
  name: 'Keplr to Terra Station',
  description: 'Import Keplr (Google) Accounts to Terra Station with this Tool',
  url: 'https://keplr-to-terra.vercel.app',
  image: 'https://keplr-to-terra.vercel.app/og-image.png',
};

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{opengraph.name}</title>
        <meta name="description" content={opengraph.description} />
        <meta name="canonical" content={opengraph.url} />
        <meta property="og:title" content={opengraph.name} />
        <meta property="og:description" content={opengraph.description} />
        <meta property="og:image" content={opengraph.image} />
        <meta property="og:url" content={opengraph.url} />

        {!!opengraph.url && <link rel="canonical" href={opengraph.url} />}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={opengraph.url} />
        <meta property="twitter:title" content={opengraph.name} />
        <meta property="twitter:description" content={opengraph.description} />
        <meta name="twitter:image" content={opengraph.image} />
        <meta property="twitter:image" content={opengraph.image} />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
