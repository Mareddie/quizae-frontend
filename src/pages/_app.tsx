import 'bootstrap/dist/css/bootstrap.min.css'
import {SessionProvider} from 'next-auth/react'
import type {AppProps} from 'next/app'
import type {NextPage} from 'next'
import type {ReactElement, ReactNode} from 'react'
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Head from "next/head"
import BaseAppLayout from "@/layouts/base-app-layout"
import React from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function getDefaultLayout(page: ReactElement): ReactElement {
    return (
        <BaseAppLayout>
            {page}
        </BaseAppLayout>
    );
}

export default function App({Component, pageProps: {session, ...pageProps}}: AppPropsWithLayout) {
    const renderedLayout = Component.getLayout
        ? Component.getLayout(<Component {...pageProps} />)
        : getDefaultLayout(<Component {...pageProps} />);

    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Head>
                        <title key="title">Quizae</title>
                        <meta name="description" content="A Trivia App" key="metaDescription"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1" key="metaViewport"/>
                        <meta name="robots" content="noindex,nofollow" key="metaRobots"/>
                        <link rel="icon" href="/favicon.ico" key="favicon"/>
                    </Head>
                    {renderedLayout}
                </Hydrate>
            </QueryClientProvider>
        </SessionProvider>
    );
}
