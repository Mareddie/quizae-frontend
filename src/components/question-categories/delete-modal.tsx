import React, {FunctionComponent} from "react";
import {Modal} from "react-bootstrap";
import {
    createUpdateError,
    QuestionCategorySchema,
    selectedCategoryAtom,
    showDeleteModalAtom, successMessage
} from "@/components/question-categories/store";
import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";
import Button from "react-bootstrap/Button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import * as yup from "yup";

const isProcessed = atom<boolean>(false);

const DeleteQuestionCategory = async (
    original: yup.InferType<typeof QuestionCategorySchema>,
) => {
    if (! original.id) {
        throw new Error('This mutation is supported for existing question categories')
    }

    const entryIdCandidate = original.id;

    const response = await fetch(
        '/api/backend/question-categories/' + entryIdCandidate,
        {
            method: 'DELETE',
        }
    );

    if (! response.ok) {
        const errorResponse = await response.json();

        throw new Error(errorResponse.message);
    }
};

const DeleteModal: FunctionComponent = () => {
    const [show, setShow] = useAtom(showDeleteModalAtom);
    const [isBeingProcessed, setIsBeingProcessed] = useAtom(isProcessed);
    const [generalError, setGeneralError] = useAtom(createUpdateError);
    const setSuccess = useSetAtom(successMessage);

    const parsedData = QuestionCategorySchema.validateSync(useAtomValue(selectedCategoryAtom), { strict: true });

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: DeleteQuestionCategory,
        onError: (error) => {
            setIsBeingProcessed(false);
            setGeneralError(String(error));
        },
        onSuccess: () => {
            setSuccess('Question category was deleted!');
            setShow(false);
            setIsBeingProcessed(false);
            queryClient.invalidateQueries(['questionCategories']);
        },
        onMutate: () => setGeneralError(undefined),
    });

    return (
        <Modal show={show}
               onHide={() => {setShow(false); setGeneralError(undefined); setIsBeingProcessed(false);}}
               backdrop="static"
               keyboard={false}
               centered
               size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Remove Question Category</Modal.Title>
            </Modal.Header>

            {generalError && <Alert variant="danger">{generalError}</Alert>}

            <Modal.Body>
                <p>You are about to delete a question category "{parsedData && parsedData.name}".</p>
                <p>You may loose all the data this category has, e.g. questions and answers.</p>
                <Button variant="danger"
                        onClick={() => {setIsBeingProcessed(true); deleteMutation.mutate(parsedData)}}
                        disabled={isBeingProcessed}>
                    Delete
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteModal;
