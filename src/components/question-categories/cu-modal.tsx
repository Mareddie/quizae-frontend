import React, {FunctionComponent} from "react";
import {Modal} from "react-bootstrap";
import CreateUpdateForm from "@/components/question-categories/cu-form";
import {useAtom, useAtomValue} from "jotai";
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

const CreateUpdateModal: FunctionComponent = () => {
    const parsedData = QuestionCategorySchema.validateSync(useAtomValue(selectedCategoryAtom), { strict: true });
    const [show, setShow] = useAtom(showModalAtom);
    const variant = useAtomValue(variantAtom);

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>{headings[variant]}</Modal.Title>
            </Modal.Header>

            <CreateUpdateForm questionCategory={parsedData} />
        </Modal>
    );
};

export default CreateUpdateModal;
