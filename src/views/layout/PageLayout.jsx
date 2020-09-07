import React from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Logo from '../../components/logo/Logo';
import { Container, Row, Col } from 'react-bootstrap';

export default function PageLayout({ children }) {
    return (
        <>
            <Container fluid>
                <Row>
                    <Header>
                        <Logo />
                    </Header>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Sidebar />
                    </Col>
                    <Col xs={10}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    );
}