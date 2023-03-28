import Head from 'next/head';
import Col from 'react-bootstrap/Col';
import { NextPageWithLayout } from './_app';

const DashboardPage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title key="title">Home | Quizae</title>
            </Head>
            <Col md={6}>
                <p>Welcome!</p>
            </Col>
        </>
    )
}

export default DashboardPage
