import React, { useState } from 'react';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import formatMoney from 'Function/NumberFormat';

const ImportsItemRow = ({ item }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (<>
        <td style={{ textAlign: "center" }}>
            <Button color="warning" onClick={e => {
                e.preventDefault()
                setIsOpenModal(true)
            }}>Ver Importes</Button>
        </td>

        <Modal isOpen={isOpenModal} toggle={() => setIsOpenModal(!isOpenModal)}>
            <ModalHeader>
                Costos y ganancias de la reparación - ID: {item.id}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Costo de repuestos</Label>
                            <Input disabled type="text" value={"$ " + formatMoney(item.part_cost)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Costo de servicio</Label>
                            <Input disabled type="text" value={"$ " + formatMoney(item.service_cost)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Costo HPC</Label>
                            <Input disabled style={{ fontSize: "18px", fontWeight: "bold" }} type="text" value={"$ " + formatMoney(item.hpc_cost)} />
                        </FormGroup>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Precio Final Cliente</Label>
                            <Input disabled style={{ fontSize: "18px", fontWeight: "bold" }} type="text" value={"$ " + formatMoney(item.final_price)} />
                        </FormGroup>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Ganancia</Label>
                            <Input disabled style={{ fontSize: "18px", fontWeight: "bold" }} type="text" value={"$ " + formatMoney(item.difference)} />
                        </FormGroup>
                    </Col>
                </Row>

            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={e => {
                    e.preventDefault()
                    setIsOpenModal(false)
                }} >Cerrar</Button>
            </ModalFooter>
        </Modal>
    </>)
}

export default ImportsItemRow