import React, {FunctionComponent} from "react";
import {Modal} from "react-bootstrap";
import {
    QuestionCategorySchema,
    selectedCategoryAtom,
    showDeleteModalAtom
} from "@/components/question-categories/store";
import {useAtom, useAtomValue} from "jotai";
import Button from "react-bootstrap/Button";

const DeleteModal: FunctionComponent = () => {
    const [show, setShow] = useAtom(showDeleteModalAtom);
    const parsedData = QuestionCategorySchema.validateSync(useAtomValue(selectedCategoryAtom), { strict: true });

    return (
        <Modal show={show}
               onHide={() => {setShow(false)}}
               backdrop="static"
               keyboard={false}
               centered
               size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Remove Question Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>You are about to delete a question category "{parsedData && parsedData.name}".</p>
                <p>You may loose all the data this category has, e.g. questions and answers.</p>
                <Button variant="danger">Delete</Button>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteModal;
