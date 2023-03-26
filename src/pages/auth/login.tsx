import {NextPageWithLayout} from "@/pages/_app";
import Head from "next/head";
import Col from "react-bootstrap/Col";
import LoginForm from "@/components/login-form";
import {ReactElement} from "react";
import AuthLayout from "@/layouts/auth-layout";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {getCsrfToken} from "next-auth/react";

const LoginPage: NextPageWithLayout = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <Head>
                <title key="title">Login | Quizae</title>
            </Head>
            <Col md={6}>
                <LoginForm csrfToken={csrfToken} />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context) ?? null,
        }
    };
}

export default LoginPage
