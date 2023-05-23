import {FunctionComponent} from "react";
import {Modal, Button} from "react-bootstrap";
import CreateUpdateQuestionCategoryBody from "@/components/question-categories/create-update-body";
import * as yup from "yup";

export type ModalVariant = 'create'|'update';

type ComponentInput = {
    variant: ModalVariant,
    show: boolean,
    onModalClose: () => void,
    questionCategoryData?: object,
};

const headings = {
    create: 'New Question Category',
    update: 'Update Question Category',
};

const CreateUpdateQuestionCategory: FunctionComponent<ComponentInput> = (
    {variant, show, onModalClose, questionCategoryData}
) => {
    const parsedData = QuestionCategorySchema.validateSync(questionCategoryData, { strict: true });

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

            <Button variant={variant === 'create' ? 'success' : 'primary'} type="submit">Submit</Button>
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
                <CreateUpdateQuestionCategoryBody
                    modalHeader={modalHeader}
                    modalFooter={modalFooter}
                    questionCategory={parsedData} />
            </Modal>
        </>
    );
};

export const QuestionCategorySchema = yup.object().shape({
    id: yup.string().uuid().optional(),
    name: yup.string().required(),
    priority: yup.number().moreThan(0).integer().nullable().optional(),
});

export default CreateUpdateQuestionCategory;
