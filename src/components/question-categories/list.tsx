import {FunctionComponent, useState} from "react";
import Col from "react-bootstrap/Col";
import {ButtonGroup, Table} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import Button from "react-bootstrap/Button";
import CreateUpdateQuestionCategory, {ModalVariant} from "@/components/question-categories/create-update";

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

    const [showModal, setShowModal] = useState(false);
    const [modalVariant, setModalVariant] = useState<ModalVariant>('create');

    const prepareModal = (variant: ModalVariant) => {
        setModalVariant(variant);
        setShowModal(true);
    };

    if (questionCategories.status !== 'success') {
        return (
            <p>Loading Data...</p>
        );
    }

    return (
        <Col lg={12}>
            <h2 className={'mb-3'}>Question Categories</h2>

            <Button variant="success"
                    className="my-3"
                    onClick={() => prepareModal('create')}>
                Create Question Category
            </Button>

            <CreateUpdateQuestionCategory variant={modalVariant}
                                          show={showModal}
                                          onModalClose={() => setShowModal(false)} />

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
                                <td>
                                    <ButtonGroup aria-label="Question Category Actions" size="sm">
                                        <Button variant="primary">Detail</Button>

                                        <Button variant="secondary"
                                                onClick={() => prepareModal('update')}>
                                            Edit
                                        </Button>

                                        <Button variant="danger">Delete</Button>
                                    </ButtonGroup>
                                </td>
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
