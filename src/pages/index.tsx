import Head from 'next/head';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import AuthLayout from '@/layouts/auth-layout';
import { signOut } from "next-auth/react";
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';


const DashboardPage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title key="title">Home | Quizae</title>
            </Head>
            <Col md={6}>
                <p>You should be logged in to see this page!</p>
                <Button onClick={() => signOut()}>Sign Out</Button>
            </Col>
        </>
    )
}

export default DashboardPage
