import {Formik} from "formik";
import React, {FunctionComponent, ReactElement} from "react";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {QuestionCategorySchema} from "@/components/question-categories/create-update";
import * as yup from "yup";

type ComponentInput = {
    modalHeader: ReactElement,
    modalFooter: ReactElement,
    questionCategory?: yup.InferType<typeof QuestionCategorySchema>
};

const CreateUpdateQuestionCategoryBody: FunctionComponent<ComponentInput> = (
    {modalHeader, modalFooter, questionCategory}
) => {
    return (
        <Formik validationSchema={QuestionCategorySchema}
                initialValues={{
                    name: questionCategory?.name ?? '',
                    priority: questionCategory?.priority ?? '',
                }}
                onSubmit={console.log}>
            {({handleSubmit, values, handleChange, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {modalHeader}

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

                    {modalFooter}
                </Form>
            )}
        </Formik>
    );
};

export default CreateUpdateQuestionCategoryBody;
