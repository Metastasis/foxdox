import {Head, Html, Main, NextScript} from 'next/document';


export default function MyDocument() {
  return (
    <Html lang="ru">
      <Head>
        <title>Foxdox</title>
        <meta name="description" content="Храни все анализы в одном месте, просто и удобно" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
