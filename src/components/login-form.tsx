import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useForm from "@/hooks/use-form";
import {ReactElement} from "react";
import LoginError from "@/components/login-error";

export default function LoginForm({ csrfToken }): ReactElement {
    const { formObject: loginCredentials, onChangeInput } = useForm({
        email: '',
        password: '',
    });

    return (
        <Card>
            <Card.Header as="h2" className="text-center">Quizae</Card.Header>
            <Card.Title className="text-center mt-3">Log In</Card.Title>
            <Card.Body>
                <LoginError />
                <Form action="/api/auth/callback/credentials" method="POST">
                    <Form.Control
                        type="hidden"
                        name="csrfToken"
                        defaultValue={csrfToken} />

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            name="email"
                            onChange={onChangeInput}
                            value={loginCredentials.email} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            name="password"
                            onChange={onChangeInput}
                            value={loginCredentials.password} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
