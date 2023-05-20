import {FunctionComponent} from "react";
import Col from "react-bootstrap/Col";
import {Table} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";

const fetchQuestionCategories = async () => {
    const response = await fetch('/api/backend/question-categories');

    if (! response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

const QuestionCategoryList: FunctionComponent = () => {
    const questionCategories = useQuery({
        queryKey: ['questionCategories'],
        queryFn: fetchQuestionCategories,
    });

    if (questionCategories.status !== 'success') {
        return (
            <p>Loading Data...</p>
        );
    }

    return (
        <Col lg={12}>
            <h2 className={'mb-3'}>Question Categories</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                {
                    questionCategories.data.map((questionCategory: any,) => {
                        return (
                            <tr key={'question-category-' + questionCategory.id}>
                                <td>{questionCategory.id}</td>
                                <td>{questionCategory.name}</td>
                                <td>{questionCategory.priority ?? '---'}</td>
                                <td>---</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        </Col>
    );
}

export default QuestionCategoryList;
