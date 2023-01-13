import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const PaymentForm = () => {

    return (<>
        <Row>
            <Col md="4">
                <FormGroup>
                    <Label>Saldo pendiente</Label>
                    <Input disabled value={0} />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label>Forma de pago</Label>
                                <Input type="select">
                                    <option>Efectivo</option>
                                    <option>Débito</option>
                                    <option>Crédito</option>
                                    <option>Mercado Pago</option>
                                    <option>Transferencia</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label>Importe del pago</Label>
                                <Input type="number" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label>Detalles</Label>
                                <Input type="textarea" />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
        <Row>
            <Col md="12" style={{ textAlign: "center" }}>
                <Button color="success">Registrar pago</Button>

                <Button color="danger">Cancelar</Button>
            </Col>
        </Row>
    </>)
}

export default PaymentForm