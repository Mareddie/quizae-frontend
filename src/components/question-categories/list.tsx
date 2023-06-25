import { FunctionComponent } from "react";
import Col from "react-bootstrap/Col";
import {ButtonGroup, Table} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import Button from "react-bootstrap/Button";
import CreateUpdateModal from "@/components/question-categories/cu-modal";
import {useAtomValue, useSetAtom} from "jotai";
import {
    showModalAtom,
    variantAtom,
    selectedCategoryAtom,
    ModalVariant,
    successMessage, showDeleteModalAtom
} from "@/components/question-categories/store";
import Alert from "react-bootstrap/Alert";
import DeleteModal from "@/components/question-categories/delete-modal";

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

    const setShowModal = useSetAtom(showModalAtom);
    const setShowDeleteModal = useSetAtom(showDeleteModalAtom);
    const setModalVariant = useSetAtom(variantAtom);
    const setSelectedCategory = useSetAtom(selectedCategoryAtom);
    const success = useAtomValue(successMessage);

    const prepareModal = (variant: ModalVariant|'delete', questionCategoryData?: object) => {
        setSelectedCategory(questionCategoryData ?? undefined);

        if (variant === 'delete') {
            setShowDeleteModal(true);
            return;
        }

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

            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="success"
                    className="my-3"
                    onClick={() => prepareModal('create')}>
                Create Question Category
            </Button>

            <CreateUpdateModal />
            <DeleteModal />

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
                    questionCategories.data.map((questionCategory: any) => {
                        return (
                            <tr key={'question-category-' + questionCategory.id}>
                                <td>{questionCategory.id}</td>
                                <td>{questionCategory.name}</td>
                                <td>{questionCategory.priority ?? '---'}</td>
                                <td>
                                    <ButtonGroup aria-label="Question Category Actions" size="sm">
                                        <Button variant="primary">Detail</Button>

                                        <Button variant="secondary"
                                                onClick={() => prepareModal('update', questionCategory)}>
                                            Edit
                                        </Button>

                                        <Button variant="danger"
                                                onClick={() => prepareModal('delete', questionCategory)}>Delete</Button>
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
