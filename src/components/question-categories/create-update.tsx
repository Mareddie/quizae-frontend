import {FunctionComponent, useState} from "react";
import {Modal, Button} from "react-bootstrap";

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
                <Modal.Header closeButton>
                    <Modal.Title>{headings[variant]}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>

                <Modal.Footer className="justify-content-between">
                    <Button variant="secondary" onClick={onModalClose}>
                        Close
                    </Button>

                    <Button variant={variant === 'create' ? 'success' : 'primary'}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateUpdateQuestionCategory;
