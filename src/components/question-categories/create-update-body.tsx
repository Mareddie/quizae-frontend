import {Formik} from "formik";
import * as yup from "yup";
import React, {FunctionComponent, ReactElement} from "react";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const QuestionCategorySchema = yup.object().shape({
    id: yup.string().uuid().optional(),
    name: yup.string().required(),
    priority: yup.number().moreThan(0).integer().optional(),
});

type QuestionCategory = yup.InferType<typeof QuestionCategorySchema>;

type ComponentInput = {
    modalHeader: ReactElement,
    modalFooter: ReactElement,
};

const CreateUpdateQuestionCategoryBody: FunctionComponent<ComponentInput> = ({modalHeader, modalFooter}) => {
    return (
        <Formik validationSchema={QuestionCategorySchema}
                initialValues={{
                    name: '',
                    priority: '',
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
