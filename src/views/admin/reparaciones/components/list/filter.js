import moment from 'moment';
import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap';
import FranchisesInput from './franchisesInput';
import ModalFranchise from './franchisesInput/modalFranchise';

const RepairsFilter = ({
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    repairState,
    setRepairState,
    franchiseId,
    setFranchiseId,
    searchText,
    setSearchText,
    trigger
}) => {
    const [franchiseName, setFranchiseName] = useState("Todas las franquicias")
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <>
            <Form onSubmit={e => {
                e.preventDefault()
                trigger()
            }}>
                <Row>
                    <Col md="3">
                        <FormGroup>
                            <Label>
                                Desde
                            </Label>
                            <Input max={toDate} type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <Label>
                                Hasta
                            </Label>
                            <Input min={fromDate} max={moment(new Date()).format("YYYY-MM-DD")} type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FranchisesInput
                            franchiseName={franchiseName}
                            setIsOpenModal={setIsOpenModal}
                            isOpenModal={isOpenModal}
                            setFranchiseName={setFranchiseName}
                            setFranchiseId={setFranchiseId}
                            all={true}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <FormGroup>
                            <Label>
                                Estado
                            </Label>
                            <Input type="select" value={repairState} onChange={e => setRepairState(e.target.value)}>
                                <option value={false}>Todos</option>
                                <option value={0}>Pendiente de pago</option>
                                <option value={1}>Pago parcial</option>
                                <option value={2}>Totalmente pago</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md="8">
                        <FormGroup>
                            <Label>
                                Detalles | Clientes
                            </Label>
                            <Input type="text" placeholder="Coloque algún detalle o el nombre de un cliente..." value={searchText} onChange={e => setSearchText(e.target.value)} />
                        </FormGroup>

                    </Col>
                </Row>
                <Row>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <Button color="success" >Buscar Reparaciones</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default RepairsFilter