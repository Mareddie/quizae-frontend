import {NextPageWithLayout} from "@/pages/_app";
import Head from "next/head";
import Col from "react-bootstrap/Col";
import LoginForm from "@/components/login-form";
import {ReactElement} from "react";
import AuthLayout from "@/layouts/auth-layout";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

const LoginPage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title key="title">Login | Quizae</title>
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

export async function getServerSideProps(context) {
    // TODO: use middleware
    const session = await getServerSession(context.req, context.res, authOptions as any);

    return { props: {}};
}

export default LoginPage
