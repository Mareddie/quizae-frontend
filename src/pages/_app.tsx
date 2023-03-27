import 'bootstrap/dist/css/bootstrap.min.css'
import { SessionProvider } from 'next-auth/react'

import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import Head from "next/head";
import BaseAppLayout from "@/layouts/base-app-layout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
      <SessionProvider session={session}>
          <Head>
              <title key="title">Quizae</title>
              <meta name="description" content="A Trivia App" key="metaDescription"/>
              <meta name="viewport" content="width=device-width, initial-scale=1" key="metaViewport"/>
              <meta name="robots" content="noindex,nofollow" key="metaRobots"/>
              <link rel="icon" href="/favicon.ico" key="favicon"/>
          </Head>
          <BaseAppLayout>
              <Component {...pageProps} />
          </BaseAppLayout>
      </SessionProvider>
  );
}
