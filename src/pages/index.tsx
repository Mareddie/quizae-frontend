import Head from 'next/head';
import Col from 'react-bootstrap/Col';
import { NextPageWithLayout } from './_app';
import {useQuery} from "@tanstack/react-query";

const fetchHomepageData = async () => {
    const response = await fetch('/api/home-data');

    if (! response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

const HomePage: NextPageWithLayout = () => {
    const homepageQuery = useQuery({
        queryKey: ['homepageData'],
        queryFn: fetchHomepageData,
    });

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

export default HomePage
