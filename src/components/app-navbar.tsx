import {FunctionComponent} from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import {signOut} from "next-auth/react";

const AppNavbar: FunctionComponent = () => {
    // TODO: pass authenticated user name from server session to this component

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link className="navbar-brand" href="/">Quizae</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" role="button" href="/test-page">
                            Test Page
                        </Link>
                    </Nav>

                    <Navbar.Text>
                        Signed in as: Some User <a href="#" role="button" onClick={() => signOut()}>Log Out</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;
