import Alert from 'react-bootstrap/Alert';
import { useRouter } from 'next/router';
import { ReactElement } from "react";

export default function LoginError (): ReactElement|null {
    const { error } = useRouter().query as any;

    const errors = {
        CredentialsSignin: 'Sign in failed, please check provided credentials.',
    };

    if (! error || ! errors.hasOwnProperty(error)) {
        return null;
    }

    return (
        <>
            <Alert variant="danger">{errors[error as keyof typeof errors]}</Alert>
        </>
    );
}
