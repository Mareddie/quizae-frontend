import {Formik} from "formik";
import * as yup from "yup";
import {FunctionComponent, ReactElement} from "react";
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const QuestionCategorySchema = yup.object().shape({
    id: yup.string().uuid().optional(),
    name: yup.string().required('Please provide name'),
    priority: yup.number().moreThan(0).optional(),
});

type QuestionCategory = yup.InferType<typeof QuestionCategorySchema>;

type ComponentInput = {
    modalHeader: ReactElement,
    modalFooter: ReactElement,
};

const CreateUpdateQuestionCategoryBody: FunctionComponent<ComponentInput> = ({modalHeader, modalFooter}) => {
    return (
        <Form>
            {modalHeader}

            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control type="number" name="priority" required />
                    <Form.Text className="text-muted">
                        This information is used for ordering. The higher the number, the higher order in the list.
                    </Form.Text>
                </Form.Group>
            </Modal.Body>

            {modalFooter}
        </Form>
    );
};

export default CreateUpdateQuestionCategoryBody;
