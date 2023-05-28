import {FunctionComponent} from "react";
import {Modal, Button} from "react-bootstrap";
import CreateUpdateQuestionCategoryBody from "@/components/question-categories/create-update-body";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {
    variantAtom,
    showModalAtom,
    selectedCategoryAtom,
    QuestionCategorySchema
} from "@/components/question-categories/store";

const headings = {
    create: 'New Question Category',
    update: 'Update Question Category',
};

export const ModalHeader: FunctionComponent = () => {
    const variant = useAtomValue(variantAtom);

    return (
        <Modal.Header closeButton>
            <Modal.Title>{headings[variant]}</Modal.Title>
        </Modal.Header>
    );
};

export const ModalFooter: FunctionComponent = () => {
    const setShow = useSetAtom(showModalAtom);
    const variant = useAtomValue(variantAtom);

    return (
        <Modal.Footer className="justify-content-between">
            <Button variant="secondary" onClick={() => setShow(false)}>
                Close
            </Button>

            <Button variant={variant === 'create' ? 'success' : 'primary'} type="submit">Submit</Button>
        </Modal.Footer>
    );
};

const CreateUpdateQuestionCategory: FunctionComponent = () => {
    const parsedData = QuestionCategorySchema.validateSync(useAtomValue(selectedCategoryAtom), { strict: true });
    const [show, setShow] = useAtom(showModalAtom);

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            centered
            size="lg"
        >
            <CreateUpdateQuestionCategoryBody
                questionCategory={parsedData} />
        </Modal>
    );
};

export default CreateUpdateQuestionCategory;
