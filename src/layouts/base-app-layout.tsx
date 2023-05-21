import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AppNavbar from "@/components/app-navbar";
import {ReactNode} from "react";

const BaseAppLayout = ({ children }: {children: ReactNode}) => {
    return (
        <Container fluid>
            <AppNavbar />

            <Row className="justify-content-center align-items-center mt-5">
                {children}
            </Row>
        </Container>
    )
}

export default BaseAppLayout;
