import Head from 'next/head'
import Col from 'react-bootstrap/Col'
import LoginForm from "@/components/login-form";
import { NextPageWithLayout } from './_app'
import { ReactElement } from "react";
import AuthLayout from "@/layouts/auth-layout";


const LoginPage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Quizae</title>
                <meta name="description" content="A Trivia App"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Col md={6}>
                <LoginForm />
            </Col>
        </>
    )
}

LoginPage.getLayout = (page: ReactElement) => {
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
    )
}

export default LoginPage
