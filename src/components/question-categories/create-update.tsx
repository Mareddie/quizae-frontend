import {FunctionComponent} from "react";
import {Modal, Button} from "react-bootstrap";
import CreateUpdateQuestionCategoryBody from "@/components/question-categories/create-update-body";

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
    const modalHeader = (
        <Modal.Header closeButton>
            <Modal.Title>{headings[variant]}</Modal.Title>
        </Modal.Header>
    );

    const modalFooter = (
        <Modal.Footer className="justify-content-between">
            <Button variant="secondary" onClick={onModalClose}>
                Close
            </Button>

            <Button variant={variant === 'create' ? 'success' : 'primary'}>Submit</Button>
        </Modal.Footer>
    );

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
                <CreateUpdateQuestionCategoryBody modalHeader={modalHeader} modalFooter={modalFooter} />
            </Modal>
        </>
    );
};

export default CreateUpdateQuestionCategory;
