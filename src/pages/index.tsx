// Components
import Head from 'next/head';
import Col from 'react-bootstrap/Col';
import AuthLayout from '@/layouts/auth-layout';

// Types and Interfaces
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"


const DashboardPage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title key="title">Home | Quizae</title>
            </Head>
            <Col md={6}>
                <p>You should be logged in to see this page!</p>
            </Col>
        </>
    )
}

DashboardPage.getLayout = (page: ReactElement) => {
    // TODO: Create a generic app layout
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
    )
}

export async function getServerSideProps(context) {
    // TODO: use middleware
    const session = await getServerSession(context.req, context.res, authOptions as any);

    return { props: {}};
}

export default DashboardPage
