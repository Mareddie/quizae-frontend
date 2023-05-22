import {FunctionComponent, useState} from "react";
import {Modal, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";

export type ModalVariant = 'create'|'update';

type ComponentInput = {
    variant: ModalVariant,
    show: boolean,
    onModalClose: () => void,
};

const headings = {
    create: 'New Question Category',
    update: 'Update Question Category',
};

const CreateUpdateQuestionCategory: FunctionComponent<ComponentInput> = ({variant, show, onModalClose}) => {
    return (
        <>
            <Modal
                show={show}
                onHide={onModalClose}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>{headings[variant]}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="questionCategoryName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="questionCategoryName">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control type="number" required />
                            <Form.Text className="text-muted">
                                This information is used for ordering. The higher the number, the higher order in the list.
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer className="justify-content-between">
                        <Button variant="secondary" onClick={onModalClose}>
                            Close
                        </Button>

                        <Button variant={variant === 'create' ? 'success' : 'primary'}>Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default CreateUpdateQuestionCategory;
