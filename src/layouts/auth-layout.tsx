import {ReactNode} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const AuthLayout = ({ children }: {children: ReactNode}) => {
    return (
        <Container>
            <Row className="justify-content-center align-items-center mt-5">
                {children}
            </Row>
        </Container>
    )
}

export default AuthLayout
