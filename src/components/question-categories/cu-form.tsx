import {Formik, FormikHelpers, FormikProps, FormikValues} from "formik";
import React, {FunctionComponent} from "react";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import {
    createUpdateError,
    QuestionCategorySchema,
    showModalAtom,
    successMessage,
    variantAtom
} from "@/components/question-categories/store";
import Button from "react-bootstrap/Button";
import {useAtomValue, useSetAtom} from "jotai";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";

type ComponentInput = {
    questionCategory?: yup.InferType<typeof QuestionCategorySchema>
};

type FormInitValues = {
    name: string,
    priority: string|number,
};

type FormSubmittedValues = {
    submittedData: FormikValues,
    helpers: FormikHelpers<FormikValues>,
    original?: yup.InferType<typeof QuestionCategorySchema>,
};

const SubmitForm = async (
    {submittedData, helpers, original}: FormSubmittedValues
) => {
    const entryIdCandidate = original?.id ?? null;

    const response = await fetch(
        entryIdCandidate
            ? '/api/backend/question-categories/' + entryIdCandidate
            : '/api/backend/question-categories/create',
        {
            method: entryIdCandidate
                ? 'PATCH'
                : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priority: submittedData.priority === '' ? null : submittedData.priority,
                name: submittedData.name,
            }),
        }
    );

    if (! response.ok) {
        const errorResponse = await response.json();

        helpers.setSubmitting(false);
        throw new Error(errorResponse.message);
    }

    helpers.setSubmitting(false);
    return response.json();
};

const CreateUpdateForm: FunctionComponent<ComponentInput> = ({questionCategory}) => {
    const initValues: FormInitValues = {
        name: questionCategory?.name ?? '',
        priority: questionCategory?.priority ?? '',
    };

    const variant = useAtomValue(variantAtom);
    const setGeneralError = useSetAtom(createUpdateError);
    const setSuccess = useSetAtom(successMessage);
    const setShowModal = useSetAtom(showModalAtom);

    const queryClient = useQueryClient();
    const formMutation = useMutation({
        mutationFn: SubmitForm,
        onError: (error) => {
            setGeneralError(String(error));
        },
        onSuccess: () => {
            let message = 'Question category was successfully ';

            message += variant === 'create' ? 'created!' : 'updated!';

            setSuccess(message);
            setShowModal(false);

            queryClient.invalidateQueries(['questionCategories']);
        },
        onMutate: () => setGeneralError(undefined),
    });

    return (
        <Formik validationSchema={QuestionCategorySchema}
                initialValues={initValues}
                onSubmit={(data, actions) => {
                    formMutation.mutate({
                        submittedData: data,
                        helpers: actions,
                        original: questionCategory
                    })
                }}
                component={FormInternal}>
        </Formik>
    );
};

const FormInternal: FunctionComponent<FormikProps<FormikValues>> = (
    {handleSubmit, values, handleChange, errors, isSubmitting}
) => {
    const variant = useAtomValue(variantAtom);
    const generalError = useAtomValue(createUpdateError);

    return (
        <Modal.Body>
            {generalError && <Alert variant="danger">{generalError}</Alert>}

            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                                  name="name"
                                  value={values.name}
                                  onChange={handleChange}
                                  isInvalid={!!errors.name}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control type="number"
                                  name="priority"
                                  value={values.priority}
                                  onChange={handleChange}
                                  isInvalid={!!errors.priority}
                    />
                    <Form.Text className="text-muted">
                        This information is used for ordering.
                        The higher the number, the higher order in the list.
                    </Form.Text>
                </Form.Group>

                <Button variant={variant === 'create' ? 'success' : 'primary'}
                        type={'submit'} disabled={isSubmitting}>
                    Submit
                </Button>
            </Form>
        </Modal.Body>
    );
};

export default CreateUpdateForm;
