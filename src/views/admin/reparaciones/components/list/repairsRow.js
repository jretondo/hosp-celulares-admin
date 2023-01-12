import formatMoney from 'Function/NumberFormat';
import moment from 'moment';
import React, { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { Tooltip, Button, Col, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, UncontrolledDropdown } from 'reactstrap';

const RepairRow = ({ id, item }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [newClient, setNewClient] = useState(item.client)
    const [isChangingClient, setIsChangingClient] = useState(false)
    const [isToolTipOpen, setIsToolTipOpen] = useState(false)

    const actChangeClient = () => {
        setIsToolTipOpen(false)
        setIsChangingClient(true)
        setTimeout(() => {
            document.getElementById("inpNewClient").focus()
            document.getElementById("inpNewClient").select()
        }, 300);
    }

    const updateClient = async () => {

    }


    const changeClient = (e) => {
        if (e.keyCode === 13) {
            updateClient()
        } else if (e.keyCode === 27) {
            setIsChangingClient(false)
        }
    }

    return (
        <>
            <tr>
                <td style={{ textAlign: "center" }}>
                    {item.id}
                </td>
                <td style={{ textAlign: "center" }}>
                    {moment(item.date).format("DD/MM/YYYY HH:mm") + "hs"}
                </td>
                <td style={{ textAlign: "center" }} onDoubleClick={() => actChangeClient()}>
                    {
                        !isChangingClient ? <span id={"clientData_" + id} >{item.client}</span> :
                            <input id="inpNewClient" value={newClient} onChange={e => setNewClient(e.target.value)} onKeyDown={e => changeClient(e)} />
                    }
                </td>
                <td style={{ textAlign: "center" }}>
                    <Button onClick={e => {
                        e.preventDefault()
                    }}>
                        {parseInt(item.state) === 0 ? "Pendiente de Pago" :
                            parseInt(item.state) === 1 ? "Pago Parcial" : "Totalmente Pago"}
                        {" "}<FiRefreshCcw />
                    </Button>
                </td>
                <td style={{ textAlign: "center" }}>
                    <Button color="warning" onClick={e => {
                        e.preventDefault()
                        setIsOpenModal(true)
                    }}>Ver Costos</Button>
                </td>
                <td style={{ textAlign: "center" }}>
                    $ {formatMoney(item.final_price)}
                </td>
                <td style={{ textAlign: "center" }}>
                    {item.name}
                </td>
                <td style={{ textAlign: "center" }}>
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                        >
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                }}
                            >
                                <i className="fas fa-trash-alt"></i>
                                Eliminar
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                }}
                            >
                                <i className="fas fa-credit-card"></i>
                                Pagos relacionados
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                }}
                            >
                                <i className="fas fa-search"></i>
                                Detalles
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
            <Modal isOpen={isOpenModal} toggle={() => setIsOpenModal(!isOpenModal)}>
                <ModalHeader>
                    Costos de la reparación - ID: {item.id}
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

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={e => {
                        e.preventDefault()
                        setIsOpenModal(false)
                    }} >Cerrar</Button>
                </ModalFooter>
            </Modal>
            <Tooltip placement="right" isOpen={isToolTipOpen} target={"clientData_" + id} toggle={() => setIsToolTipOpen(!isToolTipOpen)}>
                Doble click para cambiarlo
            </Tooltip>
        </>
    )
}

export default RepairRow