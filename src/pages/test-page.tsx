import Head from 'next/head';
import Col from 'react-bootstrap/Col';
import { NextPageWithLayout } from './_app';


const TestPage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title key="title">Test Page | Quizae</title>
            </Head>
            <Col md={6}>
                <p>Welcome to the test page!</p>
            </Col>
        </>
    )
}

export default TestPage
