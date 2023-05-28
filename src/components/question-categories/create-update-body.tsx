import {Formik, FormikValues} from "formik";
import React, {FunctionComponent} from "react";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {ModalHeader, ModalFooter} from "@/components/question-categories/create-update";
import * as yup from "yup";
import {QuestionCategorySchema} from "@/components/question-categories/store";

type ComponentInput = {
    questionCategory?: yup.InferType<typeof QuestionCategorySchema>
};

const CreateUpdateQuestionCategoryBody: FunctionComponent<ComponentInput> = ({questionCategory}) => {
    return (
        <Formik validationSchema={QuestionCategorySchema}
                initialValues={{
                    name: questionCategory?.name ?? '',
                    priority: questionCategory?.priority ?? '',
                }}
                onSubmit={(data) => resolveFormSubmit(data, questionCategory)}>
            {({handleSubmit, values, handleChange, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <ModalHeader />

                    <Modal.Body>
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
                    </Modal.Body>

                    <ModalFooter />
                </Form>
            )}
        </Formik>
    );
};

const resolveFormSubmit = async (data: FormikValues, originalQuestionCategory?: any) => {
    const entryIdCandidate = originalQuestionCategory?.id ?? null;

    if (entryIdCandidate !== null) {
        // TODO: Update existing entry
    }

    // TODO: Create new entry
};

export default CreateUpdateQuestionCategoryBody;
