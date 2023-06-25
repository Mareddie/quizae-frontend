import Head from 'next/head';
import { NextPageWithLayout } from './_app';
import QuestionCategoryList from "@/components/question-categories/list";

const HomePage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title key="title">Home | Quizae</title>
            </Head>
            <QuestionCategoryList />
        </>
    )
}

export default HomePage
